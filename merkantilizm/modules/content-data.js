/**
 * content-data.js — Merkantilizm veri kaydı (registry)
 *
 * Tüm içerik (CONCEPTS, EVENTS, QUIZZES, CASES, MODERN_LINKS, SOURCES,
 * TERMINOLOGY) bu dosyada DEĞİL, `content-fragments/*.js` altında self-register
 * eden fragment'larda tanımlanır. Bu modül onları toplar ve `window.CONTENT`
 * üzerinden expose eder.
 *
 * Yükleme sırası (index.html'de):
 *   1. content-fragments/*.js  (her biri window.MerkantilizmFragments'a push)
 *   2. content-data.js          (bu dosya — fragmanları toplar)
 *   3. timeline.js, concept-map.js, ... (CONTENT'i kullanır)
 *
 * Pattern detayları: content-fragments/README.md  (ADR-006)
 *
 * Expose: window.CONTENT = { CONCEPTS, EVENTS, QUIZZES, CASES,
 *                             MODERN_LINKS, SOURCES, TERMINOLOGY, ...utils }
 */
(function() {
  'use strict';

  // Inject styles
  if (!document.getElementById('content-data-styles')) {
    const style = document.createElement('style');
    style.id = 'content-data-styles';
    style.textContent = '/* content-data has no visual styles — data only */';
    document.head.appendChild(style);
  }

  // Fragment registry: her fragment burada birikir
  const F = window.MerkantilizmFragments || {
    concepts: [],
    events: [],
    cases: [],
    quizzes: [],
    modernLinks: [],
    sources: [],
    terminology: [],
    conceptGroups: {}
  };

  const CONCEPTS = F.concepts || [];
  const EVENTS = F.events || [];
  const CASES = F.cases || [];
  const QUIZZES = F.quizzes || [];
  const MODERN_LINKS = F.modernLinks || [];
  const SOURCES = F.sources || [];
  const TERMINOLOGY = F.terminology || [];
  const CONCEPT_GROUPS = F.conceptGroups || {};

  // Sanity: orphan cross-reference uyarıları (development modu)
  function _validateCrossRefs() {
    const conceptIds = new Set(CONCEPTS.map(c => c.id));
    const eventIds = new Set(EVENTS.map(e => e.id));
    let warnings = 0;
    CONCEPTS.forEach(c => {
      (c.related || []).forEach(r => {
        if (r.to && !conceptIds.has(r.to)) {
          console.warn('[content-data] Orphan concept ref:', c.id, '→', r.to);
          warnings++;
        }
      });
      (c.events || []).forEach(e => {
        if (!eventIds.has(e)) {
          console.warn('[content-data] Orphan event ref:', c.id, '→', e);
          warnings++;
        }
      });
    });
    if (warnings === 0) console.log('[content-data] Cross-refs valid.');
    else console.warn('[content-data] ' + warnings + ' orphan refs (T### eksik içerik olabilir)');
  }

  // Public API
  window.CONTENT = {
    CONCEPTS: CONCEPTS,
    EVENTS: EVENTS,
    QUIZZES: QUIZZES,
    CASES: CASES,
    MODERN_LINKS: MODERN_LINKS,
    SOURCES: SOURCES,
    TERMINOLOGY: TERMINOLOGY,
    CONCEPT_GROUPS: CONCEPT_GROUPS,

    /** Concept'i ID'ye göre bul */
    getConceptById: function(id) {
      return CONCEPTS.find(c => c.id === id);
    },

    /** Event'i ID'ye göre bul */
    getEventById: function(id) {
      return EVENTS.find(e => e.id === id);
    },

    /** Source'u ID'ye göre bul */
    getSourceById: function(id) {
      return SOURCES.find(s => s.id === id);
    },

    /** Terminolojiyi terime/ID'ye göre bul */
    getTermById: function(id) {
      return TERMINOLOGY.find(t => t.id === id);
    },

    /** Kategoriye göre concept'leri filtrele */
    getConceptsByCategory: function(category) {
      return CONCEPTS.filter(c => c.category === category);
    },

    /** Derinliğe göre quiz sorularını filtrele */
    getQuizzesByDepth: function(depth) {
      return QUIZZES.filter(q => q.depth === depth);
    },

    /** Belli bir kavrama yönelik tüm event'leri al */
    getEventsForConcept: function(conceptId) {
      return EVENTS.filter(e => (e.conceptRefs || []).includes(conceptId));
    },

    /** Belli bir event'in ilgili concept'leri */
    getConceptsForEvent: function(eventId) {
      const e = EVENTS.find(ev => ev.id === eventId);
      if (!e) return [];
      return (e.conceptRefs || []).map(cid => CONCEPTS.find(c => c.id === cid)).filter(Boolean);
    }
  };

  console.log('[content-data] Registry hazır:',
    'CONCEPTS=' + CONCEPTS.length,
    'EVENTS=' + EVENTS.length,
    'QUIZZES=' + QUIZZES.length,
    'CASES=' + CASES.length,
    'MODERN_LINKS=' + MODERN_LINKS.length,
    'SOURCES=' + SOURCES.length,
    'TERMINOLOGY=' + TERMINOLOGY.length);

  // Dev modda cross-ref validation (sadece localhost veya file://)
  if (location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    _validateCrossRefs();
  }
})();
