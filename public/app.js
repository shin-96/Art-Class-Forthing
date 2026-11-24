'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let ME = null, CSRF = null, CURR = null;
async function api(path, opts = {}) {
  const r = await fetch(path, { headers: { 'Content-Type': 'application/json', ...(CSRF && opts.method && opts.method !== 'GET' ? { 'x-csrf': CSRF } : {}) }, ...opts, body: opts.body ? JSON.stringify(opts.body) : undefined });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || ('HTTP ' + r.status));
  return data;
}
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3200); }
async function refreshMe() {
  try { const d = await api('/api/auth/me'); ME = d.user; CSRF = d.csrf; ME.profile = d.profile; } catch { ME = null; CSRF = null; }
  $$('#userbox')[0].innerHTML = ME
    ? `<span class="small">Xin chào, <strong>${esc(ME.name)}</strong> (${esc(ME.role)})</span> <a class="btn ghost small" href="#/settings">Cài đặt</a> <button class="btn small" id="logoutBtn">Đăng xuất</button>`
    : `<a class="btn ghost" href="#/login">Đăng nhập</a><a class="btn solid" href="#/register">Bắt đầu học</a>`;
  $$('[data-auth]').forEach(e => e.classList.toggle('hidden', !ME));
  $$('[data-admin]').forEach(e => e.classList.toggle('hidden', !(ME && (ME.role === 'admin' || ME.role === 'instructor'))));
  const lb = $('#logoutBtn'); if (lb) lb.onclick = async () => { await api('/api/auth/logout', { method: 'POST', body: {} }); await refreshMe(); location.hash = '#/'; };
}
const stateChip = (st, score) => st === 'completed' ? `<span class="chip done">Đã hoàn thành${score ? ' · ' + score + 'đ' : ''}</span>` : st === 'in_progress' ? '<span class="chip warn">Đang học</span>' : '<span class="chip">Chưa học</span>';
const masteryChip = (m) => m.score === null ? '<span class="chip">Chưa có bằng chứng</span>' : `<span class="chip ${m.state === 'Mastered' ? 'done' : m.state === 'Needs Practice' ? 'bad' : ''}">${esc(m.name)}: ${m.score}đ · ${esc(m.state)} (${m.evidenceCount} bài)</span>`;

