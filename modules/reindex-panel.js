/**
 * reindex-panel.js — Slim topbar indicator + feature-rich MCP status popover.
 *
 * Topbar: tiny pill — [● ] idle / [●● 43%] running / [○ köprü] offline.
 * Popover (on click): full MCP dashboard with bridge status, source roster,
 * indexing breakdown, embedding model, semantic availability, and reindex
 * controls.
 *
 * Works in both book.html and appendix/playground.html (injects next to
 * #themeToggle in either topbar).
 *
 * Expose: window.ReindexPanel
 */
(function() {
  'use strict';

  const POLL_INTERVAL_MS = 1500;
  const HEALTH_CHECK_INTERVAL_MS = 8000;
  const LIST_REFRESH_INTERVAL_MS = 12000;

  // Delegated to window.MerkantilizmMCP (mcp-config.js)
  function mcpFetch(path, opts) {
    if (!window.MerkantilizmMCP) return Promise.resolve({ ok: false, error: 'mcp-config.js not loaded', kind: 'offline' });
    return window.MerkantilizmMCP.mcpFetch(path, opts);
  }
  function mcpUrl() { return (window.MerkantilizmMCP && window.MerkantilizmMCP.getUrl()) || 'http://127.0.0.1:8766'; }

  let _pollTimer = null;
  let _healthTimer = null;

  const _state = {
    bridgeOnline: false,
    bridgeError: null,   // last error kind: 'offline'|'timeout'|'http'|null
    running: false,
    progress: null,    // /tools/reindex_progress payload while running
    result: null,      // final outcome from a finished reindex
    sources: null,     // /tools/list_sources payload (cached)
    sourcesFetchedAt: 0,
    popoverOpen: false,
    activeTab: 'durum', // 'durum' | 'kaynaklar' | 'reindex'
  };

  function injectStyles() {
    if (document.getElementById('reindex-indicator-styles')) return;
    const style = document.createElement('style');
    style.id = 'reindex-indicator-styles';
    style.textContent = `
      .reindex-indicator {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 4px 9px; border: 1px solid var(--border); border-radius: 12px;
        font-size: 11px; font-family: var(--font-mono); color: var(--text-secondary);
        cursor: pointer; user-select: none; background: transparent; line-height: 1;
        transition: border-color 150ms, color 150ms;
      }
      .reindex-indicator:hover { color: var(--text-primary); border-color: var(--accent); }
      .reindex-indicator-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--text-muted); display: inline-block; flex-shrink: 0; }
      .reindex-indicator-dot.online { background: var(--success); }
      .reindex-indicator-dot.busy { background: var(--warning); animation: ri-pulse 1.1s ease-in-out infinite; }
      .reindex-indicator-dot.error { background: var(--accent-secondary); }
      @keyframes ri-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1.35); }
      }
      .reindex-indicator-percent { color: var(--accent); font-weight: 600; letter-spacing: 0.2px; }

      /* ---------- Popover shell ---------- */
      .rx-popover {
        position: fixed; z-index: 9999;
        min-width: 320px;
        width: min(440px, calc(100vw - 16px));
        background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;
        box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        font-family: var(--font-sans); font-size: 12px; color: var(--text-primary);
        display: none; overflow: hidden;
      }
      .rx-popover.open { display: block; }
      @media (max-width: 480px) {
        .rx-popover {
          min-width: 0;
          width: calc(100vw - 16px);
          left: 8px !important; right: 8px !important;
        }
      }

      .rx-pop-head {
        display: flex; align-items: center; gap: 8px;
        padding: 11px 14px;
        border-bottom: 1px solid var(--border);
        background: var(--bg-tertiary);
      }
      .rx-pop-head .rx-title {
        font-weight: 600; color: var(--accent); font-size: 12px;
        display: flex; align-items: center; gap: 6px;
      }
      .rx-pop-head .rx-status {
        margin-left: auto; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);
      }
      .rx-pop-head .rx-close {
        background: none; border: none; color: var(--text-muted); cursor: pointer;
        font-size: 16px; padding: 0 4px; line-height: 1;
      }
      .rx-pop-head .rx-close:hover { color: var(--text-primary); }

      /* ---------- Tabs ---------- */
      .rx-tabs {
        display: flex; border-bottom: 1px solid var(--border); background: var(--bg-card);
      }
      .rx-tabs button {
        flex: 1; padding: 8px 0;
        background: none; border: none; border-bottom: 2px solid transparent;
        color: var(--text-secondary); font-family: var(--font-sans); font-size: 11px;
        cursor: pointer; transition: color 120ms, border-color 120ms;
      }
      .rx-tabs button:hover { color: var(--text-primary); }
      .rx-tabs button.active {
        color: var(--accent); border-bottom-color: var(--accent); font-weight: 500;
      }

      .rx-pop-body { padding: 12px 14px; max-height: 460px; overflow-y: auto; }

      /* ---------- Status tab ---------- */
      .rx-stats {
        display: grid; grid-template-columns: 1fr 1fr;
        gap: 8px 16px; margin-bottom: 12px;
      }
      .rx-stat {
        font-family: var(--font-mono); font-size: 10.5px; color: var(--text-muted);
        line-height: 1.5;
      }
      .rx-stat strong {
        display: block; font-family: var(--font-sans); font-size: 14px;
        font-weight: 600; color: var(--text-primary); margin-bottom: 2px;
        letter-spacing: -0.2px;
      }
      .rx-stat .rx-stat-extra { color: var(--text-muted); font-size: 10px; }

      .rx-model {
        margin: 4px 0 10px; padding: 8px 10px;
        background: var(--bg-tertiary); border-radius: 4px;
        font-family: var(--font-mono); font-size: 10.5px; color: var(--text-secondary);
        word-break: break-all; line-height: 1.5;
      }
      .rx-model strong { color: var(--text-primary); font-family: var(--font-sans); }
      .rx-model-chip {
        display: inline-block; padding: 1px 6px; border-radius: 8px;
        font-size: 9.5px; font-weight: 600; letter-spacing: 0.3px; text-transform: uppercase;
        margin-left: 6px;
      }
      .rx-model-chip.on { background: rgba(74,222,128,0.18); color: var(--success); border: 1px solid var(--success); }
      .rx-model-chip.off { background: rgba(239,68,68,0.18); color: var(--accent-secondary); border: 1px solid var(--accent-secondary); }

      /* ---------- Progress block ---------- */
      .rx-progress { margin: 8px 0 4px; }
      .rx-progress .rx-meta {
        display: flex; justify-content: space-between;
        font-family: var(--font-mono); font-size: 10.5px;
        color: var(--text-muted); margin-bottom: 4px;
      }
      .rx-progress .rx-bar {
        height: 6px; background: var(--bg-tertiary); border-radius: 3px;
        overflow: hidden; border: 1px solid var(--border);
      }
      .rx-progress .rx-bar > span {
        display: block; height: 100%;
        background: linear-gradient(90deg, var(--accent), var(--success));
        width: 0%; transition: width 300ms ease-out;
      }
      .rx-progress .rx-current {
        color: var(--text-secondary); margin-top: 5px; font-family: var(--font-mono);
        font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }

      /* ---------- Result block ---------- */
      .rx-result {
        margin-top: 10px; padding: 7px 10px;
        background: var(--bg-tertiary); border-left: 3px solid var(--success);
        border-radius: 0 4px 4px 0;
        font-size: 11px; line-height: 1.5; color: var(--text-secondary);
      }
      .rx-result.error { border-left-color: var(--accent-secondary); }
      .rx-result strong { color: var(--text-primary); }

      /* ---------- Sources table ---------- */
      .rx-source-list {
        font-family: var(--font-mono); font-size: 10.5px;
        max-height: 380px; overflow-y: auto;
      }
      .rx-source-row {
        display: grid; grid-template-columns: 14px 1fr auto;
        gap: 6px; align-items: baseline;
        padding: 5px 0;
        border-bottom: 1px dashed var(--border);
      }
      .rx-source-row:last-child { border-bottom: none; }
      .rx-source-row .rx-src-dot { color: var(--text-muted); font-size: 9px; }
      .rx-source-row .rx-src-dot.idx { color: var(--success); }
      .rx-source-row .rx-src-dot.semantic { color: var(--accent); }
      .rx-source-row .rx-src-dot.unidx { color: var(--text-muted); }
      .rx-source-row .rx-src-title {
        color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
      .rx-source-row .rx-src-meta { color: var(--text-muted); font-size: 9.5px; }

      .rx-filter {
        display: flex; gap: 4px; margin-bottom: 8px;
      }
      .rx-filter button {
        flex: 1; padding: 4px 8px; font-size: 10px;
        background: var(--bg-tertiary); border: 1px solid var(--border);
        border-radius: 3px; color: var(--text-secondary); cursor: pointer;
        font-family: var(--font-sans);
      }
      .rx-filter button.active { background: var(--accent); color: #000; border-color: var(--accent); font-weight: 600; }

      /* ---------- Reindex actions ---------- */
      .rx-actions {
        display: flex; gap: 6px; margin-top: 12px;
      }
      .rx-actions button {
        flex: 1; padding: 7px 10px;
        background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 4px;
        color: var(--text-primary); cursor: pointer;
        font-family: var(--font-sans); font-size: 11px;
        transition: border-color 120ms;
      }
      .rx-actions button:hover:not(:disabled) { border-color: var(--accent); }
      .rx-actions button.primary {
        background: var(--accent); color: #000; border-color: var(--accent); font-weight: 500;
      }
      .rx-actions button:disabled { opacity: 0.4; cursor: not-allowed; }

      .rx-reindex-help {
        color: var(--text-muted); font-size: 10.5px; line-height: 1.55;
        margin-top: 10px;
      }
      .rx-bridge-hint {
        margin-top: 6px; padding: 8px 10px;
        background: var(--bg-tertiary); border-radius: 4px;
        font-family: var(--font-mono); font-size: 10.5px; color: var(--text-muted);
        word-break: break-all; line-height: 1.5;
      }
      .rx-bridge-hint code { color: var(--text-primary); }

      .rx-loading { text-align: center; padding: 20px; color: var(--text-muted); font-size: 11px; }

      /* ---------- URL editor ---------- */
      .rx-url-row {
        display: flex; gap: 4px; align-items: center;
        margin-top: 12px;
      }
      .rx-url-label {
        font-size: 10.5px; color: var(--text-muted); flex-shrink: 0;
        font-family: var(--font-mono);
      }
      .rx-url-input {
        flex: 1; min-width: 0;
        padding: 4px 7px;
        background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 3px;
        color: var(--text-primary); font-family: var(--font-mono); font-size: 10.5px;
        outline: none;
      }
      .rx-url-input:focus { border-color: var(--accent); }
      .rx-url-save {
        background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 3px;
        color: var(--accent); cursor: pointer; padding: 3px 8px; font-size: 11px;
        line-height: 1;
      }
      .rx-url-save:hover { background: var(--accent); color: #000; }
      .rx-url-help { font-size: 10px; color: var(--text-muted); margin-top: 3px; font-family: var(--font-mono); }
      .rx-url-help code { color: var(--text-secondary); background: var(--bg-tertiary); padding: 0 3px; border-radius: 2px; }
    `;
    document.head.appendChild(style);
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function findTopbarInsertionPoint() {
    const theme = document.getElementById('themeToggle');
    if (theme && theme.parentNode) return { parent: theme.parentNode, before: theme };
    const topbar = document.querySelector('.topbar, .book-header');
    if (topbar) return { parent: topbar, before: null };
    return null;
  }

  function fmtNum(n) {
    if (n == null) return '—';
    return Number(n).toLocaleString('tr-TR');
  }

  function fmtTime(iso) {
    if (!iso) return '';
    try { return new Date(iso).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
    catch (e) { return ''; }
  }

  // ----- Rendering -----

  function renderIndicator() {
    const indicator = document.getElementById('reindexIndicator');
    if (!indicator) return;
    const dotClass = !_state.bridgeOnline ? 'error' : _state.running ? 'busy' : 'online';
    const pct = _state.running && _state.progress
      ? `<span class="reindex-indicator-percent">${(_state.progress.percent || 0).toFixed(0)}%</span>`
      : '';
    const offline = !_state.bridgeOnline ? 'köprü' : '';
    indicator.innerHTML = `<span class="reindex-indicator-dot ${dotClass}"></span>${pct}${offline}`;
    indicator.title = !_state.bridgeOnline
      ? 'MCP köprüsü kapalı — tıkla'
      : _state.running
        ? `${_state.progress?.currentSource || '…'} · ${(_state.progress?.percent || 0).toFixed(1)}%`
        : 'MCP — tıkla';
  }

  function renderPopover() {
    const pop = document.getElementById('reindexPopover');
    if (!pop) return;
    const statusText = !_state.bridgeOnline ? 'köprü kapalı'
      : _state.running ? 'çalışıyor' : 'hazır';

    const tabs = ['durum', 'kaynaklar', 'reindex'];
    const tabLabels = { durum: 'Durum', kaynaklar: 'Kaynaklar', reindex: 'Yeniden indeksle' };
    const tabBtns = tabs.map(t => `<button data-tab="${t}" class="${t === _state.activeTab ? 'active' : ''}">${tabLabels[t]}</button>`).join('');

    let body;
    if (!_state.bridgeOnline) body = renderOfflineBody();
    else if (_state.activeTab === 'kaynaklar') body = renderSourcesTab();
    else if (_state.activeTab === 'reindex') body = renderReindexTab();
    else body = renderStatusTab();

    pop.innerHTML = `
      <div class="rx-pop-head">
        <span class="rx-title">
          <span class="reindex-indicator-dot ${!_state.bridgeOnline ? 'error' : _state.running ? 'busy' : 'online'}"></span>
          MCP Bilgi Tabanı
        </span>
        <span class="rx-status">${statusText}</span>
        <button class="rx-close" id="rxClose" aria-label="Kapat">×</button>
      </div>
      <div class="rx-tabs">${tabBtns}</div>
      <div class="rx-pop-body">${body}</div>
    `;

    pop.querySelector('#rxClose')?.addEventListener('click', (e) => { e.stopPropagation(); closePopover(); });
    pop.querySelectorAll('.rx-tabs button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        _state.activeTab = btn.dataset.tab;
        if (_state.activeTab === 'kaynaklar' && !_state.sources) fetchSources();
        renderPopover();
        positionPopover();
      });
    });
    const bm25 = pop.querySelector('#rxBM25');
    if (bm25) bm25.addEventListener('click', (e) => { e.stopPropagation(); kickoffReindex({ semantic: false }); });
    const sem = pop.querySelector('#rxSem');
    if (sem) sem.addEventListener('click', (e) => { e.stopPropagation(); kickoffReindex({ semantic: true }); });
    const force = pop.querySelector('#rxForce');
    if (force) force.addEventListener('click', (e) => { e.stopPropagation(); kickoffReindex({ semantic: true, force: true }); });

    pop.querySelectorAll('.rx-filter button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        pop.querySelectorAll('.rx-filter button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        pop.querySelectorAll('.rx-source-row').forEach(row => {
          const matches = filter === 'all'
            || (filter === 'primary' && row.dataset.type === 'primary')
            || (filter === 'secondary' && row.dataset.type === 'secondary')
            || (filter === 'unindexed' && row.dataset.indexed === 'false');
          row.style.display = matches ? '' : 'none';
        });
      });
    });

    // URL editor + retry button (offline body)
    const urlInput = pop.querySelector('#rxUrlInput');
    const urlSave = pop.querySelector('#rxUrlSave');
    const saveUrl = () => {
      if (!urlInput || !window.MerkantilizmMCP) return;
      const v = urlInput.value.trim();
      window.MerkantilizmMCP.setUrl(v);
      checkBridge().then(online => { if (online) { fetchSources(); pollProgress(); } else renderAll(); });
    };
    if (urlSave) urlSave.addEventListener('click', (e) => { e.stopPropagation(); saveUrl(); });
    if (urlInput) urlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); saveUrl(); }
    });
    const retry = pop.querySelector('#rxRetry');
    if (retry) retry.addEventListener('click', (e) => {
      e.stopPropagation();
      checkBridge().then(online => { if (online) { fetchSources(); pollProgress(); } else renderAll(); });
    });
  }

  function renderOfflineBody() {
    const kind = _state.bridgeError || 'offline';
    const kindLabel = {
      offline: 'erişilemiyor',
      timeout: 'yanıt vermiyor (timeout)',
      http: 'HTTP hata döndü',
      parse: 'geçersiz yanıt',
    }[kind] || 'kapalı';
    return `
      <div style="color:var(--text-secondary);line-height:1.6;">
        MCP köprüsü <strong style="color:var(--accent-secondary);">${kindLabel}</strong>.
        Çalıştırmak için terminal'de:
      </div>
      <div class="rx-bridge-hint">
        <code>cd kb-mcp &amp;&amp; .venv/bin/python -m src.http_bridge</code>
      </div>
      <div class="rx-reindex-help">
        Köprü olmadan semantik arama, doğrulama ve indeks yenileme yapılamaz.
        Kitap bölümleri köprüsüz de çalışır.
      </div>
      ${renderUrlControl()}
      <div class="rx-actions">
        <button class="primary" id="rxRetry">Tekrar dene</button>
      </div>
    `;
  }

  function renderUrlControl() {
    const url = mcpUrl();
    return `
      <div class="rx-url-row">
        <label class="rx-url-label">Bridge URL</label>
        <input type="text" id="rxUrlInput" class="rx-url-input" value="${escapeHtml(url)}" spellcheck="false">
        <button id="rxUrlSave" class="rx-url-save" title="URL'yi kaydet">↩</button>
      </div>
      <div class="rx-url-help">Override: <code>?mcp=…</code> veya localStorage <code>merkantilizm.mcpUrl</code></div>
    `;
  }

  function renderStatusTab() {
    const s = _state.sources;
    const totalSources = s ? s.count : '…';
    const indexed = s ? s.indexedCount : '…';
    const semOn = s ? s.semanticAvailable : false;
    const model = s ? s.semanticModel : null;

    // Compute aggregate page/passage counts from cached source list
    let totalPages = 0, totalPassages = 0, primCount = 0, secCount = 0, unindexed = 0;
    if (s && s.sources) {
      for (const src of s.sources) {
        if (src.indexed) {
          totalPages += src.pages || 0;
          totalPassages += src.passages || 0;
        } else { unindexed += 1; }
        if (src.type === 'primary') primCount += 1;
        else if (src.type === 'secondary') secCount += 1;
      }
    }

    let progressBlock = '';
    if (_state.running && _state.progress) {
      const p = _state.progress;
      const pct = (p.percent || 0).toFixed(1);
      progressBlock = `
        <div class="rx-progress">
          <div class="rx-meta">
            <span>${p.current || 0}/${p.total || 0} kaynak · ${fmtNum(p.passagesIndexed || 0)} passage</span>
            <span>${pct}%</span>
          </div>
          <div class="rx-bar"><span style="width:${pct}%"></span></div>
          <div class="rx-current">→ ${escapeHtml(p.currentSource || '…')}${p.semantic ? ' · semantik' : ''}</div>
        </div>
      `;
    }

    let resultBlock = '';
    if (_state.result) {
      resultBlock = `<div class="rx-result ${_state.result.error ? 'error' : ''}">${renderResultText(_state.result)}</div>`;
    }

    return `
      <div class="rx-stats">
        <div class="rx-stat">
          <strong>${fmtNum(indexed)}<span style="color:var(--text-muted);font-weight:400;font-size:11px;"> / ${fmtNum(totalSources)}</span></strong>
          kaynak indekslendi
          <div class="rx-stat-extra">${primCount} birincil · ${secCount} ikincil${unindexed ? ' · ' + unindexed + ' atanmamış' : ''}</div>
        </div>
        <div class="rx-stat">
          <strong>${fmtNum(totalPassages)}</strong>
          aranabilir passage
          <div class="rx-stat-extra">${fmtNum(totalPages)} sayfadan</div>
        </div>
      </div>
      <div class="rx-model">
        <strong>Semantik model</strong>
        <span class="rx-model-chip ${semOn ? 'on' : 'off'}">${semOn ? 'aktif' : 'kapalı'}</span>
        <br>${model ? escapeHtml(model) : '<em>Yüklenmedi — lexical-cosine fallback kullanılacak.</em>'}
      </div>
      ${progressBlock}
      ${resultBlock}
      ${!_state.running ? `
        <div class="rx-actions">
          <button class="primary" id="rxBM25">BM25 yenile</button>
          <button id="rxSem">+ Semantik</button>
        </div>
      ` : ''}
      ${renderUrlControl()}
    `;
  }

  function renderSourcesTab() {
    if (!_state.sources) return `<div class="rx-loading">Yükleniyor…</div>`;
    const sources = (_state.sources.sources || []).slice().sort((a, b) => {
      // unindexed first (so they're easy to spot), then by passages desc
      if (a.indexed !== b.indexed) return a.indexed ? 1 : -1;
      return (b.passages || 0) - (a.passages || 0);
    });
    const rows = sources.map(src => {
      const idx = !!src.indexed;
      const hasSem = idx && src.passages > 0 && _state.sources.semanticAvailable;
      const dotCls = !idx ? 'unidx' : hasSem ? 'semantic' : 'idx';
      const dotChar = !idx ? '○' : hasSem ? '◆' : '●';
      const meta = idx
        ? `${fmtNum(src.passages)} · s.${fmtNum(src.pages)}`
        : 'atanmamış';
      return `
        <div class="rx-source-row" data-type="${escapeHtml(src.type || '')}" data-indexed="${idx}">
          <span class="rx-src-dot ${dotCls}" title="${idx ? 'indexed' : 'unindexed'}">${dotChar}</span>
          <span class="rx-src-title" title="${escapeHtml((src.author || '') + ' — ' + (src.title || src.id))}">
            ${escapeHtml(src.shortTitle || src.title || src.id)}
          </span>
          <span class="rx-src-meta">${meta}</span>
        </div>
      `;
    }).join('');
    return `
      <div class="rx-filter">
        <button class="active" data-filter="all">Tümü (${sources.length})</button>
        <button data-filter="primary">Birincil</button>
        <button data-filter="secondary">İkincil</button>
        <button data-filter="unindexed">Atanmamış</button>
      </div>
      <div class="rx-source-list">${rows}</div>
      <div class="rx-reindex-help" style="margin-top:10px;">
        <span style="color:var(--accent);">◆</span> semantik + BM25 ·
        <span style="color:var(--success);">●</span> sadece BM25 ·
        <span style="color:var(--text-muted);">○</span> indekslenmemiş
      </div>
    `;
  }

  function renderReindexTab() {
    let progressBlock = '';
    if (_state.running && _state.progress) {
      const p = _state.progress;
      const pct = (p.percent || 0).toFixed(1);
      progressBlock = `
        <div class="rx-progress">
          <div class="rx-meta">
            <span>${p.current || 0}/${p.total || 0} · ${fmtNum(p.passagesIndexed || 0)} passage</span>
            <span>${pct}%</span>
          </div>
          <div class="rx-bar"><span style="width:${pct}%"></span></div>
          <div class="rx-current">→ ${escapeHtml(p.currentSource || '…')}${p.semantic ? ' · semantik embedding' : ''}</div>
        </div>
      `;
    }
    let resultBlock = '';
    if (_state.result) {
      resultBlock = `<div class="rx-result ${_state.result.error ? 'error' : ''}">${renderResultText(_state.result)}</div>`;
    }
    const disabled = _state.running ? 'disabled' : '';
    return `
      <div class="rx-reindex-help">
        <strong style="color:var(--text-primary);">BM25 yenile</strong> — sadece henüz indekslenmemiş ya da değişen kaynakları FTS5 indeksine ekler. Hızlı.<br>
        <strong style="color:var(--text-primary);">+ Semantik</strong> — sentence-transformer embedding'lerini de yeniler. Yeni PDF eklediğinde gerekir.<br>
        <strong style="color:var(--accent-secondary);">force</strong> — varsa eskilerin üzerine yazar. Embedding modelini değiştirdiysen kullan.
      </div>
      ${progressBlock}
      ${resultBlock}
      <div class="rx-actions">
        <button class="primary" id="rxBM25" ${disabled}>BM25 yenile</button>
        <button id="rxSem" ${disabled}>+ Semantik</button>
        <button id="rxForce" ${disabled} style="flex:0 0 80px;color:var(--accent-secondary);">force</button>
      </div>
    `;
  }

  function renderResultText(r) {
    if (r.error) return `<strong>Hata:</strong> ${escapeHtml(r.error)}`;
    const indexed = Array.isArray(r.indexed) ? r.indexed.length : (r.indexed ?? 0);
    const failed = Array.isArray(r.failed) ? r.failed.length : (r.failed ?? 0);
    const skipped = Array.isArray(r.skipped) ? r.skipped.length : (r.skipped ?? 0);
    let line = `<strong>✓ Bitti.</strong> ${indexed} indekslendi`;
    if (skipped) line += ` · ${skipped} atlandı`;
    if (failed) line += ` · ${failed} başarısız`;
    if (Array.isArray(r.failed) && r.failed.length) {
      const names = r.failed.slice(0, 3).map(f => escapeHtml(f.id || JSON.stringify(f))).join(', ');
      line += `<br><small style="color:var(--accent-secondary);">${names}${r.failed.length > 3 ? '…' : ''}</small>`;
    }
    return line;
  }

  function positionPopover() {
    const indicator = document.getElementById('reindexIndicator');
    const pop = document.getElementById('reindexPopover');
    if (!indicator || !pop) return;
    if (window.innerWidth <= 480) {
      // Mobile: popover takes near-full width, anchored to indicator's vertical position.
      const rect = indicator.getBoundingClientRect();
      pop.style.left = '8px';
      pop.style.right = '8px';
      pop.style.top = (rect.bottom + 6) + 'px';
      return;
    }
    const rect = indicator.getBoundingClientRect();
    const right = Math.max(8, window.innerWidth - rect.right);
    pop.style.right = right + 'px';
    pop.style.top = (rect.bottom + 6) + 'px';
    pop.style.left = 'auto';
  }

  let _previousActiveEl = null;

  function focusableElements(root) {
    return Array.from(root.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));
  }

  function openPopover() {
    _state.popoverOpen = true;
    _previousActiveEl = document.activeElement;
    renderPopover();
    const pop = document.getElementById('reindexPopover');
    if (pop) {
      pop.setAttribute('role', 'dialog');
      pop.setAttribute('aria-modal', 'true');
      pop.setAttribute('aria-label', 'MCP indeks paneli');
      pop.classList.add('open');
      positionPopover();
      // Focus first focusable element so keyboard nav works
      requestAnimationFrame(() => {
        const focusables = focusableElements(pop);
        if (focusables.length) focusables[0].focus();
      });
    }
    if (_state.bridgeOnline) {
      if (!_state.sources || Date.now() - _state.sourcesFetchedAt > LIST_REFRESH_INTERVAL_MS) {
        fetchSources();
      }
    } else {
      checkBridge().then(() => renderAll());
    }
  }

  function closePopover() {
    _state.popoverOpen = false;
    const pop = document.getElementById('reindexPopover');
    if (pop) pop.classList.remove('open');
    // Restore focus to opener
    if (_previousActiveEl && typeof _previousActiveEl.focus === 'function') {
      _previousActiveEl.focus();
    } else {
      document.getElementById('reindexIndicator')?.focus();
    }
    _previousActiveEl = null;
  }

  // Tab cycle within popover when open
  function handleTabTrap(e) {
    if (!_state.popoverOpen || e.key !== 'Tab') return;
    const pop = document.getElementById('reindexPopover');
    if (!pop) return;
    const focusables = focusableElements(pop);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /**
   * Decide whether structure changed enough to require a full popover rebuild,
   * or just patching live values (progress %, current source, status text).
   *
   * Full rebuild triggers:
   *   - bridge online ↔ offline transition
   *   - activeTab change
   *   - running ↔ idle transition
   *   - result block appeared or disappeared
   */
  function renderAll() {
    renderIndicator();
    if (!_state.popoverOpen) return;
    const pop = document.getElementById('reindexPopover');
    if (!pop) return;
    const key = [
      _state.bridgeOnline ? 1 : 0,
      _state.running ? 1 : 0,
      _state.activeTab,
      _state.result ? 1 : 0,
      // Source list cache identity (full rebuild when sources arrive/change count)
      _state.sources?.count || 0
    ].join('|');
    if (_state._lastRenderKey === key) {
      patchPopoverLive();
      return;
    }
    _state._lastRenderKey = key;
    renderPopover();
  }

  function patchPopoverLive() {
    const pop = document.getElementById('reindexPopover');
    if (!pop || !_state.running || !_state.progress) return;
    const p = _state.progress;
    const pct = (p.percent || 0).toFixed(1);
    // Progress bar width
    const bar = pop.querySelector('.rx-bar > span, .rx-progress .bar > span');
    if (bar) bar.style.width = pct + '%';
    // Meta line
    const meta = pop.querySelector('.rx-progress .rx-meta, .rx-progress-meta');
    if (meta) {
      meta.innerHTML = `<span>${p.current || 0}/${p.total || 0} · ${fmtNum(p.passagesIndexed || 0)} passage</span><span>${pct}%</span>`;
    }
    // Current source line
    const cur = pop.querySelector('.rx-progress .rx-current, .rx-current');
    if (cur) cur.innerHTML = `→ ${escapeHtml(p.currentSource || '…')}${p.semantic ? ' · semantik' : ''}`;
    // Status text in header
    const status = pop.querySelector('.rx-status');
    if (status) status.textContent = 'çalışıyor';
  }

  // ----- Network -----

  async function checkBridge() {
    const r = await mcpFetch('/health', { timeoutMs: 3000 });
    _state.bridgeOnline = r.ok;
    _state.bridgeError = r.ok ? null : r.kind;
    renderIndicator();
    return _state.bridgeOnline;
  }

  async function fetchSources() {
    const r = await mcpFetch('/tools/list_sources', { timeoutMs: 8000 });
    if (r.ok) {
      _state.sources = r.data;
      _state.sourcesFetchedAt = Date.now();
      _state.bridgeOnline = true;
      _state.bridgeError = null;
      renderAll();
    } else if (r.kind === 'offline' || r.kind === 'timeout') {
      // Bridge probably went down between polls
      _state.bridgeOnline = false;
      _state.bridgeError = r.kind;
      renderAll();
    }
    // For http/parse errors, keep stale cache and last-known online state.
  }

  async function pollProgress() {
    const r = await mcpFetch('/tools/reindex_progress', { timeoutMs: 4000 });
    if (!r.ok) {
      _state.bridgeOnline = false;
      _state.bridgeError = r.kind;
      _state.running = false;
      renderAll();
      stopPolling();
      return;
    }
    const p = r.data || {};
    _state.bridgeOnline = true;
    _state.bridgeError = null;
    const running = p.status === 'running' || p.status === 'starting';
    const finished = p.status === 'completed' || p.status === 'failed';
    _state.running = running;
    _state.progress = running ? p : null;
    if (p.result) _state.result = p.result;
    else if (finished && !_state.result) _state.result = { status: p.status, message: p.message };
    renderAll();
    if (!running) {
      stopPolling();
      if (finished) fetchSources();
    }
  }

  function startPolling() {
    if (_pollTimer) return;
    pollProgress();
    _pollTimer = setInterval(pollProgress, POLL_INTERVAL_MS);
  }

  function stopPolling() {
    if (_pollTimer) { clearInterval(_pollTimer); _pollTimer = null; }
  }

  async function kickoffReindex(opts) {
    if (!_state.bridgeOnline || _state.running) return;
    _state.result = null;
    _state.running = true;
    _state.progress = {
      status: 'starting', current: 0, total: 0, currentSource: '',
      percent: 0, semantic: !!opts.semantic, updatedAt: new Date().toISOString()
    };
    renderAll();
    const r = await mcpFetch('/tools/reindex_sources', {
      method: 'POST',
      body: { force: !!opts.force, auto_add: true, semantic: !!opts.semantic, async: true },
      timeoutMs: 10000,
    });
    if (!r.ok) {
      _state.running = false;
      _state.bridgeOnline = (r.kind !== 'offline' && r.kind !== 'timeout');
      _state.bridgeError = r.kind;
      _state.result = { error: r.error };
      renderAll();
      return;
    }
    startPolling();
  }

  // ----- Public + init -----

  function ReindexPanel() {}

  ReindexPanel.prototype.mount = function() {
    injectStyles();

    if (!document.getElementById('reindexIndicator')) {
      const slot = findTopbarInsertionPoint();
      if (!slot) return;
      const indicator = document.createElement('button');
      indicator.id = 'reindexIndicator';
      indicator.className = 'reindex-indicator';
      indicator.setAttribute('aria-label', 'MCP bilgi tabanı durumu');
      indicator.addEventListener('click', (e) => {
        e.stopPropagation();
        if (_state.popoverOpen) closePopover(); else openPopover();
      });
      slot.parent.insertBefore(indicator, slot.before);
    }

    if (!document.getElementById('reindexPopover')) {
      const pop = document.createElement('div');
      pop.id = 'reindexPopover';
      pop.className = 'rx-popover';
      pop.addEventListener('click', (e) => e.stopPropagation());
      document.body.appendChild(pop);
    }

    document.addEventListener('click', () => { if (_state.popoverOpen) closePopover(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && _state.popoverOpen) { e.preventDefault(); closePopover(); return; }
      handleTabTrap(e);
    });
    window.addEventListener('resize', () => { if (_state.popoverOpen) positionPopover(); });

    checkBridge().then(online => {
      if (online) { pollProgress(); fetchSources(); }
      else renderIndicator();
    });

    if (!_healthTimer) {
      _healthTimer = setInterval(() => {
        if (!_state.running && !_state.popoverOpen) checkBridge();
      }, HEALTH_CHECK_INTERVAL_MS);
    }
  };

  window.ReindexPanel = new ReindexPanel();

  function autoInit() { setTimeout(() => window.ReindexPanel.mount(), 200); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
  console.log('[reindex-panel] Topbar indicator + rich MCP popover loaded');
})();
