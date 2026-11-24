// DrawPath AI — Interactive Drawing Engine (see DRAWING_ENGINE.md)
// Logical coordinate space is always 1000x1000; view transform (zoom/pan) is
// kept separate so save/load/export never lose precision.
'use strict';
class DrawingBoard {
  constructor(canvas, opts = {}) {
    this.cv = canvas; this.ctx = canvas.getContext('2d');
    this.W = 1000; this.H = 1000;
    this.tool = 'pencil'; this.color = '#242424'; this.size = 5; this.opacity = 1;
    this.layers = [{ id: 'layer-1', name: 'Lớp 1', visible: true, locked: false }];
    this.activeLayer = 'layer-1';
    this.strokes = [];           // {id, layerId, tool, color, width, opacity, points:[{x,y,t,p}]}
    this.undoStack = []; this.redoStack = [];
    this.zoom = 1; this.pan = { x: 0, y: 0 };
    this.current = null; this.panning = null; this.spaceDown = false;
    this.reference = null;       // HTMLImageElement drawn under strokes
    this.referenceOpacity = 0.5;
    this.guides = null;          // correction/target overlay strokes to draw dashed
    this.onChange = opts.onChange || (() => {});
    this.t0 = 0;
    this._bind();
    this.render();
  }
  // ---- coordinate transforms ----
  toLogical(e) {
    const r = this.cv.getBoundingClientRect();
    const sx = (e.clientX - r.left) / r.width * this.cv.width, sy = (e.clientY - r.top) / r.height * this.cv.height;
    return { x: (sx / this.zoom - this.pan.x), y: (sy / this.zoom - this.pan.y) };
  }
  // ---- history ----
  snapshot() { return JSON.stringify({ layers: this.layers, strokes: this.strokes, activeLayer: this.activeLayer }); }
  pushHistory() { this.undoStack.push(this.snapshot()); if (this.undoStack.length > 80) this.undoStack.shift(); this.redoStack = []; }
  restore(s) { const d = JSON.parse(s); this.layers = d.layers; this.strokes = d.strokes; this.activeLayer = d.activeLayer; this.render(); this.onChange(); }
  undo() { if (!this.undoStack.length) return; this.redoStack.push(this.snapshot()); this.restore(this.undoStack.pop()); }
  redo() { if (!this.redoStack.length) return; this.undoStack.push(this.snapshot()); this.restore(this.redoStack.pop()); }
  // ---- layers ----
  addLayer() { const id = 'layer-' + Date.now(); this.layers.push({ id, name: 'Lớp ' + (this.layers.length + 1), visible: true, locked: false }); this.activeLayer = id; this.render(); this.onChange(); return id; }
  deleteLayer(id) { if (this.layers.length <= 1) return false; this.pushHistory(); this.layers = this.layers.filter(l => l.id !== id); this.strokes = this.strokes.filter(s => s.layerId !== id); if (this.activeLayer === id) this.activeLayer = this.layers[0].id; this.render(); this.onChange(); return true; }
  // ---- data ----
  serialize() { return { version: 1, width: this.W, height: this.H, layers: this.layers, strokes: this.strokes }; }
  load(data) {
    if (!data) return;
    this.layers = data.layers?.length ? data.layers : this.layers;
    this.strokes = data.strokes || []; this.activeLayer = this.layers[0].id;
    this.undoStack = []; this.redoStack = []; this.render();
  }
  visibleStrokes() { const vis = new Set(this.layers.filter(l => l.visible).map(l => l.id)); return this.strokes.filter(s => vis.has(s.layerId)); }
  clear() { this.pushHistory(); this.strokes = []; this.render(); this.onChange(); }
  // ---- events ----
  _bind() {
    const cv = this.cv;
    cv.addEventListener('pointerdown', (e) => {
      cv.setPointerCapture(e.pointerId);
      const p = this.toLogical(e);
      if (this.tool === 'pan' || this.spaceDown) { this.panning = { start: p, pan: { ...this.pan } }; return; }
      const layer = this.layers.find(l => l.id === this.activeLayer);
      if (!layer || layer.locked || !layer.visible) return;
      this.pushHistory();
      this.t0 = performance.now();
      this.current = { id: 's' + Date.now() + Math.floor(Math.random() * 1e4), layerId: this.activeLayer, tool: this.tool, color: this.tool === 'eraser' ? '#ffffff' : this.color, width: this.size, opacity: this.opacity, points: [{ x: Math.round(p.x), y: Math.round(p.y), t: 0, p: e.pressure || 0 }] };
      this.strokes.push(this.current);
    });
    cv.addEventListener('pointermove', (e) => {
      const p = this.toLogical(e);
      if (this.panning) { this.pan = { x: this.panning.pan.x + (p.x - this.panning.start.x), y: this.panning.pan.y + (p.y - this.panning.start.y) }; this.render(); return; }
      if (!this.current) return;
      const last = this.current.points[this.current.points.length - 1];
      if (Math.hypot(p.x - last.x, p.y - last.y) < 2) return;
      this.current.points.push({ x: Math.round(p.x), y: Math.round(p.y), t: Math.round(performance.now() - this.t0), p: e.pressure || 0 });
      this.render();
    });
    const end = () => { if (this.current && this.current.points.length < 2) this.strokes.pop(); this.current = null; this.panning = null; this.render(); this.onChange(); };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    cv.addEventListener('wheel', (e) => { e.preventDefault(); this.zoom = Math.min(4, Math.max(0.25, this.zoom * (e.deltaY < 0 ? 1.1 : 0.9))); this.render(); }, { passive: false });
    window.addEventListener('keydown', (e) => { if (e.code === 'Space') this.spaceDown = true; });
    window.addEventListener('keyup', (e) => { if (e.code === 'Space') this.spaceDown = false; });
  }
  // ---- rendering ----
  drawStroke(ctx, s, upto = Infinity) {
    const pts = s.points.slice(0, upto);
    if (pts.length < 2) return;
    ctx.save();
    ctx.globalAlpha = s.opacity; ctx.strokeStyle = s.color; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let i = 0; i < pts.length; i++) {
      const pt = pts[i];
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else { const prev = pts[i - 1]; ctx.lineWidth = Math.max(0.5, s.width * (s.tool === 'pencil' ? 0.7 + 0.6 * (pt.p || 0.5) : 1)); ctx.lineTo(pt.x, pt.y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(pt.x, pt.y); }
    }
    ctx.restore();
  }
  render() {
    const ctx = this.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, this.cv.width, this.cv.height);
    ctx.setTransform(this.zoom, 0, 0, this.zoom, this.pan.x * this.zoom, this.pan.y * this.zoom);
    if (this.reference) { ctx.save(); ctx.globalAlpha = this.referenceOpacity; ctx.drawImage(this.reference, 0, 0, this.W, this.H); ctx.restore(); }
    for (const l of this.layers) if (l.visible) for (const s of this.strokes) if (s.layerId === l.id) this.drawStroke(ctx, s);
    if (this.guides) { ctx.save(); ctx.setLineDash([14, 10]); for (const g of this.guides) this.drawGuide(ctx, g); ctx.restore(); }
  }
  drawGuide(ctx, g) {
    ctx.save(); ctx.strokeStyle = '#D56B46'; ctx.fillStyle = '#D56B46'; ctx.lineWidth = 4;
    if (g.kind === 'line') { ctx.beginPath(); ctx.moveTo(g.x1, g.y1); ctx.lineTo(g.x2, g.y2); ctx.stroke(); }
    if (g.kind === 'ellipse') { ctx.beginPath(); ctx.ellipse(g.cx, g.cy, g.rx, g.ry, 0, 0, Math.PI * 2); ctx.stroke(); }
    if (g.kind === 'rect') ctx.strokeRect(g.x, g.y, g.w, g.h);
    if (g.kind === 'point') { ctx.beginPath(); ctx.arc(g.x, g.y, 12, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
  // ---- replay: replays the RECORDED stroke order/timing, never invented ----
  replay(speed = 1, onDone) {
    if (this._replaying) { this._replaying = false; this.render(); return; }
    this._replaying = true;
    const strokes = this.visibleStrokes();
    const total = strokes.reduce((m, s) => Math.max(m, s.points.length ? s.points[s.points.length - 1].t + 300 : 0), 0);
    const start = performance.now();
    const frame = () => {
      if (!this._replaying) return;
      const el = (performance.now() - start) * speed;
      const ctx = this.ctx;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, this.cv.width, this.cv.height);
      ctx.setTransform(this.zoom, 0, 0, this.zoom, this.pan.x * this.zoom, this.pan.y * this.zoom);
      let acc = 0;
      for (const s of strokes) {
        const dur = s.points.length ? s.points[s.points.length - 1].t : 0;
        if (el < acc) break;
        const local = el - acc;
        const upto = s.points.filter(p => p.t <= local).length;
        if (upto >= 2) this.drawStroke(ctx, s, upto);
        acc += dur + 250;
        if (local < dur) break;
      }
      if (el < total + strokes.length * 250) requestAnimationFrame(frame);
      else { this._replaying = false; this.render(); onDone && onDone(); }
    };
    frame();
  }
  exportPNG() {
    const off = document.createElement('canvas'); off.width = this.W; off.height = this.H;
    const ctx = off.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, this.W, this.H);
    if (this.reference) { ctx.globalAlpha = this.referenceOpacity; ctx.drawImage(this.reference, 0, 0, this.W, this.H); ctx.globalAlpha = 1; }
    const keep = this.ctx; this.ctx = ctx;
    for (const l of this.layers) if (l.visible) for (const s of this.strokes) if (s.layerId === l.id) this.drawStroke(ctx, s);
    this.ctx = keep;
    return off.toDataURL('image/png');
  }
  fit() { this.zoom = 1; this.pan = { x: 0, y: 0 }; this.render(); }
}
window.DrawingBoard = DrawingBoard;
