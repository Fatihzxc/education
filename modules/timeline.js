/**
 * timeline.js — SVG yatay zaman çizelgesi (1271-2025)
 * Ülke şeritleri + olay noktaları + tıklanır → showDeepDive
 * Expose: window.Timeline
 */
(function() {
  'use strict';

  function injectStyles() {
    if (document.getElementById('timeline-styles')) return;
    const style = document.createElement('style');
    style.id = 'timeline-styles';
    style.textContent = `
      .timeline-filter-bar {
        display: flex; align-items: center; gap: 12px; padding: 8px 12px;
        background: var(--bg-card); border-bottom: 1px solid var(--border);
        flex-wrap: wrap; font-size: 12px; color: var(--text-secondary);
      }
      .timeline-filter-bar label { display: flex; align-items: center; gap: 4px; cursor: pointer; user-select: none; padding: 2px 6px; border-radius: 3px; }
      .timeline-filter-bar label:hover { background: var(--bg-card-hover); }
      .timeline-filter-bar input[type="checkbox"] { accent-color: var(--accent); cursor: pointer; }
      .timeline-filter-bar .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
      .timeline-filter-bar .anchor-toggle { margin-left: auto; padding-left: 12px; border-left: 1px solid var(--border); }
      .timeline-filter-bar .reset { padding: 3px 10px; background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 3px; cursor: pointer; color: var(--text-secondary); font-size: 11px; }
      .timeline-filter-bar .reset:hover { background: var(--accent); color: #000; }
      .timeline-wrap { width: 100%; height: calc(100% - 44px); overflow: auto; padding: 12px; box-sizing: border-box; }
      .timeline-svg { display: block; min-width: 1800px; }
      .timeline-grid line { stroke: var(--border); stroke-width: 1; opacity: 0.5; }
      .timeline-year-label { fill: var(--text-muted); font-size: 11px; font-family: var(--font-mono); }
      .timeline-lane-label { fill: var(--text-secondary); font-size: 12px; font-weight: 600; }
      .timeline-event { cursor: pointer; transition: r 150ms ease, stroke-width 150ms ease; }
      .timeline-event:hover { stroke-width: 3; r: 9; }
      .timeline-event.selected { stroke: var(--accent); stroke-width: 3; }
      .timeline-tooltip {
        position: absolute; background: var(--bg-card); border: 1px solid var(--border);
        border-radius: 6px; padding: 8px 12px; font-size: 12px; pointer-events: none;
        box-shadow: var(--shadow-md); z-index: 100; max-width: 280px; line-height: 1.4;
        color: var(--text-primary);
      }
      .timeline-tooltip strong { color: var(--accent); display: block; margin-bottom: 4px; }
    `;
    document.head.appendChild(style);
  }

  const COUNTRIES = [
    { id: 'England',     match: ['İngiltere', 'Britanya', 'Birleşik Krallık'], label: 'İngiltere', color: '#60a5fa' },
    { id: 'France',      match: ['Fransa', 'Latin'], label: 'Fransa', color: '#a78bfa' },
    { id: 'Spain',       match: ['İspanya', 'Portekiz'], label: 'İspanya/Portekiz', color: '#f59e0b' },
    { id: 'Netherlands', match: ['Hollanda'], label: 'Hollanda', color: '#ef4444' },
    { id: 'Italy',       match: ['İtalya', 'Napoli'], label: 'İtalyan kent dev.', color: '#10b981' },
    { id: 'Ottoman',     match: ['Osmanlı', 'Mağrip-Mısır', 'Akdeniz'], label: 'Osmanlı', color: '#2dd4bf' },
    { id: 'Germany',     match: ['Almanya', 'Avusturya'], label: 'Almanya/Avusturya', color: '#f97316' },
    { id: 'Scotland',    match: ['İskoçya'], label: 'İskoçya', color: '#0ea5e9' },
    { id: 'Other',       match: ['Avrupa', 'Türkiye', 'Norveç', 'İsveç'], label: 'Diğer', color: '#9ca3af' }
  ];

  function laneFor(country) {
    for (const c of COUNTRIES) {
      if (c.match.some(m => country.indexOf(m) !== -1)) return c;
    }
    return COUNTRIES[COUNTRIES.length - 1];
  }

  // Anchor event IDs from I1 (events with intermediate + advanced depth)
  const ANCHOR_EVENTS = new Set([
    'evt-1377-mukaddime', 'evt-1492-kolomb', 'evt-1500-price-revolution',
    'evt-1536-kapitulasyon', 'evt-1545-potosi', 'evt-1556-azpilcueta-comentario',
    'evt-1568-bodin-reponse', 'evt-1600-east-india-company', 'evt-1602-voc',
    'evt-1613-serra-breve', 'evt-1631-kocibey-risale', 'evt-1651-navigation-act',
    'evt-1664-mun-treasure-published', 'evt-1664-colbert-tariff',
    'evt-1684-hornigk-osterreich', 'evt-1685-nantes', 'evt-1694-bank-of-england',
    'evt-1700-calico-acts', 'evt-1713-utrecht-asiento', 'evt-1752-hume-political-discourses',
    'evt-1758-quesnay-tableau', 'evt-1776-smith-wealth-of-nations',
    'evt-1817-ricardo-principles', 'evt-1838-balta-limani', 'evt-1989-genc-tez'
  ]);

  function Timeline() {
    this.tooltip = null;
    this.enabledCountries = new Set(COUNTRIES.map(c => c.id));
    this.anchorOnly = false;
  }

  Timeline.prototype.init = function(containerId) {
    injectStyles();
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn('[Timeline] Container not found:', containerId);
      return;
    }
    this.render();
  };

  Timeline.prototype.render = function() {
    if (!window.CONTENT || !window.CONTENT.EVENTS || window.CONTENT.EVENTS.length === 0) {
      return; // placeholder remains
    }
    const self = this;
    const allEvents = window.CONTENT.EVENTS.slice().sort((a, b) => a.year - b.year);
    // Apply filters
    const events = allEvents.filter(ev => {
      const lane = laneFor(ev.country || '');
      if (!self.enabledCountries.has(lane.id)) return false;
      if (self.anchorOnly && !ANCHOR_EVENTS.has(ev.id)) return false;
      return true;
    });

    const minYear = Math.min(1250, events[0].year);
    const maxYear = Math.max(2030, events[events.length - 1].year);
    const yearRange = maxYear - minYear;

    const LANE_HEIGHT = 50, LANE_LABEL_WIDTH = 130, PADDING_TOP = 30, PADDING_RIGHT = 40, TIMELINE_WIDTH = 1700;
    const TOTAL_HEIGHT = PADDING_TOP + COUNTRIES.length * LANE_HEIGHT + 40;
    const TOTAL_WIDTH = LANE_LABEL_WIDTH + TIMELINE_WIDTH + PADDING_RIGHT;

    function xFor(year) { return LANE_LABEL_WIDTH + ((year - minYear) / yearRange) * TIMELINE_WIDTH; }
    function yFor(idx) { return PADDING_TOP + idx * LANE_HEIGHT + LANE_HEIGHT / 2; }

    let svg = `<svg class="timeline-svg" width="${TOTAL_WIDTH}" height="${TOTAL_HEIGHT}" viewBox="0 0 ${TOTAL_WIDTH} ${TOTAL_HEIGHT}">`;
    // Lane bgs + labels
    COUNTRIES.forEach((c, idx) => {
      const y = PADDING_TOP + idx * LANE_HEIGHT;
      svg += `<rect x="${LANE_LABEL_WIDTH}" y="${y}" width="${TIMELINE_WIDTH}" height="${LANE_HEIGHT}" fill="${c.color}" opacity="0.06"/>`;
      svg += `<text class="timeline-lane-label" x="10" y="${y + LANE_HEIGHT / 2 + 4}">${c.label}</text>`;
    });
    // Grid
    svg += `<g class="timeline-grid">`;
    for (let y = Math.ceil(minYear / 50) * 50; y <= maxYear; y += 50) {
      const xc = xFor(y);
      svg += `<line x1="${xc}" y1="${PADDING_TOP}" x2="${xc}" y2="${PADDING_TOP + COUNTRIES.length * LANE_HEIGHT}"/>`;
      svg += `<text class="timeline-year-label" x="${xc}" y="${PADDING_TOP - 10}" text-anchor="middle">${y}</text>`;
    }
    svg += `</g>`;
    // Events
    events.forEach(ev => {
      const lane = laneFor(ev.country || '');
      const laneIdx = COUNTRIES.indexOf(lane);
      svg += `<circle class="timeline-event" data-event-id="${ev.id}" cx="${xFor(ev.year)}" cy="${yFor(laneIdx)}" r="7" fill="${lane.color}" stroke="${lane.color}" stroke-opacity="0.4"/>`;
    });
    svg += `</svg>`;

    // Filter bar (top)
    const filterChecks = COUNTRIES.map(c =>
      `<label><input type="checkbox" data-country="${c.id}" ${self.enabledCountries.has(c.id) ? 'checked' : ''}/><span class="dot" style="background:${c.color}"></span>${c.label}</label>`
    ).join('');
    const anchorChecked = self.anchorOnly ? 'checked' : '';
    const filterBar = `
      <div class="timeline-filter-bar">
        ${filterChecks}
        <label class="anchor-toggle"><input type="checkbox" id="timelineAnchorOnly" ${anchorChecked}/>Sadece anchor olaylar (${ANCHOR_EVENTS.size})</label>
        <button class="reset" id="timelineReset">Sıfırla</button>
        <span style="color:var(--text-muted);">${events.length} / ${allEvents.length} olay</span>
      </div>
    `;
    this.container.innerHTML = `${filterBar}<div class="timeline-wrap">${svg}</div>`;
    this.wireEvents();
    this.wireFilterBar();
  };

  Timeline.prototype.wireFilterBar = function() {
    const self = this;
    this.container.querySelectorAll('input[data-country]').forEach(cb => {
      cb.addEventListener('change', () => {
        if (cb.checked) self.enabledCountries.add(cb.dataset.country);
        else self.enabledCountries.delete(cb.dataset.country);
        self.render();
      });
    });
    const anchor = this.container.querySelector('#timelineAnchorOnly');
    if (anchor) anchor.addEventListener('change', () => {
      self.anchorOnly = anchor.checked;
      self.render();
    });
    const reset = this.container.querySelector('#timelineReset');
    if (reset) reset.addEventListener('click', () => {
      self.enabledCountries = new Set(COUNTRIES.map(c => c.id));
      self.anchorOnly = false;
      self.render();
    });
  };

  Timeline.prototype.wireEvents = function() {
    const self = this;
    this.container.querySelectorAll('.timeline-event').forEach(dot => {
      dot.addEventListener('click', () => {
        const event = window.CONTENT.getEventById(dot.dataset.eventId);
        if (event) {
          self.container.querySelectorAll('.timeline-event.selected').forEach(s => s.classList.remove('selected'));
          dot.classList.add('selected');
          if (typeof window.showDeepDive === 'function') window.showDeepDive(event);
        }
      });
      dot.addEventListener('mouseenter', (e) => {
        const event = window.CONTENT.getEventById(dot.dataset.eventId);
        if (event) self.showTooltip(e, event);
      });
      dot.addEventListener('mouseleave', () => self.hideTooltip());
    });
  };

  Timeline.prototype.showTooltip = function(e, event) {
    this.hideTooltip();
    const tip = document.createElement('div');
    tip.className = 'timeline-tooltip';
    tip.innerHTML = `<strong>${event.year} — ${event.title}</strong>${(event.summary && event.summary.intro) || ''}`;
    document.body.appendChild(tip);
    const rect = e.target.getBoundingClientRect();
    tip.style.left = (rect.left + 20) + 'px';
    tip.style.top = (rect.top - 10) + 'px';
    this.tooltip = tip;
  };

  Timeline.prototype.hideTooltip = function() {
    if (this.tooltip) { this.tooltip.remove(); this.tooltip = null; }
  };

  window.Timeline = new Timeline();

  function autoInit() {
    if (document.getElementById('mainView')) window.Timeline.init('mainView');
    // Re-render when user switches back to timeline view
    const btn = document.getElementById('viewTimeline');
    if (btn) btn.addEventListener('click', () => {
      setTimeout(() => window.Timeline.init('mainView'), 50);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
  else autoInit();
  console.log('[timeline] Module loaded');
})();
