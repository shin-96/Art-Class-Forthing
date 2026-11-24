// E2E smoke over real HTTP against a spawned server (flows A, C, D, F, G of TEST_CASES.md).
// Usage: node test/e2e.mjs  — starts server on PORT 4179 with the repo's dev DB.
import { spawn } from 'node:child_process';
const BASE = 'http://localhost:4179';
const wait = (ms) => new Promise(r => setTimeout(r, ms));
let pass = 0, failCount = 0;
const check = (name, cond, extra = '') => { if (cond) { pass++; console.log('PASS', name); } else { failCount++; console.log('FAIL', name, extra); } };

async function call(path, { method = 'GET', body, cookie, csrf } = {}) {
  const r = await fetch(BASE + path, { method, headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}), ...(csrf ? { 'x-csrf': csrf } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const setCookie = r.headers.get('set-cookie');
  let data = null; try { data = await r.json(); } catch {}
  return { status: r.status, data, cookie: setCookie ? setCookie.split(';')[0] : cookie };
}
const lineStroke = (jitter = 0) => [{ id: 's1', layerId: 'layer-1', tool: 'pencil', color: '#242424', width: 5, opacity: 1, points: Array.from({ length: 41 }, (_, i) => ({ x: 150 + i * 17.5, y: 500 + (jitter ? Math.sin(i * 2.7) * jitter : 0), t: i * 30, p: 0.5 })) }];

const srv = spawn('node', ['server/main.mjs'], { cwd: new URL('..', import.meta.url).pathname, env: { ...process.env, PORT: '4179' }, stdio: 'pipe' });
try {
  for (let i = 0; i < 40; i++) { try { const h = await call('/api/health'); if (h.status === 200) break; } catch {} await wait(300); }
  const health = await call('/api/health');
  check('health 200 + có số bài học', health.status === 200 && health.data.lessons >= 75, JSON.stringify(health.data));
  const email = 'e2e' + Date.now() + '@test.local';
  const reg = await call('/api/auth/register', { method: 'POST', body: { email, password: 'Test12345!', name: 'E2E User' } });
  check('register 201', reg.status === 201, JSON.stringify(reg.data));
  const dup = await call('/api/auth/register', { method: 'POST', body: { email, password: 'Test12345!', name: 'Dup' } });
  check('register trùng email -> 409', dup.status === 409);
  const badLogin = await call('/api/auth/login', { method: 'POST', body: { email, password: 'sai-mat-khau' } });
  check('login sai -> 401', badLogin.status === 401);
  const login = await call('/api/auth/login', { method: 'POST', body: { email, password: 'Test12345!' } });
  check('login 200 + csrf', login.status === 200 && !!login.data.csrf);
  const A = { cookie: login.cookie, csrf: login.data.csrf };
  const me = await call('/api/auth/me', A);
  check('me 200', me.status === 200 && me.data.user.email === email);
  const noCsrf = await call('/api/profile', { method: 'PUT', body: { goal: 'x' }, cookie: A.cookie });
  check('mutation thiếu CSRF -> 403', noCsrf.status === 403);
  const prof = await call('/api/profile', { method: 'PUT', body: { goal: 'foundation', level: 'zero', method: 'digital', minutes: 30, onboarded: true }, ...A });
  check('onboarding lưu 200', prof.status === 200);
  const curr = await call('/api/curriculum', A);
  const modules = curr.data.modules;
  check('curriculum >= 11 module/track groups', modules.length >= 15, 'groups=' + modules.length);
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  check('curriculum >= 75 bài', totalLessons >= 75, 'lessons=' + totalLessons);
  const lineLesson = modules.flatMap(m => m.lessons).find(l => l.exercise?.assessType === 'line') || modules[1].lessons[0];
  const demo = await call('/api/lessons/' + lineLesson.id + '/demo', A);
  check('demo strokes có thật', demo.status === 200 && demo.data.strokes.length >= 1 && demo.data.strokes[0].points.length > 10);
  // Flow D: project save/load + version conflict
  const prj = await call('/api/projects', { method: 'POST', body: { lessonId: lineLesson.id, title: 'E2E project', data: { layers: [{ id: 'layer-1', name: 'L1', visible: true, locked: false }], strokes: lineStroke() } }, ...A });
  check('project create 201', prj.status === 201);
  const saved = await call('/api/projects/' + prj.data.id, { method: 'PUT', body: { data: { layers: [], strokes: lineStroke() }, version: 1 }, ...A });
  check('project save v1 -> v2', saved.status === 200 && saved.data.version === 2);
  const conflict = await call('/api/projects/' + prj.data.id, { method: 'PUT', body: { data: {}, version: 1 }, ...A });
  check('project version conflict -> 409', conflict.status === 409);
  // Flow A: submit good line -> scored; submit bad line -> lower
  const sub1 = await call('/api/submissions', { method: 'POST', body: { lessonId: lineLesson.id, source: 'canvas', strokes: lineStroke(0), clientKey: 'e2e-1-' + Date.now() }, ...A });
  check('submit canvas 201 + có điểm', sub1.status === 201 && typeof sub1.data.assessment?.overall === 'number', JSON.stringify(sub1.data).slice(0, 300));
  const sub2 = await call('/api/submissions', { method: 'POST', body: { lessonId: lineLesson.id, source: 'canvas', strokes: lineStroke(60), clientKey: 'e2e-2-' + Date.now() }, ...A });
  check('nét lệch điểm thấp hơn nét tốt', sub2.status === 201 && sub2.data.assessment.overall < sub1.data.assessment.overall, `good=${sub1.data.assessment?.overall} bad=${sub2.data.assessment?.overall}`);
  const dupSub = await call('/api/submissions', { method: 'POST', body: { lessonId: lineLesson.id, source: 'canvas', strokes: lineStroke(0), clientKey: sub1.data.submission ? undefined : 'x' }, ...A });
  const detail = await call('/api/submissions/' + sub1.data.submission.id, A);
  check('submission detail có criteria + annotations/corrections', detail.status === 200 && detail.data.assessments[0].criteria.length >= 3);
  check('assessment có corrections để vẽ lớp sửa', Array.isArray(detail.data.assessments[0].corrections));
  const dash = await call('/api/dashboard', A);
  check('dashboard có mastery + recommendations', dash.status === 200 && Array.isArray(dash.data.mastery) && dash.data.mastery.length === 10);
  const tutor = await call('/api/tutor', { method: 'POST', body: { lessonId: lineLesson.id, question: 'vì sao nét của em bị lệch?' }, ...A });
  check('tutor trả lời (live hoặc local fallback có ghi chế độ)', tutor.status === 200 && !!tutor.data.answer && !!tutor.data.mode);
  // Flow C: upload fake image rejected by magic bytes
  const fake = await call('/api/submissions', { method: 'POST', body: { lessonId: lineLesson.id, source: 'upload', imageData: Buffer.from('not an image').toString('base64'), imageMetrics: { darkRatio: 0.1, edgeDensity: 0.1 } }, ...A });
  check('upload file giả -> 415', fake.status === 415, 'status=' + fake.status);
  const emptySub = await call('/api/submissions', { method: 'POST', body: { lessonId: lineLesson.id, source: 'canvas', strokes: [] }, ...A });
  check('submit canvas rỗng -> 400', emptySub.status === 400);
  // Flow F: IDOR — user B cannot read A's submission/project, cannot call admin
  const emailB = 'e2eb' + Date.now() + '@test.local';
  await call('/api/auth/register', { method: 'POST', body: { email: emailB, password: 'Test12345!', name: 'User B' } });
  const loginB = await call('/api/auth/login', { method: 'POST', body: { email: emailB, password: 'Test12345!' } });
  const B = { cookie: loginB.cookie, csrf: loginB.data.csrf };
  const idor1 = await call('/api/submissions/' + sub1.data.submission.id, B);
  check('IDOR submission người khác -> 403', idor1.status === 403, 'status=' + idor1.status);
  const idor2 = await call('/api/projects/' + prj.data.id, B);
  check('IDOR project người khác -> 403', idor2.status === 403);
  const adm = await call('/api/admin/overview', B);
  check('learner gọi admin API -> 403', adm.status === 403);
  const unauth = await call('/api/dashboard');
  check('chưa đăng nhập gọi dashboard -> 401', unauth.status === 401);
  // revision: submit v2 with parentId keeps original
  const rev = await call('/api/submissions', { method: 'POST', body: { lessonId: lineLesson.id, source: 'canvas', strokes: lineStroke(5), parentId: sub1.data.submission.id, clientKey: 'e2e-rev-' + Date.now() }, ...A });
  check('revision v2 được tạo, bản gốc giữ nguyên', rev.status === 201 && rev.data.submission.version === 2 && rev.data.submission.parent_id === sub1.data.submission.id);
  const orig = await call('/api/submissions/' + sub1.data.submission.id, A);
  check('bản gốc vẫn version 1 sau revision', orig.data.submission.version === 1);
  console.log(`\nE2E: ${pass} PASS, ${failCount} FAIL`);
  process.exitCode = failCount ? 1 : 0;
} finally { srv.kill(); }
