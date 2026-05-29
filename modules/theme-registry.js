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
 *   method          root/counter-reading hints displayed on the landing card
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
      method: {
        root: 'Savaş devleti, hazine ihtiyacı, okyanus ticareti ve gümrük rekabeti aynı anda büyür.',
        dominant: 'Devlet adamı ve büyük tüccar sesi güçlüdür; güvenlik ve güç, refahtan ayrı düşünülmez.',
        counter: 'Smith-Hume çizgisi, altını servet sanmanın ve tekelleri korumanın toplumu fakirleştirdiğini söyler.',
        aid: 'Güç-refah terazisiyle oku: her politika kime güvenlik, kime maliyet getiriyor?',
        publicEye: 'Halk için mesele çoğu zaman ekmek fiyatı, vergi yükü, askerlik ve pahalı ithal mal olarak görünür.'
      },
      primaryAuthors: ['Mun', 'Smith', 'Colbert', 'Genç', 'Pamuk', 'İbn Haldun'],
    },
    {
      slug: 'fizyokrasi',
      title: 'Fizyokratik Düşünce',
      subtitle: 'Cantillon\'dan Henry George\'a',
      description: 'Doğal düzen, toprak, akış — Quesnay\'in Tableau\'sundan Turgot reformlarına, Smith\'in mirasından bugünkü ekolojik iktisada.',
      chapterCount: 12,
      status: 'draft',
      method: {
        root: 'Fransa’da vergi adaletsizliği, tarımsal üretim, borç ve ekmek fiyatı aynı düğümde sıkışır.',
        dominant: 'Toprağı üretken kaynağın merkezi sayan reformcu saray çevresi ve toprak sahibi bakışı öne çıkar.',
        counter: 'Smith, Marx ve sanayi çağının iktisatçıları değerin yalnız tarımdan doğmadığını gösterir.',
        aid: 'Akış şemasıyla oku: ürün, rant, vergi ve tüketim hangi halkadan geçiyor?',
        publicEye: 'Gündelik hayatta bu tartışma vergi memuru, tahıl fiyatı, kıtlık korkusu ve köylü angaryası olarak hissedilir.'
      },
      primaryAuthors: ['Cantillon', 'Quesnay', 'Mirabeau', 'Turgot', 'Du Pont de Nemours', 'Smith', 'Marx', 'Henry George'],
    },
    {
      slug: 'klasik-iktisat',
      title: 'Klasik İktisat',
      subtitle: 'Smith\'ten Mill\'e, Marx\'a ve marjinal devrime',
      description: '1776 Wealth of Nations\'tan 1870 marjinal devrime — bir okulun yükselişi ve dağılışı; Smith, Malthus, Ricardo, Mill, Marx, klasik makro, büyüme, Osmanlı alımlaması.',
      chapterCount: 12,
      status: 'draft',
      method: {
        root: 'Sanayi, şehirleşme, ücretli emek, tahıl yasaları ve imparatorluk ticareti yeni bir düzen sorusu doğurur.',
        dominant: 'Üretici sermaye, serbest ticaret ve ilerleme dili güçlü konuşur; kanon çoğu zaman İngiliz deneyimini merkez alır.',
        counter: 'Marx, korumacı kalkınmacılar ve Osmanlı okurları bu evrensellik iddiasını kendi konumlarından sınar.',
        aid: 'Bölüşüm tablosuyla oku: ücret, kâr ve rant aynı büyümeden ne kadar pay alıyor?',
        publicEye: 'Sokakta karşılığı fabrika saati, ucuz ekmek, işsizlik korkusu, oy hakkı ve şehir yoksulluğudur.'
      },
      primaryAuthors: ['Smith', 'Malthus', 'Ricardo', 'J.S. Mill', 'Marx', 'Engels', 'Jevons', 'Walras', 'Menger', 'Mehmed Cavid Bey', 'Sraffa', 'Piketty'],
    },
    {
      slug: 'deger',
      title: 'Değer kavramının tarihi',
      subtitle: 'Aristoteles\'ten Sen\'e',
      description: 'Emek-değer, marjinalizm, kapabiliteler — değerin antik kökeninden 21. yüzyıla.',
      chapterCount: 12,
      status: 'completed',
      method: {
        root: 'İnsanlar “bir şey neye değer?” derken fayda, emek, fiyat ve adaleti aynı kelimeye sığdırmaya çalışır.',
        dominant: 'Kimi dönem üretici/emek, kimi dönem tüketici/tercih, kimi dönem adalet dili baskın hale gelir.',
        counter: 'Emek-değer, marjinal fayda, Sraffa ve Sen birbirinin kör noktasını gösteren karşı okumalar sunar.',
        aid: 'Üçlü ayrımla oku: kullanım değeri, değişim değeri ve adil değer aynı şey mi?',
        publicEye: 'Gündelik hayatta değer sorusu ücret pazarlığı, kira, ekmek fiyatı, bakım emeği ve “hak ediyor mu?” duygusunda belirir.'
      },
      primaryAuthors: ['Aristoteles', 'Aquinas', 'Smith', 'Ricardo', 'Marx', 'Menger', 'Jevons', 'Marshall', 'Sen'],
    },
    {
      slug: 'mulkiyet',
      title: 'Mülkiyet kavramının tarihi',
      subtitle: 'Aristoteles\'ten Ostrom\'a',
      description: 'Sahiplik, ortak alan, emek-mixing, hukuksal kurum — mülkiyetin yirmi beş asırlık seyri.',
      chapterCount: 12,
      status: 'completed',
      method: {
        root: 'Toprak, emek, miras, devlet ve ortak kaynaklar “kim kullanacak, kim dışlanacak?” sorusunda birleşir.',
        dominant: 'Liberal hukuk çoğu zaman bireysel sahipliği doğal başlangıç gibi anlatır.',
        counter: 'Rousseau, Proudhon, Marx, Osmanlı toprak rejimi ve Ostrom mülkiyetin tarihsel ve çoğul olduğunu gösterir.',
        aid: 'Haklar demeti matrisiyle oku: kullanma, gelir alma, dışlama ve devretme her zaman birlikte mi?',
        publicEye: 'Halk için mülkiyet çoğu zaman ev güvenliği, tarla geçimi, kira baskısı, miras kavgası ve dışlanma demektir.'
      },
      primaryAuthors: ['Aristoteles', 'Aquinas', 'İbn Haldun', 'Locke', 'Smith', 'Marx', 'Hegel', 'Proudhon', 'Ostrom'],
    },
    {
      slug: 'egemenlik',
      title: 'Egemenlik ve modern devletin doğuşu',
      subtitle: 'Aristoteles\'ten Foucault\'ya',
      description: 'Egemenliğin antik kökeninden modern devlete — Bodin, Hobbes, Hegel, Weber, Schmitt, Foucault hattı.',
      chapterCount: 12,
      status: 'completed',
      method: {
        root: 'Savaş, hukuk, din, vergi ve itaat soruları “son sözü kim söyler?” düğümünde toplanır.',
        dominant: 'Devlet merkezli anlatı düzen ve güvenliği öne çıkarır; egemenliği çoğu zaman tek merkezde arar.',
        counter: 'Locke, Rousseau, Osmanlı pratikleri, Weber ve Foucault egemenliğin sınır, meşruiyet ve ilişki tarafını açar.',
        aid: 'Üç eksenli haritayla oku: özne kim, kapsam ne, sınır nerede?',
        publicEye: 'Gündelik karşılığı mahkeme, vergi, askerlik, polis, kimlik, güvenlik ve itiraz hakkıdır.'
      },
      primaryAuthors: ['Aristoteles', 'İbn Haldun', 'Machiavelli', 'Bodin', 'Hobbes', 'Locke', 'Rousseau', 'Hegel', 'Weber', 'Schmitt', 'Foucault'],
    },
    {
      slug: 'iktisat-haritasi',
      title: 'İktisat Düşüncesinin Haritası',
      subtitle: 'Merkantilizmden monetarizme',
      description: 'Bir soy ağacı ve tek bir mercek: her teorik geçiş hem analitik ilerleme hem sınıf-meşrulaştırması. Merkantilizm, fizyokrasi, klasik, Marx, marjinalizm, neoklasik, Keynes, monetarizm — sentez ve eleştiri.',
      chapterCount: 8,
      status: 'draft',
      method: {
        root: 'Her yeni ekol, önceki açıklamanın çözemediği fiyat, sınıf, kriz veya devlet sorunundan doğar.',
        dominant: 'Ders kitabı çizgisi teorileri ilerleme zinciri gibi anlatır; sınıf ve güç katmanı kolayca görünmez kalır.',
        counter: 'Anti-Whig okuma, her teoriyi hem açıklama gücü hem meşrulaştırdığı düzen açısından sınar.',
        aid: 'Soy ağacıyla oku: bir ekol hangi soruyu çözdü, hangi soruyu perdeledi?',
        publicEye: 'Okurun karşısına bu tarih; ücret, fiyat, kriz, devlet müdahalesi ve “kim haklı?” tartışması olarak çıkar.'
      },
      primaryAuthors: ['Quesnay', 'Smith', 'Ricardo', 'Marx', 'Jevons', 'Menger', 'Walras', 'Marshall', 'Keynes', 'Friedman', 'Hayek'],
    },
    {
      slug: 'tarih-atlasi',
      title: 'Dünya Tarihi Atlası',
      subtitle: 'Bölgeler, dönemler ve güç biçimleri',
      description: 'Tarihi tek çizgi gibi değil, bölge x dönem x mercek matrisi olarak okuma denemesi: ekonomi, devlet, savaş, düşünce, din, teknoloji ve ekoloji aynı tabloda.',
      chapterCount: 12,
      status: 'draft',
      method: {
        root: 'Bölgeler aynı anda farklı ekoloji, savaş, ticaret, din ve devlet kapasitesi baskıları altında değişir.',
        dominant: 'Tek çizgili dünya tarihi çoğu zaman Avrupa merkezli kronolojiyi doğal akış gibi sunar.',
        counter: 'Bölgesel ve karşılaştırmalı okuma, aynı dönemde farklı toplumların farklı zorunluluklarla düşündüğünü gösterir.',
        aid: 'Matrisle oku: bölge, dönem, ekonomi, siyaset, savaş ve gündelik hayatı aynı anda işaretle.',
        publicEye: 'Halkın gözüyle tarih göç, vergi, kıtlık, savaş, inanç, iş ve aile güvenliği olarak yaşanır.'
      },
      primaryAuthors: ['İbn Haldun', 'Braudel', 'McNeill', 'Bayly', 'Pomeranz', 'Tilly', 'Hodgson', 'Abu-Lughod'],
    },
  ];

  console.log('[theme-registry] Loaded', window.MerkantilizmThemes.length, 'themes');
})();
