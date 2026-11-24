// Assessment engine — deterministic geometry/CV analysis over real stroke data.
// This is NOT a mock: every score below is computed from the learner's strokes.
// Multimodal AI (ai.mjs) may add qualitative comments on top; it never replaces
// these measurements, and its output is schema-validated before use.
import { lineStats, ellipseStats, bboxOf, clamp01, toScore, dist, polylineLength } from './lib.mjs';

const hexLum = (hex) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return 0.2;
  const n = parseInt(m[1], 16);
  return (0.2126 * (n >> 16 & 255) + 0.7152 * (n >> 8 & 255) + 0.0722 * (n & 255)) / 255;
};

function smoothnessOf(pts) {
  let turns = 0, n = 0;
  for (let i = 2; i < pts.length; i++) {
    const v1 = { x: pts[i - 1].x - pts[i - 2].x, y: pts[i - 1].y - pts[i - 2].y };
    const v2 = { x: pts[i].x - pts[i - 1].x, y: pts[i].y - pts[i - 1].y };
    const m1 = Math.hypot(v1.x, v1.y), m2 = Math.hypot(v2.x, v2.y);
    if (m1 < 2 || m2 < 2) continue;
    turns += Math.acos(Math.min(1, Math.max(-1, (v1.x * v2.x + v1.y * v2.y) / (m1 * m2)))) * 180 / Math.PI; n++;
  }
  return n ? clamp01(1 - (turns / n) / 25) : 0;
}

// pick a computed metric for a rubric criterion by keyword; null = not evaluable locally
function pickMetric(c, metrics) {
  const k = (c.id + ' ' + c.name).toLowerCase();
  const has = (...ws) => ws.some(w => k.includes(w));
  if (has('thẳng', 'straight', 'deviation', 'lệch')) return metrics.straightness ?? metrics.accuracy;
  if (has('mượt', 'smooth', 'ổn định', 'stability')) return metrics.smoothness;
  if (has('đầu cuối', 'endpoint', 'điểm cuối')) return metrics.endpoint;
  if (has('tròn', 'round', 'ellipse', 'elip')) return metrics.roundness;
  if (has('đóng kín', 'closure', 'khép')) return metrics.closure;
  if (has('vị trí', 'placement', 'đặt')) return metrics.placement;
  if (has('kích thước', 'size', 'scale')) return metrics.sizeAcc;
  if (has('tỷ lệ', 'proportion', 'ratio')) return metrics.proportion;
  if (has('đối xứng', 'symmetry')) return metrics.symmetry;
  if (has('hội tụ', 'convergence', 'điểm tụ', 'vanishing')) return metrics.convergence;
  if (has('sáng tối', 'value', 'đậm nhạt', 'tonal', 'bóng')) return metrics.valueControl;
  if (has('màu', 'color', 'hue', 'hòa sắc')) return metrics.colorUse;
  if (has('bao phủ', 'coverage', 'hoàn thành', 'completion', 'đầy đủ', 'requirement')) return metrics.coverage;
  if (has('cấu trúc', 'structure', 'form', 'khối')) return metrics.structure ?? metrics.accuracy;
  if (has('chính xác', 'accuracy', 'đúng')) return metrics.accuracy;
  if (has('nét', 'line', 'clarity', 'rõ')) return metrics.lineClarity ?? metrics.straightness;
  return metrics.primary;
}

// Curriculum stores targets flat ({x1,y1,x2,y2} | {cx,cy,rx,ry} | {x,y,w,h} | {horizon,vp});
// normalize to the nested shape the evaluators use.
export function normalizeTarget(t) {
  if (!t) return {};
  if (t.line || t.ellipse || t.rect) return t;
  const out = {};
  if (typeof t.x1 === 'number') out.line = { x1: t.x1, y1: t.y1, x2: t.x2, y2: t.y2 };
  if (typeof t.cx === 'number') out.ellipse = { cx: t.cx, cy: t.cy, rx: t.rx, ry: t.ry };
  if (typeof t.x === 'number' && typeof t.w === 'number') out.rect = { x: t.x, y: t.y, w: t.w, h: t.h };
  if (typeof t.horizon === 'number') out.horizon = t.horizon;
  if (t.vp) out.vp = t.vp;
  return out;
}

