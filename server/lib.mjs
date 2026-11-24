// Shared pure helpers: auth crypto, geometry, rubric, mastery. No I/O here — unit tested.
import { scryptSync, randomBytes, timingSafeEqual, createHash } from 'node:crypto';

export const uid = (p = 'id') => p + '_' + randomBytes(9).toString('base64url');
export const now = () => new Date().toISOString();
export const sha256 = (s) => createHash('sha256').update(s).digest('hex');

export function hashPassword(pw) {
  const salt = randomBytes(16).toString('hex');
  return salt + ':' + scryptSync(pw, salt, 64).toString('hex');
}
export function verifyPassword(pw, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, hash] = stored.split(':');
  const a = Buffer.from(hash, 'hex'), b = scryptSync(pw, salt, 64);
  return a.length === b.length && timingSafeEqual(a, b);
}
export const newToken = () => randomBytes(32).toString('base64url');

// ---------- geometry (coordinates are normalized 0..1000 logical space) ----------
export const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export function pointLineDistance(p, a, b) {
  const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy);
  if (L === 0) return dist(p, a);
  return Math.abs(dy * p.x - dx * p.y + b.x * a.y - b.y * a.x) / L;
}
export function polylineLength(pts) {
  let L = 0; for (let i = 1; i < pts.length; i++) L += dist(pts[i - 1], pts[i]); return L;
}
// stats of a stroke against a target straight line
export function lineStats(pts, a, b) {
  if (pts.length < 2) return null;
  const devs = pts.map(p => pointLineDistance(p, a, b));
  const targetLen = dist(a, b);
  const meanDev = devs.reduce((s, d) => s + d, 0) / devs.length;
  const maxDev = Math.max(...devs);
  // smoothness: mean absolute turning angle (deg) between consecutive segments
  let turns = 0, n = 0;
  for (let i = 2; i < pts.length; i++) {
    const v1 = { x: pts[i - 1].x - pts[i - 2].x, y: pts[i - 1].y - pts[i - 2].y };
    const v2 = { x: pts[i].x - pts[i - 1].x, y: pts[i].y - pts[i - 1].y };
    const m1 = Math.hypot(v1.x, v1.y), m2 = Math.hypot(v2.x, v2.y);
    if (m1 < 2 || m2 < 2) continue;
    const cos = Math.min(1, Math.max(-1, (v1.x * v2.x + v1.y * v2.y) / (m1 * m2)));
    turns += Math.acos(cos) * 180 / Math.PI; n++;
  }
  return {
    meanDev, maxDev, targetLen,
    straightness: clamp01(1 - meanDev / Math.max(40, targetLen * 0.12)),
    smoothness: clamp01(1 - (n ? turns / n : 0) / 25),
    startErr: dist(pts[0], a), endErr: dist(pts[pts.length - 1], b),
    endpoint: clamp01(1 - (dist(pts[0], a) + dist(pts[pts.length - 1], b)) / 2 / 120),
    coverage: clamp01(polylineLength(pts) / (targetLen * 1.6)),
    maxDevPoint: pts[devs.indexOf(maxDev)],
  };
}
// ellipse fit from stroke points: bbox + radial variance around fitted ellipse
export function ellipseStats(pts, target) {
  if (pts.length < 8) return null;
  const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const rx = (Math.max(...xs) - Math.min(...xs)) / 2, ry = (Math.max(...ys) - Math.min(...ys)) / 2;
  if (rx < 5 || ry < 5) return null;
  let err = 0;
  for (const p of pts) {
    const v = Math.sqrt(((p.x - cx) / rx) ** 2 + ((p.y - cy) / ry) ** 2);
    err += Math.abs(v - 1);
  }
  const roundness = clamp01(1 - (err / pts.length) / 0.35);
  let placement = 1, sizeAcc = 1;
  if (target) {
    placement = clamp01(1 - Math.hypot(cx - target.cx, cy - target.cy) / 200);
    sizeAcc = clamp01(1 - (Math.abs(rx - target.rx) / target.rx + Math.abs(ry - target.ry) / target.ry) / 2 / 0.6);
  }
  // closure: gap between first and last point relative to perimeter scale
  const closure = clamp01(1 - dist(pts[0], pts[pts.length - 1]) / (2 * (rx + ry)) / 0.5);
  return { cx, cy, rx, ry, roundness, placement, sizeAcc, closure };
}
export function bboxOf(pts) {
  const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
  return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
}
export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const toScore = (v) => Math.round(clamp01(v) * 100);

