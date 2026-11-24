import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lineStats, ellipseStats, computeOverall, computeMastery, validateRubric, validateAssessment, sniffImage, hashPassword, verifyPassword, pointLineDistance } from '../server/lib.mjs';
import { assessStrokes, applyRubric } from '../server/assess.mjs';
import { chatWithFallback, listProviders } from '../server/ai.mjs';

const linePts = (jitter = 0) => Array.from({ length: 41 }, (_, i) => ({ x: 150 + i * 17.5, y: 500 + (jitter ? (Math.sin(i * 2.7) * jitter) : 0), t: i * 30 }));
const stroke = (points) => [{ id: 's1', layerId: 'l1', tool: 'pencil', color: '#242424', width: 5, opacity: 1, points }];

test('pointLineDistance: điểm trên đường = 0, lệch vuông góc đúng khoảng cách', () => {
  assert.equal(pointLineDistance({ x: 5, y: 0 }, { x: 0, y: 0 }, { x: 10, y: 0 }), 0);
  assert.equal(pointLineDistance({ x: 5, y: 3 }, { x: 0, y: 0 }, { x: 10, y: 0 }), 3);
});
test('lineStats: nét thẳng bám mẫu đạt cao, nét răng cưa thấp hơn rõ', () => {
  const good = lineStats(linePts(0), { x: 150, y: 500 }, { x: 850, y: 500 });
  const bad = lineStats(linePts(45), { x: 150, y: 500 }, { x: 850, y: 500 });
  assert.ok(good.straightness > 0.9, 'good=' + good.straightness);
  assert.ok(bad.straightness < good.straightness - 0.2);
  assert.ok(good.endpoint > 0.95);
});
test('ellipseStats: ellipse đều tròn hơn ellipse méo', () => {
  const circ = Array.from({ length: 61 }, (_, i) => { const a = i / 60 * Math.PI * 2; return { x: 500 + 200 * Math.cos(a), y: 500 + 120 * Math.sin(a), t: i * 20 }; });
  const wobbly = circ.map((p, i) => ({ ...p, x: p.x + Math.sin(i * 1.9) * 38 }));
  assert.ok(ellipseStats(circ).roundness > ellipseStats(wobbly).roundness + 0.15);
});
test('rubric: tổng trọng số phải = 100', () => {
  assert.equal(validateRubric([{ id: 'a', weight: 60 }, { id: 'b', weight: 40 }]), null);
  assert.match(validateRubric([{ id: 'a', weight: 60 }]), /≠ 100/);
});
test('computeOverall: <50% trọng số chấm được -> không cho điểm tổng', () => {
  const r = computeOverall([{ id: 'a', weight: 70, score: null }, { id: 'b', weight: 30, score: 90 }]);
  assert.equal(r.overall, null); assert.equal(r.status, 'INSUFFICIENT_DATA');
  const r2 = computeOverall([{ id: 'a', weight: 70, score: 80 }, { id: 'b', weight: 30, score: null }]);
  assert.equal(r2.overall, 80); assert.deepEqual(r2.missing, ['b']);
});
test('mastery: 1 lần 80đ không thể là Mastered; 3 lần ổn định >=85 mới Mastered', () => {
  assert.notEqual(computeMastery([{ score: 80, at: '2026-01-01' }]).state, 'Mastered');
  const m = computeMastery([{ score: 88, at: '2026-01-01' }, { score: 90, at: '2026-01-02' }, { score: 86, at: '2026-01-03' }]);
  assert.equal(m.state, 'Mastered');
  assert.equal(computeMastery([]).state, 'Not Started');
});
test('password: hash/verify đúng, sai mật khẩu bị từ chối', () => {
  const h = hashPassword('MatKhau123!');
  assert.ok(verifyPassword('MatKhau123!', h));
  assert.ok(!verifyPassword('sai', h));
});
test('sniffImage: nhận PNG/JPEG thật, từ chối file giả', () => {
  assert.equal(sniffImage(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0, 0, 0, 0, 0, 0, 0, 0])), 'image/png');
  assert.equal(sniffImage(Buffer.from('not an image at all')), null);
});
test('assessStrokes line: bài tốt điểm cao hơn bài lệch, có annotation khi lệch nặng', () => {
  const ex = { assessType: 'line', target: { line: { x1: 150, y1: 500, x2: 850, y2: 500 } } };
  const good = assessStrokes(ex, stroke(linePts(0)));
  const bad = assessStrokes(ex, stroke(linePts(60)));
  assert.ok(good.metrics.straightness > bad.metrics.straightness);
  assert.ok(bad.annotations.length >= 1);
  assert.equal(good.corrections[0].kind, 'line');
});
test('assessStrokes: bài trống -> INSUFFICIENT_DATA, không bịa điểm', () => {
  const r = assessStrokes({ assessType: 'line' }, []);
  assert.equal(r.status, 'INSUFFICIENT_DATA');
});
test('applyRubric: tiêu chí method=ai không bị engine hình học tự cho điểm', () => {
  const assessed = assessStrokes({ assessType: 'line', target: { line: { x1: 150, y1: 500, x2: 850, y2: 500 } } }, stroke(linePts(0)));
  const out = applyRubric([{ id: 'c1', name: 'Độ thẳng', weight: 50, method: 'geometry' }, { id: 'c2', name: 'Cảm xúc sáng tạo', weight: 50, method: 'ai' }], assessed);
  assert.equal(typeof out[0].score, 'number');
  assert.equal(out[1].score, null);
});
test('validateAssessment: chặn score ngoài 0..100 và annotation ngoài canvas', () => {
  assert.ok(validateAssessment({ criteria: [{ id: 'a', score: 140 }], annotations: [] }));
  assert.ok(validateAssessment({ criteria: [], annotations: [{ x: 2000, y: 10 }] }));
  assert.equal(validateAssessment({ criteria: [{ id: 'a', score: 50 }], annotations: [{ x: 10, y: 10 }] }), null);
});
test('AI fallback chain: provider đầu lỗi -> tự chuyển provider sau; không key cloud vẫn còn pollinations', async () => {
  const env = { GEMINI_API_KEY: 'x', OPENROUTER_API_KEY: 'y', POLLINATIONS_ENABLED: '1' };
  assert.deepEqual(listProviders(env).map(p => p.id), ['gemini', 'openrouter', 'pollinations']);
  const r = await chatWithFallback([{ role: 'user', content: 'hi' }], { env, fetchImpl: async (p) => { if (p.id === 'gemini') throw new Error('429 quota'); return { text: 'ok from ' + p.id }; } });
  assert.equal(r.provider, 'openrouter');
  assert.equal(r.attempts.length, 1);
  await assert.rejects(() => chatWithFallback([], { env, fetchImpl: async () => { throw new Error('down'); } }), /ALL_PROVIDERS_FAILED/);
});
