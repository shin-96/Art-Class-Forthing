// DrawPath AI — single-process server (Node http + node:sqlite, zero dependencies).
import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { uid, now, hashPassword, verifyPassword, newToken, sha256, isEmail, validateAssessment, validateRubric, computeOverall, computeMastery, sniffImage } from './lib.mjs';
import { assessStrokes, assessUpload, applyRubric } from './assess.mjs';
import { chatWithFallback, extractJson, aiStatus } from './ai.mjs';
import { MODULES, TRACKS, SKILLS, SKILL_PREREQS } from '../curriculum/curriculum.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// tiny .env loader (no dependency)
if (existsSync(join(ROOT, '.env'))) for (const line of readFileSync(join(ROOT, '.env'), 'utf8').split('\n')) {
  const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim()); if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const PORT = Number(process.env.PORT || 4173);
const DATA = join(ROOT, 'data'); mkdirSync(join(DATA, 'uploads'), { recursive: true });
const db = new DatabaseSync(join(DATA, 'app.db'));
db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, pass TEXT NOT NULL, name TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'learner', created TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS profiles(user_id TEXT PRIMARY KEY REFERENCES users(id), goal TEXT, level TEXT, method TEXT, minutes INTEGER, onboarded INTEGER DEFAULT 0, prefs TEXT DEFAULT '{}', updated TEXT);
CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), csrf TEXT NOT NULL, expires TEXT NOT NULL, created TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS reset_tokens(token TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires TEXT NOT NULL, used INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS projects(id TEXT PRIMARY KEY, owner TEXT NOT NULL REFERENCES users(id), lesson_id TEXT, title TEXT NOT NULL, data TEXT NOT NULL, version INTEGER DEFAULT 1, created TEXT NOT NULL, updated TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS submissions(id TEXT PRIMARY KEY, owner TEXT NOT NULL REFERENCES users(id), lesson_id TEXT NOT NULL, source TEXT NOT NULL, mode TEXT, note TEXT, strokes TEXT, image_path TEXT, image_metrics TEXT, version INTEGER DEFAULT 1, parent_id TEXT, client_key TEXT, status TEXT NOT NULL, created TEXT NOT NULL, UNIQUE(owner, client_key));
CREATE TABLE IF NOT EXISTS assessments(id TEXT PRIMARY KEY, submission_id TEXT NOT NULL REFERENCES submissions(id), rubric_version TEXT NOT NULL, status TEXT NOT NULL, overall INTEGER, criteria TEXT NOT NULL, annotations TEXT NOT NULL, corrections TEXT NOT NULL, strengths TEXT, weaknesses TEXT, recommendations TEXT, confidence REAL, method TEXT, model TEXT, created TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS ai_jobs(id TEXT PRIMARY KEY, owner TEXT NOT NULL, submission_id TEXT, model TEXT, state TEXT NOT NULL, error TEXT, retries INTEGER DEFAULT 0, created TEXT NOT NULL, started TEXT, finished TEXT);
CREATE TABLE IF NOT EXISTS progress(user_id TEXT NOT NULL, lesson_id TEXT NOT NULL, state TEXT NOT NULL, best_score INTEGER, attempts INTEGER DEFAULT 0, updated TEXT NOT NULL, PRIMARY KEY(user_id, lesson_id));
CREATE TABLE IF NOT EXISTS conversations(id TEXT PRIMARY KEY, user_id TEXT NOT NULL, lesson_id TEXT, messages TEXT NOT NULL, updated TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY AUTOINCREMENT, actor TEXT, action TEXT NOT NULL, target TEXT, detail TEXT, at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS lesson_state(lesson_id TEXT PRIMARY KEY, status TEXT NOT NULL, updated_by TEXT, updated TEXT);
CREATE TABLE IF NOT EXISTS custom_lessons(id TEXT PRIMARY KEY, module_id TEXT NOT NULL, data TEXT NOT NULL, created_by TEXT, created TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_sub_owner ON submissions(owner); CREATE INDEX IF NOT EXISTS idx_proj_owner ON projects(owner);`);

const audit = (actor, action, target, detail) => db.prepare('INSERT INTO audit(actor,action,target,detail,at) VALUES(?,?,?,?,?)').run(actor || null, action, target || null, detail ? String(detail).slice(0, 500) : null, now());
// seed admin (env-overridable, documented in README — change before any real deployment)
if (!db.prepare("SELECT id FROM users WHERE role='admin'").get()) {
  const id = uid('usr');
  db.prepare('INSERT INTO users(id,email,pass,name,role,created) VALUES(?,?,?,?,?,?)')
    .run(id, (process.env.ADMIN_EMAIL || 'admin@drawpath.local').toLowerCase(), hashPassword(process.env.ADMIN_PASSWORD || 'Admin123!'), 'Admin', 'admin', now());
  db.prepare('INSERT INTO profiles(user_id) VALUES(?)').run(id);
  audit(null, 'seed.admin', id, process.env.ADMIN_EMAIL || 'admin@drawpath.local');
}
// curriculum lookup (built-in + admin custom lessons + publish state)
function allModules() {
  const mods = structuredClone([...MODULES, ...TRACKS.map(t => ({ ...t, isTrack: true }))]);
  for (const row of db.prepare('SELECT * FROM custom_lessons').all()) {
    const mod = mods.find(m => m.id === row.module_id); if (mod) mod.lessons.push(JSON.parse(row.data));
  }
  const states = Object.fromEntries(db.prepare('SELECT lesson_id,status FROM lesson_state').all().map(r => [r.lesson_id, r.status]));
  for (const m of mods) for (const l of m.lessons) l.status = states[l.id] || 'published';
  return mods;
}
const findLesson = (id) => { for (const m of allModules()) { const l = m.lessons.find(x => x.id === id); if (l) return { lesson: l, module: m }; } return null; };

// ---------- http helpers ----------
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
function send(res, code, body, type = 'application/json; charset=utf-8', extra = {}) {
  const buf = Buffer.isBuffer(body) ? body : Buffer.from(typeof body === 'string' ? body : JSON.stringify(body));
  res.writeHead(code, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer', 'Content-Security-Policy': "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'", ...extra });
  res.end(buf);
}
const fail = (res, code, msg) => send(res, code, { error: msg });
async function bodyJson(req) {
  const chunks = []; let size = 0;
  for await (const c of req) { size += c.length; if (size > 12 * 1024 * 1024) throw new Error('TOO_LARGE'); chunks.push(c); }
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new Error('BAD_JSON'); }
}
const cookies = (req) => Object.fromEntries((req.headers.cookie || '').split(';').map(s => s.trim().split('=')).filter(x => x[0]).map(([k, v]) => [k, decodeURIComponent(v || '')]));
function auth(req) {
  const tok = cookies(req).dp_session; if (!tok) return null;
  const s = db.prepare('SELECT * FROM sessions WHERE token=?').get(sha256(tok));
  if (!s || s.expires < now()) return null;
  const u = db.prepare('SELECT id,email,name,role FROM users WHERE id=?').get(s.user_id);
  return u ? { user: u, csrf: s.csrf } : null;
}
const rate = new Map();
function rateLimit(req, res, key, max, winMs = 60000) {
  const id = key + ':' + (req.socket.remoteAddress || '?');
  const t = Date.now(), arr = (rate.get(id) || []).filter(x => t - x < winMs);
  if (arr.length >= max) { fail(res, 429, 'Quá nhiều yêu cầu — thử lại sau ít phút.'); return false; }
  arr.push(t); rate.set(id, arr); return true;
}
function requireAuth(req, res, roles) {
  const a = auth(req);
  if (!a) { fail(res, 401, 'Chưa đăng nhập.'); return null; }
  if (req.method !== 'GET' && req.headers['x-csrf'] !== a.csrf) { fail(res, 403, 'CSRF token không hợp lệ.'); return null; }
  if (roles && !roles.includes(a.user.role)) { fail(res, 403, 'Không đủ quyền.'); return null; }
  return a;
}
const pub = (u) => ({ id: u.id, email: u.email, name: u.name, role: u.role });

// ---------- demo strokes: generated from real parametric geometry (not fake video) ----------
function demoStrokes(lesson) {
  const kind = lesson.demo?.kind || 'line';
  const S = (points, color = '#41403E', width = 5) => ({ id: uid('demo'), layerId: 'demo', tool: 'pencil', color, width, opacity: 1, points });
  const line = (x1, y1, x2, y2, n = 40) => Array.from({ length: n + 1 }, (_, i) => ({ x: Math.round(x1 + (x2 - x1) * i / n), y: Math.round(y1 + (y2 - y1) * i / n), t: i * 30 }));
  const ellipse = (cx, cy, rx, ry, n = 60) => Array.from({ length: n + 1 }, (_, i) => { const a = i / n * Math.PI * 2; return { x: Math.round(cx + rx * Math.cos(a)), y: Math.round(cy + ry * Math.sin(a)), t: i * 30 }; });
  switch (kind) {
    case 'ellipse': case 'circle': return [S(ellipse(500, 480, 260, kind === 'circle' ? 260 : 150))];
    case 'cube': return [[300, 350, 620, 350], [620, 350, 620, 670], [620, 670, 300, 670], [300, 670, 300, 350], [420, 240, 740, 240], [740, 240, 740, 560], [740, 560, 620, 670], [420, 240, 300, 350], [420, 240, 420, 560], [420, 560, 300, 670]].map(c => S(line(...c)));
    case 'cylinder': return [S(ellipse(500, 300, 180, 55)), S(line(320, 300, 320, 680)), S(line(680, 300, 680, 680)), S(ellipse(500, 680, 180, 55).filter((_, i) => i % 60 <= 30))];
    case 'sphere': return [S(ellipse(500, 480, 240, 240)), S(ellipse(500, 480, 240, 90)), S(ellipse(500, 480, 90, 240))];
    case 'grid': case 'horizon': return [[100, 420, 900, 420], [500, 420, 100, 900], [500, 420, 380, 900], [500, 420, 620, 900], [500, 420, 900, 900], [180, 640, 820, 640], [130, 780, 870, 780]].map(c => S(line(...c)));
    case 'value-scale': return [0, 1, 2, 3, 4].map(i => S(line(180 + i * 130, 480, 280 + i * 130, 480, 12), ['#e8e2d4', '#c9c0ab', '#8f8672', '#554e40', '#242424'][i], 60));
    case 'gesture': return [S(Array.from({ length: 41 }, (_, i) => { const t = i / 40; return { x: Math.round(300 + 400 * t), y: Math.round(700 - 500 * t + 130 * Math.sin(t * Math.PI)), t: i * 30 }; }))];
    default: return [S(line(150, 500, 850, 500))];
  }
}

// ---------- assessment runner (job lifecycle + persistence + progress/mastery) ----------
function runAssessment(sub, lesson) {
  const jobId = uid('job');
  db.prepare('INSERT INTO ai_jobs(id,owner,submission_id,state,created,started) VALUES(?,?,?,?,?,?)').run(jobId, sub.owner, sub.id, 'PROCESSING', now(), now());
  try {
    const exercise = lesson.exercise;
    const errR = validateRubric(exercise.rubric || lesson.rubric || []);
    if (errR) throw new Error('Rubric lỗi: ' + errR);
    const rubric = exercise.rubric || lesson.rubric;
    const strokes = sub.strokes ? JSON.parse(sub.strokes) : null;
    const assessed = sub.source === 'upload' ? assessUpload(exercise, sub.image_metrics ? JSON.parse(sub.image_metrics) : null) : assessStrokes(exercise, strokes || []);
    const criteria = applyRubric(rubric, assessed);
    const { overall, status, missing } = computeOverall(criteria);
    const strengths = criteria.filter(c => c.score >= 75).map(c => c.name + ': ' + c.feedback);
    const weaknesses = criteria.filter(c => c.score !== null && c.score < 60).map(c => c.name + ': ' + c.feedback);
    const recs = weaknesses.length ? ['Luyện lại bài «' + lesson.title + '» ở chế độ Guided, tập trung: ' + weaknesses.map(w => w.split(':')[0]).join(', ') + '.'] : ['Bài đạt tốt — chuyển sang bài tiếp theo trong lộ trình hoặc tăng độ khó.'];
    if (missing.length) recs.push('Một số tiêu chí chưa chấm được (' + missing.join(', ') + ') — xem KNOWN_LIMITATIONS và phần giải thích độ tin cậy.');
    const result = { criteria, annotations: assessed.annotations || [], corrections: assessed.corrections || [], overall: status === 'SCORED' ? overall : null, status: assessed.status === 'INSUFFICIENT_DATA' ? 'INSUFFICIENT_DATA' : status, confidence: assessed.confidence, method: sub.source === 'upload' ? 'image-stats-local' : 'geometry-local', missing };
    const verr = validateAssessment({ criteria: result.criteria.map(c => ({ ...c })), annotations: result.annotations });
    if (verr) throw new Error('Assessment không hợp lệ: ' + verr);
    const aid = uid('asm');
    db.prepare('INSERT INTO assessments(id,submission_id,rubric_version,status,overall,criteria,annotations,corrections,strengths,weaknesses,recommendations,confidence,method,model,created) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
      .run(aid, sub.id, lesson.rubricVersion || 'v1', result.status, result.overall, JSON.stringify(result.criteria), JSON.stringify(result.annotations), JSON.stringify(result.corrections), JSON.stringify(strengths), JSON.stringify(weaknesses), JSON.stringify(recs), result.confidence, result.method, null, now());
    db.prepare("UPDATE ai_jobs SET state='COMPLETED', finished=? WHERE id=?").run(now(), jobId);
    db.prepare("UPDATE submissions SET status='ASSESSED' WHERE id=?").run(sub.id);
    // progress + completion: a SCORED submission completes the lesson (pass flag separate)
    const prev = db.prepare('SELECT * FROM progress WHERE user_id=? AND lesson_id=?').get(sub.owner, sub.lesson_id);
    db.prepare('INSERT INTO progress(user_id,lesson_id,state,best_score,attempts,updated) VALUES(?,?,?,?,?,?) ON CONFLICT(user_id,lesson_id) DO UPDATE SET state=excluded.state, best_score=excluded.best_score, attempts=progress.attempts+1, updated=excluded.updated')
      .run(sub.owner, sub.lesson_id, result.status === 'SCORED' ? 'completed' : 'in_progress', Math.max(prev?.best_score || 0, result.overall || 0), 1, now());
    return { jobId, assessmentId: aid, ...result };
  } catch (e) {
    db.prepare("UPDATE ai_jobs SET state='FAILED', error=?, finished=? WHERE id=?").run(String(e.message).slice(0, 300), now(), jobId);
    db.prepare("UPDATE submissions SET status='FAILED' WHERE id=?").run(sub.id);
    throw e;
  }
}
function masteryFor(userId) {
  const rows = db.prepare(`SELECT a.overall, a.confidence, a.created, s.lesson_id FROM assessments a JOIN submissions s ON s.id=a.submission_id WHERE s.owner=? AND a.overall IS NOT NULL`).all(userId);
  const bySkill = {};
  for (const r of rows) {
    const f = findLesson(r.lesson_id); if (!f) continue;
    for (const sk of f.lesson.skills || []) (bySkill[sk] ||= []).push({ score: r.overall, confidence: r.confidence ?? 0.8, difficulty: f.lesson.difficulty, at: r.created });
  }
  return SKILLS.map(s => ({ skill: s.id, name: s.name, ...computeMastery(bySkill[s.id] || []) }));
}
function recommendationsFor(userId) {
  const done = new Set(db.prepare("SELECT lesson_id FROM progress WHERE user_id=? AND state='completed'").all(userId).map(r => r.lesson_id));
  const mastery = Object.fromEntries(masteryFor(userId).map(m => [m.skill, m]));
  const out = [];
  for (const m of allModules()) for (const l of m.lessons) {
    if (done.has(l.id) || l.status !== 'published') continue;
    const missingPre = (l.prereqLessons || []).filter(p => !done.has(p));
    const weak = (l.skills || []).filter(sk => mastery[sk] && mastery[sk].score !== null && mastery[sk].score < 60);
    out.push({ lessonId: l.id, title: l.title, module: m.title, reason: weak.length ? 'Kỹ năng đang yếu: ' + weak.map(w => mastery[w].name).join(', ') : missingPre.length ? 'Bài nền tảng tiếp theo trong lộ trình' : 'Bài tiếp theo phù hợp lộ trình và tiên quyết đã đủ', prereqWarning: missingPre, score: (weak.length ? 2 : 0) + (missingPre.length ? 0 : 1) - l.difficulty * 0.05 });
  }
  return out.sort((a, b) => b.score - a.score).slice(0, 6);
}
// rule-based tutor fallback — answers from the learner's REAL assessment data, labeled as local mode
function tutorLocal(q, lesson, lastAsm) {
  const low = (q || '').toLowerCase();
  if (lastAsm && (low.includes('sai') || low.includes('lỗi') || low.includes('sửa'))) {
    const weak = JSON.parse(lastAsm.criteria).filter(c => c.score !== null && c.score < 60);
    if (weak.length) return 'Theo lần chấm gần nhất của bạn (điểm ' + lastAsm.overall + '), cần sửa trước: ' + weak.map(c => c.name + ' (' + c.score + 'đ) — ' + c.feedback).join(' ') + ' Mở lớp «Hướng dẫn sửa» trong trang kết quả để xem đường mẫu đè lên bài của bạn.';
  }
  if (low.includes('ellipse') || low.includes('elip')) return 'Luyện ellipse hiệu quả nhất: vẽ từ chuyển động vai (không dùng cổ tay), đi 2–3 vòng nhẹ chồng nhau rồi mới nhấn nét chính, giữ trục ngắn/dài vuông góc. Bài «' + (lesson?.title || 'Ellipse') + '» có đường mẫu để đối chiếu từng vòng.';
  if (low.includes('phối cảnh') || low.includes('điểm tụ') || low.includes('méo')) return 'Khối méo thường do các cạnh song song không hội tụ về cùng một điểm tụ trên đường chân trời. Cách sửa: (1) xác định đường chân trời, (2) chấm điểm tụ, (3) kiểm tra từng cạnh — cạnh nào không hướng về điểm tụ thì vẽ lại cạnh đó trước, đừng sửa toàn khối.';
  if (low.includes('bóng') || low.includes('sáng tối') || low.includes('tối')) return 'Vùng tối chưa hợp lý thường vì chưa khóa hướng sáng. Hãy chốt MỘT nguồn sáng, chia hình thành 3 nhóm value (sáng / trung / tối) trước, rồi mới thêm bóng đổ theo đúng hướng ngược nguồn sáng.';
  return 'Mình là gia sư cục bộ (chưa có AI key nên trả lời theo dữ liệu bài học). Bài «' + (lesson?.title || '') + '» tập trung vào: ' + (lesson?.objectives || []).join('; ') + '. Bạn hỏi cụ thể về một lỗi (nét lệch, ellipse méo, phối cảnh, sáng tối) mình sẽ trả lời đúng vào lỗi đó.';
}

// ---------- routes ----------
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const path = url.pathname;
  try {
    if (path === '/api/health') return send(res, 200, { ok: true, ai: aiStatus(), lessons: allModules().reduce((s, m) => s + m.lessons.length, 0) });
    // ----- auth -----
    if (path === '/api/auth/register' && req.method === 'POST') {
      if (!rateLimit(req, res, 'auth', 10)) return;
      const b = await bodyJson(req);
      if (!isEmail(b.email) || typeof b.password !== 'string' || b.password.length < 8 || !b.name) return fail(res, 400, 'Cần email hợp lệ, mật khẩu ≥ 8 ký tự và họ tên.');
      const id = uid('usr');
      try { db.prepare('INSERT INTO users(id,email,pass,name,role,created) VALUES(?,?,?,?,?,?)').run(id, b.email.toLowerCase(), hashPassword(b.password), String(b.name).slice(0, 80), 'learner', now()); }
      catch { return fail(res, 409, 'Email đã được đăng ký.'); }
      db.prepare('INSERT INTO profiles(user_id) VALUES(?)').run(id);
      audit(id, 'auth.register', id, b.email);
      return send(res, 201, { id });
    }
    if (path === '/api/auth/login' && req.method === 'POST') {
      if (!rateLimit(req, res, 'auth', 10)) return;
      const b = await bodyJson(req);
      const u = db.prepare('SELECT * FROM users WHERE email=?').get(String(b.email || '').toLowerCase());
      if (!u || !verifyPassword(String(b.password || ''), u.pass)) return fail(res, 401, 'Email hoặc mật khẩu không đúng.');
      const raw = newToken(), csrf = newToken();
      db.prepare('INSERT INTO sessions(token,user_id,csrf,expires,created) VALUES(?,?,?,?,?)').run(sha256(raw), u.id, csrf, new Date(Date.now() + 7 * 864e5).toISOString(), now());
      audit(u.id, 'auth.login', u.id, null);
      return send(res, 200, { user: pub(u), csrf }, 'application/json; charset=utf-8', { 'Set-Cookie': `dp_session=${raw}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800` });
    }
    if (path === '/api/auth/logout' && req.method === 'POST') {
      const a = requireAuth(req, res); if (!a) return;
      db.prepare('DELETE FROM sessions WHERE user_id=?').run(a.user.id);
      return send(res, 200, { ok: true }, 'application/json; charset=utf-8', { 'Set-Cookie': 'dp_session=; HttpOnly; Path=/; Max-Age=0' });
    }
    if (path === '/api/auth/forgot' && req.method === 'POST') {
      const b = await bodyJson(req);
      const u = db.prepare('SELECT * FROM users WHERE email=?').get(String(b.email || '').toLowerCase());
      if (u) { const t = newToken(); db.prepare('INSERT INTO reset_tokens(token,user_id,expires) VALUES(?,?,?)').run(sha256(t), u.id, new Date(Date.now() + 3600e3).toISOString()); audit(u.id, 'auth.forgot', u.id, 'token created (email chưa cấu hình — xem BLOCKERS.md)'); }
      return send(res, 200, { ok: true, note: 'Nếu email tồn tại, mã đặt lại đã được tạo. Hệ thống gửi email chưa được cấu hình trong bản local này (xem BLOCKERS.md) — admin có thể cấp lại mật khẩu tạm qua trang quản trị.' });
    }
    if (path === '/api/auth/reset' && req.method === 'POST') {
      const b = await bodyJson(req);
      const r = db.prepare('SELECT * FROM reset_tokens WHERE token=? AND used=0').get(sha256(String(b.token || '')));
      if (!r || r.expires < now() || typeof b.password !== 'string' || b.password.length < 8) return fail(res, 400, 'Mã đặt lại không hợp lệ/hết hạn hoặc mật khẩu < 8 ký tự.');
      db.prepare('UPDATE users SET pass=? WHERE id=?').run(hashPassword(b.password), r.user_id);
      db.prepare('UPDATE reset_tokens SET used=1 WHERE token=?').run(r.token);
      db.prepare('DELETE FROM sessions WHERE user_id=?').run(r.user_id);
      return send(res, 200, { ok: true });
    }
    if (path === '/api/auth/me' && req.method === 'GET') {
      const a = auth(req); if (!a) return fail(res, 401, 'Chưa đăng nhập.');
      const p = db.prepare('SELECT * FROM profiles WHERE user_id=?').get(a.user.id);
      return send(res, 200, { user: pub(a.user), csrf: a.csrf, profile: p });
    }
    if (path === '/api/profile' && req.method === 'PUT') {
      const a = requireAuth(req, res); if (!a) return;
      const b = await bodyJson(req);
      db.prepare('INSERT INTO profiles(user_id,goal,level,method,minutes,onboarded,prefs,updated) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET goal=excluded.goal, level=excluded.level, method=excluded.method, minutes=excluded.minutes, onboarded=excluded.onboarded, prefs=excluded.prefs, updated=excluded.updated')
        .run(a.user.id, b.goal || null, b.level || null, b.method || null, Number(b.minutes) || null, b.onboarded ? 1 : 0, JSON.stringify(b.prefs || {}), now());
      audit(a.user.id, 'profile.update', a.user.id, b.goal || '');
      return send(res, 200, { ok: true });
    }
    // ----- curriculum (public read; drafts hidden from learners) -----
    if (path === '/api/curriculum' && req.method === 'GET') {
      const a = auth(req);
      const mods = allModules().map(m => ({ ...m, lessons: m.lessons.filter(l => a?.user.role === 'admin' || a?.user.role === 'instructor' || l.status === 'published') }));
      let progress = {};
      if (a) progress = Object.fromEntries(db.prepare('SELECT lesson_id,state,best_score,attempts FROM progress WHERE user_id=?').all(a.user.id).map(r => [r.lesson_id, r]));
      return send(res, 200, { skills: SKILLS, skillPrereqs: SKILL_PREREQS, modules: mods, progress });
    }
    const lm = /^\/api\/lessons\/([\w-]+)(\/demo)?$/.exec(path);
    if (lm && req.method === 'GET') {
      const f = findLesson(lm[1]); if (!f) return fail(res, 404, 'Không thấy bài học.');
      if (lm[2]) return send(res, 200, { strokes: demoStrokes(f.lesson), note: f.lesson.demo?.note || '' });
      const done = new Set();
      const a = auth(req);
      if (a) for (const r of db.prepare("SELECT lesson_id FROM progress WHERE user_id=? AND state='completed'").all(a.user.id)) done.add(r.lesson_id);
      return send(res, 200, { lesson: f.lesson, module: { id: f.module.id, title: f.module.title }, prereqWarning: (f.lesson.prereqLessons || []).filter(p => !done.has(p)) });
    }
    if (path === '/api/dashboard' && req.method === 'GET') {
      const a = requireAuth(req, res); if (!a) return;
      const recent = db.prepare('SELECT s.*, (SELECT overall FROM assessments WHERE submission_id=s.id ORDER BY created DESC LIMIT 1) AS overall FROM submissions s WHERE owner=? ORDER BY created DESC LIMIT 5').all(a.user.id);
      const prog = db.prepare('SELECT * FROM progress WHERE user_id=?').all(a.user.id);
      return send(res, 200, { progress: prog, mastery: masteryFor(a.user.id), recommendations: recommendationsFor(a.user.id), recentSubmissions: recent, weakSkills: masteryFor(a.user.id).filter(m => m.score !== null && m.score < 60) });
    }
    // ----- drawing projects -----
    if (path === '/api/projects' && req.method === 'POST') {
      const a = requireAuth(req, res); if (!a) return;
      const b = await bodyJson(req);
      const id = uid('prj');
      db.prepare('INSERT INTO projects(id,owner,lesson_id,title,data,created,updated) VALUES(?,?,?,?,?,?,?)').run(id, a.user.id, b.lessonId || null, String(b.title || 'Bài vẽ mới').slice(0, 120), JSON.stringify(b.data || { layers: [], strokes: [] }), now(), now());
      return send(res, 201, { id });
    }
    if (path === '/api/projects' && req.method === 'GET') {
      const a = requireAuth(req, res); if (!a) return;
      return send(res, 200, db.prepare('SELECT id,lesson_id,title,version,updated FROM projects WHERE owner=? ORDER BY updated DESC').all(a.user.id));
    }
    const pm = /^\/api\/projects\/([\w-]+)$/.exec(path);
    if (pm && req.method === 'GET') {
      const a = requireAuth(req, res); if (!a) return;
      const p = db.prepare('SELECT * FROM projects WHERE id=?').get(pm[1]);
      if (!p) return fail(res, 404, 'Không thấy project.');
      if (p.owner !== a.user.id && a.user.role !== 'admin') return fail(res, 403, 'Project của người khác.');
      return send(res, 200, { ...p, data: JSON.parse(p.data) });
    }
    if (pm && req.method === 'PUT') {
      const a = requireAuth(req, res); if (!a) return;
      const p = db.prepare('SELECT * FROM projects WHERE id=?').get(pm[1]);
      if (!p) return fail(res, 404, 'Không thấy project.');
      if (p.owner !== a.user.id) return fail(res, 403, 'Project của người khác.');
      const b = await bodyJson(req);
      if (b.version !== undefined && b.version !== p.version) return fail(res, 409, 'Xung đột phiên bản — bản mới hơn đã được lưu ở nơi khác.');
      db.prepare('UPDATE projects SET data=?, title=?, version=version+1, updated=? WHERE id=?').run(JSON.stringify(b.data || {}), String(b.title || p.title).slice(0, 120), now(), p.id);
      return send(res, 200, { ok: true, version: p.version + 1 });
    }
    if (pm && req.method === 'DELETE') {
      const a = requireAuth(req, res); if (!a) return;
      const p = db.prepare('SELECT * FROM projects WHERE id=?').get(pm[1]);
      if (!p || p.owner !== a.user.id) return fail(res, 404, 'Không thấy project.');
      db.prepare('DELETE FROM projects WHERE id=?').run(p.id); audit(a.user.id, 'project.delete', p.id, null);
      return send(res, 200, { ok: true });
    }
    // ----- submissions + assessment -----
    if (path === '/api/submissions' && req.method === 'POST') {
      const a = requireAuth(req, res); if (!a) return;
      if (!rateLimit(req, res, 'submit', 30)) return;
      const b = await bodyJson(req);
      const f = findLesson(b.lessonId); if (!f) return fail(res, 400, 'lessonId không hợp lệ.');
      if (b.clientKey) { const ex = db.prepare('SELECT * FROM submissions WHERE owner=? AND client_key=?').get(a.user.id, String(b.clientKey)); if (ex) { const asm = db.prepare('SELECT * FROM assessments WHERE submission_id=? ORDER BY created DESC LIMIT 1').get(ex.id); return send(res, 200, { submission: ex, assessment: asm, duplicate: true }); } }
      const id = uid('sub'); let imagePath = null;
      if (b.source === 'upload') {
        if (!b.imageData) return fail(res, 400, 'Thiếu dữ liệu ảnh.');
        const buf = Buffer.from(String(b.imageData).split(',').pop(), 'base64');
        if (buf.length > 8 * 1024 * 1024) return fail(res, 413, 'Ảnh quá 8MB.');
        const mime = sniffImage(buf); if (!mime) return fail(res, 415, 'File không phải ảnh JPG/PNG/WebP thật (kiểm tra magic bytes).');
        imagePath = join(DATA, 'uploads', id + extname({ 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp' }[mime]));
        writeFileSync(imagePath, buf);
      } else if (!Array.isArray(b.strokes) || b.strokes.length === 0) return fail(res, 400, 'Bài canvas cần ít nhất 1 nét vẽ.');
      const parent = b.parentId ? db.prepare('SELECT * FROM submissions WHERE id=? AND owner=?').get(b.parentId, a.user.id) : null;
      const sub = { id, owner: a.user.id, lesson_id: b.lessonId, source: b.source === 'upload' ? 'upload' : 'canvas', mode: b.mode || 'independent', note: String(b.note || '').slice(0, 500), strokes: b.strokes ? JSON.stringify(b.strokes) : null, image_path: imagePath, image_metrics: b.imageMetrics ? JSON.stringify(b.imageMetrics) : null, version: parent ? parent.version + 1 : 1, parent_id: parent?.id || null, client_key: b.clientKey ? String(b.clientKey) : null, status: 'QUEUED', created: now() };
      db.prepare('INSERT INTO submissions(id,owner,lesson_id,source,mode,note,strokes,image_path,image_metrics,version,parent_id,client_key,status,created) VALUES(@id,@owner,@lesson_id,@source,@mode,@note,@strokes,@image_path,@image_metrics,@version,@parent_id,@client_key,@status,@created)').run(sub);
      audit(a.user.id, 'submission.create', id, b.lessonId);
      try { const r = runAssessment(sub, f.lesson); return send(res, 201, { submission: sub, assessment: { id: r.assessmentId, ...r } }); }
      catch (e) { return fail(res, 422, 'Chấm bài thất bại: ' + e.message); }
    }
    if (path === '/api/submissions' && req.method === 'GET') {
      const a = requireAuth(req, res); if (!a) return;
      const page = Math.max(1, Number(url.searchParams.get('page') || 1)), size = 20;
      const rows = db.prepare('SELECT s.*, (SELECT id FROM assessments WHERE submission_id=s.id ORDER BY created DESC LIMIT 1) AS assessment_id, (SELECT overall FROM assessments WHERE submission_id=s.id ORDER BY created DESC LIMIT 1) AS overall FROM submissions s WHERE owner=? ORDER BY created DESC LIMIT ? OFFSET ?').all(a.user.id, size, (page - 1) * size);
      return send(res, 200, { page, items: rows });
    }
    const sm = /^\/api\/submissions\/([\w-]+)(\/reassess)?$/.exec(path);
    if (sm && req.method === 'GET') {
      const a = requireAuth(req, res); if (!a) return;
      const s = db.prepare('SELECT * FROM submissions WHERE id=?').get(sm[1]);
      if (!s) return fail(res, 404, 'Không thấy bài nộp.');
      if (s.owner !== a.user.id && a.user.role !== 'admin') return fail(res, 403, 'Bài nộp của người khác.');
      const asm = db.prepare('SELECT * FROM assessments WHERE submission_id=? ORDER BY created DESC').all(s.id);
      const chain = []; let cur = s; while (cur?.parent_id) { cur = db.prepare('SELECT * FROM submissions WHERE id=?').get(cur.parent_id); if (cur) chain.unshift(cur.id); }
      return send(res, 200, { submission: { ...s, strokes: s.strokes ? JSON.parse(s.strokes) : null }, assessments: asm.map(x => ({ ...x, criteria: JSON.parse(x.criteria), annotations: JSON.parse(x.annotations), corrections: JSON.parse(x.corrections), strengths: JSON.parse(x.strengths || '[]'), weaknesses: JSON.parse(x.weaknesses || '[]'), recommendations: JSON.parse(x.recommendations || '[]') })), revisionChain: chain });
    }
    if (sm && req.method === 'POST' && sm[2]) {
      const a = requireAuth(req, res); if (!a) return;
      const s = db.prepare('SELECT * FROM submissions WHERE id=?').get(sm[1]);
      if (!s || s.owner !== a.user.id) return fail(res, 404, 'Không thấy bài nộp.');
      const f = findLesson(s.lesson_id); if (!f) return fail(res, 400, 'Bài học đã bị gỡ.');
      try { const r = runAssessment(s, f.lesson); audit(a.user.id, 'submission.reassess', s.id, r.assessmentId); return send(res, 200, { assessment: { id: r.assessmentId, ...r } }); }
      catch (e) { return fail(res, 422, 'Chấm lại thất bại: ' + e.message); }
    }
    if (path === '/api/portfolio' && req.method === 'GET') {
      const a = requireAuth(req, res); if (!a) return;
      return send(res, 200, db.prepare("SELECT s.id, s.lesson_id, s.source, s.created, s.version, (SELECT overall FROM assessments WHERE submission_id=s.id ORDER BY created DESC LIMIT 1) AS overall FROM submissions s WHERE owner=? ORDER BY created DESC").all(a.user.id));
    }
    if (path === '/api/mastery' && req.method === 'GET') { const a = requireAuth(req, res); if (!a) return; return send(res, 200, masteryFor(a.user.id)); }
    if (path === '/api/recommendations' && req.method === 'GET') { const a = requireAuth(req, res); if (!a) return; return send(res, 200, recommendationsFor(a.user.id)); }
    // ----- AI tutor -----
    if (path === '/api/tutor' && req.method === 'POST') {
      const a = requireAuth(req, res); if (!a) return;
      if (!rateLimit(req, res, 'tutor', 20)) return;
      const b = await bodyJson(req);
      const f = b.lessonId ? findLesson(b.lessonId) : null;
      const lastAsm = b.submissionId ? db.prepare('SELECT * FROM assessments WHERE submission_id=? ORDER BY created DESC LIMIT 1').get(b.submissionId) : db.prepare('SELECT a.* FROM assessments a JOIN submissions s ON s.id=a.submission_id WHERE s.owner=? ORDER BY a.created DESC LIMIT 1').get(a.user.id);
      let answer, mode = 'local-rule-based', provider = null;
      try {
        const sys = 'Bạn là gia sư vẽ cho nền tảng DrawPath AI. Trả lời tiếng Việt, ngắn gọn, chỉ dựa trên ngữ cảnh được cấp, không bịa chi tiết không có trong bài. Bài học: ' + (f ? f.lesson.title + ' — mục tiêu: ' + (f.lesson.objectives || []).join('; ') : 'tự do') + (lastAsm ? '. Kết quả chấm gần nhất: điểm ' + lastAsm.overall + ', tiêu chí: ' + lastAsm.criteria : '');
        const r = await chatWithFallback([{ role: 'system', content: sys }, { role: 'user', content: String(b.question || '').slice(0, 1000) }]);
        answer = r.text; mode = 'live-ai'; provider = r.provider;
      } catch { answer = tutorLocal(String(b.question || ''), f?.lesson, lastAsm); }
      const cid = b.conversationId || uid('conv');
      const prev = db.prepare('SELECT * FROM conversations WHERE id=? AND user_id=?').get(cid, a.user.id);
      const msgs = prev ? JSON.parse(prev.messages) : [];
      msgs.push({ role: 'user', text: b.question, at: now() }, { role: 'assistant', text: answer, mode, provider, at: now() });
      db.prepare('INSERT INTO conversations(id,user_id,lesson_id,messages,updated) VALUES(?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET messages=excluded.messages, updated=excluded.updated').run(cid, a.user.id, b.lessonId || null, JSON.stringify(msgs), now());
      return send(res, 200, { answer, mode, provider, conversationId: cid });
    }
    if (path === '/api/ai/status' && req.method === 'GET') return send(res, 200, aiStatus());
    // ----- admin -----
    if (path.startsWith('/api/admin/')) {
      const a = requireAuth(req, res, ['admin', 'instructor']); if (!a) return;
      if (path === '/api/admin/overview' && req.method === 'GET') return send(res, 200, { users: db.prepare('SELECT COUNT(*) c FROM users').get().c, submissions: db.prepare('SELECT COUNT(*) c FROM submissions').get().c, assessments: db.prepare('SELECT COUNT(*) c FROM assessments').get().c, jobsFailed: db.prepare("SELECT COUNT(*) c FROM ai_jobs WHERE state='FAILED'").get().c, lessons: allModules().reduce((s, m) => s + m.lessons.length, 0) });
      if (path === '/api/admin/users' && req.method === 'GET') { if (a.user.role !== 'admin') return fail(res, 403, 'Chỉ admin.'); return send(res, 200, db.prepare('SELECT id,email,name,role,created FROM users ORDER BY created DESC LIMIT 200').all()); }
      const um = /^\/api\/admin\/users\/([\w-]+)\/role$/.exec(path);
      if (um && req.method === 'PUT') { if (a.user.role !== 'admin') return fail(res, 403, 'Chỉ admin.'); const b = await bodyJson(req); if (!['learner', 'instructor', 'admin'].includes(b.role)) return fail(res, 400, 'Role không hợp lệ.'); db.prepare('UPDATE users SET role=? WHERE id=?').run(b.role, um[1]); audit(a.user.id, 'admin.role', um[1], b.role); return send(res, 200, { ok: true }); }
      if (path === '/api/admin/jobs' && req.method === 'GET') return send(res, 200, db.prepare('SELECT * FROM ai_jobs ORDER BY created DESC LIMIT 100').all());
      if (path === '/api/admin/audit' && req.method === 'GET') { if (a.user.role !== 'admin') return fail(res, 403, 'Chỉ admin.'); return send(res, 200, db.prepare('SELECT * FROM audit ORDER BY id DESC LIMIT 200').all()); }
      const ls = /^\/api\/admin\/lessons\/([\w-]+)\/state$/.exec(path);
      if (ls && req.method === 'PUT') { const b = await bodyJson(req); if (!['draft', 'in_review', 'published', 'archived'].includes(b.status)) return fail(res, 400, 'Trạng thái không hợp lệ.'); db.prepare('INSERT INTO lesson_state(lesson_id,status,updated_by,updated) VALUES(?,?,?,?) ON CONFLICT(lesson_id) DO UPDATE SET status=excluded.status, updated_by=excluded.updated_by, updated=excluded.updated').run(ls[1], b.status, a.user.id, now()); audit(a.user.id, 'admin.lesson_state', ls[1], b.status); return send(res, 200, { ok: true }); }
      if (path === '/api/admin/lessons' && req.method === 'POST') {
        const b = await bodyJson(req);
        if (!b.moduleId || !b.lesson?.id || !b.lesson?.title) return fail(res, 400, 'Cần moduleId và lesson{id,title,...}.');
        const errR = validateRubric(b.lesson.rubric || []); if (errR) return fail(res, 400, errR);
        db.prepare('INSERT INTO custom_lessons(id,module_id,data,created_by,created) VALUES(?,?,?,?,?)').run(b.lesson.id, b.moduleId, JSON.stringify(b.lesson), a.user.id, now());
        db.prepare('INSERT INTO lesson_state(lesson_id,status,updated_by,updated) VALUES(?,?,?,?)').run(b.lesson.id, 'draft', a.user.id, now());
        audit(a.user.id, 'admin.lesson_create', b.lesson.id, b.moduleId);
        return send(res, 201, { ok: true, note: 'Bài mới ở trạng thái draft — rà soát rồi mới publish.' });
      }
      return fail(res, 404, 'Admin endpoint không tồn tại.');
    }
    if (path.startsWith('/api/')) return fail(res, 404, 'API không tồn tại.');
    // ----- static -----
    const file = path === '/' ? 'index.html' : path.slice(1);
    if (file.includes('..')) return fail(res, 400, 'bad path');
    const fp = join(ROOT, 'public', file);
    if (existsSync(fp) && !fp.endsWith('/')) return send(res, 200, readFileSync(fp), MIME[extname(fp)] || 'application/octet-stream');
    return send(res, 200, readFileSync(join(ROOT, 'public', 'index.html')), MIME['.html']);
  } catch (e) {
    if (e.message === 'TOO_LARGE') return fail(res, 413, 'Dữ liệu quá lớn.');
    if (e.message === 'BAD_JSON') return fail(res, 400, 'JSON không hợp lệ.');
    console.error(e); return fail(res, 500, 'Lỗi server: ' + e.message);
  }
});
server.listen(PORT, () => console.log('DrawPath AI listening on http://localhost:' + PORT));