// ---------- rubric ----------
// Rule for non-evaluable criteria (defined in advance, AI_ASSESSMENT.md):
// exclude them, renormalize remaining weights, record them in `missing`.
// If evaluable weight < 50% of total -> no overall score (INSUFFICIENT_DATA).
export function computeOverall(criterionResults) {
  const totalW = criterionResults.reduce((s, c) => s + c.weight, 0);
  const evald = criterionResults.filter(c => typeof c.score === 'number');
  const evalW = evald.reduce((s, c) => s + c.weight, 0);
  const missing = criterionResults.filter(c => typeof c.score !== 'number').map(c => c.id);
  if (totalW === 0 || evalW / totalW < 0.5) return { overall: null, status: 'INSUFFICIENT_DATA', missing, evaluatedWeight: evalW };
  const overall = Math.round(evald.reduce((s, c) => s + c.score * c.weight, 0) / evalW);
  return { overall, status: 'SCORED', missing, evaluatedWeight: evalW };
}
export function validateRubric(rubric) {
  if (!Array.isArray(rubric) || rubric.length === 0) return 'rubric rỗng';
  const sum = rubric.reduce((s, r) => s + (r.weight || 0), 0);
  if (Math.abs(sum - 100) > 0.001) return 'tổng trọng số rubric = ' + sum + ' ≠ 100';
  const ids = new Set(); for (const r of rubric) { if (!r.id || ids.has(r.id)) return 'criterion id trùng/thiếu'; ids.add(r.id); }
  return null;
}

// ---------- mastery ----------
// Evidence-weighted: recent + harder + higher-confidence evidence weighs more.
// One 80/100 is never "Mastered": needs >=3 evidences and stability.
export function computeMastery(evidences) {
  if (!evidences.length) return { score: null, state: 'Not Started', evidenceCount: 0 };
  const sorted = [...evidences].sort((a, b) => (a.at < b.at ? -1 : 1));
  let wsum = 0, ssum = 0;
  sorted.forEach((e, i) => {
    const recency = 0.5 + 0.5 * ((i + 1) / sorted.length);
    const w = recency * (0.6 + 0.4 * (e.confidence ?? 1)) * (0.7 + 0.1 * (e.difficulty ?? 2)) * (e.assisted ? 0.8 : 1);
    wsum += w; ssum += w * e.score;
  });
  const score = Math.round(ssum / wsum);
  const recent = sorted.slice(-3).map(e => e.score);
  const stable = recent.length >= 2 && Math.max(...recent) - Math.min(...recent) <= 20;
  let state = 'Learning';
  if (score >= 85 && sorted.length >= 3 && stable) state = 'Mastered';
  else if (score >= 70) state = 'Proficient';
  else if (score < 50) state = 'Needs Practice';
  return { score, state, evidenceCount: sorted.length, stable };
}

// ---------- validation ----------
export const isEmail = (s) => typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
export function validateAssessment(a) {
  if (!a || typeof a !== 'object') return 'assessment không phải object';
  if (!Array.isArray(a.criteria)) return 'thiếu criteria';
  for (const c of a.criteria) {
    if (c.score !== null && (typeof c.score !== 'number' || c.score < 0 || c.score > 100)) return 'score ngoài 0..100: ' + c.id;
  }
  for (const an of a.annotations || []) {
    for (const k of ['x', 'y']) if (typeof an[k] !== 'number' || an[k] < 0 || an[k] > 1000) return 'annotation ngoài canvas: ' + k;
  }
  return null;
}
export const IMAGE_MAGIC = [
  { mime: 'image/png', bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: 'image/jpeg', bytes: [0xff, 0xd8, 0xff] },
  { mime: 'image/webp', bytes: null }, // RIFF....WEBP checked separately
];
export function sniffImage(buf) {
  if (!buf || buf.length < 12) return null;
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'image/webp';
  return null;
}
