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
      slug: 'fizyokrasi',
      title: 'Fizyokratik Düşünce',
      subtitle: 'Cantillon\'dan Henry George\'a',
      description: 'Doğal düzen, toprak, akış — Quesnay\'in Tableau\'sundan Turgot reformlarına, Smith\'in mirasından bugünkü ekolojik iktisada.',
      chapterCount: 12,
      status: 'draft',
      primaryAuthors: ['Cantillon', 'Quesnay', 'Mirabeau', 'Turgot', 'Du Pont de Nemours', 'Smith', 'Marx', 'Henry George'],
    },
    {
      slug: 'klasik-iktisat',
      title: 'Klasik İktisat',
      subtitle: 'Smith\'ten Mill\'e, Marx\'a ve marjinal devrime',
      description: '1776 Wealth of Nations\'tan 1870 marjinal devrime — bir okulun yükselişi ve dağılışı; Smith, Malthus, Ricardo, Mill, Marx, klasik makro, büyüme, Osmanlı alımlaması.',
      chapterCount: 12,
      status: 'draft',
      primaryAuthors: ['Smith', 'Malthus', 'Ricardo', 'J.S. Mill', 'Marx', 'Engels', 'Jevons', 'Walras', 'Menger', 'Mehmed Cavid Bey', 'Sraffa', 'Piketty'],
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
    {
      slug: 'egemenlik',
      title: 'Egemenlik ve modern devletin doğuşu',
      subtitle: 'Aristoteles\'ten Foucault\'ya',
      description: 'Egemenliğin antik kökeninden modern devlete — Bodin, Hobbes, Hegel, Weber, Schmitt, Foucault hattı.',
      chapterCount: 12,
      status: 'completed',
      primaryAuthors: ['Aristoteles', 'İbn Haldun', 'Machiavelli', 'Bodin', 'Hobbes', 'Locke', 'Rousseau', 'Hegel', 'Weber', 'Schmitt', 'Foucault'],
    },
    {
      slug: 'iktisat-haritasi',
      title: 'İktisat Düşüncesinin Haritası',
      subtitle: 'Merkantilizmden monetarizme',
      description: 'Bir soy ağacı ve tek bir mercek: her teorik geçiş hem analitik ilerleme hem sınıf-meşrulaştırması. Merkantilizm, fizyokrasi, klasik, Marx, marjinalizm, neoklasik, Keynes, monetarizm — sentez ve eleştiri.',
      chapterCount: 8,
      status: 'draft',
      primaryAuthors: ['Quesnay', 'Smith', 'Ricardo', 'Marx', 'Jevons', 'Menger', 'Walras', 'Marshall', 'Keynes', 'Friedman', 'Hayek'],
    },
    {
      slug: 'tarih-atlasi',
      title: 'Dünya Tarihi Atlası',
      subtitle: 'Bölgeler, dönemler ve güç biçimleri',
      description: 'Tarihi tek çizgi gibi değil, bölge x dönem x mercek matrisi olarak okuma denemesi: ekonomi, devlet, savaş, düşünce, din, teknoloji ve ekoloji aynı tabloda.',
      chapterCount: 12,
      status: 'draft',
      primaryAuthors: ['İbn Haldun', 'Braudel', 'McNeill', 'Bayly', 'Pomeranz', 'Tilly', 'Hodgson', 'Abu-Lughod'],
    },
  ];

  console.log('[theme-registry] Loaded', window.MerkantilizmThemes.length, 'themes');
})();
