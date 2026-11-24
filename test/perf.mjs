// Performance baseline (PERFORMANCE_REPORT.md): API latency + assessment cost by stroke count.
import { spawn } from 'node:child_process';
import { assessStrokes } from '../server/assess.mjs';
const wait = (ms) => new Promise(r => setTimeout(r, ms));
for (const n of [100, 1000, 5000]) {
  const pts = Array.from({ length: n }, (_, i) => ({ x: 150 + (i % 700), y: 500 + Math.sin(i / 9) * 30, t: i * 16 }));
  const t0 = performance.now();
  assessStrokes({ assessType: 'line', target: { x1: 150, y1: 500, x2: 850, y2: 500 } }, [{ id: 's', layerId: 'l', tool: 'pencil', color: '#242424', width: 5, opacity: 1, points: pts }]);
  console.log(`assess ${n} points: ${(performance.now() - t0).toFixed(1)}ms`);
}
const srv = spawn('node', ['server/main.mjs'], { cwd: new URL('..', import.meta.url).pathname, env: { ...process.env, PORT: '4181' }, stdio: 'pipe' });
try {
  for (let i = 0; i < 40; i++) { try { const r = await fetch('http://localhost:4181/api/health'); if (r.ok) break; } catch {} await wait(250); }
  for (const path of ['/api/health', '/api/curriculum', '/']) {
    const times = [];
    for (let i = 0; i < 10; i++) { const t0 = performance.now(); const r = await fetch('http://localhost:4181' + path); await r.arrayBuffer(); times.push(performance.now() - t0); }
    times.sort((a, b) => a - b);
    console.log(`${path}: median ${times[5].toFixed(1)}ms, max ${times[9].toFixed(1)}ms (10 req, localhost)`);
  }
} finally { srv.kill(); }