export function assessStrokes(exercise, strokes) {
  const type = exercise.assessType || 'free';
  const target = normalizeTarget(exercise.target);
  const visible = (strokes || []).filter(s => s.points && s.points.length > 1);
  const allPts = visible.flatMap(s => s.points);
  const annotations = [], corrections = [];
  if (allPts.length < 4) {
    return { status: 'INSUFFICIENT_DATA', reason: 'Bài nộp có quá ít nét để đánh giá.', metrics: {}, annotations, corrections, confidence: 0 };
  }
  const metrics = { coverage: clamp01(Math.min(1, visible.length / 3) * 0.5 + clamp01(polylineLength(allPts) / 1500) * 0.5), smoothness: smoothnessOf(allPts) };
  metrics.primary = metrics.coverage;
  let confidence = 0.55;

  if (type === 'line') {
    const t = target.line || { x1: 150, y1: 500, x2: 850, y2: 500 };
    const best = visible.map(s => lineStats(s.points, { x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 })).filter(Boolean)
      .sort((a, b) => b.coverage - a.coverage)[0];
    if (best) {
      Object.assign(metrics, { straightness: best.straightness, endpoint: best.endpoint, accuracy: best.straightness, lineClarity: best.smoothness, primary: (best.straightness + best.endpoint) / 2 });
      metrics.smoothness = best.smoothness;
      if (best.maxDevPoint) annotations.push({ x: Math.round(best.maxDevPoint.x), y: Math.round(best.maxDevPoint.y), kind: 'deviation', label: 'Điểm lệch khỏi đường mẫu nhiều nhất (' + Math.round(best.maxDev) + ' đơn vị)', severity: best.maxDev > 40 ? 'high' : 'medium' });
      corrections.push({ kind: 'line', x1: t.x1, y1: t.y1, x2: t.x2, y2: t.y2, label: 'Đường mẫu cần đạt' });
      confidence = 0.92;
    }
  } else if (type === 'ellipse' || type === 'shape') {
    const st = ellipseStats(allPts, target.ellipse);
    if (st) {
      Object.assign(metrics, { roundness: st.roundness, placement: st.placement, sizeAcc: st.sizeAcc, closure: st.closure, accuracy: st.roundness, primary: (st.roundness + st.closure) / 2 });
      if (target.ellipse) corrections.push({ kind: 'ellipse', cx: target.ellipse.cx, cy: target.ellipse.cy, rx: target.ellipse.rx, ry: target.ellipse.ry, label: 'Ellipse mẫu' });
      const bb = bboxOf(allPts);
      metrics.proportion = clamp01(1 - Math.abs((bb.w / Math.max(1, bb.h)) - (target.ratio || bb.w / Math.max(1, bb.h))) / 0.8);
      if (st.roundness < 0.6) annotations.push({ x: Math.round(st.cx + st.rx), y: Math.round(st.cy), kind: 'shape', label: 'Đường cong méo nhất ở phía này — kiểm tra độ cong đều quanh trục', severity: 'medium' });
      confidence = 0.88;
    }
    if (target.rect) {
      const bb = bboxOf(allPts);
      metrics.proportion = clamp01(1 - Math.abs(bb.w / Math.max(1, bb.h) - target.rect.w / target.rect.h) / 0.8);
      metrics.placement = clamp01(1 - Math.hypot(bb.x - target.rect.x, bb.y - target.rect.y) / 250);
      metrics.sizeAcc = clamp01(1 - (Math.abs(bb.w - target.rect.w) / target.rect.w + Math.abs(bb.h - target.rect.h) / target.rect.h) / 2 / 0.6);
      metrics.symmetry = clamp01(1 - Math.abs((bb.x + bb.w / 2) - 500) / 300);
      corrections.push({ kind: 'rect', x: target.rect.x, y: target.rect.y, w: target.rect.w, h: target.rect.h, label: 'Khung tỷ lệ mẫu' });
    }
  } else if (type === 'perspective' || type === 'form') {
    // convergence: intersect long, near-straight strokes pairwise; tight cluster = good convergence
    const segs = visible.filter(s => polylineLength(s.points) > 180).map(s => [s.points[0], s.points[s.points.length - 1]]);
    if (segs.length >= 2) {
      const pts = [];
      for (let i = 0; i < segs.length; i++) for (let j = i + 1; j < segs.length; j++) {
        const [a, b] = segs[i], [c, d] = segs[j];
        const den = (a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x);
        if (Math.abs(den) < 1e-6) continue;
        const t = ((a.x - c.x) * (c.y - d.y) - (a.y - c.y) * (c.x - d.x)) / den;
        const p = { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) };
        if (p.x > -1500 && p.x < 2500 && p.y > -1000 && p.y < 2000) pts.push(p);
      }
      if (pts.length >= 1) {
        const mx = pts.reduce((s, p) => s + p.x, 0) / pts.length, my = pts.reduce((s, p) => s + p.y, 0) / pts.length;
        const spread = Math.sqrt(pts.reduce((s, p) => s + (p.x - mx) ** 2 + (p.y - my) ** 2, 0) / pts.length);
        metrics.convergence = clamp01(1 - spread / 450);
        metrics.structure = metrics.convergence;
        metrics.primary = metrics.convergence;
        corrections.push({ kind: 'point', x: Math.round(Math.min(1000, Math.max(0, mx))), y: Math.round(Math.min(1000, Math.max(0, my))), label: 'Điểm tụ ước lượng từ các cạnh của bạn' });
        if (spread > 200) annotations.push({ x: Math.round(Math.min(1000, Math.max(0, mx))), y: Math.round(Math.min(1000, Math.max(0, my))), kind: 'convergence', label: 'Các cạnh chưa hội tụ về một điểm tụ chung (độ tản ' + Math.round(spread) + ')', severity: 'high' });
        confidence = 0.8;
      }
    }
    const bb = bboxOf(allPts);
    metrics.proportion = clamp01(bb.w / 700) * 0.5 + clamp01(bb.h / 500) * 0.5;
    metrics.accuracy = metrics.structure ?? metrics.proportion;
  } else if (type === 'value') {
    // value control: darkness gradient across 5 vertical bands should be monotonic-ish
    const bands = [0, 0, 0, 0, 0], counts = [0, 0, 0, 0, 0];
    for (const s of visible) {
      const dark = (1 - hexLum(s.color)) * (s.opacity ?? 1);
      for (const p of s.points) { const b = Math.min(4, Math.floor(p.x / 200)); bands[b] += dark; counts[b]++; }
    }
    const means = bands.map((v, i) => counts[i] ? v / counts[i] : null).filter(v => v !== null);
    if (means.length >= 3) {
      let mono = 0, pairs = 0;
      for (let i = 1; i < means.length; i++) { pairs++; if ((means[i] - means[i - 1]) * (target.direction === 'ltr-light' ? 1 : -1) <= 0.02) mono++; }
      metrics.valueControl = clamp01(0.3 + 0.7 * (mono / Math.max(1, pairs)));
      metrics.primary = metrics.valueControl;
      confidence = 0.62;
    }
    metrics.coverage = clamp01(allPts.length / 800);
  } else if (type === 'color') {
    const hues = new Set(visible.map(s => (s.color || '').toLowerCase()));
    metrics.colorUse = clamp01(hues.size / 5);
    metrics.primary = metrics.colorUse; confidence = 0.5;
  } else {
    // gesture / composition / free: structural proxies only, low confidence by design
    const bb = bboxOf(allPts);
    metrics.structure = clamp01((bb.w / 800 + bb.h / 600) / 2);
    metrics.accuracy = metrics.structure;
    metrics.primary = (metrics.structure + metrics.smoothness) / 2;
    confidence = 0.42;
  }
  return { status: 'SCORED', metrics, annotations, corrections, confidence };
}

