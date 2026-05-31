/**
 * annotations.js — Reader highlights + notes with local auto-save.
 *
 * Storage:
 *   iktisat.annotations.v1 — JSON array of annotation records shared by all books.
 *
 * Expose: window.BookAnnotations
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'iktisat.annotations.v1';
  const REPO_SYNC_URL = '/api/annotations';
  const PENDING_SCROLL_KEY = 'iktisat.annotations.pendingScroll';
  const PREFIX_LEN = 40;
  const SUFFIX_LEN = 40;
  const IGNORE_SELECTOR = [
    '.footnote-ref',
    '.footnote-inline',
    '.chapter-nav',
    '.chapter-appendix',
    '.book-contents-list',
    '.book-annotation-toolbar',
    '.book-annotations-overlay',
    '.book-annotation-toast'
  ].join(',');

  const COLORS = {
    important: { label: 'Önemli', shortLabel: 'Ö', title: 'Önemli fikir' },
    question: { label: 'Soru', shortLabel: '?', title: 'Soru / belirsizlik' },
    counterpoint: { label: 'Karşı fikir', shortLabel: 'K', title: 'Karşı fikir' },
    source: { label: 'Kaynak', shortLabel: 'S', title: 'Kaynak / kanıt' },
  };

  let _annotations = readAnnotations();
  let _currentArticle = null;
  let _currentChapter = null;
  let _pendingSelection = null;
  let _toolbar = null;
  let _overlay = null;
  let _toast = null;
  let _hubMode = 'current';
  let _hubQuery = '';
  let _hubColor = 'all';
  let _restoreFocus = null;
  let _repoSyncTimer = null;

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function safeParse(raw, fallback) {
    try {
      const parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (e) {
      return fallback;
    }
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'ann-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function readAnnotations() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = safeParse(raw || '[]', []);
      return Array.isArray(list) ? list.map(normalizeAnnotation).filter(Boolean) : [];
    } catch (e) {
      return [];
    }
  }

  function saveAnnotations(list, opts) {
    opts = opts || {};
    const normalized = Array.isArray(list) ? list.map(normalizeAnnotation).filter(Boolean) : [];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      _annotations = normalized;
      updateButtonCount();
      if (opts.sync !== false) scheduleRepoSync(normalized);
      return true;
    } catch (e) {
      showToast('Notlar otomatik kaydedilemedi. Tarayıcı depolamasını kontrol edip dışa aktarmayı deneyin.');
      return false;
    }
  }

  function repoPayload(list) {
    return {
      schema: STORAGE_KEY,
      updatedAt: nowIso(),
      annotations: (Array.isArray(list) ? list : []).map(normalizeAnnotation).filter(Boolean),
    };
  }

  async function syncAnnotationsToRepo(list) {
    if (typeof fetch !== 'function') return { ok: false, skipped: true };
    const resp = await fetch(REPO_SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(repoPayload(list)),
    });
    if (!resp.ok) throw new Error('repo sync failed: HTTP ' + resp.status);
    return resp.json ? resp.json() : { ok: true };
  }

  function scheduleRepoSync(list) {
    if (typeof fetch !== 'function') return;
    if (_repoSyncTimer) clearTimeout(_repoSyncTimer);
    const snapshot = (Array.isArray(list) ? list : []).slice();
    _repoSyncTimer = setTimeout(() => {
      _repoSyncTimer = null;
      syncAnnotationsToRepo(snapshot).then(() => {
        if (_overlay && !_overlay.hidden) updateHubStatus(`${snapshot.length.toLocaleString('tr-TR')} kayıt repo dosyasına kaydedildi`);
      }).catch(() => {
        if (_overlay && !_overlay.hidden) updateHubStatus('Tarayıcıda kayıtlı; repo dosyasına yazılamadı');
      });
    }, 350);
  }

  async function loadRepoAnnotations() {
    if (typeof fetch !== 'function') return;
    try {
      const resp = await fetch(REPO_SYNC_URL, { cache: 'no-store' });
      if (!resp.ok) return;
      const payload = await resp.json();
      const incoming = Array.isArray(payload) ? payload : payload && payload.annotations;
      if (!Array.isArray(incoming) || incoming.length === 0) return;
      const merged = mergeAnnotations(_annotations, incoming);
      if (JSON.stringify(merged) === JSON.stringify(_annotations)) return;
      saveAnnotations(merged, { sync: false });
      renderCurrentHighlights();
      renderHubList();
    } catch (e) {
      // Static hosting or an older dev server simply won't have the endpoint.
    }
  }

  function normalizeAnnotation(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const exact = String(raw.exact || raw.text || '').trim();
    if (!exact) return null;
    const now = nowIso();
    const color = COLORS[raw.color] ? raw.color : 'important';
    const chapterNum = Number(raw.chapterNum || raw.chapter || 0);
    return {
      id: String(raw.id || createId()),
      createdAt: String(raw.createdAt || raw.updatedAt || now),
      updatedAt: String(raw.updatedAt || raw.createdAt || now),
      bookSlug: String(raw.bookSlug || detectBookSlug()),
      bookTitle: String(raw.bookTitle || detectBookTitle()),
      chapterNum,
      chapterTitle: String(raw.chapterTitle || ''),
      path: String(raw.path || location.pathname),
      hash: String(raw.hash || (chapterNum ? '#bolum/' + chapterNum : location.hash || '')),
      exact,
      prefix: String(raw.prefix || ''),
      suffix: String(raw.suffix || ''),
      start: Number.isFinite(Number(raw.start)) ? Number(raw.start) : null,
      end: Number.isFinite(Number(raw.end)) ? Number(raw.end) : null,
      color,
      note: String(raw.note || ''),
    };
  }

  function mergeAnnotations(existing, incoming) {
    const byId = new Map();
    (Array.isArray(existing) ? existing : []).forEach((item) => {
      const ann = normalizeAnnotation(item);
      if (ann) byId.set(ann.id, ann);
    });
    (Array.isArray(incoming) ? incoming : []).forEach((item) => {
      const ann = normalizeAnnotation(item);
      if (!ann) return;
      const prev = byId.get(ann.id);
      if (!prev || Date.parse(ann.updatedAt || 0) >= Date.parse(prev.updatedAt || 0)) {
        byId.set(ann.id, ann);
      }
    });
    return Array.from(byId.values()).sort((a, b) => {
      return String(a.bookSlug).localeCompare(String(b.bookSlug), 'tr')
        || Number(a.chapterNum || 0) - Number(b.chapterNum || 0)
        || Date.parse(a.createdAt || 0) - Date.parse(b.createdAt || 0);
    });
  }

  function detectBookSlug() {
    const parts = (location.pathname || '').split('/').filter(Boolean);
    const bookIndex = parts.lastIndexOf('book.html');
    if (bookIndex > 0) return parts.slice(0, bookIndex).join('/');
    if (window.Merkantilizm && window.Merkantilizm.themeSlug) return window.Merkantilizm.themeSlug;
    return parts[0] || 'book';
  }

  function detectBookTitle() {
    const manifest = window.BookReader && window.BookReader.getManifest && window.BookReader.getManifest();
    return (manifest && manifest.title) || (document.title || '').split('—').pop().trim() || detectBookSlug();
  }

  function currentContext() {
    const chapter = _currentChapter || (window.BookReader && window.BookReader.currentChapter && window.BookReader.currentChapter());
    return {
      bookSlug: detectBookSlug(),
      bookTitle: detectBookTitle(),
      chapterNum: chapter ? Number(chapter.num) : 0,
      chapterTitle: chapter ? String(chapter.title || '') : '',
      path: location.pathname,
      hash: chapter ? '#bolum/' + chapter.num : location.hash || '',
    };
  }

  function getNodeFilter() {
    return window.NodeFilter || {
      SHOW_TEXT: 4,
      FILTER_ACCEPT: 1,
      FILTER_REJECT: 2,
    };
  }

  function shouldIgnoreNode(node) {
    const parent = node && node.parentElement;
    if (!parent) return true;
    return !!(parent.closest && parent.closest(IGNORE_SELECTOR));
  }

  function collectTextNodes(root) {
    if (!root || !document.createTreeWalker) return [];
    const NF = getNodeFilter();
    const walker = document.createTreeWalker(root, NF.SHOW_TEXT, {
      acceptNode(node) {
        if (shouldIgnoreNode(node)) return NF.FILTER_REJECT;
        return node.nodeValue ? NF.FILTER_ACCEPT : NF.FILTER_REJECT;
      }
    });
    const nodes = [];
    let node = walker.nextNode();
    while (node) {
      nodes.push(node);
      node = walker.nextNode();
    }
    return nodes;
  }

  function getAnnotatableText(root) {
    return collectTextNodes(root).map((node) => node.nodeValue || '').join('');
  }

  function getRangeOffsets(root, range) {
    const nodes = collectTextNodes(root);
    let total = 0;
    let start = null;
    let end = null;
    nodes.forEach((node) => {
      const len = node.nodeValue.length;
      if (node === range.startContainer) start = total + range.startOffset;
      if (node === range.endContainer) end = total + range.endOffset;
      total += len;
    });
    const selected = String(range.toString() || '');
    if (start == null || end == null) {
      const idx = getAnnotatableText(root).indexOf(selected);
      if (idx < 0) return null;
      start = idx;
      end = idx + selected.length;
    }
    if (start > end) [start, end] = [end, start];
    if (start === end) return null;
    return { start, end, selected };
  }

  function createAnchor(rootText, start, end) {
    return {
      exact: rootText.slice(start, end),
      prefix: rootText.slice(Math.max(0, start - PREFIX_LEN), start),
      suffix: rootText.slice(end, Math.min(rootText.length, end + SUFFIX_LEN)),
      start,
      end,
    };
  }

  function resolveTextAnchor(text, anchor) {
    if (!text || !anchor || !anchor.exact) return null;
    const exact = String(anchor.exact);
    const starts = [];
    let idx = text.indexOf(exact);
    while (idx !== -1) {
      starts.push(idx);
      idx = text.indexOf(exact, idx + Math.max(1, exact.length));
    }
    if (starts.length) {
      const prefix = String(anchor.prefix || '');
      const suffix = String(anchor.suffix || '');
      const contextual = starts.find((start) => {
        const before = text.slice(Math.max(0, start - prefix.length), start);
        const after = text.slice(start + exact.length, start + exact.length + suffix.length);
        return (!prefix || before === prefix) && (!suffix || after === suffix);
      });
      const chosen = contextual != null
        ? contextual
        : starts.reduce((best, start) => {
            if (anchor.start == null) return best;
            return Math.abs(start - anchor.start) < Math.abs(best - anchor.start) ? start : best;
          }, starts[0]);
      return { start: chosen, end: chosen + exact.length };
    }
    if (Number.isFinite(anchor.start) && Number.isFinite(anchor.end)) {
      const start = Math.max(0, Math.min(text.length, Number(anchor.start)));
      const end = Math.max(start, Math.min(text.length, Number(anchor.end)));
      if (end > start) return { start, end };
    }
    return null;
  }

  function clearRenderedHighlights(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('.annotation-highlight').forEach((mark) => {
      const parent = mark.parentNode;
      if (!parent) return;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    });
  }

  function wrapTextRange(root, start, end, annotation) {
    const nodes = collectTextNodes(root);
    let pos = 0;
    nodes.forEach((node) => {
      const len = node.nodeValue.length;
      const nodeStart = pos;
      const nodeEnd = pos + len;
      pos = nodeEnd;
      if (nodeEnd <= start || nodeStart >= end) return;
      const from = Math.max(0, start - nodeStart);
      const to = Math.min(len, end - nodeStart);
      wrapTextNodeSlice(node, from, to, annotation);
    });
  }

  function wrapTextNodeSlice(node, from, to, annotation) {
    if (!node.parentNode || to <= from) return null;
    let target = node;
    if (to < target.nodeValue.length) target.splitText(to);
    if (from > 0) target = target.splitText(from);
    const mark = document.createElement('mark');
    mark.className = 'annotation-highlight annotation-highlight--' + annotation.color;
    mark.dataset.annotationId = annotation.id;
    mark.dataset.annotationColor = annotation.color;
    mark.title = annotation.note ? 'Not: ' + annotation.note : COLORS[annotation.color].title;
    target.parentNode.insertBefore(mark, target);
    mark.appendChild(target);
    return mark;
  }

  function annotationsForCurrentChapter() {
    const ctx = currentContext();
    return _annotations.filter((ann) => {
      return ann.bookSlug === ctx.bookSlug && Number(ann.chapterNum) === Number(ctx.chapterNum);
    });
  }

  function renderCurrentHighlights() {
    const root = _currentArticle;
    if (!root) return;
    clearRenderedHighlights(root);
    const text = getAnnotatableText(root);
    const resolved = annotationsForCurrentChapter()
      .map((ann) => ({ ann, pos: resolveTextAnchor(text, ann) }))
      .filter((item) => item.pos && item.pos.end > item.pos.start)
      .sort((a, b) => b.pos.start - a.pos.start);
    resolved.forEach((item) => wrapTextRange(root, item.pos.start, item.pos.end, item.ann));
    updateButtonCount();
  }

  function createToolbar() {
    if (_toolbar || !document.body) return _toolbar;
    const toolbar = document.createElement('div');
    toolbar.className = 'book-annotation-toolbar book-annotation-ui';
    toolbar.hidden = true;
    toolbar.innerHTML = `
      <div class="annotation-toolbar-colors" role="group" aria-label="Vurgu rengi">
        ${Object.keys(COLORS).map((key) => `
          <button type="button" class="annotation-color-btn annotation-color-btn--${key}" data-annotation-color="${key}" title="${escapeHtml(COLORS[key].title)}">
            <span>${escapeHtml(COLORS[key].shortLabel)}</span>
          </button>
        `).join('')}
      </div>
      <button type="button" class="annotation-note-btn" data-annotation-note>Not</button>
    `;
    toolbar.addEventListener('mousedown', (event) => event.preventDefault());
    toolbar.addEventListener('click', (event) => {
      const colorBtn = event.target.closest('[data-annotation-color]');
      if (colorBtn) {
        addAnnotationFromSelection(colorBtn.dataset.annotationColor, '');
        return;
      }
      if (event.target.closest('[data-annotation-note]')) {
        const note = window.prompt ? window.prompt('Bu vurguya not ekle:', '') : '';
        if (note != null) addAnnotationFromSelection('important', note);
      }
    });
    document.body.appendChild(toolbar);
    _toolbar = toolbar;
    return toolbar;
  }

  function showToolbarForSelection() {
    if (!_currentArticle || !_currentChapter || !window.getSelection) return hideToolbar();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return hideToolbar();
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer.nodeType === 1
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentNode;
    if (!_currentArticle.contains(container) || (container.closest && container.closest(IGNORE_SELECTOR))) {
      return hideToolbar();
    }
    const offsets = getRangeOffsets(_currentArticle, range);
    if (!offsets || !offsets.selected.trim()) return hideToolbar();
    _pendingSelection = {
      range: range.cloneRange(),
      start: offsets.start,
      end: offsets.end,
      selected: offsets.selected,
    };
    const rect = range.getBoundingClientRect();
    const toolbar = createToolbar();
    if (!toolbar) return;
    toolbar.hidden = false;
    const left = Math.max(10, Math.min(window.innerWidth - 210, rect.left + rect.width / 2 - 105));
    const top = Math.max(10, rect.top - 46);
    toolbar.style.left = left + 'px';
    toolbar.style.top = top + 'px';
  }

  function hideToolbar() {
    _pendingSelection = null;
    if (_toolbar) _toolbar.hidden = true;
  }

  function addAnnotationFromSelection(color, note) {
    if (!_pendingSelection || !_currentArticle || !_currentChapter) return;
    const rootText = getAnnotatableText(_currentArticle);
    const anchor = createAnchor(rootText, _pendingSelection.start, _pendingSelection.end);
    if (!anchor.exact.trim()) return;
    const ctx = currentContext();
    const timestamp = nowIso();
    const annotation = {
      id: createId(),
      createdAt: timestamp,
      updatedAt: timestamp,
      bookSlug: ctx.bookSlug,
      bookTitle: ctx.bookTitle,
      chapterNum: ctx.chapterNum,
      chapterTitle: ctx.chapterTitle,
      path: ctx.path,
      hash: ctx.hash,
      exact: anchor.exact,
      prefix: anchor.prefix,
      suffix: anchor.suffix,
      start: anchor.start,
      end: anchor.end,
      color: COLORS[color] ? color : 'important',
      note: String(note || '').trim(),
    };
    _annotations = mergeAnnotations(_annotations, [annotation]);
    saveAnnotations(_annotations);
    renderCurrentHighlights();
    renderHubList();
    hideToolbar();
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection && selection.removeAllRanges) selection.removeAllRanges();
    }
  }

  function updateAnnotation(id, patch) {
    const idx = _annotations.findIndex((ann) => ann.id === id);
    if (idx < 0) return;
    _annotations[idx] = normalizeAnnotation(Object.assign({}, _annotations[idx], patch, { updatedAt: nowIso() }));
    saveAnnotations(_annotations);
    renderCurrentHighlights();
    renderHubList();
  }

  function deleteAnnotation(id) {
    _annotations = _annotations.filter((ann) => ann.id !== id);
    saveAnnotations(_annotations);
    renderCurrentHighlights();
    renderHubList();
  }

  function ensureOverlay() {
    if (_overlay || !document.body) return _overlay;
    const overlay = document.createElement('div');
    overlay.className = 'book-annotations-overlay book-annotation-ui';
    overlay.hidden = true;
    overlay.innerHTML = `
      <section class="book-annotations-modal" role="dialog" aria-modal="true" aria-labelledby="annotationsTitle" tabindex="-1">
        <header class="annotations-header">
          <div>
            <h2 id="annotationsTitle">Notlar</h2>
            <p>Bu bölümden başla; tüm kitaplar arasında ara.</p>
          </div>
          <button type="button" class="annotations-close" data-close-annotations aria-label="Notları kapat">×</button>
        </header>
        <div class="annotations-controls">
          <input class="annotations-search" type="search" placeholder="Notlarda ara..." aria-label="Notlarda ara">
          <select class="annotations-color-filter" aria-label="Vurgu rengine göre filtrele">
            <option value="all">Tüm renkler</option>
            ${Object.keys(COLORS).map((key) => `<option value="${key}">${escapeHtml(COLORS[key].label)}</option>`).join('')}
          </select>
        </div>
        <div class="annotations-tabs" role="tablist" aria-label="Not kapsamı">
          <button type="button" class="annotations-tab active" data-mode="current" role="tab" aria-selected="true">Bu bölüm</button>
          <button type="button" class="annotations-tab" data-mode="all" role="tab" aria-selected="false">Tüm notlar</button>
        </div>
        <div class="annotations-list" id="annotationsList"></div>
        <footer class="annotations-footer">
          <button type="button" data-export-annotations>Dışa aktar</button>
          <button type="button" data-import-annotations>İçe aktar</button>
          <input type="file" accept="application/json,.json" class="annotations-import-input" hidden>
          <span class="annotations-status" role="status" aria-live="polite"></span>
        </footer>
      </section>
    `;
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay || event.target.closest('[data-close-annotations]')) closeHub();
      const tab = event.target.closest('[data-mode]');
      if (tab) {
        _hubMode = tab.dataset.mode;
        renderHubList();
      }
      const row = event.target.closest('.annotation-row');
      if (row && !event.target.closest('button, select, textarea, a')) {
        goToAnnotation(row.dataset.annotationId);
      }
      const edit = event.target.closest('[data-edit-annotation]');
      if (edit) {
        const ann = getById(edit.dataset.editAnnotation);
        const note = window.prompt ? window.prompt('Notu düzenle:', ann ? ann.note : '') : null;
        if (note != null && ann) updateAnnotation(ann.id, { note });
      }
      const remove = event.target.closest('[data-delete-annotation]');
      if (remove && window.confirm && window.confirm('Bu not ve vurguyu silmek istiyor musun?')) {
        deleteAnnotation(remove.dataset.deleteAnnotation);
      }
      if (event.target.closest('[data-export-annotations]')) exportAnnotations();
      if (event.target.closest('[data-import-annotations]')) {
        const input = overlay.querySelector('.annotations-import-input');
        if (input) input.click();
      }
    });
    overlay.addEventListener('input', (event) => {
      if (event.target.classList.contains('annotations-search')) {
        _hubQuery = event.target.value || '';
        renderHubList();
      }
      if (event.target.classList.contains('annotations-color-filter')) {
        _hubColor = event.target.value || 'all';
        renderHubList();
      }
    });
    overlay.addEventListener('change', (event) => {
      if (event.target.matches('[data-row-color]')) {
        updateAnnotation(event.target.dataset.rowColor, { color: event.target.value });
      }
      if (event.target.classList.contains('annotations-import-input')) {
        importAnnotations(event.target.files && event.target.files[0]);
        event.target.value = '';
      }
    });
    document.body.appendChild(overlay);
    _overlay = overlay;
    return overlay;
  }

  function getById(id) {
    return _annotations.find((ann) => ann.id === id) || null;
  }

  function openHub(options) {
    const overlay = ensureOverlay();
    if (!overlay) return;
    _restoreFocus = document.activeElement;
    _hubMode = options && options.mode ? options.mode : 'current';
    overlay.hidden = false;
    renderHubList(options && options.focusId);
    const dialog = overlay.querySelector('.book-annotations-modal');
    if (dialog) dialog.focus();
  }

  function closeHub() {
    if (!_overlay) return;
    _overlay.hidden = true;
    if (_restoreFocus && _restoreFocus.focus) _restoreFocus.focus();
  }

  function filteredAnnotations() {
    const query = trLower(_hubQuery.trim());
    const current = currentContext();
    let list = _hubMode === 'current'
      ? _annotations.filter((ann) => ann.bookSlug === current.bookSlug && Number(ann.chapterNum) === Number(current.chapterNum))
      : _annotations.slice();
    if (_hubColor !== 'all') list = list.filter((ann) => ann.color === _hubColor);
    if (query) {
      list = list.filter((ann) => {
        return [
          ann.exact, ann.note, ann.bookTitle, ann.chapterTitle, COLORS[ann.color] && COLORS[ann.color].label
        ].some((part) => trLower(part).includes(query));
      });
    }
    return sortForHub(list);
  }

  function sortForHub(list) {
    if (_hubMode !== 'current' || !_currentArticle) {
      return list.sort((a, b) => Date.parse(b.updatedAt || 0) - Date.parse(a.updatedAt || 0));
    }
    const text = getAnnotatableText(_currentArticle);
    return list.sort((a, b) => {
      const ap = resolveTextAnchor(text, a);
      const bp = resolveTextAnchor(text, b);
      return ((ap && ap.start) || 0) - ((bp && bp.start) || 0);
    });
  }

  function renderHubList(focusId) {
    if (!_overlay) return;
    _overlay.querySelectorAll('.annotations-tab').forEach((tab) => {
      const active = tab.dataset.mode === _hubMode;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    const listEl = _overlay.querySelector('#annotationsList');
    if (!listEl) return;
    const rows = filteredAnnotations();
    if (!rows.length) {
      listEl.innerHTML = `
        <div class="annotations-empty">
          ${_hubMode === 'current' ? 'Bu bölümde henüz not yok.' : 'Henüz not veya vurgu yok.'}
        </div>
      `;
      updateHubStatus();
      return;
    }
    listEl.innerHTML = rows.map((ann) => renderAnnotationRow(ann, focusId)).join('');
    updateHubStatus();
  }

  function renderAnnotationRow(ann, focusId) {
    const colorOptions = Object.keys(COLORS).map((key) => {
      return `<option value="${key}"${ann.color === key ? ' selected' : ''}>${escapeHtml(COLORS[key].label)}</option>`;
    }).join('');
    return `
      <article class="annotation-row${ann.id === focusId ? ' focus' : ''}" data-annotation-id="${escapeHtml(ann.id)}">
        <div class="annotation-row-marker annotation-row-marker--${escapeHtml(ann.color)}"></div>
        <div class="annotation-row-main">
          <blockquote>${escapeHtml(trimText(ann.exact, 220))}</blockquote>
          ${ann.note ? `<p>${escapeHtml(ann.note)}</p>` : ''}
          <div class="annotation-row-meta">${escapeHtml(ann.bookTitle)} · Bölüm ${escapeHtml(ann.chapterNum)}${ann.chapterTitle ? ' · ' + escapeHtml(ann.chapterTitle) : ''}</div>
        </div>
        <div class="annotation-row-actions">
          <select data-row-color="${escapeHtml(ann.id)}" aria-label="Vurgu rengini değiştir">${colorOptions}</select>
          <button type="button" data-edit-annotation="${escapeHtml(ann.id)}">Düzenle</button>
          <button type="button" data-delete-annotation="${escapeHtml(ann.id)}">Sil</button>
        </div>
      </article>
    `;
  }

  function updateHubStatus(message) {
    if (!_overlay) return;
    const status = _overlay.querySelector('.annotations-status');
    if (!status) return;
    status.textContent = message || `${_annotations.length.toLocaleString('tr-TR')} kayıt otomatik saklanıyor`;
  }

  function trLower(value) {
    return String(value || '').replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();
  }

  function trimText(value, limit) {
    const text = String(value || '').replace(/\s+/g, ' ').trim();
    return text.length > limit ? text.slice(0, limit - 1) + '…' : text;
  }

  function goToAnnotation(id) {
    const ann = getById(id);
    if (!ann) return;
    try { sessionStorage.setItem(PENDING_SCROLL_KEY, ann.id); } catch (e) {}
    closeHub();
    const targetHash = '#bolum/' + ann.chapterNum;
    if (location.pathname !== ann.path) {
      location.href = ann.path + targetHash;
      return;
    }
    if (window.BookReader && window.BookReader.go) {
      window.BookReader.go(ann.chapterNum);
      setTimeout(() => scrollToAnnotation(ann.id), 250);
    } else {
      location.hash = targetHash;
      setTimeout(() => scrollToAnnotation(ann.id), 250);
    }
  }

  function scrollToAnnotation(id) {
    const target = document.querySelector('[data-annotation-id="' + cssEscape(id) + '"]');
    if (!target) return false;
    target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    target.classList.add('annotation-highlight--flash');
    setTimeout(() => target.classList.remove('annotation-highlight--flash'), 1300);
    return true;
  }

  function cssEscape(value) {
    if (window.CSS && window.CSS.escape) return window.CSS.escape(String(value));
    return String(value).replace(/"/g, '\\"');
  }

  function exportAnnotations() {
    const payload = JSON.stringify({
      schema: 'iktisat.annotations.v1',
      exportedAt: nowIso(),
      annotations: _annotations,
    }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'iktisat-notlar-' + nowIso().slice(0, 10) + '.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    updateHubStatus('Notlar dışa aktarıldı.');
  }

  function importAnnotations(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const payload = safeParse(String(reader.result || ''), null);
      const incoming = Array.isArray(payload) ? payload : payload && payload.annotations;
      if (!Array.isArray(incoming)) {
        updateHubStatus('İçe aktarma başarısız: JSON biçimi tanınmadı.');
        return;
      }
      const merged = mergeAnnotations(_annotations, incoming);
      saveAnnotations(merged);
      renderCurrentHighlights();
      renderHubList();
      updateHubStatus(`${incoming.length.toLocaleString('tr-TR')} kayıt içe aktarıldı.`);
    };
    reader.onerror = () => updateHubStatus('İçe aktarma başarısız: dosya okunamadı.');
    reader.readAsText(file);
  }

  function showToast(message) {
    if (!document.body) return;
    if (!_toast) {
      _toast = document.createElement('div');
      _toast.className = 'book-annotation-toast book-annotation-ui';
      _toast.setAttribute('role', 'status');
      _toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(_toast);
    }
    _toast.textContent = message;
    _toast.hidden = false;
    clearTimeout(_toast._timer);
    _toast._timer = setTimeout(() => { _toast.hidden = true; }, 5000);
  }

  function updateButtonCount() {
    const btn = document.getElementById('notesHubToggle');
    if (!btn) return;
    const count = _annotations.length;
    btn.innerHTML = `Notlar${count ? ` <span class="notes-count">${count}</span>` : ''}`;
    btn.title = count ? `${count} not ve vurgu` : 'Notlar ve vurgular';
  }

  function wireArticle(article) {
    if (!article || article.dataset.annotationsWired === '1') return;
    article.dataset.annotationsWired = '1';
    article.addEventListener('mouseup', () => setTimeout(showToolbarForSelection, 0));
    article.addEventListener('keyup', (event) => {
      if (event.key === 'Shift' || event.key.startsWith('Arrow')) setTimeout(showToolbarForSelection, 0);
    });
    article.addEventListener('click', (event) => {
      const mark = event.target.closest && event.target.closest('.annotation-highlight');
      if (mark && mark.dataset.annotationId) openHub({ mode: 'current', focusId: mark.dataset.annotationId });
    });
  }

  function onChapterLoaded(chapter, article) {
    _currentChapter = chapter;
    _currentArticle = article;
    wireArticle(article);
    renderCurrentHighlights();
    renderHubList();
    setTimeout(() => {
      let pending = null;
      try { pending = sessionStorage.getItem(PENDING_SCROLL_KEY); } catch (e) {}
      if (pending && scrollToAnnotation(pending)) {
        try { sessionStorage.removeItem(PENDING_SCROLL_KEY); } catch (e) {}
      }
    }, 100);
  }

  function init() {
    createToolbar();
    ensureOverlay();
    const btn = document.getElementById('notesHubToggle');
    if (btn) btn.addEventListener('click', () => openHub({ mode: 'current' }));
    document.addEventListener('selectionchange', () => {
      if (window.getSelection && window.getSelection().isCollapsed) hideToolbar();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        hideToolbar();
        if (_overlay && !_overlay.hidden) closeHub();
      }
    });
    updateButtonCount();
    loadRepoAnnotations().then(() => {
      if (_annotations.length) scheduleRepoSync(_annotations);
    });
    const article = document.getElementById('bookArticle');
    const chapter = window.BookReader && window.BookReader.currentChapter && window.BookReader.currentChapter();
    if (article && chapter) onChapterLoaded(chapter, article);
  }

  window.BookAnnotations = {
    onChapterLoaded,
    openHub,
    getAll() { return _annotations.slice(); },
    _test: {
      STORAGE_KEY,
      REPO_SYNC_URL,
      mergeAnnotations,
      resolveTextAnchor,
      createAnchor,
      normalizeAnnotation,
      repoPayload,
      syncAnnotationsToRepo,
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  console.log('[book/annotations] Module loaded');
})();
