/**
 * theme-registry.js — Single source of truth for the library's themes.
 *
 * Consumed by:
 *   - index.html (landing)    — renders a card per theme
 *   - command-palette.js      — "→ <other theme>" Cmd+K entries
 *   - future export tooling
 *
 * Each entry MUST have:
 *   slug            folder name under repo root (also the URL path segment)
 *   title           card heading + palette label
 *   subtitle        one-line context
 *   description     1-2 sentence card body (longer than subtitle)
 *   chapterCount    integer, used for "N bölüm" badge
 *   status          'completed' | 'draft' | 'pending'
 *   primaryAuthors  array of strings (used for search hints, not displayed)
 *
 * Expose: window.MerkantilizmThemes
 */
(function() {
  'use strict';

  window.MerkantilizmThemes = [
    {
      slug: 'merkantilizm',
      title: 'Merkantilizm',
      subtitle: '16-18. yüzyıl iktisat düşüncesi',
      description: 'Osmanlı ve Batı perspektifinden, Mun ve Colbert\'ten Genç ve İbn Haldun\'a uzun-form okuma.',
      chapterCount: 12,
      status: 'completed',
      primaryAuthors: ['Mun', 'Smith', 'Colbert', 'Genç', 'Pamuk', 'İbn Haldun'],
    },
    {
      slug: 'deger',
      title: 'Değer kavramının tarihi',
      subtitle: 'Aristoteles\'ten Sen\'e',
      description: 'Emek-değer, marjinalizm, kapabiliteler — değerin antik kökeninden 21. yüzyıla.',
      chapterCount: 12,
      status: 'completed',
      primaryAuthors: ['Aristoteles', 'Aquinas', 'Smith', 'Ricardo', 'Marx', 'Menger', 'Jevons', 'Marshall', 'Sen'],
    },
    {
      slug: 'mulkiyet',
      title: 'Mülkiyet kavramının tarihi',
      subtitle: 'Aristoteles\'ten Ostrom\'a',
      description: 'Sahiplik, ortak alan, emek-mixing, hukuksal kurum — mülkiyetin yirmi beş asırlık seyri.',
      chapterCount: 12,
      status: 'completed',
      primaryAuthors: ['Aristoteles', 'Aquinas', 'İbn Haldun', 'Locke', 'Smith', 'Marx', 'Hegel', 'Proudhon', 'Ostrom'],
    },
  ];

  console.log('[theme-registry] Loaded', window.MerkantilizmThemes.length, 'themes');
})();