// ---------------- LANDING ----------------
async function vLanding(app) {
  const health = await api('/api/health').catch(() => ({}));
  app.innerHTML = `
  <section class="hero">
    <div>
      <p class="kicker">Học viện vẽ trực tuyến · Gia sư AI</p>
      <h1>Học vẽ từ con số 0, có người chỉ đúng lỗi của bạn.</h1>
      <p>DrawPath AI dẫn bạn qua lộ trình ${health.lessons || '75+'} bài từ kiểm soát nét, hình khối, phối cảnh tới chân dung và digital painting. Bạn vẽ trên bảng vẽ thật hoặc chụp bài giấy nộp lên — hệ thống chấm theo rubric, khoanh đúng vị trí lỗi và vẽ lớp hướng dẫn sửa đè lên bài của bạn.</p>
      <p><a class="btn solid" href="#/register">Bắt đầu học miễn phí</a> <a class="btn" href="#/roadmap">Khám phá lộ trình</a> <a class="btn ghost" href="#/studio">Thử bảng vẽ (khách)</a></p>
      <p class="small muted">Chu trình học: Learn → Observe → Practice → Analyze → Correct → Improve → Master</p>
    </div>
    <div class="sketch" aria-hidden="true">
      <svg viewBox="0 0 400 300" width="100%" class="draw-anim">
        <rect x="90" y="90" width="150" height="150" fill="none" stroke="#41403E" stroke-width="3"/>
        <path d="M90 90 L150 40 L300 40 L240 90" fill="none" stroke="#41403E" stroke-width="3"/>
        <path d="M240 90 L240 240 L300 190 L300 40 M150 40 L150 190 L90 240" fill="none" stroke="#A59ACB" stroke-width="3" stroke-dasharray="7 6"/>
        <line x1="20" y1="40" x2="380" y2="40" stroke="#D56B46" stroke-width="3"/>
        <circle cx="330" cy="40" r="6" fill="#D56B46"/>
        <text x="300" y="28" font-size="14" fill="#D56B46" font-family="sans-serif">điểm tụ</text>
      </svg>
      <p class="small muted" style="text-align:center">Minh họa: dựng khối hộp 2 điểm tụ — Bài M04 trong lộ trình</p>
    </div>
  </section>
  <section class="grid c3">
    ${[['1 · Học có lộ trình', '11 module nền tảng + 4 chuyên ngành, mỗi bài có mục tiêu, bài giảng từng bước và rubric rõ ràng trước khi vẽ.'], ['2 · Vẽ & nộp bài', 'Bảng vẽ có layers, undo/redo, phát lại nét vẽ — hoặc chụp ảnh bài vẽ trên giấy để nộp.'], ['3 · Chấm & chỉ lỗi', 'Engine hình học đo độ lệch nét, độ tròn ellipse, độ hội tụ phối cảnh… AI đa mô hình (chuỗi dự phòng free) bổ sung nhận xét định tính.'], ['4 · Sửa & tiến bộ', 'Xem lớp hướng dẫn sửa, vẽ lại, nộp lại — hệ thống so sánh các phiên bản và cập nhật bản đồ kỹ năng của bạn.']].map(x => `<div class="card"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}
  </section>
  <section style="margin-top:1.4rem"><h2>Câu hỏi thường gặp</h2>
    <div class="card"><p><strong>Tôi chưa từng vẽ có học được không?</strong><br>Được — Module 00 bắt đầu từ cách cầm bút và kiểm tra đầu vào là tùy chọn, không bắt buộc.</p>
    <p><strong>AI chấm có đáng tin không?</strong><br>Phần đo được bằng hình học (độ lệch, tỷ lệ, hội tụ) do thuật toán xác định chấm và hiển thị độ tin cậy; phần định tính ghi rõ khi chưa đủ dữ liệu thay vì bịa điểm. Xem AI_ASSESSMENT.md trong repo.</p>
    <p><strong>Bài vẽ của tôi có riêng tư không?</strong><br>Mặc định riêng tư — người khác không xem được bài, điểm hay ảnh của bạn (đã kiểm thử IDOR).</p></div>
  </section>`;
}
// ---------------- AUTH ----------------
function vAuth(app, mode) {
  app.innerHTML = `<form class="card" id="authForm"><h2>${mode === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'}</h2>
    <div id="formErr"></div>
    ${mode === 'register' ? '<label>Họ tên</label><input name="name" required autocomplete="name">' : ''}
    <label>Email</label><input name="email" type="email" required autocomplete="email">
    <label>Mật khẩu</label><input name="password" type="password" required minlength="8" autocomplete="${mode === 'login' ? 'current-password' : 'new-password'}">
    <p style="margin-top:1rem"><button class="btn solid" style="width:100%">${mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}</button></p>
    <p class="small">${mode === 'login' ? 'Chưa có tài khoản? <a href="#/register">Đăng ký</a> · <a href="#" id="forgotLink">Quên mật khẩu</a>' : 'Đã có tài khoản? <a href="#/login">Đăng nhập</a>'}</p>
    ${mode === 'login' ? '<p class="small muted">Tài khoản quản trị bản local: admin@drawpath.local / Admin123! (đổi trong .env trước khi dùng thật).</p>' : ''}</form>`;
  $('#authForm').onsubmit = async (e) => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.target));
    try {
      if (mode === 'register') { await api('/api/auth/register', { method: 'POST', body: fd }); toast('Đã tạo tài khoản — mời đăng nhập'); location.hash = '#/login'; }
      else { await api('/api/auth/login', { method: 'POST', body: fd }); await refreshMe(); location.hash = ME.profile && ME.profile.onboarded ? '#/dashboard' : '#/onboarding'; }
    } catch (err) { $('#formErr').innerHTML = `<div class="error">${esc(err.message)}</div>`; }
  };
  const fl = $('#forgotLink'); if (fl) fl.onclick = async (ev) => { ev.preventDefault(); const email = $('input[name=email]').value; if (!email) return toast('Nhập email trước đã'); const r = await api('/api/auth/forgot', { method: 'POST', body: { email } }); toast(r.note); };
}
// ---------------- ONBOARDING ----------------
async function vOnboarding(app) {
  if (!ME) return location.hash = '#/login';
  const curr = await api('/api/curriculum');
  const first = curr.modules[0]?.lessons[0];
  app.innerHTML = `<form class="card" id="obForm" style="max-width:640px"><h2>Thiết lập hành trình của bạn</h2>
    <label>Mục tiêu học tập</label><select name="goal"><option value="foundation">Nền tảng vững từ đầu</option><option value="portrait">Vẽ chân dung</option><option value="anime">Anime & Manga</option><option value="landscape">Phong cảnh & môi trường</option><option value="digital">Digital painting</option><option value="hobby">Vẽ cho vui, thư giãn</option></select>
    <label>Trình độ tự đánh giá</label><select name="level"><option value="zero">Chưa từng vẽ</option><option value="basic">Biết vẽ chút ít</option><option value="intermediate">Đã vẽ được vật thể đơn giản</option><option value="advanced">Khá vững, muốn chuyên sâu</option></select>
    <label>Phương thức vẽ chính</label><select name="method"><option value="paper">Giấy + bút chì (chụp ảnh nộp bài)</option><option value="digital">Bảng vẽ số / chuột trên web này</option><option value="both">Cả hai</option></select>
    <label>Thời gian luyện mỗi ngày (phút)</label><input name="minutes" type="number" min="5" max="480" value="30">
    <p class="small muted">Kiểm tra đầu vào là <strong>tùy chọn</strong>: bạn có thể làm bài đầu tiên «${esc(first?.title || '')}» để hệ thống gợi ý điểm bắt đầu, hoặc bỏ qua và học tự do. Một bài kiểm tra ngắn không xác định chính xác toàn bộ năng lực của bạn.</p>
    <p><button class="btn solid">Lưu & xem lộ trình</button> <a class="btn ghost" href="#/lesson/${esc(first?.id || '')}">Làm bài đầu vào ngay</a></p></form>`;
  $('#obForm').onsubmit = async (e) => { e.preventDefault(); const fd = Object.fromEntries(new FormData(e.target)); fd.minutes = Number(fd.minutes); fd.onboarded = true; await api('/api/profile', { method: 'PUT', body: fd }); await refreshMe(); toast('Đã lưu hồ sơ học tập'); location.hash = '#/dashboard'; };
}
// ---------------- DASHBOARD ----------------
async function vDashboard(app) {
  if (!ME) return location.hash = '#/login';
  const d = await api('/api/dashboard');
  const doneCount = d.progress.filter(p => p.state === 'completed').length;
  app.innerHTML = `<h2>Dashboard của ${esc(ME.name)}</h2>
  <div class="grid c2">
    <div class="card"><h3>Tiếp tục học</h3>
      ${d.recommendations.length ? d.recommendations.slice(0, 3).map(r => `<div class="lesson-row"><div><strong>${esc(r.title)}</strong><br><span class="small muted">${esc(r.module)} — ${esc(r.reason)}</span>${r.prereqWarning.length ? `<br><span class="chip warn">Thiếu tiên quyết: ${r.prereqWarning.length} bài</span>` : ''}</div><a class="btn small solid" href="#/lesson/${esc(r.lessonId)}">Học</a></div>`).join('') : '<p>Bạn đã hoàn thành mọi bài đã xuất bản. 🎉</p>'}
      <p class="small">Đã hoàn thành ${doneCount} bài · <a href="#/roadmap">Xem toàn bộ lộ trình</a></p></div>
    <div class="card"><h3>Hồ sơ kỹ năng</h3><p>${d.mastery.map(masteryChip).join(' ')}</p>
      ${d.weakSkills.length ? `<p><strong>Cần ôn:</strong> ${d.weakSkills.map(w => esc(w.name)).join(', ')}</p>` : '<p class="muted small">Chưa có kỹ năng nào dưới 60 điểm.</p>'}</div>
  </div>
  <div class="card" style="margin-top:1rem"><h3>Bài nộp gần đây</h3>
    ${d.recentSubmissions.length ? `<table><tr><th>Bài</th><th>Nguồn</th><th>Phiên bản</th><th>Điểm</th><th></th></tr>${d.recentSubmissions.map(s => `<tr><td>${esc(s.lesson_id)}</td><td>${s.source === 'upload' ? 'Ảnh chụp' : 'Bảng vẽ'}</td><td>v${s.version}</td><td>${s.overall ?? '—'}</td><td><a href="#/result/${esc(s.id)}">Xem kết quả</a></td></tr>`).join('')}</table>` : '<p class="muted">Chưa nộp bài nào. Chọn một bài trong lộ trình để bắt đầu.</p>'}
  </div>`;
}
// ---------------- ROADMAP ----------------
async function vRoadmap(app) {
  const curr = await api('/api/curriculum');
  const skillName = Object.fromEntries(curr.skills.map(s => [s.id, s.name]));
  app.innerHTML = `<h2>Lộ trình học vẽ</h2><p class="muted">Học theo lộ trình chuẩn hoặc tự do — bài bị thiếu tiên quyết vẫn mở được, hệ thống chỉ cảnh báo. Quan hệ kỹ năng: ${curr.skillPrereqs.slice(0, 6).map(p => `${esc(skillName[p.prereq] || p.prereq)} → ${esc(skillName[p.skill] || p.skill)}`).join(' · ')}…</p>` +
    curr.modules.map(m => `<section class="card" style="margin-top:1rem"><div class="module-head"><span class="chip">${m.isTrack ? 'Chuyên ngành' : 'Module ' + esc(m.code || '')}</span><h3 style="margin:0">${esc(m.title)}</h3></div>
      <p>${esc(m.description || '')}</p>
      ${m.lessons.map(l => { const p = curr.progress[l.id]; return `<div class="lesson-row"><div><a href="#/lesson/${esc(l.id)}"><strong>${esc(l.title)}</strong></a> <span class="small muted">· ${l.minutes} phút · độ khó ${l.difficulty}/5 · ${(l.skills || []).map(s => esc(skillName[s] || s)).join(', ')}</span><br><span class="small">${esc(l.summary || '')}</span></div><div>${stateChip(p?.state, p?.best_score)} <a class="btn small" href="#/studio/${esc(l.id)}">Vẽ</a></div></div>`; }).join('')}
    </section>`).join('');
}

// ---------------- LESSON ----------------
async function vLesson(app, id) {
  const d = await api('/api/lessons/' + id);
  const l = d.lesson;
  CURR = await api('/api/curriculum').catch(() => CURR);
  const skillName = Object.fromEntries((CURR?.skills || []).map(s => [s.id, s.name]));
  app.innerHTML = `<p><a href="#/roadmap">← Lộ trình</a> · ${esc(d.module.title)}</p>
  <h2>${esc(l.title)}</h2>
  ${d.prereqWarning.length ? `<div class="error" style="background:#fdf0d5;border-color:var(--warn);color:var(--warn)">Cảnh báo tiên quyết: bạn chưa hoàn thành ${d.prereqWarning.length} bài nên học trước (${d.prereqWarning.map(esc).join(', ')}). Vẫn học được bài này, nhưng có thể gặp khó ở phần liên quan.</div>` : ''}
  <p>${esc(l.summary || '')}</p>
  <p>${(l.skills || []).map(s => `<span class="chip">${esc(skillName[s] || s)}</span>`).join(' ')} <span class="chip">${l.minutes} phút</span> <span class="chip">Độ khó ${l.difficulty}/5</span> <span class="chip">Đạt: ≥ ${l.passScore || 70}đ</span></p>
  <div class="grid c2">
    <div class="card"><h3>Mục tiêu đo lường được</h3><ul>${(l.objectives || []).map(o => `<li>${esc(o)}</li>`).join('')}</ul>
      <h3>Lý thuyết</h3><p>${esc(l.theory || '')}</p>
      <h3>Các lỗi thường gặp</h3>${(l.mistakes || []).map(m => `<p><strong>${esc(m.error)}</strong><br><span class="small">Nguyên nhân: ${esc(m.cause)}<br>Cách sửa: ${esc(m.fix)}</span></p>`).join('')}</div>
    <div>
      <div class="card"><h3>Thao tác mẫu (phát lại nét thật)</h3>
        <div class="canvas-wrap"><canvas id="demoBoard" width="1000" height="1000" aria-label="Bảng phát lại thao tác mẫu"></canvas></div>
        <p class="small muted">${esc(l.demo?.note || '')}</p>
        <p><button class="btn small" id="demoPlay">▶ Phát lại</button> <button class="btn small ghost" id="demoGuide">Hiện đường mẫu vào bài vẽ</button></p>
        <h3>Hướng dẫn từng bước</h3><ol class="steps">${(l.steps || []).map(s => `<li>${esc(s)}</li>`).join('')}</ol></div>
      <div class="card" style="margin-top:1rem"><h3>Bài thực hành</h3><p>${esc(l.exercise?.prompt || '')}</p>
        <p class="small">Chế độ: ${esc(l.exercise?.mode || 'independent')} · Cách chấm: ${esc(l.exercise?.assessType || 'free')}</p>
        <table><tr><th>Tiêu chí</th><th>Trọng số</th><th>Phương pháp</th></tr>${(l.exercise?.rubric || l.rubric || []).map(r => `<tr><td>${esc(r.name)}</td><td>${r.weight}%</td><td>${esc(r.method)}</td></tr>`).join('')}</table>
        <p style="margin-top:.8rem"><a class="btn solid" href="#/studio/${esc(l.id)}">Mở bảng vẽ & nộp bài</a> <a class="btn" href="#/upload/${esc(l.id)}">Chụp/nộp ảnh bài giấy</a></p></div>
      <div class="card" style="margin-top:1rem"><h3>Hỏi gia sư AI</h3>
        <div class="chat" id="tutorChat"><div class="msg ai">Hỏi mình về bài này — ví dụ: “vì sao khối hộp của em bị méo?”</div></div>
        <p style="display:flex;gap:.5rem"><input id="tutorQ" placeholder="Câu hỏi của bạn…" aria-label="Câu hỏi cho gia sư"><button class="btn small solid" id="tutorSend">Hỏi</button></p>
        <p class="small muted" id="tutorMode"></p></div>
    </div>
  </div>`;
  const demo = await api('/api/lessons/' + id + '/demo');
  const board = new DrawingBoard($('#demoBoard'));
  board.load({ layers: [{ id: 'demo', name: 'Mẫu', visible: true, locked: false }], strokes: demo.strokes });
  board.strokes.forEach(s => s.layerId = 'demo');
  $('#demoPlay').onclick = () => board.replay(1);
  $('#demoGuide').onclick = () => { sessionStorage.setItem('guideLesson', id); location.hash = '#/studio/' + id; };
  const sendTutor = async () => {
    const q = $('#tutorQ').value.trim(); if (!q) return;
    if (!ME) return toast('Đăng nhập để hỏi gia sư (câu trả lời được cá nhân hóa theo bài chấm của bạn)');
    const chat = $('#tutorChat');
    chat.insertAdjacentHTML('beforeend', `<div class="msg user">${esc(q)}</div><div class="msg ai" id="tutorWait">Đang suy nghĩ…</div>`);
    $('#tutorQ').value = '';
    try { const r = await api('/api/tutor', { method: 'POST', body: { lessonId: id, question: q } }); $('#tutorWait').textContent = r.answer; $('#tutorMode').textContent = 'Chế độ: ' + (r.mode === 'live-ai' ? 'AI trực tiếp (' + r.provider + ')' : 'gia sư cục bộ theo dữ liệu bài học (chưa có AI key hoặc mọi provider free đang bận)'); }
    catch (e) { $('#tutorWait').textContent = 'Lỗi: ' + e.message; }
    chat.scrollTop = chat.scrollHeight;
  };
  $('#tutorSend').onclick = sendTutor;
  $('#tutorQ').addEventListener('keydown', e => { if (e.key === 'Enter') sendTutor(); });
}
// ---------------- STUDIO ----------------
let board = null, studioLesson = null, projectId = null, saveTimer = null;
async function vStudio(app, lessonId) {
  studioLesson = lessonId || null;
  let lesson = null, target = null;
  if (lessonId) { const d = await api('/api/lessons/' + lessonId); lesson = d.lesson; target = lesson.exercise?.target; }
  app.innerHTML = `<h2>Bảng vẽ ${lesson ? '— ' + esc(lesson.title) : 'tự do'}</h2>
  ${lesson ? `<p class="small">${esc(lesson.exercise?.prompt || '')} <a href="#/lesson/${esc(lessonId)}">Xem lại bài giảng</a></p>` : '<p class="small muted">Chế độ vẽ tự do (khách: bản vẽ chỉ lưu trên máy này; đăng nhập để lưu server & nộp bài).</p>'}
  <div class="toolbar" role="toolbar" aria-label="Công cụ vẽ">
    ${[['pencil', '✏️ Chì'], ['brush', '🖌 Cọ'], ['eraser', '🧽 Tẩy'], ['pan', '✋ Kéo']].map(t => `<button class="toolbtn ${t[0] === 'pencil' ? 'active' : ''}" data-tool="${t[0]}">${t[1]}</button>`).join('')}
    <span class="sep"></span><label class="small" style="margin:0">Màu <input type="color" id="tColor" value="#242424"></label>
    <label class="small" style="margin:0">Cỡ <input type="range" id="tSize" min="1" max="60" value="5"> <span id="tSizeV">5</span></label>
    <label class="small" style="margin:0">Mờ <input type="range" id="tOpacity" min="10" max="100" value="100"></label>
    <span class="sep"></span>
    <button class="toolbtn" id="bUndo">↩ Undo</button><button class="toolbtn" id="bRedo">↪ Redo</button>
    <button class="toolbtn" id="bZoomOut">−</button><span id="zoomV" class="small">100%</span><button class="toolbtn" id="bZoomIn">+</button><button class="toolbtn" id="bFit">Fit</button>
    <button class="toolbtn" id="bGuide">Đường mẫu</button><button class="toolbtn" id="bReplay">▶ Replay</button>
    <span class="sep"></span>
    <button class="toolbtn" id="bSave">💾 Lưu</button><button class="toolbtn" id="bExport">⬇ PNG</button><button class="toolbtn danger" id="bClear">Xóa hết</button>
    <span class="small muted" id="saveState"></span>
  </div>
  <div class="studio-layout" style="margin-top:1rem">
    <aside class="card"><h3>Lớp (Layers)</h3><div id="layerList"></div>
      <p><button class="btn small" id="bAddLayer">+ Thêm lớp</button></p>
      <h3>Ảnh tham chiếu</h3><input type="file" id="refFile" accept="image/*">
      <label class="small">Độ mờ ảnh mẫu <input type="range" id="refOpacity" min="5" max="100" value="50"></label>
      <h3>Dự án của tôi</h3><div id="projList" class="small"></div></aside>
    <div class="canvas-wrap"><canvas id="board" width="1000" height="1000" aria-label="Bảng vẽ chính"></canvas></div>
    <aside class="card"><h3>${lesson ? 'Nộp bài' : 'Hướng dẫn'}</h3>
      ${lesson ? `<label>Ghi chú cho bài nộp</label><textarea id="subNote" rows="2" placeholder="Bạn muốn gia sư chú ý điều gì?"></textarea>
      <label>Chế độ thực hành</label><select id="subMode"><option value="guided">Guided — có gợi ý</option><option value="assisted">Assisted — ít gợi ý</option><option value="independent" selected>Independent — tự làm</option></select>
      <p><button class="btn solid" id="bSubmit" style="width:100%">Nộp bài để chấm</button></p>
      <p class="small muted">Chấm bằng engine hình học trên dữ liệu nét thật của bạn + nhận xét định tính nếu có AI key.</p>`
      : '<p class="small">Chọn một bài trong <a href="#/roadmap">lộ trình</a> để nộp bài và được chấm. Vẽ tự do vẫn lưu được khi đã đăng nhập.</p>'}
      <h3>Phím tắt</h3><p class="small">Giữ Space + kéo: pan · Lăn chuột: zoom · Ctrl+Z/Y: qua nút Undo/Redo</p></aside>
  </div>`;
  board = new DrawingBoard($('#board'), { onChange: scheduleAutosave });
  // restore draft / guide
  const draftKey = 'dp_draft_' + (lessonId || 'free');
  const draft = localStorage.getItem(draftKey);
  if (draft) { try { board.load(JSON.parse(draft)); toast('Đã khôi phục bản nháp trên máy này'); } catch {} }
  let guideOn = !!target; // mặc định hiện đường mẫu khi bài có target — học viên biết phải vẽ gì
  const applyGuide = () => {
    if (!target) return;
    const g = [];
    const tLine = target.line || (typeof target.x1 === 'number' ? { x1: target.x1, y1: target.y1, x2: target.x2, y2: target.y2 } : null);
    const tEllipse = target.ellipse || (typeof target.cx === 'number' ? { cx: target.cx, cy: target.cy, rx: target.rx, ry: target.ry } : null);
    const tRect = target.rect || (typeof target.x === 'number' && typeof target.w === 'number' ? { x: target.x, y: target.y, w: target.w, h: target.h } : null);
    if (tLine) g.push({ kind: 'line', ...tLine });
    if (tEllipse) g.push({ kind: 'ellipse', ...tEllipse });
    if (tRect) g.push({ kind: 'rect', ...tRect });
    if (typeof target.horizon === 'number') g.push({ kind: 'line', x1: 40, y1: target.horizon, x2: 960, y2: target.horizon });
    if (target.vp && typeof target.vp.x === 'number') g.push({ kind: 'point', x: target.vp.x, y: target.vp.y });
    board.guides = guideOn ? g : null; board.render();
  };
  applyGuide();
  const renderLayers = () => {
    $('#layerList').innerHTML = board.layers.map(l => `<div class="layer-row ${l.id === board.activeLayer ? 'active' : ''}" data-layer="${l.id}">
      <button class="toolbtn small" data-act="pick" title="Chọn lớp">${l.id === board.activeLayer ? '●' : '○'}</button>
      <input value="${esc(l.name)}" data-act="name" style="padding:.2rem" aria-label="Tên lớp">
      <button class="toolbtn small" data-act="vis" title="Ẩn/hiện">${l.visible ? '👁' : '🚫'}</button>
      <button class="toolbtn small" data-act="lock" title="Khóa">${l.locked ? '🔒' : '🔓'}</button>
      <button class="toolbtn small" data-act="del" title="Xóa lớp">✕</button></div>`).join('');
    $$('#layerList .layer-row').forEach(row => {
      const id = row.dataset.layer;
      row.addEventListener('click', (e) => {
        const act = e.target.dataset.act; const layer = board.layers.find(l => l.id === id);
        if (act === 'pick') { board.activeLayer = id; renderLayers(); }
        if (act === 'vis') { layer.visible = !layer.visible; board.render(); renderLayers(); }
        if (act === 'lock') { layer.locked = !layer.locked; renderLayers(); }
        if (act === 'del' && confirm('Xóa lớp và toàn bộ nét trên lớp này?')) { if (!board.deleteLayer(id)) toast('Phải giữ ít nhất 1 lớp'); renderLayers(); }
      });
      row.querySelector('[data-act=name]').addEventListener('change', (e) => { board.layers.find(l => l.id === id).name = e.target.value; });
    });
  };
  renderLayers();
  $$('.toolbtn[data-tool]').forEach(b => b.onclick = () => { board.tool = b.dataset.tool; $$('.toolbtn[data-tool]').forEach(x => x.classList.toggle('active', x === b)); });
  $('#tColor').oninput = e => board.color = e.target.value;
  $('#tSize').oninput = e => { board.size = Number(e.target.value); $('#tSizeV').textContent = e.target.value; };
  $('#tOpacity').oninput = e => board.opacity = Number(e.target.value) / 100;
  $('#bUndo').onclick = () => board.undo(); $('#bRedo').onclick = () => board.redo();
  $('#bZoomIn').onclick = () => { board.zoom = Math.min(4, board.zoom * 1.2); $('#zoomV').textContent = Math.round(board.zoom * 100) + '%'; board.render(); };
  $('#bZoomOut').onclick = () => { board.zoom = Math.max(0.25, board.zoom / 1.2); $('#zoomV').textContent = Math.round(board.zoom * 100) + '%'; board.render(); };
  $('#bFit').onclick = () => { board.fit(); $('#zoomV').textContent = '100%'; };
  $('#bGuide').onclick = () => { guideOn = !guideOn; applyGuide(); };
  $('#bReplay').onclick = () => board.replay(1);
  $('#bClear').onclick = () => { if (confirm('Xóa toàn bộ nét vẽ? (vẫn Undo được)')) board.clear(); };
  $('#bAddLayer').onclick = () => { board.addLayer(); renderLayers(); };
  $('#bExport').onclick = () => { const a = document.createElement('a'); a.href = board.exportPNG(); a.download = 'drawpath-' + Date.now() + '.png'; a.click(); };
  $('#refFile').onchange = (e) => { const f = e.target.files[0]; if (!f) return; const img = new Image(); img.onload = () => { board.reference = img; board.render(); }; img.src = URL.createObjectURL(f); };
  $('#refOpacity').oninput = e => { board.referenceOpacity = Number(e.target.value) / 100; board.render(); };
  async function refreshProjects() {
    if (!ME) { $('#projList').innerHTML = '<span class="muted">Đăng nhập để lưu dự án lên server.</span>'; return; }
    const ps = await api('/api/projects');
    $('#projList').innerHTML = ps.length ? ps.map(p => `<div class="lesson-row"><span>${esc(p.title)}</span><span><button class="toolbtn small" data-open="${p.id}">Mở</button></span></div>`).join('') : '<span class="muted">Chưa có dự án.</span>';
    $$('#projList [data-open]').forEach(b => b.onclick = async () => { const p = await api('/api/projects/' + b.dataset.open); projectId = p.id; board.load(p.data); renderLayers(); toast('Đã mở dự án'); });
  }
  refreshProjects();
  async function saveProject(manual) {
    localStorage.setItem(draftKey, JSON.stringify(board.serialize()));
    if (!ME) { if (manual) toast('Đã lưu nháp trên máy này (đăng nhập để lưu server)'); return; }
    try {
      if (!projectId) { const r = await api('/api/projects', { method: 'POST', body: { lessonId, title: lesson ? lesson.title : 'Vẽ tự do', data: board.serialize() } }); projectId = r.id; }
      else await api('/api/projects/' + projectId, { method: 'PUT', body: { data: board.serialize() } });
      $('#saveState').textContent = 'Đã lưu ' + new Date().toLocaleTimeString('vi-VN');
      if (manual) toast('Đã lưu lên server');
    } catch (e) { $('#saveState').textContent = 'Lưu server lỗi: ' + e.message + ' (nháp máy này vẫn còn)'; }
  }
  function scheduleAutosave() { $('#saveState').textContent = 'Chưa lưu…'; clearTimeout(saveTimer); saveTimer = setTimeout(() => saveProject(false), 2500); }
  $('#bSave').onclick = () => saveProject(true);
  const sub = $('#bSubmit');
  if (sub) sub.onclick = async () => {
    if (!ME) return toast('Đăng nhập để nộp bài');
    if (!board.strokes.length) return toast('Hãy vẽ ít nhất một nét trước khi nộp');
    sub.disabled = true; sub.textContent = 'Đang chấm…';
    try {
      const r = await api('/api/submissions', { method: 'POST', body: { lessonId, source: 'canvas', strokes: board.visibleStrokes(), note: $('#subNote').value, mode: $('#subMode').value, clientKey: 'web-' + Date.now() } });
      location.hash = '#/result/' + r.submission.id;
    } catch (e) { toast(e.message); sub.disabled = false; sub.textContent = 'Nộp bài để chấm'; }
  };
}

// ---------------- UPLOAD (paper) ----------------
async function vUpload(app, lessonId) {
  if (!ME) return location.hash = '#/login';
  const d = await api('/api/lessons/' + lessonId);
  app.innerHTML = `<p><a href="#/lesson/${esc(lessonId)}">← ${esc(d.lesson.title)}</a></p><h2>Nộp ảnh bài vẽ trên giấy</h2>
  <div class="grid c2"><div class="card"><h3>Chọn ảnh</h3>
    <input type="file" id="upFile" accept="image/png,image/jpeg,image/webp">
    <p class="small muted">JPG/PNG/WebP, tối đa 8MB. Server kiểm tra magic bytes thật của file, không tin đuôi file.</p>
    <label>Xoay ảnh</label><p><button class="btn small" id="rotL">⟲ 90°</button> <button class="btn small" id="rotR">⟳ 90°</button></p>
    <label>Ghi chú</label><textarea id="upNote" rows="2"></textarea>
    <p><button class="btn solid" id="upSubmit" disabled>Nộp & chấm bài</button></p>
    <p class="small muted">Giới hạn trung thực: từ ảnh chụp tĩnh, hệ thống KHÔNG suy luận được thứ tự nét, tốc độ hay lực bút. Điểm cho bài upload dựa trên thống kê ảnh + AI thị giác (nếu có key) với độ tin cậy thấp hơn bài vẽ trên bảng.</p></div>
  <div class="card"><h3>Xem trước</h3><div class="anno-wrap"><canvas id="upPrev" width="1000" height="1000"></canvas></div><p class="small" id="upStats"></p></div></div>`;
  let img = null, rotation = 0, metrics = null, dataUrl = null;
  const draw = () => {
    const cv = $('#upPrev'), ctx = cv.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1000, 1000);
    if (!img) return;
    ctx.save(); ctx.translate(500, 500); ctx.rotate(rotation * Math.PI / 180);
    const s = Math.min(1000 / img.width, 1000 / img.height); ctx.drawImage(img, -img.width * s / 2, -img.height * s / 2, img.width * s, img.height * s); ctx.restore();
    // client-side image statistics (dark ratio, edge density, blur proxy) — measured, not guessed
    const px = ctx.getImageData(0, 0, 1000, 1000).data; let dark = 0, edge = 0, n = 0;
    for (let i = 0; i < px.length; i += 16) { const lum = (px[i] + px[i + 1] + px[i + 2]) / 3; if (lum < 110) dark++; if (Math.abs(lum - ((px[i + 4000] || lum) + (px[i + 4001] || lum) + (px[i + 4002] || lum)) / 3) > 28) edge++; n++; }
    metrics = { darkRatio: +(dark / n).toFixed(4), edgeDensity: +(edge / n).toFixed(4), blur: 0, width: img.width, height: img.height };
    $('#upStats').textContent = `Thống kê ảnh: tỉ lệ nét tối ${(metrics.darkRatio * 100).toFixed(1)}% · mật độ cạnh ${(metrics.edgeDensity * 100).toFixed(1)}% · ${img.width}×${img.height}px`;
    $('#upSubmit').disabled = false;
  };
  $('#upFile').onchange = (e) => { const f = e.target.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => { dataUrl = rd.result; img = new Image(); img.onload = draw; img.src = dataUrl; }; rd.readAsDataURL(f); };
  $('#rotL').onclick = () => { rotation -= 90; draw(); };
  $('#rotR').onclick = () => { rotation += 90; draw(); };
  $('#upSubmit').onclick = async () => {
    const btn = $('#upSubmit'); btn.disabled = true; btn.textContent = 'Đang chấm…';
    try { const r = await api('/api/submissions', { method: 'POST', body: { lessonId, source: 'upload', imageData: $('#upPrev').toDataURL('image/png'), imageMetrics: metrics, note: $('#upNote').value, clientKey: 'up-' + Date.now() } }); location.hash = '#/result/' + r.submission.id; }
    catch (e) { toast(e.message); btn.disabled = false; btn.textContent = 'Nộp & chấm bài'; }
  };
}
// ---------------- RESULT / FEEDBACK ----------------
async function vResult(app, subId) {
  if (!ME) return location.hash = '#/login';
  const d = await api('/api/submissions/' + subId);
  const s = d.submission, a = d.assessments[0];
  const lesson = await api('/api/lessons/' + s.lesson_id).catch(() => null);
  if (!a) { app.innerHTML = '<div class="card"><h2>Bài đang chờ chấm hoặc chấm thất bại</h2><p>Trạng thái: ' + esc(s.status) + '</p></div>'; return; }
  app.innerHTML = `<p><a href="#/dashboard">← Dashboard</a> · Bài nộp v${s.version}${d.revisionChain.length ? ' · sửa từ ' + d.revisionChain.length + ' phiên bản trước' : ''}</p>
  <div class="grid c2">
    <div><div class="anno-wrap"><canvas id="resBoard" width="1000" height="1000" aria-label="Bài vẽ kèm chú thích lỗi"></canvas></div>
      <p><button class="btn small" id="tglAnno">Ẩn/hiện chú thích lỗi</button> <button class="btn small" id="tglCorr">Ẩn/hiện lớp hướng dẫn sửa</button>
      ${s.strokes ? '<button class="btn small" id="resReplay">▶ Phát lại bài vẽ</button>' : ''}
      <a class="btn small solid" href="#/studio/${esc(s.lesson_id)}">Vẽ lại / sửa bài</a></p>
      <p class="small muted">Phương pháp chấm: ${esc(a.method)} · Độ tin cậy: ${Math.round((a.confidence || 0) * 100)}% · Rubric ${esc(a.rubric_version)} · ${new Date(a.created).toLocaleString('vi-VN')}</p></div>
    <div class="card"><h3>Kết quả chấm</h3>
      ${a.status === 'INSUFFICIENT_DATA' || a.overall === null ? '<div class="error">Chưa đủ dữ liệu để cho điểm tổng — xem lý do ở từng tiêu chí. Hệ thống không tự bịa điểm.</div>' : `<p class="score-big">${a.overall}<span style="font-size:1.2rem">/100</span></p><p>${a.overall >= (lesson?.lesson.passScore || 70) ? '<span class="chip done">Đạt yêu cầu bài học</span>' : '<span class="chip warn">Chưa đạt — hãy sửa theo hướng dẫn rồi nộp lại</span>'}</p>`}
      ${a.criteria.map(c => `<div class="crit"><div><strong>${esc(c.name)}</strong> <span class="small muted">(${c.weight}%)</span><br><span class="small">${esc(c.feedback)}</span></div><strong>${c.score === null ? '—' : c.score + 'đ'}</strong></div>`).join('')}
      ${a.strengths.length ? `<h3>Điểm mạnh</h3><ul>${a.strengths.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      ${a.weaknesses.length ? `<h3>Cần cải thiện</h3><ul>${a.weaknesses.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      <h3>Đề xuất tiếp theo</h3><ul>${a.recommendations.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      ${a.annotations.length ? `<h3>Chú thích lỗi (${a.annotations.length})</h3>${a.annotations.map((an, i) => `<p class="small"><strong>${i + 1}.</strong> ${esc(an.label)} <span class="chip ${an.severity === 'high' ? 'bad' : 'warn'}">${esc(an.severity || '')}</span></p>`).join('')}` : '<p class="small muted">Không phát hiện lỗi vị trí cụ thể.</p>'}
    </div>
  </div>
  ${d.assessments.length > 1 ? `<div class="card" style="margin-top:1rem"><h3>Lịch sử chấm lại (${d.assessments.length} lần)</h3><table><tr><th>Thời gian</th><th>Điểm</th><th>Trạng thái</th></tr>${d.assessments.map(x => `<tr><td>${new Date(x.created).toLocaleString('vi-VN')}</td><td>${x.overall ?? '—'}</td><td>${esc(x.status)}</td></tr>`).join('')}</table><p><button class="btn small" id="reassess">Chấm lại bài này</button></p></div>` : `<div class="card" style="margin-top:1rem"><p><button class="btn small" id="reassess">Chấm lại bài này</button> <span class="small muted">Chấm lại tạo assessment mới, không ghi đè kết quả cũ.</span></p></div>`}`;
  const rb = new DrawingBoard($('#resBoard'));
  if (s.strokes) { rb.load({ layers: [{ id: 'layer-1', name: 'Bài', visible: true, locked: true }], strokes: s.strokes }); rb.strokes = s.strokes; rb.render(); }
  else { const ctx = $('#resBoard').getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1000, 1000); ctx.fillStyle = '#7a7466'; ctx.font = '32px sans-serif'; ctx.fillText('Bài nộp dạng ảnh — xem bản gốc trong Portfolio', 60, 500); }
  let annoOn = true, corrOn = true;
  const overlay = () => {
    rb.render();
    const ctx = rb.ctx; ctx.setTransform(rb.zoom, 0, 0, rb.zoom, 0, 0);
    if (corrOn) for (const g of a.corrections || []) rb.drawGuide(ctx, g);
    if (annoOn) (a.annotations || []).forEach((an, i) => { ctx.save(); ctx.fillStyle = '#b3402a'; ctx.beginPath(); ctx.arc(an.x, an.y, 20, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = 'bold 24px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), an.x, an.y + 8); ctx.restore(); });
  };
  overlay();
  $('#tglAnno').onclick = () => { annoOn = !annoOn; overlay(); };
  $('#tglCorr').onclick = () => { corrOn = !corrOn; overlay(); };
  const rp = $('#resReplay'); if (rp) rp.onclick = () => rb.replay(1, overlay);
  $('#reassess').onclick = async () => { try { await api('/api/submissions/' + subId + '/reassess', { method: 'POST', body: {} }); toast('Đã chấm lại'); vResult(app, subId); } catch (e) { toast(e.message); } };
}
// ---------------- PORTFOLIO / SETTINGS ----------------
async function vPortfolio(app) {
  if (!ME) return location.hash = '#/login';
  const items = await api('/api/portfolio');
  app.innerHTML = `<h2>Portfolio của bạn</h2>
  ${items.length ? `<div class="grid c3">${items.map(i => `<div class="card"><h3>${esc(i.lesson_id)}</h3><p class="small">${i.source === 'upload' ? 'Ảnh chụp' : 'Bảng vẽ'} · v${i.version} · ${new Date(i.created).toLocaleDateString('vi-VN')}</p><p>${i.overall !== null && i.overall !== undefined ? 'Điểm: <strong>' + i.overall + '</strong>' : 'Chưa có điểm'}</p><a class="btn small" href="#/result/${esc(i.id)}">Xem & so sánh phiên bản</a></div>`).join('')}</div>` : '<div class="card"><p class="muted">Chưa có tác phẩm nào. Nộp bài đầu tiên từ một bài học trong lộ trình nhé.</p></div>'}`;
}
async function vSettings(app) {
  if (!ME) return location.hash = '#/login';
  const p = ME.profile || {};
  app.innerHTML = `<form class="card" id="setForm" style="max-width:560px"><h2>Cài đặt tài khoản</h2>
    <p><strong>${esc(ME.name)}</strong> · ${esc(ME.email)} · vai trò ${esc(ME.role)}</p>
    <label>Mục tiêu</label><input name="goal" value="${esc(p.goal || '')}">
    <label>Trình độ</label><input name="level" value="${esc(p.level || '')}">
    <label>Phương thức vẽ</label><input name="method" value="${esc(p.method || '')}">
    <label>Phút luyện/ngày</label><input name="minutes" type="number" value="${p.minutes || 30}">
    <p><button class="btn solid">Lưu thay đổi</button></p>
    <h3>Bảo mật & dữ liệu</h3>
    <p class="small">Mật khẩu được băm scrypt phía server; bài vẽ mặc định riêng tư. Xuất dữ liệu: toàn bộ bài nộp & điểm của bạn xem được qua Portfolio/Dashboard. Xóa tài khoản: liên hệ admin (bản local chưa có tự xóa — xem KNOWN_LIMITATIONS.md).</p></form>`;
  $('#setForm').onsubmit = async (e) => { e.preventDefault(); const fd = Object.fromEntries(new FormData(e.target)); fd.minutes = Number(fd.minutes); fd.onboarded = 1; await api('/api/profile', { method: 'PUT', body: { ...fd, prefs: {} } }); toast('Đã lưu'); await refreshMe(); };
}
// ---------------- ADMIN ----------------
async function vAdmin(app) {
  if (!ME || !(ME.role === 'admin' || ME.role === 'instructor')) { app.innerHTML = '<div class="card"><h2>Không đủ quyền</h2><p>Trang này chỉ dành cho admin/instructor.</p></div>'; return; }
  const ov = await api('/api/admin/overview');
  const jobs = await api('/api/admin/jobs').catch(() => []);
  app.innerHTML = `<h2>Quản trị hệ thống</h2>
  <div class="grid c4">${[['Người dùng', ov.users], ['Bài nộp', ov.submissions], ['Lượt chấm', ov.assessments], ['Job AI lỗi', ov.jobsFailed], ['Tổng bài học', ov.lessons]].map(x => `<div class="card"><h3>${x[1]}</h3><p class="muted">${x[0]}</p></div>`).join('')}</div>
  <div class="card" style="margin-top:1rem"><h3>AI Jobs gần đây</h3><table><tr><th>Job</th><th>Trạng thái</th><th>Lỗi</th><th>Thời gian</th></tr>${jobs.slice(0, 15).map(j => `<tr><td class="small">${esc(j.id)}</td><td>${esc(j.state)}</td><td class="small">${esc(j.error || '')}</td><td class="small">${new Date(j.created).toLocaleString('vi-VN')}</td></tr>`).join('') || '<tr><td colspan="4">Chưa có job</td></tr>'}</table></div>
  <div id="adminUsers"></div><div id="adminCur"></div>`;
  if (ME.role === 'admin') {
    const users = await api('/api/admin/users');
    $('#adminUsers').innerHTML = `<div class="card" style="margin-top:1rem"><h3>Người dùng & vai trò</h3><table><tr><th>Email</th><th>Tên</th><th>Role</th><th></th></tr>${users.map(u => `<tr><td>${esc(u.email)}</td><td>${esc(u.name)}</td><td>${esc(u.role)}</td><td><select data-role="${u.id}">${['learner', 'instructor', 'admin'].map(r => `<option ${r === u.role ? 'selected' : ''}>${r}</option>`).join('')}</select></td></tr>`).join('')}</table></div>`;
    $$('#adminUsers [data-role]').forEach(sel => sel.onchange = async () => { await api('/api/admin/users/' + sel.dataset.role + '/role', { method: 'PUT', body: { role: sel.value } }); toast('Đã đổi vai trò'); });
    const audit = await api('/api/admin/audit').catch(() => []);
    $('#adminCur').innerHTML = `<div class="card" style="margin-top:1rem"><h3>Nhật ký kiểm toán (mới nhất)</h3><table><tr><th>Hành động</th><th>Đối tượng</th><th>Thời gian</th></tr>${audit.slice(0, 20).map(x => `<tr><td>${esc(x.action)}</td><td class="small">${esc(x.target || '')} ${esc(x.detail || '')}</td><td class="small">${new Date(x.at).toLocaleString('vi-VN')}</td></tr>`).join('')}</table>
    <h3>Trạng thái xuất bản bài học</h3><p class="small">Dùng API PUT /api/admin/lessons/:id/state với draft|in_review|published|archived. Bài ở draft không hiện với học viên.</p></div>`;
  }
}
// ---------------- ROUTER ----------------
async function route() {
  const app = $('#app');
  const [_, page, arg] = (location.hash || '#/').split('/');
  window.scrollTo(0, 0);
  try {
    if (!page) await vLanding(app);
    else if (page === 'login') vAuth(app, 'login');
    else if (page === 'register') vAuth(app, 'register');
    else if (page === 'onboarding') await vOnboarding(app);
    else if (page === 'dashboard') await vDashboard(app);
    else if (page === 'roadmap') await vRoadmap(app);
    else if (page === 'lesson') await vLesson(app, arg);
    else if (page === 'studio') await vStudio(app, arg || null);
    else if (page === 'upload') await vUpload(app, arg);
    else if (page === 'result') await vResult(app, arg);
    else if (page === 'portfolio') await vPortfolio(app);
    else if (page === 'settings') await vSettings(app);
    else if (page === 'admin') await vAdmin(app);
    else await vLanding(app);
  } catch (e) { app.innerHTML = `<div class="card"><h2>Đã xảy ra lỗi</h2><p>${esc(e.message)}</p></div>`; }
  app.focus({ preventScroll: true });
}
window.addEventListener('hashchange', route);
refreshMe().then(route);
