// AI/Geometry evaluation on a fixed synthetic dataset (AI_EVALUATION_PLAN.md).
// Expectations were defined in the plan BEFORE running: direction + threshold checks.
import { assessStrokes, assessUpload } from '../server/assess.mjs';
let pass = 0, fail = 0;
const check = (name, cond, detail = '') => { if (cond) { pass++; console.log('PASS', name); } else { fail++; console.log('FAIL', name, detail); } };
const S = (points, color = '#242424') => [{ id: 's', layerId: 'l', tool: 'pencil', color, width: 5, opacity: 1, points }];
const line = (jitter = 0, from = 150, to = 850) => Array.from({ length: 41 }, (_, i) => ({ x: from + (to - from) * i / 40, y: 500 + (jitter ? Math.sin(i * 2.7) * jitter : 0), t: i * 30 }));
const ellipse = (wobble = 0) => Array.from({ length: 61 }, (_, i) => { const a = i / 60 * Math.PI * 2; return { x: 500 + 260 * Math.cos(a) + (wobble ? Math.sin(i * 1.9) * wobble : 0), y: 480 + 150 * Math.sin(a), t: i * 20 }; });
const persp = (vp) => [[150, 300], [150, 700], [850, 300], [850, 700]].map(([x, y]) => S(Array.from({ length: 21 }, (_, i) => ({ x: x + (vp.x - x) * i / 40, y: y + (vp.y - y) * i / 40, t: i * 20 })))).flat();

const exLine = { assessType: 'line', target: { x1: 150, y1: 500, x2: 850, y2: 500 } };
const goodLine = assessStrokes(exLine, S(line(0)));
const badLine = assessStrokes(exLine, S(line(60)));
check('đường thẳng đúng: straightness ≥ 0.85', goodLine.metrics.straightness >= 0.85, String(goodLine.metrics.straightness));
check('đường thẳng lệch: straightness thấp hơn bài đúng ≥ 0.2', badLine.metrics.straightness <= goodLine.metrics.straightness - 0.2);
check('đường thẳng lệch: có annotation tại điểm lệch', badLine.annotations.length >= 1);
check('nét không hoàn thành (ngắn 20%): coverage < 0.6', assessStrokes(exLine, S(line(0, 150, 290))).metrics.coverage < 0.6);
check('bài trống: INSUFFICIENT_DATA, không cho điểm', assessStrokes(exLine, []).status === 'INSUFFICIENT_DATA');
check('bài không liên quan (chấm nhỏ góc canvas): endpoint thấp', assessStrokes(exLine, S(Array.from({ length: 10 }, (_, i) => ({ x: 40 + i * 3, y: 40 + i * 2, t: i * 20 })))).metrics.endpoint < 0.5);

const exEl = { assessType: 'ellipse', target: { cx: 500, cy: 480, rx: 260, ry: 150 } };
const goodEl = assessStrokes(exEl, S(ellipse(0)));
const badEl = assessStrokes(exEl, S(ellipse(45)));
check('ellipse đúng: roundness ≥ 0.7', goodEl.metrics.roundness >= 0.7, String(goodEl.metrics.roundness));
check('ellipse méo: roundness thấp hơn ≥ 0.15', badEl.metrics.roundness <= goodEl.metrics.roundness - 0.15);

const exP = { assessType: 'perspective', target: { horizon: 420, vp: { x: 500, y: 420 } } };
const goodP = assessStrokes(exP, persp({ x: 500, y: 420 }));
const badP = assessStrokes(exP, [[150, 300], [150, 700], [850, 300], [850, 700]].map(([x, y], k) => S(Array.from({ length: 21 }, (_, i) => ({ x: x + i * 12, y: y + (k % 2 ? -i * 9 : i * 7), t: i * 20 })))).flat());
check('phối cảnh hội tụ: convergence ≥ 0.5', goodP.metrics.convergence >= 0.5, String(goodP.metrics.convergence));
check('phối cảnh sai: convergence thấp hơn bài đúng', (badP.metrics.convergence ?? 0) < (goodP.metrics.convergence ?? 0), `bad=${badP.metrics.convergence} good=${goodP.metrics.convergence}`);
check('phối cảnh đúng: có correction điểm tụ', goodP.corrections.some(c => c.kind === 'point'));

const upEmpty = assessUpload({ assessType: 'free' }, { darkRatio: 0.001, edgeDensity: 0.001 });
check('ảnh trống: có cảnh báo chất lượng', upEmpty.annotations.some(a => a.kind === 'quality'));
const upOk = assessUpload({ assessType: 'free' }, { darkRatio: 0.18, edgeDensity: 0.12 });
check('ảnh có nội dung: chấm được với confidence ≤ 0.5 (ghi rõ giới hạn upload)', upOk.status === 'SCORED' && upOk.confidence <= 0.5);
check('upload thiếu metrics: INSUFFICIENT_DATA', assessUpload({ assessType: 'free' }, null).status === 'INSUFFICIENT_DATA');
console.log(`\nAI-EVAL: ${pass} PASS, ${fail} FAIL`);
process.exitCode = fail ? 1 : 0;