// Map computed metrics onto a lesson rubric -> criterion results with feedback text.
export function applyRubric(rubric, assessed) {
  return rubric.map(c => {
    if (assessed.status !== 'SCORED') return { id: c.id, name: c.name, weight: c.weight, score: null, feedback: 'Không đủ dữ liệu để chấm tiêu chí này.' };
    if (c.method === 'ai') return { id: c.id, name: c.name, weight: c.weight, score: null, feedback: 'Tiêu chí định tính — cần AI/tự đánh giá, engine hình học không tự cho điểm.' };
    const m = pickMetric(c, assessed.metrics);
    if (m === undefined || m === null) return { id: c.id, name: c.name, weight: c.weight, score: null, feedback: 'Chưa đo được tiêu chí này từ dữ liệu bài nộp.' };
    const score = toScore(m);
    return { id: c.id, name: c.name, weight: c.weight, score, feedback: score >= 80 ? 'Đạt tốt.' : score >= 60 ? 'Khá — còn cải thiện được.' : score >= 40 ? 'Yếu — cần luyện lại theo hướng dẫn sửa.' : 'Rất yếu — hãy xem lớp hướng dẫn sửa và làm lại theo từng bước.' };
  });
}

// Upload path: only client-measured image statistics + optional AI vision.
// Honest limits: no stroke order/speed/pressure can be inferred from a photo.
export function assessUpload(exercise, metrics) {
  if (!metrics || typeof metrics.darkRatio !== 'number') {
    return { status: 'INSUFFICIENT_DATA', reason: 'Không đọc được thống kê ảnh.', metrics: {}, annotations: [], corrections: [], confidence: 0 };
  }
  const m = {
    coverage: clamp01(metrics.darkRatio / 0.25),
    valueControl: clamp01(metrics.edgeDensity / 0.18),
    lineClarity: clamp01(metrics.edgeDensity / 0.2),
    primary: clamp01((metrics.darkRatio / 0.25 + metrics.edgeDensity / 0.18) / 2),
    smoothness: null,
  };
  const annotations = [];
  if (metrics.darkRatio < 0.02) annotations.push({ x: 500, y: 500, kind: 'quality', label: 'Ảnh gần như trống hoặc quá nhạt — kiểm tra lại bài nộp', severity: 'high' });
  if (metrics.blur > 0.7) annotations.push({ x: 500, y: 120, kind: 'quality', label: 'Ảnh có dấu hiệu mờ — chụp lại thẳng, đủ sáng', severity: 'medium' });
  return { status: 'SCORED', metrics: m, annotations, corrections: [], confidence: 0.45, uploadOnly: true };
}
