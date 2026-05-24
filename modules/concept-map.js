/**
 * concept-map.js — Canvas force-directed kavram haritası
 * Sürüklenebilir node'lar, kategori renkli, tıklanır → showDeepDive
 * Expose: window.ConceptMap
 */
(function() {
  'use strict';

  function injectStyles() {
    if (document.getElementById('concept-map-styles')) return;
    const style = document.createElement('style');
    style.id = 'concept-map-styles';
    style.textContent = `
      .concept-map-wrap { width: 100%; height: 100%; position: relative; }
      .concept-map-canvas { display: block; cursor: grab; background: var(--bg-card); }
      .concept-map-canvas:active { cursor: grabbing; }
      .concept-map-legend {
        position: absolute; bottom: 12px; left: 12px; background: var(--bg-card);
        border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px;
        font-size: 11px; color: var(--text-secondary); max-width: 240px;
      }
      .concept-map-legend .row { display: flex; align-items: center; gap: 6px; margin: 2px 0; padding: 2px 4px; cursor: pointer; border-radius: 3px; user-select: none; }
      .concept-map-legend .row:hover { background: var(--bg-card-hover); }
      .concept-map-legend .row.off { opacity: 0.35; }
      .concept-map-legend .dot { width: 10px; height: 10px; border-radius: 50%; }
      .concept-map-legend .reset { margin-top: 6px; padding: 3px 8px; font-size: 10px; background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 3px; cursor: pointer; color: var(--text-secondary); width: 100%; }
      .concept-map-legend .reset:hover { background: var(--accent); color: #000; }
      .concept-map-search {
        position: absolute; top: 12px; right: 12px; background: var(--bg-card);
        border: 1px solid var(--border); border-radius: 6px; padding: 6px 10px;
        display: flex; align-items: center; gap: 6px; z-index: 10;
      }
      .concept-map-search input {
        background: transparent; border: none; outline: none; color: var(--text-primary);
        font-size: 12px; width: 160px;
      }
      .concept-map-search input::placeholder { color: var(--text-muted); }
      .concept-map-search .icon { color: var(--text-muted); font-size: 13px; }
    `;
    document.head.appendChild(style);
  }

  const CATEGORY_COLORS = {
    'pre-mercantilist':       '#a78bfa',
    'classical-mercantilist': '#60a5fa',
    'ottoman-thinker':        '#2dd4bf',
    'ottoman-concept':        '#22d3ee',
    'ottoman-policy':         '#06b6d4',
    'policy':                 '#f59e0b',
    'colonial':               '#ef4444',
    'karsit':                 '#4ade80',
    'modern-historian':       '#9ca3af',
    'default':                '#94a3b8'
  };

  const CATEGORIES = [
    { id: 'pre-mercantilist',       color: '#a78bfa', label: 'Pre-mercantilist' },
    { id: 'classical-mercantilist', color: '#60a5fa', label: 'Klasik merkantilist' },
    { id: 'ottoman-thinker',        color: '#2dd4bf', label: 'Osmanlı düşünür' },
    { id: 'ottoman-concept',        color: '#22d3ee', label: 'Osmanlı kavram' },
    { id: 'ottoman-policy',         color: '#06b6d4', label: 'Osmanlı politika' },
    { id: 'policy',                 color: '#f59e0b', label: 'Politika' },
    { id: 'colonial',               color: '#ef4444', label: 'Sömürge' },
    { id: 'karsit',                 color: '#4ade80', label: 'Karşıt / klasik iktisat' },
    { id: 'modern-historian',       color: '#9ca3af', label: 'Modern tarihçi' }
  ];

  function ConceptMap() {
    this.nodes = [];
    this.edges = [];
    this.dragging = null;
    this.canvas = null;
    this.ctx = null;
    this.animId = null;
    this.selectedNodeId = null;
    this.disabledCategories = new Set();
    this.searchQuery = '';
    this._calmFrames = 0;
    this._maxV = 0;
  }

  ConceptMap.prototype.init = function(containerId) {
    injectStyles();
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.render();
  };

  ConceptMap.prototype.render = function() {
    if (!window.CONTENT || !window.CONTENT.CONCEPTS) return;
    const concepts = window.CONTENT.CONCEPTS;
    if (concepts.length === 0) return;

    const rect = this.container.getBoundingClientRect();
    const W = Math.max(600, rect.width);
    const H = Math.max(400, rect.height);

    const legendRows = CATEGORIES.map(c =>
      `<div class="row" data-cat="${c.id}"><span class="dot" style="background:${c.color}"></span> ${c.label}</div>`
    ).join('');

    this.container.innerHTML = `
      <div class="concept-map-wrap">
        <canvas class="concept-map-canvas" width="${W}" height="${H}"></canvas>
        <div class="concept-map-search">
          <span class="icon">🔍</span>
          <input type="text" placeholder="Kavram ara…" id="conceptMapSearch" />
        </div>
        <div class="concept-map-legend">
          <div style="font-weight:600;margin-bottom:4px;color:var(--text-primary);">Kategoriler (tıkla → kapat)</div>
          ${legendRows}
          <button class="reset" id="conceptMapReset">Filtreleri sıfırla</button>
        </div>
      </div>
    `;

    this.canvas = this.container.querySelector('.concept-map-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.W = W;
    this.H = H;

    // Initialize nodes with random positions
    this.nodes = concepts.map((c, i) => ({
      id: c.id,
      label: c.label,
      category: c.category,
      data: c,
      x: W / 2 + (Math.random() - 0.5) * W * 0.7,
      y: H / 2 + (Math.random() - 0.5) * H * 0.7,
      vx: 0, vy: 0,
      r: 8
    }));

    // Build edges from related arrays
    const nodeIds = new Set(this.nodes.map(n => n.id));
    this.edges = [];
    concepts.forEach(c => {
      (c.related || []).forEach(r => {
        const targetId = r.to || r;
        if (nodeIds.has(targetId) && nodeIds.has(c.id)) {
          this.edges.push({ source: c.id, target: targetId, type: r.type || 'rel' });
        }
      });
    });

    this.wireEvents();
    this.startSimulation();
  };

  ConceptMap.prototype.startSimulation = function() {
    if (this.animId) return;  // already running
    const self = this;
    const SETTLE_THRESHOLD = 0.08;
    const SETTLE_FRAMES = 30;
    self._calmFrames = 0;

    function step() {
      self.tick();
      self.draw();
      if (self._maxV < SETTLE_THRESHOLD) {
        self._calmFrames++;
      } else {
        self._calmFrames = 0;
      }
      if (self._calmFrames >= SETTLE_FRAMES) {
        cancelAnimationFrame(self.animId);
        self.animId = null;
        return;  // settled — wait for user interaction to re-arm
      }
      self.animId = requestAnimationFrame(step);
    }
    self.animId = requestAnimationFrame(step);
  };

  ConceptMap.prototype.relax = function() {
    // Re-arm simulation after user interaction (drag, filter, search)
    this._calmFrames = 0;
    if (!this.animId) this.startSimulation();
  };

  ConceptMap.prototype.tick = function() {
    const REPULSION = 800;
    const ATTRACTION = 0.02;
    const CENTER_PULL = 0.005;
    const DAMPING = 0.85;
    const MAX_VEL = 5;

    // Repulsion (all pairs)
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i], b = this.nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist2 = dx * dx + dy * dy + 0.01;
        const dist = Math.sqrt(dist2);
        const force = REPULSION / dist2;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx -= fx; a.vy -= fy;
        b.vx += fx; b.vy += fy;
      }
    }

    // Attraction along edges
    const nodeMap = {};
    this.nodes.forEach(n => nodeMap[n.id] = n);
    this.edges.forEach(e => {
      const a = nodeMap[e.source], b = nodeMap[e.target];
      if (!a || !b) return;
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const force = ATTRACTION * (dist - 100);
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      a.vx += fx; a.vy += fy;
      b.vx -= fx; b.vy -= fy;
    });

    // Center pull
    this.nodes.forEach(n => {
      n.vx += (this.W / 2 - n.x) * CENTER_PULL;
      n.vy += (this.H / 2 - n.y) * CENTER_PULL;
    });

    // Update + damping + bounds; track max velocity for settle detection
    let maxV = 0;
    this.nodes.forEach(n => {
      if (n === this.dragging) return;
      n.vx = Math.max(-MAX_VEL, Math.min(MAX_VEL, n.vx * DAMPING));
      n.vy = Math.max(-MAX_VEL, Math.min(MAX_VEL, n.vy * DAMPING));
      n.x += n.vx;
      n.y += n.vy;
      n.x = Math.max(20, Math.min(this.W - 20, n.x));
      n.y = Math.max(20, Math.min(this.H - 20, n.y));
      const v = Math.max(Math.abs(n.vx), Math.abs(n.vy));
      if (v > maxV) maxV = v;
    });
    this._maxV = maxV;
  };

  ConceptMap.prototype.draw = function() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);

    // Edges
    ctx.strokeStyle = 'rgba(150, 160, 180, 0.25)';
    ctx.lineWidth = 1;
    const nodeMap = {};
    this.nodes.forEach(n => nodeMap[n.id] = n);
    this.edges.forEach(e => {
      const a = nodeMap[e.source], b = nodeMap[e.target];
      if (!a || !b) return;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });

    // Nodes
    const q = this.searchQuery.trim().toLowerCase();
    const bm = window.Bookmarks;  // may be undefined if module not yet loaded
    this.nodes.forEach(n => {
      const color = CATEGORY_COLORS[n.category] || CATEGORY_COLORS.default;
      const isSelected = n.id === this.selectedNodeId;
      const catDisabled = this.disabledCategories.has(n.category);
      const searchMatch = !q || n.label.toLowerCase().includes(q);
      const isHighlight = q && searchMatch;
      const isFaded = catDisabled || (q && !searchMatch);
      const isVisited = bm && bm.isVisited && bm.isVisited(n.id);
      const isFavorite = bm && bm.isFavorite && bm.isFavorite(n.id);

      // Unvisited gets a subtle dim (0.6) so visited nodes feel "lit up"
      ctx.globalAlpha = isFaded ? 0.15 : (isVisited ? 1.0 : 0.6);
      ctx.fillStyle = color;
      ctx.strokeStyle = isSelected || isHighlight
        ? '#00d4ff'
        : (isFavorite ? '#fbbf24' : 'rgba(0,0,0,0.5)');
      ctx.lineWidth = isSelected || isHighlight ? 3 : (isFavorite ? 2 : 1);
      ctx.beginPath();
      ctx.arc(n.x, n.y, isSelected || isHighlight ? 12 : n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Labels: always for selected/highlight, otherwise only short labels
      if (isSelected || isHighlight || (!isFaded && n.label.length < 14)) {
        ctx.fillStyle = isHighlight ? '#00d4ff' : '#e0e0e0';
        ctx.font = (isSelected || isHighlight) ? 'bold 12px Inter, sans-serif' : '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(n.label, n.x, n.y + n.r + 4);
      }
      ctx.globalAlpha = 1.0;
    });
  };

  ConceptMap.prototype.wireEvents = function() {
    const self = this;
    const canvas = this.canvas;

    function nodeAt(x, y) {
      for (let i = self.nodes.length - 1; i >= 0; i--) {
        const n = self.nodes[i];
        const dx = x - n.x, dy = y - n.y;
        if (dx * dx + dy * dy <= (n.r + 4) * (n.r + 4)) return n;
      }
      return null;
    }

    function pos(e) {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    canvas.addEventListener('mousedown', (e) => {
      const p = pos(e);
      const n = nodeAt(p.x, p.y);
      if (n) {
        self.dragging = n;
        self.selectedNodeId = n.id;
        self.relax();
        if (typeof window.showDeepDive === 'function' && n.data) window.showDeepDive(n.data);
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      if (self.dragging) {
        const p = pos(e);
        self.dragging.x = p.x;
        self.dragging.y = p.y;
        self.dragging.vx = 0;
        self.dragging.vy = 0;
        self.relax();
      } else {
        const p = pos(e);
        const n = nodeAt(p.x, p.y);
        canvas.style.cursor = n ? 'pointer' : 'grab';
        // Repaint static frame to reflect any selection hover changes
        if (!self.animId) self.draw();
      }
    });

    canvas.addEventListener('mouseup', () => { self.dragging = null; });
    canvas.addEventListener('mouseleave', () => { self.dragging = null; });

    // Legend click → toggle category visibility
    this.container.querySelectorAll('.concept-map-legend .row[data-cat]').forEach(row => {
      row.addEventListener('click', () => {
        const cat = row.dataset.cat;
        if (self.disabledCategories.has(cat)) {
          self.disabledCategories.delete(cat);
          row.classList.remove('off');
        } else {
          self.disabledCategories.add(cat);
          row.classList.add('off');
        }
        if (!self.animId) self.draw();
      });
    });

    // Reset button
    const reset = this.container.querySelector('#conceptMapReset');
    if (reset) reset.addEventListener('click', () => {
      self.disabledCategories.clear();
      self.searchQuery = '';
      self.container.querySelectorAll('.row.off').forEach(r => r.classList.remove('off'));
      const inp = self.container.querySelector('#conceptMapSearch');
      if (inp) inp.value = '';
      if (!self.animId) self.draw();
    });

    // Search input
    const search = this.container.querySelector('#conceptMapSearch');
    if (search) {
      search.addEventListener('input', () => {
        self.searchQuery = search.value;
        if (!self.animId) self.draw();
      });
    }
  };

  window.ConceptMap = new ConceptMap();

  function autoInit() {
    // ConceptMap initializes when user clicks map view button
    const btn = document.getElementById('viewMap');
    if (!btn) return;
    btn.addEventListener('click', () => {
      // Defer slightly so bootstrap's setView() runs first
      setTimeout(() => window.ConceptMap.init('mainView'), 50);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
  else autoInit();
  console.log('[concept-map] Module loaded');
})();
