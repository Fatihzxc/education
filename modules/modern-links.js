/**
 * modern-links.js — Güncel olay kartları
 * Her kart: Bugün → Tarihsel paralel → Önemli fark
 * Expose: window.ModernLinks
 */
(function() {
  'use strict';

  function injectStyles() {
    if (document.getElementById('modern-links-styles')) return;
    const style = document.createElement('style');
    style.id = 'modern-links-styles';
    style.textContent = `
      .modern-wrap { padding: 16px; max-width: 1100px; margin: 0 auto; }
      .modern-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; }
      .modern-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px; transition: transform 200ms; }
      .modern-card:hover { transform: translateY(-2px); border-color: var(--accent); }
      .modern-card h3 { color: var(--accent); font-size: 15px; font-weight: 600; margin-bottom: 12px; }
      .modern-section { margin: 10px 0; }
      .modern-section-label { display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; margin-bottom: 4px; }
      .modern-section-label.today { background: rgba(0,212,255,0.15); color: var(--accent); }
      .modern-section-label.history { background: rgba(168,139,250,0.15); color: #a78bfa; }
      .modern-section-label.diff { background: rgba(251,191,36,0.15); color: var(--warning); }
      .modern-section p { color: var(--text-primary); font-size: 13px; line-height: 1.6; }
      .modern-refs { margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--border); }
      .modern-refs .case-ref-chip { display: inline-block; padding: 2px 8px; margin: 2px; font-size: 11px; background: var(--bg-tertiary); border-radius: 10px; color: var(--text-muted); cursor: pointer; }
      .modern-refs .case-ref-chip:hover { background: var(--accent); color: #000; }
    `;
    document.head.appendChild(style);
  }

  function ModernLinks() {}

  ModernLinks.prototype.init = function(containerId) {
    injectStyles();
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.render();
  };

  ModernLinks.prototype.render = function() {
    const links = (window.CONTENT && window.CONTENT.MODERN_LINKS) || [];
    if (links.length === 0) {
      this.container.innerHTML = '<div class="modern-wrap"><p>Güncel bağlantı yok.</p></div>';
      return;
    }
    const cardsHTML = links.map(l => {
      const refsHTML = (l.conceptRefs || []).map(id => `<span class="case-ref-chip" data-cid="${id}">${id}</span>`).join('');
      return `
        <div class="modern-card">
          <h3>${l.title}</h3>
          ${l.today ? `<div class="modern-section"><span class="modern-section-label today">BUGÜN</span><p>${l.today}</p></div>` : ''}
          ${l.historical ? `<div class="modern-section"><span class="modern-section-label history">TARİHSEL PARALEL</span><p>${l.historical}</p></div>` : ''}
          ${l.difference ? `<div class="modern-section"><span class="modern-section-label diff">ÖNEMLİ FARK</span><p>${l.difference}</p></div>` : ''}
          ${refsHTML ? `<div class="modern-refs">${refsHTML}</div>` : ''}
        </div>
      `;
    }).join('');

    this.container.innerHTML = `<div class="modern-wrap"><div class="modern-grid">${cardsHTML}</div></div>`;

    this.container.querySelectorAll('.case-ref-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.dataset.cid;
        const concept = window.CONTENT && window.CONTENT.getConceptById(id);
        if (concept && typeof window.showDeepDive === 'function') window.showDeepDive(concept);
      });
    });
  };

  window.ModernLinks = new ModernLinks();

  function autoInit() {
    if (document.getElementById('panelModern')) window.ModernLinks.init('panelModern');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
  else autoInit();
  console.log('[modern-links] Module loaded');
})();
