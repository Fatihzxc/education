/**
 * deep-dive.js — Sağ panel render enhance + cross-navigation
 * Bootstrap'taki showDeepDive'ı override eder; concept ve event farklı şekillerini handle eder.
 * Expose: window.DeepDive
 */
(function() {
  'use strict';

  function injectStyles() {
    if (document.getElementById('deep-dive-module-styles')) return;
    const style = document.createElement('style');
    style.id = 'deep-dive-module-styles';
    style.textContent = `
      .deep-dive__content .layer { padding: 12px 0; border-bottom: 1px dashed var(--border); }
      .deep-dive__content .layer:last-child { border-bottom: none; }
      .deep-dive__content .layer-label { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; margin-bottom: 6px; }
      .deep-dive__content .layer-label.intro { background: rgba(74,222,128,0.2); color: var(--depth-1); }
      .deep-dive__content .layer-label.intermediate { background: rgba(251,191,36,0.2); color: var(--depth-2); }
      .deep-dive__content .layer-label.advanced { background: rgba(239,68,68,0.2); color: var(--depth-3); }
      .deep-dive__content p { color: var(--text-primary); line-height: 1.6; font-size: 13px; margin: 0; }
      .deep-dive__lens { margin: 0 0 10px; padding: 10px; background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 4px; }
      .deep-dive__lens-title { color: var(--text-primary); font-size: 12px; font-weight: 700; margin-bottom: 8px; }
      .deep-dive__lens-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 7px; }
      .deep-dive__lens-item { padding: 8px; background: var(--bg-card); border-left: 3px solid var(--accent); border-radius: 4px; }
      .deep-dive__lens-item b { display: block; color: var(--text-muted); font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px; }
      .deep-dive__lens-item span { display: block; color: var(--text-primary); font-size: 12px; line-height: 1.5; }
      .deep-dive__trigger { margin-top: 10px; padding: 10px; background: var(--bg-tertiary); border-left: 3px solid var(--warning); border-radius: 4px; font-style: italic; font-size: 12px; color: var(--text-secondary); }
      .deep-dive__related .rel-chip { display: inline-block; padding: 3px 9px; margin: 2px; font-size: 11px; background: var(--bg-tertiary); border-radius: 12px; color: var(--text-secondary); cursor: pointer; transition: background 150ms; }
      .deep-dive__related .rel-chip:hover { background: var(--accent); color: #000; }
      .deep-dive__related .rel-chip.event { background: rgba(96,165,250,0.15); }

      /* MCP live search results panel */
      .deep-dive__mcp { margin-top: 10px; padding: 10px; background: var(--bg-tertiary); border-radius: 6px; font-size: 12px; }
      .deep-dive__mcp h4 { color: var(--accent); font-size: 12px; margin-bottom: 6px; font-weight: 600; }
      .deep-dive__mcp-hit { padding: 8px 0; border-bottom: 1px dashed var(--border); }
      .deep-dive__mcp-hit:last-child { border-bottom: none; }
      .deep-dive__mcp-meta { color: var(--text-muted); font-family: var(--font-mono); font-size: 11px; }
      .deep-dive__mcp-excerpt { color: var(--text-primary); margin-top: 4px; line-height: 1.5; font-style: italic; }
      .deep-dive__mcp-error {
        color: var(--text-secondary); line-height: 1.6;
        padding: 8px 10px; background: var(--bg-card); border-left: 3px solid var(--accent-secondary); border-radius: 0 4px 4px 0;
        font-size: 12px;
      }
      .deep-dive__mcp-error code { background: var(--bg-tertiary); padding: 1px 5px; border-radius: 3px; font-family: var(--font-mono); font-size: 11px; color: var(--text-primary); }
      .deep-dive__mcp-error a, .deep-dive__mcp-empty a { color: var(--accent); cursor: pointer; }
      .deep-dive__mcp-error a:hover, .deep-dive__mcp-empty a:hover { text-decoration: underline; }
      .deep-dive__mcp-empty {
        color: var(--text-secondary); font-size: 12px; line-height: 1.6;
        padding: 8px 10px; background: var(--bg-card); border-left: 3px solid var(--text-muted); border-radius: 0 4px 4px 0;
      }
      .mcp-retry {
        background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 3px;
        color: var(--text-primary); cursor: pointer; padding: 4px 10px;
        font-size: 11px; font-family: var(--font-sans);
      }
      .mcp-retry:hover { border-color: var(--accent); color: var(--accent); }
      .deep-dive__mcp-loading {
        display: flex; align-items: center; gap: 8px;
        color: var(--text-secondary); font-style: italic; padding: 8px 0;
      }
      .mcp-spinner {
        display: inline-block; width: 12px; height: 12px;
        border: 2px solid var(--bg-tertiary); border-top-color: var(--accent);
        border-radius: 50%; animation: mcp-spin 0.8s linear infinite;
      }
      @keyframes mcp-spin { to { transform: rotate(360deg); } }

      /* J3 verdict banner (hybrid mode) — prominent */
      .mcp-verdict-banner {
        display: flex; align-items: center; gap: 12px;
        margin: 8px 0; padding: 12px 14px;
        background: var(--bg-card); border-radius: 6px;
        border: 1px solid var(--border);
      }
      .mcp-verdict-banner.mcp-verdict-supported {
        border-color: var(--success);
        background: linear-gradient(90deg, rgba(74,222,128,0.08), transparent);
      }
      .mcp-verdict-banner.mcp-verdict-weak {
        border-color: var(--warning);
        background: linear-gradient(90deg, rgba(251,191,36,0.08), transparent);
      }
      .mcp-verdict-banner.mcp-verdict-no-evidence {
        border-color: var(--accent-secondary);
        background: linear-gradient(90deg, rgba(239,68,68,0.08), transparent);
      }
      .mcp-verdict-icon { font-size: 22px; font-weight: 700; line-height: 1; }
      .mcp-verdict-text { flex: 1; font-size: 12px; line-height: 1.4; color: var(--text-primary); }
      .mcp-verdict-text strong { display: block; font-weight: 600; }
      .mcp-verdict-conf {
        display: block; color: var(--text-muted); font-size: 10.5px;
        font-family: var(--font-mono); margin-top: 3px;
      }
      /* J3: search mode toggle + verdict */
      .mcp-mode-toggle { display: inline-flex; gap: 0; margin-left: 8px; border: 1px solid var(--border); border-radius: 4px; overflow: hidden; }
      .mcp-mode-toggle button { background: var(--bg-tertiary); border: none; color: var(--text-secondary); padding: 3px 9px; cursor: pointer; font-size: 11px; font-family: var(--font-sans); }
      .mcp-mode-toggle button.active { background: var(--accent); color: #000; font-weight: 600; }
      .mcp-mode-toggle button:hover:not(.active) { background: var(--bg-card-hover); color: var(--text-primary); }
      .verdict-badge { display: inline-block; padding: 2px 9px; border-radius: 10px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-left: 6px; }
      .verdict-badge.supported { background: rgba(74,222,128,0.2); color: var(--success); border: 1px solid var(--success); }
      .verdict-badge.weak { background: rgba(251,191,36,0.2); color: var(--warning); border: 1px solid var(--warning); }
      .verdict-badge.no-evidence { background: rgba(239,68,68,0.2); color: var(--accent-secondary); border: 1px solid var(--accent-secondary); }
      .verdict-confidence { display: inline-flex; align-items: center; gap: 4px; margin-left: 6px; font-size: 10px; color: var(--text-muted); }
      .verdict-confidence-bar { width: 50px; height: 4px; background: var(--bg-tertiary); border-radius: 2px; overflow: hidden; }
      .verdict-confidence-bar > span { display: block; height: 100%; background: var(--accent); }
      .deep-dive__source-list { display: grid; gap: 8px; }
      .deep-dive__source-ref { padding: 8px; background: var(--bg-tertiary); border-left: 3px solid var(--accent); border-radius: 4px; }
      .deep-dive__source-ref blockquote { margin: 0; color: var(--text-primary); font-size: 12px; line-height: 1.5; }
      .deep-dive__source-ref cite { display: block; margin-top: 5px; color: var(--text-muted); font-size: 11px; font-style: normal; }
      .deep-dive__source-ref .claim { display: block; margin-top: 4px; color: var(--text-secondary); font-size: 11px; }
    `;
    document.head.appendChild(style);
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function navigate(targetId) {
    const concept = window.CONTENT && window.CONTENT.getConceptById(targetId);
    const event = window.CONTENT && window.CONTENT.getEventById(targetId);
    const item = concept || event;
    if (item) window.showDeepDive(item);
  }

  function renderLens(lens) {
    if (!lens) return '';
    const rows = [
      ['Kök sebep', lens.root],
      ['Baskın bakış', lens.dominant],
      ['Karşı fikir', lens.counter],
      ['Halkta görünüm', lens.publicEye],
      ['Kontrol sorusu', lens.control]
    ].filter(row => row[1]);
    if (!rows.length) return '';
    return `
      <div class="deep-dive__lens" aria-label="Okuma merceği">
        <div class="deep-dive__lens-title">Okuma merceği</div>
        <div class="deep-dive__lens-grid">
          ${rows.map(row => `<div class="deep-dive__lens-item"><b>${escapeHtml(row[0])}</b><span>${escapeHtml(row[1])}</span></div>`).join('')}
        </div>
      </div>
    `;
  }

  function renderConcept(item, depth) {
    const d = item.depth || {};
    let html = renderLens(item.lens);
    if (d.intro && depth >= 1) html += `<div class="layer depth-1"><span class="layer-label intro">🌱 Giriş</span><p>${d.intro}</p></div>`;
    if (d.intermediate && depth >= 2) html += `<div class="layer depth-2"><span class="layer-label intermediate">🌳 Orta</span><p>${d.intermediate}</p></div>`;
    if (d.advanced && depth >= 3) html += `<div class="layer depth-3"><span class="layer-label advanced">🌲 İleri</span><p>${d.advanced}</p></div>`;
    if (d['tetikleyici-soru']) html += `<div class="deep-dive__trigger">💭 ${d['tetikleyici-soru']}</div>`;
    return html;
  }

  function renderEvent(item, depth) {
    let html = renderLens(item.lens) + `<div class="layer"><p><strong>${item.year}</strong> — ${item.country || ''}</p></div>`;
    const s = item.summary || {};
    if (s.intro) html += `<div class="layer depth-1"><span class="layer-label intro">🌱 Özet</span><p>${s.intro}</p></div>`;
    if (s.intermediate && depth >= 2) html += `<div class="layer depth-2"><span class="layer-label intermediate">🌳 Orta</span><p>${s.intermediate}</p></div>`;
    if (s.advanced && depth >= 3) html += `<div class="layer depth-3"><span class="layer-label advanced">🌲 İleri</span><p>${s.advanced}</p></div>`;
    return html;
  }

  function isVerifiedSourceRef(ref) {
    if (!ref || !ref.quote || !ref.source) return false;
    if (ref.page === 0 || ref.page === null || ref.page === undefined) return false;
    const quote = String(ref.quote);
    if (quote.indexOf('MCP-pending') !== -1 || quote === '[MCP-pending]') return false;
    if (ref.status === 'pending_mcp_excerpt') return false;
    return true;
  }

  function renderSourceRefs(refs) {
    return `<div class="deep-dive__source-list">${refs.map(ref => {
      const source = window.CONTENT && window.CONTENT.getSourceById && window.CONTENT.getSourceById(ref.source);
      const title = source ? `${source.author || ref.source} — ${source.title || ref.source}` : ref.source;
      const validation = ref.validation && ref.validation.status ? ` · ${ref.validation.status}` : '';
      const claim = ref.claim ? `<span class="claim">${escapeHtml(ref.claim)}</span>` : '';
      return `<div class="deep-dive__source-ref">
        <blockquote>“${escapeHtml(ref.quote)}”</blockquote>
        <cite>${escapeHtml(title)}, s.${escapeHtml(ref.page)}${escapeHtml(validation)}</cite>
        ${claim}
      </div>`;
    }).join('')}</div>`;
  }

  // Override global showDeepDive (defer to win race against inline script)
  const _enhancedShowDeepDive = function(item) {
    _currentItem = item;
    if (window.APP) window.APP.selectedItem = item;
    const els = {
      title: document.getElementById('deepDiveTitle'),
      era: document.getElementById('deepDiveEra'),
      content: document.getElementById('deepDiveContent'),
      source: document.getElementById('deepDiveSource'),
      quote: document.getElementById('deepDiveQuote'),
      cite: document.getElementById('deepDiveCite'),
      searchBtn: document.getElementById('deepDiveSearchBtn'),
      related: document.getElementById('deepDiveRelated')
    };
    if (!els.title) return;

    // Clean any prior MCP search results panel
    const oldMcp = document.getElementById('deepDiveMcpResults');
    if (oldMcp) oldMcp.remove();

    if (!item) {
      els.title.textContent = 'Bir öğe seçin';
      els.era.textContent = '';
      els.content.innerHTML = '<div class="deep-dive__empty">Zaman çizelgesinden bir olaya ya da kavram haritasından bir düğüme tıklayarak detayları görüntüleyin.</div>';
      els.source.style.display = 'none';
      els.searchBtn.style.display = 'none';
      els.related.innerHTML = '';
      return;
    }

    const depth = (window.APP && window.APP.activeDepth) || 1;

    els.title.textContent = item.label || item.title || '';
    els.era.textContent = item.era || (item.year ? String(item.year) : '');

    // Render content based on type
    let html = '';
    if (item.depth) html = renderConcept(item, depth);
    else if (item.summary || item.year) html = renderEvent(item, depth);
    else html = '<div class="deep-dive__empty">İçerik bulunamadı.</div>';
    els.content.innerHTML = html;

    // Verified source quotes: render only in advanced depth and only for real refs.
    const sourceRefs = item.sourceRefs || [];
    const verifiedRefs = sourceRefs.filter(isVerifiedSourceRef);
    if (depth >= 3 && verifiedRefs.length) {
      els.source.style.display = 'block';
      els.quote.innerHTML = renderSourceRefs(verifiedRefs);
      els.cite.textContent = '';
      els.searchBtn.style.display = 'inline-flex';
      els.searchBtn.textContent = '🔍 Kaynakta daha fazla ara';
    } else if (sourceRefs.length) {
      els.source.style.display = 'none';
      els.searchBtn.style.display = 'inline-flex';
      els.searchBtn.textContent = '🔍 Kaynakta ara (MCP)';
    } else {
      els.source.style.display = 'none';
      els.searchBtn.style.display = item.label ? 'inline-flex' : 'none';
      els.searchBtn.textContent = '🔍 Kaynaklarda ara';
    }

    // Related chips: concepts + events
    els.related.innerHTML = '';
    const related = item.related || [];
    related.forEach(r => {
      const targetId = r.to || r;
      const target = window.CONTENT && window.CONTENT.getConceptById(targetId);
      if (target) {
        const chip = document.createElement('span');
        chip.className = 'rel-chip';
        chip.textContent = target.label;
        if (r.type) chip.title = r.type;
        chip.addEventListener('click', () => navigate(targetId));
        els.related.appendChild(chip);
      }
    });
    // Also show related events for concepts
    if (item.events) {
      item.events.forEach(eid => {
        const ev = window.CONTENT && window.CONTENT.getEventById(eid);
        if (ev) {
          const chip = document.createElement('span');
          chip.className = 'rel-chip event';
          chip.textContent = `${ev.year} ${ev.title.substring(0, 30)}${ev.title.length > 30 ? '…' : ''}`;
          chip.addEventListener('click', () => navigate(eid));
          els.related.appendChild(chip);
        }
      });
    }
    // For events: show related concepts
    if (item.conceptRefs) {
      item.conceptRefs.forEach(cid => {
        const c = window.CONTENT && window.CONTENT.getConceptById(cid);
        if (c) {
          const chip = document.createElement('span');
          chip.className = 'rel-chip';
          chip.textContent = c.label;
          chip.addEventListener('click', () => navigate(cid));
          els.related.appendChild(chip);
        }
      });
    }
  };

  // ===========================================================
  // MCP HTTP bridge integration (I2, refactored to use mcp-config helper)
  // ===========================================================
  let _currentItem = null;
  let _currentMode = 'bm25';
  let _activeSearchController = null;  // AbortController for in-flight search

  const MODE_CONFIG = {
    bm25:     { label: 'BM25',     endpoint: '/tools/search_sources',  bodyKey: 'query',  payloadField: 'hits',     timeoutMs: 5000 },
    semantic: { label: 'Semantik', endpoint: '/tools/semantic_search', bodyKey: 'query',  payloadField: 'hits',     timeoutMs: 25000 },
    hybrid:   { label: 'Hybrid',   endpoint: '/tools/verify_claim',    bodyKey: 'claim',  payloadField: 'evidence', timeoutMs: 30000 }
  };

  function buildQuery(item) {
    return (item.label || item.title || '')
      .replace(/\([^)]*\)/g, '')
      .replace(/Aziz |Sultan /gi, '')
      .trim();
  }

  function ensureMcpEl() {
    const content = document.getElementById('deepDiveContent');
    if (!content) return null;
    let mcpEl = document.getElementById('deepDiveMcpResults');
    if (!mcpEl) {
      mcpEl = document.createElement('div');
      mcpEl.id = 'deepDiveMcpResults';
      mcpEl.className = 'deep-dive__mcp';
      content.parentNode.insertBefore(mcpEl, content.nextSibling);
    }
    return mcpEl;
  }

  function modeToggleHtml(active) {
    return `<span class="mcp-mode-toggle" role="tablist">
      ${['bm25', 'semantic', 'hybrid'].map(m =>
        `<button data-mode="${m}" class="${m === active ? 'active' : ''}" role="tab" aria-selected="${m === active}">${MODE_CONFIG[m].label}</button>`
      ).join('')}
    </span>`;
  }

  function wireModeToggle(mcpEl, item) {
    mcpEl.querySelectorAll('.mcp-mode-toggle button').forEach(btn => {
      btn.addEventListener('click', () => searchInSources(item, btn.dataset.mode));
    });
    const retry = mcpEl.querySelector('.mcp-retry');
    if (retry) retry.addEventListener('click', () => searchInSources(item, _currentMode));
    const reindexLink = mcpEl.querySelector('.mcp-open-reindex');
    if (reindexLink) reindexLink.addEventListener('click', (e) => {
      e.preventDefault();
      const btn = document.getElementById('reindexIndicator');
      if (btn) btn.click();
    });
  }

  function verdictBadge(verdict, confidence) {
    if (!verdict) return '';
    const labelMap = { supported: '✓ Doğrulandı', weak: '~ Zayıf kanıt', 'no-evidence': '✗ Kanıt yok' };
    const conf = typeof confidence === 'number' ? Math.round(confidence * 100) : null;
    const bar = conf !== null
      ? `<span class="verdict-confidence" title="Güven skoru"><span class="verdict-confidence-bar"><span style="width:${conf}%"></span></span>${conf}%</span>`
      : '';
    return `<span class="verdict-badge ${verdict}">${labelMap[verdict] || verdict}</span>${bar}`;
  }

  function renderVerdictBanner(data) {
    // Big verdict block for hybrid mode at top
    if (!data || !data.verdict) return '';
    const verdict = data.verdict;
    const labels = {
      supported: { icon: '✓', text: 'İddia kaynaklarca destekleniyor', color: 'var(--success)' },
      weak: { icon: '~', text: 'Kaynaklarda zayıf destek bulundu', color: 'var(--warning)' },
      'no-evidence': { icon: '✗', text: 'Kaynaklarda destek bulunamadı', color: 'var(--accent-secondary)' }
    };
    const v = labels[verdict] || labels['no-evidence'];
    const conf = typeof data.confidence === 'number' ? Math.round(data.confidence * 100) : null;
    return `<div class="mcp-verdict-banner mcp-verdict-${verdict}">
      <div class="mcp-verdict-icon" style="color:${v.color}">${v.icon}</div>
      <div class="mcp-verdict-text">
        <strong>${v.text}</strong>
        ${conf !== null ? `<span class="mcp-verdict-conf">güven: ${conf}%</span>` : ''}
      </div>
    </div>`;
  }

  function renderLoadingState(mcpEl, query, mode, cfg) {
    mcpEl.innerHTML = `
      <h4>📖 ${cfg.label}: "${escapeHtml(query.substring(0, 60))}" ${modeToggleHtml(mode)}</h4>
      <div class="deep-dive__mcp-loading">
        <span class="mcp-spinner" aria-hidden="true"></span>
        <span>${mode === 'semantic' ? 'Embedding hesaplanıyor… (5-15s)' : mode === 'hybrid' ? 'BM25 + semantik birleşik aranıyor…' : 'Aranıyor…'}</span>
      </div>
    `;
    wireModeToggle(mcpEl, _currentItem);
  }

  function renderErrorState(mcpEl, query, mode, cfg, errKind, errMsg) {
    const explanations = {
      offline: `<strong>MCP köprüsü kapalı.</strong> Başlatmak için terminal'de: <code>cd kb-mcp &amp;&amp; .venv/bin/python -m src.http_bridge</code>`,
      timeout: `<strong>Köprü zamanında yanıt vermedi.</strong> Semantik indeks yüklenmiyor olabilir; <a href="#" class="mcp-open-reindex">indeks panelini aç</a> ve durumu kontrol et.`,
      http: `<strong>Köprü hatası (${escapeHtml(errMsg)}).</strong> İndeks bozulmuş olabilir.`,
      parse: `<strong>Köprü geçersiz yanıt verdi.</strong>`,
      cancelled: `<em>Arama iptal edildi.</em>`,
    };
    const expl = explanations[errKind] || `<strong>Bilinmeyen hata:</strong> ${escapeHtml(errMsg || '')}`;
    mcpEl.innerHTML = `
      <h4>📖 ${cfg.label}: "${escapeHtml(query.substring(0, 60))}" ${modeToggleHtml(mode)}</h4>
      <div class="deep-dive__mcp-error">
        ${expl}
        ${errKind !== 'cancelled' ? '<div style="margin-top:8px;"><button class="mcp-retry">Tekrar dene</button></div>' : ''}
      </div>
    `;
    wireModeToggle(mcpEl, _currentItem);
  }

  function renderEmptyState(mcpEl, query, mode, cfg) {
    const hint = mode === 'semantic'
      ? `Semantik indeks boş olabilir. <a href="#" class="mcp-open-reindex">İndeks panelini açıp</a> "+ Semantik" reindex çalıştır.`
      : mode === 'hybrid'
        ? `Hem BM25 hem semantik aramada eşleşme yok.`
        : `Farklı anahtar kelime dene veya <a href="#" class="mcp-open-reindex">indeks durumunu kontrol et</a>.`;
    mcpEl.innerHTML = `
      <h4>📖 ${cfg.label}: "${escapeHtml(query.substring(0, 60))}" ${modeToggleHtml(mode)}</h4>
      <div class="deep-dive__mcp-empty">Eşleşme yok. ${hint}</div>
    `;
    wireModeToggle(mcpEl, _currentItem);
  }

  async function searchInSources(item, mode) {
    if (!item) return;
    mode = mode || _currentMode || 'bm25';
    _currentMode = mode;
    const cfg = MODE_CONFIG[mode];
    const query = buildQuery(item);
    const mcpEl = ensureMcpEl();
    if (!mcpEl) return;

    // Cancel any in-flight search
    if (_activeSearchController) {
      try { _activeSearchController.abort('superseded'); } catch (e) {}
    }
    _activeSearchController = new AbortController();

    renderLoadingState(mcpEl, query, mode, cfg);

    const body = { top_k: 3 };
    body[cfg.bodyKey] = query;

    const r = await window.MerkantilizmMCP.mcpFetch(cfg.endpoint, {
      method: 'POST',
      body,
      timeoutMs: cfg.timeoutMs,
      signal: _activeSearchController.signal,
    });

    if (!r.ok) {
      // If we were superseded by a new search, the new one already rendered something
      if (r.kind === 'cancelled') return;
      renderErrorState(mcpEl, query, mode, cfg, r.kind, r.error);
      return;
    }
    renderMcpResults(mcpEl, query, r.data, mode, item);
  }

  function renderMcpResults(mcpEl, query, data, mode, item) {
    const cfg = MODE_CONFIG[mode];
    const items = data[cfg.payloadField] || data.hits || [];

    if (!items.length) {
      renderEmptyState(mcpEl, query, mode, cfg);
      return;
    }

    const verdictBanner = mode === 'hybrid' ? renderVerdictBanner(data) : '';
    const inlineBadge = mode === 'hybrid' && data.verdict ? verdictBadge(data.verdict, data.confidence) : '';

    const hits = items.slice(0, 3).map(h => {
      const text = h.excerpt || h.quote || '';
      const safe = escapeHtml(String(text)).replace(/\[/g, '<mark>').replace(/\]/g, '</mark>');
      const score = typeof h.score === 'number' ? h.score.toFixed(3) : (h.score != null ? h.score : '');
      const semScore = h.semanticScore ? ` · sem=${Number(h.semanticScore).toFixed(2)}` : '';
      const bm25Rank = h.bm25Rank != null ? ` · BM25 #${h.bm25Rank}` : '';
      const cite = h.author ? `${escapeHtml(h.author)} — ${escapeHtml(h.title || h.sourceId)}, s.${escapeHtml(h.page)}`
                            : `${escapeHtml(h.title || h.sourceId)}, s.${escapeHtml(h.page)}`;
      return `<div class="deep-dive__mcp-hit">
        <div class="deep-dive__mcp-meta">${cite}${score ? ' · score=' + score : ''}${semScore}${bm25Rank}</div>
        <div class="deep-dive__mcp-excerpt">…${safe}…</div>
      </div>`;
    }).join('');

    mcpEl.innerHTML = `
      <h4>📖 ${cfg.label}: "${escapeHtml(query.substring(0, 60))}" <span style="color:var(--text-muted);font-weight:400;">${items.length} eşleşme</span> ${modeToggleHtml(mode)} ${inlineBadge}</h4>
      ${verdictBanner}
      ${hits}
    `;
    wireModeToggle(mcpEl, item);
  }

  // ===========================================================
  // Deep-link via URL hash (I7)
  // ===========================================================
  function syncUrlHash(item) {
    if (!item || !item.id) return;
    const prefix = item.depth ? 'concept' : 'event';
    const newHash = `#${prefix}/${item.id}`;
    if (location.hash !== newHash) {
      history.replaceState(null, '', newHash);
    }
  }

  function loadFromHash() {
    const h = location.hash || '';
    const m = h.match(/^#(concept|event)\/(.+)$/);
    if (!m) return;
    const [, kind, id] = m;
    const item = kind === 'concept'
      ? (window.CONTENT && window.CONTENT.getConceptById(id))
      : (window.CONTENT && window.CONTENT.getEventById(id));
    if (item) {
      _enhancedShowDeepDive(item);
      // Scroll selection into view (timeline) if applicable
      if (kind === 'event') {
        const dot = document.querySelector(`[data-event-id="${id}"]`);
        if (dot && dot.scrollIntoView) dot.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }
  }

  function DeepDive() {}
  DeepDive.prototype.show = function(item) { _enhancedShowDeepDive(item); };
  DeepDive.prototype.init = function() {
    injectStyles();
    // Override AFTER inline bootstrap has defined its own (which hoists at parse).
    // Also wrap to sync URL hash on each selection.
    const baseShow = _enhancedShowDeepDive;
    window.showDeepDive = function(item) { baseShow(item); syncUrlHash(item); };

    // React to manual hash changes (back/forward, copy-paste URL)
    window.addEventListener('hashchange', loadFromHash);
    // Try once on load (delayed so content fragments register first)
    setTimeout(loadFromHash, 600);
    // Wire up the "Kaynakta ara" button to actually call MCP
    const btn = document.getElementById('deepDiveSearchBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        if (_currentItem) searchInSources(_currentItem);
      });
    }
    // Listen for the legacy custom event from inline bootstrap
    window.addEventListener('merkantilizm:search-source', () => {
      if (_currentItem) searchInSources(_currentItem);
    });
    // Clean up MCP panel when selection changes
    const origShow = _enhancedShowDeepDive;
    // Already overridden above; intercept by wrapping
  };

  window.DeepDive = new DeepDive();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.DeepDive.init());
  } else {
    window.DeepDive.init();
  }
  console.log('[deep-dive] Module loaded (showDeepDive enhanced)');
})();
