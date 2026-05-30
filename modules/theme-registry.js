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
 *   homeGroup       'start' | 'main' | 'continue' for landing curation
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
      homeGroup: 'main',
      method: {
        root: 'Savaş devleti, hazine ihtiyacı, okyanus ticareti ve gümrük rekabeti aynı anda büyür.',
        dominant: 'Devlet adamı ve büyük tüccar sesi güçlüdür; güvenlik ve güç, refahtan ayrı düşünülmez.',
        counter: 'Smith-Hume çizgisi, altını servet sanmanın ve tekelleri korumanın toplumu fakirleştirdiğini söyler.',
        scale: 'Hane bütçesinden limana, hazineden imparatorluk savaşına kadar aynı politikayı dört ölçekte izle.',
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
      homeGroup: 'continue',
      method: {
        root: 'Fransa’da vergi adaletsizliği, tarımsal üretim, borç ve ekmek fiyatı aynı düğümde sıkışır.',
        dominant: 'Toprağı üretken kaynağın merkezi sayan reformcu saray çevresi ve toprak sahibi bakışı öne çıkar.',
        counter: 'Smith, Marx ve sanayi çağının iktisatçıları değerin yalnız tarımdan doğmadığını gösterir.',
        scale: 'Tarladan şehir arsasına, su havzasından atmosfere uzanan rant ve kaynak ölçeğini takip et.',
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
      homeGroup: 'continue',
      method: {
        root: 'Sanayi, şehirleşme, ücretli emek, tahıl yasaları ve imparatorluk ticareti yeni bir düzen sorusu doğurur.',
        dominant: 'Üretici sermaye, serbest ticaret ve ilerleme dili güçlü konuşur; kanon çoğu zaman İngiliz deneyimini merkez alır.',
        counter: 'Marx, korumacı kalkınmacılar ve Osmanlı okurları bu evrensellik iddiasını kendi konumlarından sınar.',
        scale: 'Ücret, kâr ve rantı fabrika, ulus, imparatorluk ve dünya pazarı ölçeğinde ayrı ayrı işaretle.',
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
      homeGroup: 'main',
      method: {
        root: 'İnsanlar “bir şey neye değer?” derken fayda, emek, fiyat ve adaleti aynı kelimeye sığdırmaya çalışır.',
        dominant: 'Kimi dönem üretici/emek, kimi dönem tüketici/tercih, kimi dönem adalet dili baskın hale gelir.',
        counter: 'Emek-değer, marjinal fayda, Sraffa ve Sen birbirinin kör noktasını gösteren karşı okumalar sunar.',
        scale: 'Tek kişinin ihtiyacından piyasa fiyatına, oradan toplumsal adalet ve kamusal ölçüme geç.',
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
      homeGroup: 'main',
      method: {
        root: 'Toprak, emek, miras, devlet ve ortak kaynaklar “kim kullanacak, kim dışlanacak?” sorusunda birleşir.',
        dominant: 'Liberal hukuk çoğu zaman bireysel sahipliği doğal başlangıç gibi anlatır.',
        counter: 'Rousseau, Proudhon, Marx, Osmanlı toprak rejimi ve Ostrom mülkiyetin tarihsel ve çoğul olduğunu gösterir.',
        scale: 'Evden tarlaya, yerel ortak kaynaktan küresel platform ve atmosfere uzanan dışlama ölçeğini gör.',
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
      homeGroup: 'main',
      method: {
        root: 'Savaş, hukuk, din, vergi ve itaat soruları “son sözü kim söyler?” düğümünde toplanır.',
        dominant: 'Devlet merkezli anlatı düzen ve güvenliği öne çıkarır; egemenliği çoğu zaman tek merkezde arar.',
        counter: 'Locke, Rousseau, Osmanlı pratikleri, Weber ve Foucault egemenliğin sınır, meşruiyet ve ilişki tarafını açar.',
        scale: 'Beden, şehir, devlet, uluslar-üstü kurum, platform ve iklim gibi katmanlarda karar izini sür.',
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
      homeGroup: 'start',
      method: {
        root: 'Her yeni ekol, önceki açıklamanın çözemediği fiyat, sınıf, kriz veya devlet sorunundan doğar.',
        dominant: 'Ders kitabı çizgisi teorileri ilerleme zinciri gibi anlatır; sınıf ve güç katmanı kolayca görünmez kalır.',
        counter: 'Anti-Whig okuma, her teoriyi hem açıklama gücü hem meşrulaştırdığı düzen açısından sınar.',
        scale: 'Her ekolü problem, analitik hamle, kazanan koalisyon, kör nokta ve halk karşılığıyla kartlaştır.',
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
      homeGroup: 'start',
      method: {
        root: 'Bölgeler aynı anda farklı ekoloji, savaş, ticaret, din ve devlet kapasitesi baskıları altında değişir.',
        dominant: 'Tek çizgili dünya tarihi çoğu zaman Avrupa merkezli kronolojiyi doğal akış gibi sunar.',
        counter: 'Bölgesel ve karşılaştırmalı okuma, aynı dönemde farklı toplumların farklı zorunluluklarla düşündüğünü gösterir.',
        scale: 'Köy, şehir, bölge, imparatorluk, okyanus ağı ve gezegen ölçeklerini aynı anda takip et.',
        aid: 'Matrisle oku: bölge, dönem, ekonomi, siyaset, savaş ve gündelik hayatı aynı anda işaretle.',
        publicEye: 'Halkın gözüyle tarih göç, vergi, kıtlık, savaş, inanç, iş ve aile güvenliği olarak yaşanır.'
      },
      primaryAuthors: ['İbn Haldun', 'Braudel', 'McNeill', 'Bayly', 'Pomeranz', 'Tilly', 'Hodgson', 'Abu-Lughod'],
    },
  ];

  window.MerkantilizmPaneShortcuts = [
    {
      title: 'Merkantilizm',
      period: '1500-1750',
      color: '#c98a3a',
      href: 'tarih-atlasi/appendix/panes.html#merkantilizm',
      bookHref: 'tarih-atlasi/panes/merkantilizm/book.html#bolum/1',
      root: 'Savaş ve hazine',
      counter: 'Smith-Hume eleştirisi',
      publicEye: 'Vergi, pahalı mal, askerlik',
      plannedChapters: 7,
    },
    {
      title: 'Fizyokrasi',
      period: '1750-1780',
      color: '#8ab36b',
      href: 'tarih-atlasi/appendix/panes.html#fizyokrasi',
      bookHref: 'tarih-atlasi/panes/fizyokrasi/book.html#bolum/1',
      root: 'Toprak ve vergi',
      counter: 'Sanayi değeri itirazı',
      publicEye: 'Ekmek, angarya, kıtlık',
      plannedChapters: 7,
    },
    {
      title: 'Klasik İktisat',
      period: '1776-1870',
      color: '#65a6b7',
      href: 'tarih-atlasi/appendix/panes.html#klasik',
      bookHref: 'tarih-atlasi/panes/klasik/book.html#bolum/1',
      root: 'Sanayi ve bölüşüm',
      counter: 'Marx ve korumacılar',
      publicEye: 'Fabrika, ücret, oy hakkı',
      plannedChapters: 7,
    },
    {
      title: 'Marx ve Artı-Değer',
      period: '1848-1890',
      color: '#c96d6d',
      href: 'tarih-atlasi/appendix/panes.html#marx',
      bookHref: 'tarih-atlasi/panes/marx/book.html#bolum/1',
      root: 'Sermaye ve sömürü',
      counter: 'Marjinal verimlilik',
      publicEye: 'Uzun işgünü, grev, yoksulluk',
      plannedChapters: 7,
    },
    {
      title: 'Marjinalizm',
      period: '1871-1930',
      color: '#a996d8',
      href: 'tarih-atlasi/appendix/panes.html#marjinalizm',
      bookHref: 'tarih-atlasi/panes/marjinalizm/book.html#bolum/1',
      root: 'Tercih ve kıtlık',
      counter: 'Sınıf ve kurum eleştirisi',
      publicEye: 'Tüketim, borç, reklam',
      plannedChapters: 7,
    },
    {
      title: 'Keynesçilik',
      period: '1930-1980+',
      color: '#7fa5c9',
      href: 'tarih-atlasi/appendix/panes.html#keynes',
      bookHref: 'tarih-atlasi/panes/keynes/book.html#bolum/1',
      root: 'Kriz ve talep',
      counter: 'Hayek-monetarist itiraz',
      publicEye: 'İşsizlik, maaş, kamu işi',
      plannedChapters: 7,
    },
  ];

  window.MerkantilizmPlannedThemes = [
    {
      slug: 'para-borc-finans',
      title: 'Para, Borç ve Finans',
      subtitle: 'Değerin dolaşıma girdiği yer',
      status: 'planned',
      question: 'Bir toplum, güveni ve geleceği hangi araçlarla bugüne taşır?',
      root: 'Para kıtlığı, borç ilişkisi, devlet kredisi ve finansal krizler aynı güven sorununa bağlanır.',
      dominant: 'Bankacı, devlet hazinesi ve piyasa aktörü dili çoğu zaman teknik zorunluluk gibi konuşur.',
      counter: 'Graeber, Polanyi, İslam riba tartışması ve kriz tarihçileri finansın ahlaki-siyasal tarafını geri çağırır.',
      publicEye: 'Gündelik hayatta karşılığı enflasyon, kredi kartı borcu, faiz, kira ve geçim kaygısıdır.',
      plannedChapters: 12,
    },
    {
      slug: 'emek-calisma',
      title: 'Emek ve Çalışma',
      subtitle: 'Üretimin görünmeyen bedeni',
      status: 'planned',
      question: 'Kim çalışır, kim yönetir, kim emeğin değerini belirler?',
      root: 'Geçim, zorunluluk, ücret, kölelik, bakım emeği ve fabrika disiplini aynı çalışma düğümünde birleşir.',
      dominant: 'Klasik iktisat ve sanayi anlatısı üretken emeği merkez alır; ev içi ve sömürge emeği çoğu kez geride kalır.',
      counter: 'Marx, feminist iktisat, kölelik tarihi ve işçi anlatıları emeğin görünmeyen tarafını açar.',
      publicEye: 'Vardiya, yevmiye, işsizlik, sendika, göçmenlik ve tükenmişlik olarak hissedilir.',
      plannedChapters: 12,
    },
    {
      slug: 'somurgecilik-dunya-sistemi',
      title: 'Sömürgecilik ve Dünya Sistemi',
      subtitle: 'Merkez ile çevrenin birlikte kurulması',
      status: 'planned',
      question: 'Modern zenginlik hangi uzak maliyetlerin üstüne kuruldu?',
      root: 'Deniz aşırı ticaret, zorla emek, maden, plantasyon ve askeri üstünlük dünya pazarını eşitsiz kurar.',
      dominant: 'İmparatorluk arşivi çoğu zaman düzen, medeniyet ve ticaret diliyle konuşur.',
      counter: 'Fanon, dependencia okulu, postkolonyal tarih ve yerli anlatılar bu dili tersinden okur.',
      publicEye: 'Toprak kaybı, zorla çalışma, vergi, dil baskısı, göç ve gündelik aşağılanma olarak yaşanır.',
      plannedChapters: 12,
    },
    {
      slug: 'enerji-teknoloji',
      title: 'Enerji ve Teknoloji',
      subtitle: 'Üretim gücünün maddi altyapısı',
      status: 'planned',
      question: 'Ekonomik fikirler hangi enerji ve teknik kapasiteye yaslanır?',
      root: 'Odun, kömür, petrol, elektrik, otomasyon ve yapay zeka üretimin sınırlarını değiştirir.',
      dominant: 'İlerleme anlatısı teknolojiyi tarafsız bir verimlilik artışı gibi sunar.',
      counter: 'Ekolojik iktisat, emek tarihi ve teknoloji eleştirisi her yeniliğin maliyet ve iktidar dağıttığını gösterir.',
      publicEye: 'Isınma, ulaşım, iş kaybı, fabrika, ekran ve iklim kaygısı biçiminde görünür.',
      plannedChapters: 12,
    },
    {
      slug: 'din-ahlak-ekonomi',
      title: 'Din, Ahlak ve Ekonomi',
      subtitle: 'Piyasanın meşruiyet dili',
      status: 'planned',
      question: 'Kazanç, faiz, sadaka, lüks ve adalet hangi ahlaki dille tartışılır?',
      root: 'Pazar ilişkileri yalnız fiyatla değil, günah, erdem, adalet, kanaat ve sorumluluk diliyle de kurulur.',
      dominant: 'Modern iktisat çoğu zaman ahlakı dış koşul, piyasayı teknik alan gibi ele alır.',
      counter: 'Skolastikler, İslam iktisat düşüncesi, Weber ve ahlak ekonomisi geleneği bu ayrımı gevşetir.',
      publicEye: 'Helal kazanç, faiz kaygısı, zekat, israf, yardım ve hak edilmiş ücret olarak yaşanır.',
      plannedChapters: 12,
    },
  ];

  console.log('[theme-registry] Loaded', window.MerkantilizmThemes.length, 'themes');
})();
