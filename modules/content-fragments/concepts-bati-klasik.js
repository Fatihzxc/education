/**
 * concepts-bati-klasik.js — T003 content fragment
 * Author: GPT (orchestrator-adapted by Opus to unified fragment pattern)
 *
 * Klasik Batı merkantilist düşünürleri + birincil kaynaklar.
 * Self-registers into window.MerkantilizmFragments (ADR-006 pattern).
 *
 * T003 covers the classic Western mercantilist thinkers. The source references
 * below intentionally avoid page-level quotes until kb-mcp indexes the user's
 * local PDF/text collection.
 */
(function () {
  'use strict';

  const PENDING_MCP = 'pending_mcp_excerpt';

  const CLASSIC_WEST_SOURCES = [
    {
      id: 'primary-malynes-canker',
      type: 'primary',
      author: 'Gerard Malynes',
      title: "The Canker of England's Common Wealth",
      year: 1601,
      language: 'en',
      note: 'Exchange, bullion, and foreign bill controversies before the Mun-Misselden position stabilized.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-malynes-lex-mercatoria',
      type: 'primary',
      author: 'Gerard Malynes',
      title: 'Consuetudo, vel Lex Mercatoria',
      year: 1622,
      language: 'en',
      note: 'A major early English treatment of merchant law, exchange, and regulated trade.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-misselden-free-trade',
      type: 'primary',
      author: 'Edward Misselden',
      title: 'Free Trade, or the Meanes to Make Trade Florish',
      year: 1622,
      language: 'en',
      note: 'Free trade here means orderly and flourishing commerce, not nineteenth-century laissez-faire.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-misselden-circle-commerce',
      type: 'primary',
      author: 'Edward Misselden',
      title: 'The Circle of Commerce',
      year: 1623,
      language: 'en',
      note: 'One of the clearest English statements that national trade balance matters more than exchange-rate policing.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-montchrestien-traicte',
      type: 'primary',
      author: 'Antoine de Montchrestien',
      title: "Traicte de l'oeconomie politique",
      year: 1615,
      language: 'fr',
      note: 'The text that made political economy a title-level term in European statecraft.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-mun-englands-treasure',
      type: 'primary',
      author: 'Thomas Mun',
      title: "England's Treasure by Forraign Trade",
      year: 1664,
      language: 'en',
      note: 'Written earlier, published posthumously; central to the balance-of-trade version of English mercantilism.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-petty-political-arithmetick',
      type: 'primary',
      author: 'William Petty',
      title: 'Political Arithmetick',
      year: 1690,
      language: 'en',
      note: 'Posthumous publication; foundational for numerical reasoning about population, trade, and state capacity.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-petty-taxes-contributions',
      type: 'primary',
      author: 'William Petty',
      title: 'A Treatise of Taxes and Contributions',
      year: 1662,
      language: 'en',
      note: 'Contains Petty’s fiscal reasoning and early labor-land value language.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-child-new-discourse',
      type: 'primary',
      author: 'Josiah Child',
      title: 'A New Discourse of Trade',
      year: 1693,
      language: 'en',
      note: 'Canonical English defense of low interest, chartered-company privileges, and trade expansion.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-davenant-east-india-trade',
      type: 'primary',
      author: 'Charles Davenant',
      title: 'An Essay on the East-India Trade',
      year: 1696,
      language: 'en',
      note: 'A late seventeenth-century argument over Asian imports, re-export, customs revenue, and domestic employment.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-davenant-publick-revenues',
      type: 'primary',
      author: 'Charles Davenant',
      title: 'Discourses on the Publick Revenues, and on the Trade of England',
      year: 1698,
      language: 'en',
      note: 'An important continuation of Petty-style fiscal and commercial statistics.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-hornigk-osterreich',
      type: 'primary',
      author: 'Philipp Wilhelm von Hoernigk',
      title: 'Oesterreich ueber alles, wann es nur will',
      year: 1684,
      language: 'de',
      note: 'A compact cameralist-mercantilist program for Habsburg self-strengthening.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-mandeville-fable',
      type: 'primary',
      author: 'Bernard de Mandeville',
      title: 'The Fable of the Bees',
      year: 1714,
      language: 'en',
      note: 'A provocative bridge between mercantilist luxury debates and later unintended-order arguments.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-law-money-trade',
      type: 'primary',
      author: 'John Law',
      title: 'Money and Trade Considered',
      year: 1705,
      language: 'en',
      note: 'Law’s pre-France statement of money, credit, land bank, and trade expansion arguments.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'primary-steuart-principles',
      type: 'primary',
      author: 'James Steuart',
      title: 'An Inquiry into the Principles of Political Oeconomy',
      year: 1767,
      language: 'en',
      note: 'The last large systematic mercantilist political economy before Smith’s Wealth of Nations.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'secondary-heckscher-mercantilism',
      type: 'secondary',
      author: 'Eli F. Heckscher',
      title: 'Mercantilism',
      year: 1935,
      language: 'en',
      note: 'Classic synthetic account; useful but should be cross-read with revisionist historiography.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'secondary-magnusson-shaping',
      type: 'secondary',
      author: 'Lars Magnusson',
      title: 'Mercantilism: The Shaping of an Economic Language',
      year: 1994,
      language: 'en',
      note: 'Revisionist account treating mercantilism as a language of political economy rather than a single doctrine.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'secondary-cole-colbert',
      type: 'secondary',
      author: 'Charles Woolsey Cole',
      title: 'Colbert and a Century of French Mercantilism',
      year: 1939,
      language: 'en',
      note: 'Standard extended study of Colbert’s administrative and commercial program.',
      mcpStatus: PENDING_MCP,
    },
    {
      id: 'secondary-murphy-john-law',
      type: 'secondary',
      author: 'Antoin E. Murphy',
      title: 'John Law: Economic Theorist and Policy-Maker',
      year: 1997,
      language: 'en',
      note: 'Modern reconstruction of Law as both theorist and institutional experimenter.',
      mcpStatus: PENDING_MCP,
    },
  ];

  const CLASSIC_WEST_CONCEPTS = [
    {
      id: 'gerard-malynes',
      label: 'Gerard Malynes',
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'thinker',
      geography: ['England'],
      era: 'c. 1586-1641',
      years: { activeFrom: 1601, activeTo: 1622 },
      works: [
        { title: "The Canker of England's Common Wealth", year: 1601 },
        { title: 'Consuetudo, vel Lex Mercatoria', year: 1622 },
      ],
      tags: ['bullionism', 'exchange-control', 'merchant-law', 'early-english-mercantilism'],
      depth: {
        intro: 'Gerard Malynes, İngiltere’nin zenginliğinin altın ve gümüş kaçışıyla zayıfladığını düşünen erken bir külçeci yazardı. Ona göre sorun çoğu zaman kötü yönetilen kambiyo ve yabancı tüccarların para hareketleriydi.',
        intermediate: 'Malynes’in önemi, merkantilist düşüncenin henüz “ticaret dengesi” etrafında olgunlaşmadığı bir evreyi göstermesidir. 1601 tarihli metninde İngiliz servet kaybını özellikle kambiyo manipülasyonuna, yabancı banker ve tacirlerin üstünlüğüne, külçe çıkışına bağladı. Bu yüzden çözümü de ticareti genel olarak büyütmekten çok kambiyo piyasasını düzenlemek, para çıkışını sınırlamak ve kraliyet otoritesini para hareketlerinde daha etkin kılmak şeklinde düşündü.\n\nBu pozisyon daha sonra Misselden ve Mun tarafından eleştirildi. Onlar tek tek kambiyo işlemlerine veya külçe giriş çıkışına bakmanın yanıltıcı olduğunu, asıl ölçünün ülkenin toplam dış ticaret dengesi olduğunu savundu. Malynes bu bakımdan “eski bullionism” ile daha olgun “balance of trade” merkantilizmi arasındaki tartışmada başlangıç kutbunu temsil eder.',
        advanced: 'Malynes’i yalnızca “yanlışlanmış külçeci” diye okumak eksik olur. O, on yedinci yüzyıl başında para, kambiyo, tacir hukuku ve devlet egemenliğinin aynı düğümde toplandığı bir dünyada yazıyordu. İngiltere henüz Hollanda tipi finansal derinliğe sahip değildi; dış ticaret açıkları, savaş finansmanı ve yabancı tacir ağları aynı anda tartışılıyordu. Bu bağlamda Malynes’in kambiyo takıntısı, modern gözle dar görünse de, erken modern devletin para standardı ve uluslararası ödeme sistemi üzerindeki kontrol arayışını yansıtır.\n\nMisselden-Malynes polemiği klasik merkantilizmin içindeki teorik farklılığı berraklaştırır. Malynes, fiyat ve kambiyo düzeninin bozulmasını neden olarak görür; Misselden ve Mun ise bunun çoğu kez dış ticaret dengesinin sonucu olduğunu söyler. Bu ayrım önemlidir: birincisi polisiye-regülasyoncu para politikası üretir, ikincisi ihracat kapasitesi, re-export, gemicilik ve sanayi politikası gibi daha geniş bir ticaret stratejisine açılır.\n\nTarih yazımında Malynes genellikle Mun’un “aşılmış” rakibi olarak sahneye çıkar. Fakat Heckscher ve sonraki revizyonist literatür açısından bu tartışma, merkantilizmin tek bir dogmadan çok, devletin dış ticaret ve para dolaşımı üzerindeki değişken müdahale dilleri ailesi olduğunu gösterir. Malynes’in hatası, serveti sadece külçeye indirgemesi değil; ticaretin çok taraflı ve dönemsel mahsubunu yeterince kavrayamamasıdır.',
      },
      keyClaims: [
        'Kambiyo kuru ve para çıkışı, ulusal servet kaybının başlıca açıklaması olarak görülür.',
        'Devlet, yabancı tacir ve bankerlerin para hareketlerini denetlemelidir.',
        'Mun-Misselden çizgisi, Malynes’in dar kambiyo açıklamasını toplam ticaret dengesi lehine geriye iter.',
      ],
      related: [
        { to: 'bullionism', type: 'etkiler', note: 'Malynes erken İngiliz bullionism tartışmasının ana figürlerindendir.' },
        { to: 'edward-misselden', type: 'karşıt-tez', note: 'Misselden, Malynes’in kambiyo merkezli teşhislerini eleştirir.' },
        { to: 'thomas-mun', type: 'tarihsel-öncel', note: 'Mun’un daha olgun ticaret dengesi argümanının polemik arka planını oluşturur.' },
      ],
      sourceRefs: [
        { source: 'primary-malynes-canker', locator: 'general argument', quote: null, status: PENDING_MCP },
        { source: 'primary-malynes-lex-mercatoria', locator: 'exchange and merchant law sections', quote: null, status: PENDING_MCP },
        { source: 'secondary-magnusson-shaping', locator: 'early English debates', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1601-malynes-canker', 'evt-1622-malynes-lex-mercatoria'],
    },
    {
      id: 'edward-misselden',
      label: 'Edward Misselden',
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'thinker',
      geography: ['England'],
      era: 'fl. 1620s',
      years: { activeFrom: 1622, activeTo: 1623 },
      works: [
        { title: 'Free Trade, or the Meanes to Make Trade Florish', year: 1622 },
        { title: 'The Circle of Commerce', year: 1623 },
      ],
      tags: ['balance-of-trade', 'english-merchant-debate', 'east-india-company', 'anti-malynes'],
      depth: {
        intro: 'Edward Misselden, zenginliği anlamak için tek tek para çıkışlarına değil, ülkenin toplam ticaret hesabına bakmak gerektiğini savundu. Bu yüzden Malynes’in dar külçe ve kambiyo açıklamasına karşı daha geniş bir ticaret dengesi bakışı geliştirdi.',
        intermediate: 'Misselden’in 1622’deki “Free Trade” başlığı bugünkü serbest ticaret anlamına gelmez; daha çok ticaretin gelişmesini sağlayacak düzenli ve akılcı bir politika anlamındadır. Ona göre ülke bazı işlemlerde para kaybedebilir, hatta belirli malları ithal edebilir; önemli olan yıl sonunda ihracat, yeniden ihracat, navlun ve ticari kazançların toplamda ülkeye fazla bırakmasıdır.\n\nBu yaklaşım East India Company etrafındaki tartışmalar için kritikti. Şirket Asya’ya gümüş gönderdiği için suçlanıyordu. Misselden-Mun çizgisi, bu gümüşün daha sonra Avrupa’ya satılacak mallar ve daha yüksek ticari kazançlar üretiyorsa sermaye gibi düşünülebileceğini savundu. Böylece merkantilizm içinde “külçeyi içeride tut” buyruğundan “külçeyi karlı ticaret için döndür” fikrine geçiş görülür.',
        advanced: 'Misselden’in teorik yeniliği, ticaretin tek işlem düzeyinde değil, dairesel ve muhasebesel bir bütün olarak anlaşılması gerektiği sezgisidir. “Circle of Commerce” başlığı bu açıdan açıklayıcıdır: para, mal, kredi, navlun ve yeniden ihracat birbirine bağlıdır. Bu sezgi, erken modern muhasebe ve devlet istatistiği henüz zayıfken ortaya çıkar; bu nedenle Misselden’in argümanı hem teorik hem idari bir taleptir: devlet toplam dış hesabı ölçebilmelidir.\n\nMalynes ile çatışma, merkantilist düşüncenin basitçe altın fetişizmi olmadığını gösterir. Misselden altın ve gümüşü önemsiz saymaz; fakat onların üretken ticaret içinde dönmesini savunur. Burada servet, statik stok olmaktan kısmen çıkar ve uluslararası ticaret kapasitesine, şirket imtiyazlarına, deniz taşımacılığına ve ticari ağlara bağlanır.\n\nYine de Misselden modern liberal değildir. Ticaretin gelişmesi için devlet desteği, şirket ayrıcalığı, ulusal çıkar filtresi ve yabancı rekabetin yönetilmesi gerekir. Onun “free trade”i, bireyin sınırsız piyasa özgürlüğünden ziyade İngiliz ticaretinin önündeki yanlış düzenlemelerin temizlenmesi ve doğru düzenlemelerin kurulması anlamına gelir.',
      },
      keyClaims: [
        'Ticaret politikası tek tek para çıkışlarıyla değil toplam dış ticaret hesabıyla değerlendirilmelidir.',
        'Karlı ithalat ve yeniden ihracat, ilk anda külçe çıkışı yaratsa bile ulusal kazanç üretebilir.',
        'Erken modern “free trade” ifadesi modern laissez-faire ile karıştırılmamalıdır.',
      ],
      related: [
        { to: 'gerard-malynes', type: 'karşıt-tez', note: 'Kambiyo merkezli açıklamaya karşı toplam ticaret dengesi vurgusu yapar.' },
        { to: 'thomas-mun', type: 'etkiler', note: 'Mun’un East India Company savunusuyla aynı teorik hatta durur.' },
        { to: 'balance-of-trade', type: 'etkiler', note: 'İngiliz ticaret dengesi düşüncesinin erken formülasyonlarından biridir.' },
      ],
      sourceRefs: [
        { source: 'primary-misselden-free-trade', locator: 'title argument and opening sections', quote: null, status: PENDING_MCP },
        { source: 'primary-misselden-circle-commerce', locator: 'commerce balance discussion', quote: null, status: PENDING_MCP },
        { source: 'secondary-magnusson-shaping', locator: 'Mun-Malynes-Misselden debate', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1622-misselden-free-trade', 'evt-1623-misselden-circle-commerce'],
    },
    {
      id: 'antoine-de-montchrestien',
      label: 'Antoine de Montchrestien',
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'thinker',
      geography: ['France'],
      era: '1575-1621',
      years: { birth: 1575, death: 1621 },
      works: [{ title: "Traicte de l'oeconomie politique", year: 1615 }],
      tags: ['political-economy', 'manufactures', 'french-mercantilism', 'statecraft'],
      depth: {
        intro: 'Antoine de Montchrestien, “politik ekonomi” terimini eser başlığında kullanan erken yazarlardan biri olarak önemlidir. Ona göre ekonomi, ev idaresinden çıkıp kralın ve devletin yönetmesi gereken ulusal bir mesele haline gelmişti.',
        intermediate: 'Montchrestien’in 1615 tarihli eseri, merkantilist düşüncenin dilini değiştirir: üretim, ticaret, zanaat, işsizlik ve dış rekabet artık yalnız tacirlerin değil, devlet aklının konusudur. Fransa’nın güçlenmesi için yerli imalatın korunması, yabancı mallara bağımlılığın azaltılması ve çalışabilir nüfusun üretken işlere yöneltilmesi gerektiğini savunur.\n\nBu yaklaşım daha sonra Colbertizmde idari biçim kazanacak Fransız çizgisinin öncüsüdür. Montchrestien, İngiliz Mun-Misselden çizgisi gibi sadece ticaret fazlasına odaklanmaz; üretim kapasitesi, zanaat disiplini ve kralın düzenleyici rolünü de merkeze alır. Bu yüzden onu “political economy”nin adlandırma tarihinde olduğu kadar Fransız devletçi imalat politikasının erken sesi olarak okumak gerekir.',
        advanced: 'Montchrestien’in kavramsal önemi, “ekonomi”nin ölçeğini değiştirmesidir. Aristotelesçi ve skolastik gelenekte oikonomia daha çok hane, ahlak ve geçim düzeniyle ilişkilidir; Montchrestien’de ise krallığın üretici güçleri, nüfusu, dış ticareti ve mali kapasitesi tek bir siyasal yönetim nesnesi haline gelir. Bu, modern devletin ekonomi üzerinde bilgi toplama ve müdahale iddiasının dilsel işaretlerinden biridir.\n\nFransız bağlamında bu düşünce, iç gümrükler, ayrıcalıklı şirketler, lonca düzeni, kalite kontrolü ve lüks mallar üretimiyle birleşir. Montchrestien’in önerileri Colbert’in ayrıntılı bürokratik programı değildir; fakat aynı temel soruyu sorar: Fransa, dışarıdan pahalı mamul almak yerine kendi zanaat ve sanayisini nasıl kurar, kendi nüfusunu nasıl çalıştırır, kendi parasını nasıl içeride tutar?\n\nRevizyonist tarih yazımı açısından Montchrestien, merkantilizmin sadece “altın biriktirme doktrini” değil, ekonomik dilin devlet merkezli yeniden kuruluşu olduğunu gösterir. Bu dilde yoksulluk ahlaki bir kusur olmaktan çıkarak çalıştırılacak nüfus, imalat açığı ve ulusal rekabet meselesi haline gelir.',
      },
      keyClaims: [
        'Ekonomi, kralın ve devletin yönetmesi gereken siyasal bir alandır.',
        'Yerli imalat ve zanaat kapasitesi, dış ticaret başarısının ön koşuludur.',
        'Fransız merkantilizminin Colbert öncesi kavramsal zeminini temsil eder.',
      ],
      related: [
        { to: 'jean-baptiste-colbert', type: 'tarihsel-öncel', note: 'Colbertçi üretim ve kalite siyasetinin erken dilini hazırlar.' },
        { to: 'manufactures-royales', type: 'araç-amaç', note: 'Yerli imalat kapasitesi ve devlet desteği aynı politika evrenindedir.' },
        { to: 'populationism', type: 'etkiler', note: 'Çalışabilir nüfusu üretken işe yöneltme fikriyle bağlantılıdır.' },
      ],
      sourceRefs: [
        { source: 'primary-montchrestien-traicte', locator: 'general program', quote: null, status: PENDING_MCP },
        { source: 'secondary-heckscher-mercantilism', locator: 'French mercantilism chapters', quote: null, status: PENDING_MCP },
        { source: 'secondary-magnusson-shaping', locator: 'political economy vocabulary', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1615-montchrestien-traicte'],
    },
    {
      id: 'thomas-mun',
      label: 'Thomas Mun',
      lens: {
        root: 'İngiltere dış ticarette Hollanda, İspanya ve Doğu Hindistan ticaretiyle yarışırken servetin nasıl ölçüleceğini yeniden düşünmek zorundaydı.',
        dominant: 'Mun ve şirket çevresi için külçenin dışarı çıkması tek başına kayıp değildi; daha büyük ticari çevrim sonunda fazla bırakıyorsa rasyoneldi.',
        counter: 'Malynes çizgisi para çıkışını tehlike sayar; Smith-Hume çizgisi ise dış fazla hedefinin refahı yanlış yerde aradığını söyler.',
        publicEye: 'Tüccar için fırsat, tüketici için ithal mal, denizci için iş, sömürge halkları için daha sert şirket düzeni anlamına gelebilirdi.',
        control: 'Mun ulusal serveti mi açıklıyor, yoksa East India Company gibi güçlü bir grubun çıkarını ulusal çıkar diliyle mi savunuyor?'
      },
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'thinker',
      geography: ['England'],
      era: '1571-1641',
      years: { birth: 1571, death: 1641 },
      works: [
        { title: 'A Discourse of Trade from England unto the East-Indies', year: 1621 },
        { title: "England's Treasure by Forraign Trade", year: 1664 },
      ],
      tags: ['balance-of-trade', 'east-india-company', 're-export', 'english-mercantilism'],
      depth: {
        intro: 'Thomas Mun, klasik İngiliz merkantilizminin en bilinen ismidir. Temel fikri şudur: bir ülke zenginleşmek istiyorsa, uzun dönemde sattığı malların değeri aldığı malların değerinden fazla olmalıdır.',
        intermediate: 'Mun’un yeniliği, altın ve gümüşü sadece kasada tutulacak bir hazine gibi değil, ticareti büyütmek için kullanılan sermaye gibi görmesidir. East India Company Asya’ya gümüş gönderdiğinde eleştiriliyordu; Mun ise bu gümüşün baharat, ipek veya tekstil gibi mallara dönüşüp Avrupa’da daha yüksek değerle satılması halinde ülkeye net kazanç sağlayabileceğini savundu.\n\nBu nedenle Mun’da asıl ölçü tek tek işlemler değil, genel ticaret dengesidir. Bazı ülkelerle açık verilebilir, bazı mallar ithal edilebilir; fakat toplamda ihracat, yeniden ihracat, navlun ve ticari karlar ülkeye fazla bırakıyorsa ulusal servet artar. Adam Smith’in daha sonra hedef aldığı “mercantile system”in en rafine İngiliz formu büyük ölçüde bu Mun çizgisidir.',
        advanced: 'Mun’un düşüncesi basit bir “ihracat iyi, ithalat kötü” şeması değildir. Onun daha incelikli noktası, ithalatın niteliği ve sonraki ticari çevrimidir. Tüketimde eriyen lüks ithalat sakıncalıdır; fakat yeniden ihraç edilecek veya üretimi besleyecek ithalat, dış fazla yaratıyorsa kabul edilebilir. Bu ayrım, erken modern ticaretin çok taraflı takas ve arbitraj karakterini anlaması bakımından önemlidir.\n\nMun’un East India Company yöneticisi olması teorisini doğrudan şekillendirir. Şirketin Asya’ya külçe göndermesi, eski bullionist refleksle ulusal zarar gibi görünür. Mun ise sermaye devri mantığıyla cevap verir: para dışarı çıkabilir, fakat daha yüksek değerli mal, navlun geliri ve yeniden ihracat imkanı olarak geri döner. Böylece merkantilizmin olgun evresinde para stoku ile ticaret akımı arasında daha dinamik bir bağ kurulur.\n\nSmith’in eleştirisi açısından Mun çok merkezi bir figürdür. Smith, serveti para stoku veya dış fazla ile özdeşleştiren sistemi reddederken Mun’un teorik mirasını hedef alır. Fakat modern tarih yazımı Mun’u yalnızca Smith’in karikatüründeki merkantilist olarak değil, şirket kapitalizmi, imparatorluk ticareti ve devlet destekli dış rekabet çağının rasyonel bir analisti olarak da okur.',
      },
      keyClaims: [
        'Ulusal servet için belirleyici olan toplam dış ticaret fazlasıdır.',
        'Karlı ticaret için külçe ihracı, sermaye devri gibi işleyebilir.',
        'Tüketim lüksü ile üretken veya yeniden ihraç edilebilir ithalat ayrılmalıdır.',
      ],
      related: [
        { to: 'edward-misselden', type: 'paralel/karşılaştırılabilir', note: 'İkisi de Malynes’in dar kambiyo-külçe açıklamasından uzaklaşır.' },
        { to: 'balance-of-trade', type: 'etkiler', note: 'Toplam ticaret dengesi kavramının klasik İngiliz formunu kurar.' },
        { to: 'east-india-company', type: 'araç-amaç', note: 'Şirket ticareti ve yeniden ihracat, Mun’un argümanının pratik zeminidir.' },
        { to: 'adam-smith', type: 'karşıt-tez', note: 'Smith’in Kitap IV eleştirisinin başlıca hedeflerinden biridir.' },
      ],
      sourceRefs: [
        { source: 'primary-mun-englands-treasure', locator: 'chapters on foreign trade and treasure', quote: null, status: PENDING_MCP },
        { source: 'secondary-heckscher-mercantilism', locator: 'English balance-of-trade doctrine', quote: null, status: PENDING_MCP },
        { source: 'secondary-magnusson-shaping', locator: 'Mun and mercantile language', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1600-east-india-company', 'evt-1621-mun-discourse', 'evt-1664-mun-treasure-published'],
    },
    {
      id: 'jean-baptiste-colbert',
      label: 'Jean-Baptiste Colbert',
      lens: {
        root: 'Fransa pahalı savaşlar, saray harcamaları ve dış rekabet içinde yerli imalat ve donanma kapasitesi kurmak istiyordu.',
        dominant: 'Kraliyet bürokrasisi için Colbertizm, dağınık üretimi disipline edip devleti daha zengin ve güçlü yapacak akıllı bir düzenlemedir.',
        counter: 'Smithçi eleştiri, Huguenot zanaatkâr, köylü ve lonca dışı girişimci açısından bu düzen ayrıcalık, vergi yükü ve katılık üretebilir.',
        publicEye: 'Kalite standardı bazı zanaatkâra güven verirken, vergi ve zorunlu düzenleme köylü ve küçük üreticiye ağır gelebilirdi.',
        control: 'Devletin sanayi kurması hangi noktada toplumsal kapasite, hangi noktada ayrıcalıklı üretici ve saray projesi olur?'
      },
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'statesman',
      geography: ['France'],
      era: '1619-1683',
      years: { birth: 1619, death: 1683 },
      works: [
        { title: 'Tarif de 1664', year: 1664 },
        { title: 'Tarif de 1667', year: 1667 },
        { title: 'Compagnie francaise des Indes orientales founded', year: 1664 },
      ],
      tags: ['colbertism', 'manufactures-royales', 'tariffs', 'navy', 'quality-control', 'french-mercantilism'],
      depth: {
        intro: 'Colbert, XIV. Louis Fransası’nda devlet eliyle sanayi, ticaret ve donanma gücü kurmaya çalışan büyük maliye yöneticisidir. “Colbertizm” denince kaliteli yerli üretim, gümrük koruması, kraliyet fabrikaları ve güçlü deniz ticareti akla gelir.',
        intermediate: 'Colbert’in programı üç hedefi birleştirir: hazine gelirini artırmak, Fransa’nın dışa bağımlı olduğu mamulleri içeride üretmek ve Hollanda-İngiltere deniz ticareti karşısında Fransız ticari kapasitesini büyütmek. Bunun için lüks ve stratejik imalatlara ayrıcalık verdi, kalite standartları koydu, yabancı ustaları çekmeye çalıştı, bazı ithalatları yüksek tarifelerle sınırladı ve ayrıcalıklı ticaret şirketlerini destekledi.\n\nColbertizm sadece “yüksek gümrük” değildir; idari kapasite projesidir. Devlet, hangi kumaşın nasıl dokunacağından cam ve halı üretiminin kalitesine, liman altyapısından donanma tedarikine kadar ekonomiyi ayrıntılı düzenlemek ister. Başarıları vardır: Saint-Gobain gibi kuruluşlar ve Fransız lüks imalatının yükselişi. Ama maliyetleri de büyüktür: savaş devleti, bürokratik katılık, kırsal yükler ve aşırı merkezileşme.',
        advanced: 'Colbert’i teorisyenlerden ayıran şey, fikirleri doğrudan bürokratik aygıta çevirmesidir. İngiliz merkantilizminde East India Company, Navigation Acts ve parlamento yasaları öne çıkarken; Fransız çizgisinde kraliyet idaresi, intendant ağı, kalite nizamnameleri, iç üretim standartları ve ayrıcalıklı imalatlar belirleyicidir. Bu, aynı merkantilist hedefin farklı kurumsal yapılarda farklı biçim aldığını gösterir.\n\nColbert’in ithal ikamesi programı özellikle yüksek katma değerli lüks ve stratejik sektörlere yöneldi: cam, goblen, ipekli, ayna, silah, gemi malzemeleri. Amaç, Fransa’dan külçe çıkışını azaltmak kadar, saray ve aristokrasi tüketimini Fransız üretimine bağlamaktı. Bu yönüyle Colbertizm, tüketim kültürü ile sanayi politikasını birleştirir: lüks ahlaki sorun olmaktan çıkar, doğru yönetilirse ulusal prestij ve ihracat kapasitesi aracına dönüşür.\n\nTarih yazımı Colbert hakkında iki uçtan kaçınmalıdır. Bir uç onu modern kalkınma devletinin kusursuz öncüsü sayar; diğer uç ise bürokratik verimsizlik örneğine indirger. Daha dengeli okuma, Colbertizmi erken modern savaş, saray, maliye ve dış rekabet baskıları altında şekillenen bir devlet kapasitesi deneyi olarak görür. Code Noir gibi sömürge düzenlemelerinin Colbertçi imparatorluk ekonomisiyle ilişkisi de programın karanlık tarafını görünür kılar; üretim ve ticaret gücü, zor emek ve koloniyal hiyerarşilerden bağımsız değildi.',
      },
      keyClaims: [
        'Sanayi politikası, gümrük koruması, kalite denetimi ve donanma politikası aynı devlet projesinin parçalarıdır.',
        'Lüks imalatlar doğru yönetildiğinde dış ticaret ve prestij aracı olabilir.',
        'Colbertizm, merkantilizmin bürokratik ve idari kapasite boyutunu en görünür hale getirir.',
      ],
      related: [
        { to: 'antoine-de-montchrestien', type: 'tarihsel-öncel', note: 'Fransız devletçi imalat dilinin erken öncülü.' },
        { to: 'manufactures-royales', type: 'araç-amaç', note: 'Kraliyet imalatları Colbertçi stratejinin çekirdek aracıdır.' },
        { to: 'protectionism', type: 'araç-amaç', note: '1664 ve 1667 tarifeleri Fransız sanayi korumasına hizmet eder.' },
        { to: 'navigation-acts', type: 'paralel/karşılaştırılabilir', note: 'Fransız donanma ve şirket politikası İngiliz denizcilik korumasıyla karşılaştırılabilir.' },
      ],
      sourceRefs: [
        { source: 'secondary-cole-colbert', locator: 'manufactures, tariffs, and companies', quote: null, status: PENDING_MCP },
        { source: 'secondary-heckscher-mercantilism', locator: 'French mercantilism and Colbertism', quote: null, status: PENDING_MCP },
        { source: 'secondary-magnusson-shaping', locator: 'statecraft and economic language', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1664-french-east-india-company', 'evt-1664-colbert-tariff', 'evt-1667-colbert-tariff', 'evt-1685-code-noir'],
    },
    {
      id: 'william-petty',
      label: 'William Petty',
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'thinker',
      geography: ['England', 'Ireland'],
      era: '1623-1687',
      years: { birth: 1623, death: 1687 },
      works: [
        { title: 'A Treatise of Taxes and Contributions', year: 1662 },
        { title: 'Political Arithmetick', year: 1690 },
      ],
      tags: ['political-arithmetic', 'statistics', 'taxation', 'population', 'labor-value'],
      depth: {
        intro: 'William Petty, devlet ve ekonomi hakkında sayılarla düşünmeye çalışan öncü bir yazardı. Nüfus, vergi, üretim ve ticareti ölçerek siyaset yapma fikrine “political arithmetic” adıyla yön verdi.',
        intermediate: 'Petty’nin merkantilist gelenek içindeki yeri, ticaret fazlası reçetesi vermesinden çok ölçme biçimindedir. Ona göre güçlü devlet, nüfusunu, toprağını, gelirini, ticaretini ve vergi kapasitesini sayısal olarak bilmelidir. Bu yaklaşım, erken modern devletin mali ve askeri rekabetinde bilgi toplamanın önemini gösterir.\n\nAyrıca Petty, değerin oluşumunda emek ve toprağın rolünü birlikte düşünerek klasik iktisada uzanan bir hat açar. Bu onu Mun veya Child gibi doğrudan ticaret politikası yazarlarından ayırır. Petty’de merkantilist devlet aklı, istatistiksel hesaplama ve daha sonra klasik iktisadın kullanacağı değer/nüfus/vergi problemleri yan yana durur.',
        advanced: 'Petty’nin “political arithmetic” projesi, modern ulusal muhasebe veya istatistik kurumlarından önce gelir; fakat aynı zihniyetin erken formudur. Devletin gücü sadece hazinedeki altınla değil, nüfusun çalışabilirliği, toprağın verimi, vergi tabanının genişliği ve ticaret hacmiyle ölçülür. Bu, merkantilizmi kaba bullionismden uzaklaştırıp kapasite ve ölçüm meselesine bağlar.\n\nİrlanda bağlamı Petty’nin düşüncesinde önemlidir. Down Survey ve arazi ölçümü deneyimleri, iktisadi bilginin mülkiyet, fetih, vergi ve yönetimle nasıl iç içe geçtiğini gösterir. Bu yüzden Petty’nin sayısallaştırma tutkusu tarafsız bir teknik değil; devletin toprak ve nüfus üzerindeki idari iddiasının parçasıdır.\n\nPetty aynı zamanda klasik iktisada geçiş figürüdür. Emek ve toprağı değer tartışmasının merkezine yaklaştırması, Smith ve Ricardo’ya giden çizgide anılır. Fakat Petty’de piyasa kendiliğinden düzenlenen bağımsız bir alan değildir; hesaplanan, vergilendirilen ve ulusal güç için seferber edilen bir kaynaktır. Bu ikili karakter, onu hem merkantilist hem proto-klasik yapar.',
      },
      keyClaims: [
        'Devlet, nüfusunu ve ekonomik kaynaklarını sayısal olarak bilmeden etkin politika kuramaz.',
        'Vergi ve ticaret kapasitesi, ulusal gücün ölçülebilir bileşenleridir.',
        'Emek ve toprak, değer ve üretim tartışmasının erken çekirdeğini oluşturur.',
      ],
      related: [
        { to: 'charles-davenant', type: 'etkiler', note: 'Davenant, Petty’nin political arithmetic çizgisini ticaret ve gelir istatistiklerine taşır.' },
        { to: 'populationism', type: 'etkiler', note: 'Nüfusun devlet gücü için ölçülmesi Petty’de merkezi önemdedir.' },
        { to: 'classical-political-economy', type: 'tarihsel-öncel', note: 'Değer, vergi ve nüfus analizi klasik iktisada köprü kurar.' },
      ],
      sourceRefs: [
        { source: 'primary-petty-taxes-contributions', locator: 'tax and value discussions', quote: null, status: PENDING_MCP },
        { source: 'primary-petty-political-arithmetick', locator: 'population and national power estimates', quote: null, status: PENDING_MCP },
        { source: 'secondary-heckscher-mercantilism', locator: 'political arithmetic context', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1662-petty-taxes', 'evt-1690-petty-political-arithmetick'],
    },
    {
      id: 'josiah-child',
      label: 'Josiah Child',
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'thinker',
      geography: ['England'],
      era: '1630-1699',
      years: { birth: 1630, death: 1699 },
      works: [{ title: 'A New Discourse of Trade', year: 1693 }],
      tags: ['low-interest', 'east-india-company', 'chartered-company', 'trade-policy'],
      depth: {
        intro: 'Josiah Child, ticaretin büyümesi için düşük faiz oranlarını ve güçlü ticaret şirketlerini savunan İngiliz merkantilistiydi. Ona göre ucuz kredi, tüccarın ve üreticinin rekabet gücünü artırır.',
        intermediate: 'Child’ın en ünlü argümanı, Hollanda’nın ticari başarısında düşük faiz oranlarının önemli olduğu düşüncesidir. Faiz düşük olursa sermaye daha kolay ticarete ve üretime akar; gemi, stok, hammadde ve uzun mesafeli ticaret finanse edilebilir. Bu nedenle faiz sadece özel borç ilişkisi değil, ulusal rekabet meselesidir.\n\nChild aynı zamanda East India Company yöneticisiydi ve şirket imtiyazlarını savundu. Ona göre uzak mesafeli ve riskli ticaret, dağınık bireysel tüccarlardan çok sermaye biriktirebilen, riskleri taşıyabilen ve devlet desteğiyle hareket eden imtiyazlı şirketlerce yürütülebilirdi. Bu pozisyon, serbest rekabetten çok ulusal güç için örgütlü ticareti öne çıkarır.',
        advanced: 'Child’ın düşük faiz savunusu, erken modern iktisadi düşüncede finansal koşullar ile ulusal rekabet arasındaki bağı gösterir. Modern anlamda merkez bankası politikası öncesinde bile sermaye maliyeti, ticari kapasitenin ana değişkeni olarak görülür. Child, yüksek faizi yalnız ahlaki veya teolojik bir sorun olarak değil, İngiliz ticaretini Hollanda karşısında pahalılaştıran yapısal bir dezavantaj olarak ele alır.\n\nBununla birlikte Child’ın “ucuz kredi” programı tarafsız bir piyasa reformu değildir. Chartered company düzenini, özellikle East India Company’nin ayrıcalıklarını savunması, onun düşük faiz ve ticaret genişlemesini şirket tekeliyle birlikte düşündüğünü gösterir. Bu, merkantilist paradoksu iyi özetler: rekabetçi ulus yaratmak için içeride ayrıcalık ve tekel kullanılabilir.\n\nSmithçi gelenek Child gibi yazarları şirket tekellerinin savunucusu olarak sert eleştirir. Revizyonist okuma ise bu şirketleri, erken modern uluslararası risk, askeri koruma, diplomasi ve sermaye yoğun ticaret koşullarının kurumsal cevabı olarak görür. Child bu nedenle hem çıkar sahibi bir şirket adamı hem de finansal rekabetin erken analistidir.',
      },
      keyClaims: [
        'Düşük faiz, ulusal ticaret rekabeti için stratejik bir avantajdır.',
        'Uzak mesafeli ticarette imtiyazlı şirketler sermaye ve risk yoğunluğunu yönetebilir.',
        'İçeride tekelci örgütlenme, dışarıda ulusal rekabet için araç sayılabilir.',
      ],
      related: [
        { to: 'east-india-company', type: 'araç-amaç', note: 'Child’ın politika dünyası East India Company çıkarlarıyla yakından bağlantılıdır.' },
        { to: 'thomas-mun', type: 'paralel/karşılaştırılabilir', note: 'İkisi de EIC bağlamında şirket ticaretini savunur.' },
        { to: 'low-interest-policy', type: 'etkiler', note: 'Düşük faiz argümanı Child’ın ayırt edici katkısıdır.' },
      ],
      sourceRefs: [
        { source: 'primary-child-new-discourse', locator: 'interest and trade sections', quote: null, status: PENDING_MCP },
        { source: 'secondary-heckscher-mercantilism', locator: 'English company trade', quote: null, status: PENDING_MCP },
        { source: 'secondary-magnusson-shaping', locator: 'late seventeenth-century English debates', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1693-child-new-discourse'],
    },
    {
      id: 'charles-davenant',
      label: 'Charles Davenant',
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'thinker',
      geography: ['England'],
      era: '1656-1714',
      years: { birth: 1656, death: 1714 },
      works: [
        { title: 'An Essay on the East-India Trade', year: 1696 },
        { title: 'Discourses on the Publick Revenues, and on the Trade of England', year: 1698 },
      ],
      tags: ['political-arithmetic', 'public-revenue', 'trade-statistics', 'east-india-trade'],
      depth: {
        intro: 'Charles Davenant, ticaret ve kamu gelirlerini sayılarla analiz etmeye çalışan geç dönem İngiliz merkantilistiydi. Petty’nin “political arithmetic” çizgisini ticaret dengesi ve vergi kapasitesi tartışmalarına taşıdı.',
        intermediate: 'Davenant için dış ticaret politikası, gümrük gelirleri, savaş finansmanı ve ulusal borç birbirinden ayrı konular değildir. İngiltere’nin deniz aşırı ticaretten ne kazandığını anlamak için ithalat-ihracat kayıtları, yeniden ihracat, tüketim ve kamu gelirleri birlikte hesaplanmalıdır. Bu yüzden o, merkantilizmin ölçme ve muhasebe tarafını güçlendirir.\n\nEast India Trade üzerine yazarken, Asya mallarının sadece yerli üretimi yıkıp yıkmadığını değil, yeniden ihracat ve gümrük geliri üretip üretmediğini de hesaba katar. Bu yaklaşım Mun’un toplam denge mantığını Petty’nin sayısallaştırma mirasıyla birleştirir.',
        advanced: 'Davenant’ın önemi geçiş dönemindedir: on yedinci yüzyılın ticaret dengesi dili, on sekizinci yüzyılın mali-devlet ve kamu kredisi sorunlarıyla birleşir. Sürekli savaş, donanma harcamaları ve kamu borcu, dış ticaretin artık sadece külçe girişi açısından değil, vergi tabanı ve finansman kapasitesi açısından da düşünülmesini gerektirir.\n\nDavenant’ın political arithmetic kullanımı modern istatistik standartlarına göre hamdır; fakat devletin ticaret kayıtları üzerinden kendini bilme çabasını temsil eder. Bu bakımdan Davenant, merkantilizmi yalnız korumacı reçeteler dizisi olmaktan çıkarıp bir bilgi rejimi olarak anlamamıza yardım eder: hangi mal nereden gelir, hangi mal yeniden ihraç edilir, hangi tüketim gümrük geliri yaratır, hangi ticaret donanmayı besler?\n\nSmith sonrası literatürde Davenant gibi yazarlar çoğu kez “eski sistemin” parçası sayılır. Ancak onun yazılarında serbest ticaret-karşıtı basit reflekslerden çok, imparatorluk ticaretinin karmaşık bilançosunu çıkarma çabası vardır. Bu, erken modern İngiliz devletinin deniz gücü, kamu maliyesi ve ticaret bilgisini aynı masada topladığı noktadır.',
      },
      keyClaims: [
        'Ticaret politikası kamu geliri ve savaş finansmanından ayrı düşünülemez.',
        'İthalatın etkisi, yeniden ihracat ve gümrük gelirleri hesaba katılarak değerlendirilmelidir.',
        'Political arithmetic, geç merkantilist politika dilinin ana araçlarından biridir.',
      ],
      related: [
        { to: 'william-petty', type: 'etkiler', note: 'Petty’nin sayısal devlet aklı Davenant’ta ticaret ve gelir analizine uygulanır.' },
        { to: 'thomas-mun', type: 'tarihsel-öncel', note: 'Toplam ticaret dengesi mantığını daha mali ve istatistiksel bir dile taşır.' },
        { to: 'public-credit', type: 'araç-amaç', note: 'Ticaret geliri ve kamu kredisi İngiliz mali-devletinin birlikte işleyen parçalarıdır.' },
      ],
      sourceRefs: [
        { source: 'primary-davenant-east-india-trade', locator: 're-export and East India trade discussion', quote: null, status: PENDING_MCP },
        { source: 'primary-davenant-publick-revenues', locator: 'trade and public revenues discussions', quote: null, status: PENDING_MCP },
        { source: 'secondary-heckscher-mercantilism', locator: 'late English mercantilism', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1696-davenant-east-india-trade', 'evt-1698-davenant-publick-revenues'],
    },
    {
      id: 'philipp-von-hornigk',
      label: 'Philipp von Hoernigk',
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'thinker',
      geography: ['Austria', 'Habsburg Monarchy'],
      era: '1638-1712',
      years: { birth: 1638, death: 1712 },
      works: [{ title: 'Oesterreich ueber alles, wann es nur will', year: 1684 }],
      tags: ['cameralism', 'import-substitution', 'populationism', 'self-sufficiency', 'habsburg'],
      depth: {
        intro: 'Philipp von Hoernigk, Avusturya’nın kendi kaynaklarını işleyerek, ithalatı azaltarak ve nüfusunu üretken kullanarak güçlenebileceğini savundu. Onun programı merkantilizmin en kısa ve öğretici kural listelerinden biridir.',
        intermediate: 'Hoernigk’in 1684 tarihli eseri, Habsburg toprakları için bir kalkınma ve kendine yeterlilik programı sunar. Doğal kaynaklar saptanmalı, ham madde içeride işlenmeli, çalışabilir nüfus üretime yönlendirilmeli, altın ve gümüş ülkede tutulmalı, gereksiz lüks ithalat sınırlanmalı, yerli mamul ihracatı teşvik edilmeli ve ham madde ihracatı mümkünse engellenmelidir.\n\nBu çizgi, İngiliz deniz ticareti merkantilizminden ve Fransız Colbertizminden farklı bir Orta Avrupa cameralist duyarlılık taşır. Sorun sadece denizaşırı ticaret değildir; dağınık Habsburg topraklarında nüfus, maden, zanaat, tarım ve maliye kapasitesinin devletçe seferber edilmesidir.',
        advanced: 'Hoernigk’in metni genellikle “dokuz merkantilist kural” ile hatırlanır; fakat bu kuralların arkasındaki bağlam Habsburg rekabetidir. Osmanlı savaşları, Fransız rekabeti ve Alman coğrafyasındaki parçalı siyasal yapı, ekonomik gücü askeri ve mali dayanıklılık sorunu haline getirir. Bu nedenle Hoernigk’in programı, denizaşırı imparatorluk değil, kara imparatorluğu koşullarında merkantilist devlet aklıdır.\n\nİthal ikamesi Hoernigk’te çok açıktır: ülke hammaddeyi ucuza dışarı satıp pahalı mamulü geri almamalıdır. Bu argüman, daha sonra Friedrich List ve modern kalkınmacı sanayi politikası tartışmalarında görülen “ham madde tuzağı” sezgisine yakındır. Yine de Hoernigk modern kalkınma iktisatçısı değildir; amacı verimlilikten önce hanedanın mali ve askeri gücüdür.\n\nHoernigk’i Colbert ile karşılaştırmak öğreticidir. İkisi de yerli üretimi ve dışa bağımlılığın azaltılmasını ister; ancak Colbert saray merkezli bürokratik lüks sanayi ve deniz ticareti inşa ederken, Hoernigk daha geniş kaynak haritalama, nüfus çalıştırma ve kendine yeterlilik listesi sunar. Bu fark, merkantilizmin ulusal kurumsal biçimlere göre değiştiğini gösterir.',
      },
      keyClaims: [
        'Hammadde içeride işlenmeli; ülke pahalı mamul ithalatına bağımlı kalmamalıdır.',
        'Nüfus, madenler, zanaat ve tarım devlet gücü için birlikte seferber edilmelidir.',
        'Kara imparatorluğu bağlamındaki cameralist merkantilizm, denizci İngiliz çizgisinden farklıdır.',
      ],
      related: [
        { to: 'import-substitution', type: 'etkiler', note: 'Hoernigk ithal ikamesi ve yerli işleme mantığını açık biçimde savunur.' },
        { to: 'populationism', type: 'araç-amaç', note: 'Çalışabilir nüfusu üretime sokmak programın ana unsurudur.' },
        { to: 'jean-baptiste-colbert', type: 'paralel/karşılaştırılabilir', note: 'Colbertçi Fransa ile Habsburg cameralizmi arasında karşılaştırma noktasıdır.' },
        { to: 'friedrich-list', type: 'tarihsel-öncel', note: 'Ulusal üretici güçler fikrine giden Orta Avrupa hattında erken bir basamaktır.' },
      ],
      sourceRefs: [
        { source: 'primary-hornigk-osterreich', locator: 'programmatic rules', quote: null, status: PENDING_MCP },
        { source: 'secondary-heckscher-mercantilism', locator: 'Austrian and cameralist mercantilism', quote: null, status: PENDING_MCP },
        { source: 'secondary-magnusson-shaping', locator: 'continental economic language', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1684-hornigk-osterreich'],
    },
    {
      id: 'bernard-de-mandeville',
      label: 'Bernard de Mandeville',
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'thinker',
      geography: ['England', 'Dutch Republic'],
      era: '1670-1733',
      years: { birth: 1670, death: 1733 },
      works: [{ title: 'The Fable of the Bees', year: 1714 }],
      tags: ['luxury', 'consumption', 'unintended-order', 'moral-economy', 'proto-classical'],
      depth: {
        intro: 'Mandeville, lüks ve kişisel çıkarların toplum için tamamen zararlı olmak zorunda olmadığını savunan kışkırtıcı bir yazardı. Arı kovanı alegorisiyle özel tutkuların kamusal zenginlik üretebileceğini ileri sürdü.',
        intermediate: 'Mandeville klasik merkantilistlerden farklıdır: asıl derdi gümrük tarifesi veya ticaret dengesi tekniği değil, ahlak ile ekonomik canlılık arasındaki gerilimdir. Dönemin birçok yazarı lüks tüketimi para kaçışı, ahlaki çürüme ve ithalat bağımlılığı olarak görürken Mandeville, tüketim arzularının zanaat, istihdam ve ticari hareketlilik doğurduğunu savundu.\n\nBu yaklaşım onu hem merkantilist tartışmanın içinde hem de Smith öncesi klasik iktisada giden yolda ilginç kılar. Mandeville, bireysel niyet ile toplumsal sonuç arasındaki farkı vurgular: insanlar erdemli bir kamu planı için değil, kendi tutkuları için hareket eder; buna rağmen işbölümü, talep ve istihdam ortaya çıkabilir.',
        advanced: 'Mandeville’in “özel kötülükler, kamusal faydalar” şeklinde özetlenen tezi, merkantilist ahlak ekonomisine yöneltilmiş provokatif bir saldırıdır. Erken modern politika dili çoğu kez tasarruf, kanaat, yerli üretim ve lüks ithalatın sınırlanmasını över. Mandeville ise lüksü bastırmanın ekonomik dolaşımı da bastırabileceğini söyler. Bu, talep, istihdam ve tüketim arasındaki bağı erken ve rahatsız edici bir biçimde görünür kılar.\n\nOnu Adam Smith’in doğrudan habercisi saymak cazip ama sınırlıdır. Smith, Mandeville’in ahlak felsefesini sert biçimde eleştirir; yine de unintended consequences, kişisel çıkar ve toplumsal düzen arasındaki problemler iki yazarı aynı büyük tartışmaya bağlar. Mandeville’de piyasa düzeni erdemli bir uyum değil, tutkuların ve statü arzusunun ürettiği huzursuz bir canlılıktır.\n\nMerkantilizm açısından Mandeville lüks ithalat meselesini tersyüz eder. Bir Colbertçi, lüksü yerli üretime bağlayarak ulusal güç yaratmak ister; Mandeville ise arzunun kendisini ekonomik motor olarak görür. Bu yüzden Mandeville, klasik merkantilist politika reçetelerinden ziyade merkantilist çağın tüketim ve ahlak krizini anlamak için temel figürdür.',
      },
      keyClaims: [
        'Lüks ve kişisel çıkar, ahlaki olarak rahatsız edici görünse bile istihdam ve üretim yaratabilir.',
        'Bireysel niyet ile toplumsal sonuç aynı şey değildir.',
        'Merkantilist tasarruf ve lüks karşıtlığına karşı tüketim talebinin ekonomik rolünü görünür kılar.',
      ],
      related: [
        { to: 'luxury-debate', type: 'etkiler', note: 'Lüks tüketim tartışmasının en kışkırtıcı erken modern seslerinden biridir.' },
        { to: 'adam-smith', type: 'tarihsel-öncel', note: 'Smith’in ahlak ve çıkar tartışmalarında eleştirel bir arka plan figürüdür.' },
        { to: 'jean-baptiste-colbert', type: 'paralel/karşılaştırılabilir', note: 'Colbert lüksü devletçe yönlendirirken Mandeville lüks arzusunun ekonomik enerjisini tartışır.' },
      ],
      sourceRefs: [
        { source: 'primary-mandeville-fable', locator: 'poem and remarks on luxury', quote: null, status: PENDING_MCP },
        { source: 'secondary-magnusson-shaping', locator: 'luxury and commercial society debates', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1714-mandeville-fable'],
    },
    {
      id: 'john-law',
      label: 'John Law',
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'thinker-statesman',
      geography: ['Scotland', 'France'],
      era: '1671-1729',
      years: { birth: 1671, death: 1729 },
      works: [
        { title: 'Money and Trade Considered', year: 1705 },
        { title: 'Banque Generale founded', year: 1716 },
        { title: 'Mississippi System peak and collapse', year: 1720 },
      ],
      tags: ['paper-money', 'credit', 'mississippi-system', 'banking', 'speculation'],
      depth: {
        intro: 'John Law, para ve kredi genişlerse ticaretin de genişleyebileceğini düşünen İskoç finans teorisyeni ve Fransa’daki Mississippi Sistemi’nin kurucusudur. Başarısızlığı, kâğıt para ve spekülasyonun tehlikelerini Avrupa’ya dramatik biçimde gösterdi.',
        intermediate: 'Law’un temel fikri, ekonominin altın ve gümüş kıtlığına mahkum olmaması gerektiğiydi. Güvenilir bir banka ve dolaşıma sokulan kâğıt para, ticareti canlandırabilir, atıl kaynakları harekete geçirebilir ve devlet borcunu yönetilebilir hale getirebilirdi. Bu yönüyle Law, klasik külçeci merkantilizmin sınırlarını zorlar: zenginlik sadece metal stokunda değil, kredi ve dolaşım kapasitesindedir.\n\nFransa’da Banque Generale, ardından Mississippi Company etrafında kurduğu sistem başlangıçta borçları dönüştürdü ve piyasa coşkusu yarattı. Ancak hisse fiyatları, koloni beklentileri ve para ihracı arasındaki bağ kontrolden çıkınca 1720’de balon patladı. Law bu yüzden hem modern finansal inovasyonun öncüsü hem de finansal kriz tarihinin ibret figürü olarak okunur.',
        advanced: 'Law’u merkantilist yapan şey, kredi teorisinin ulusal güç ve devlet maliyesiyle birleşmesidir. O, para arzını genişleterek ticaret hacmini, varlık fiyatlarını, vergi kapasitesini ve devlet borcu yönetimini aynı anda dönüştürmek istedi. Bu, Colbertçi imalat politikasından farklı bir yoldur: üretimi doğrudan nizamnameyle kurmak yerine, dolaşım ve kredi mekanizmasını büyüterek ekonomik enerjiyi serbest bırakmak.\n\nMississippi Sistemi’nin çöküşü yalnız “aşırı para basma” hikayesi değildir. Devlet borcu, koloni beklentileri, şirket tekeli, hisse senedi spekülasyonu ve kâğıt paraya güven aynı mimaride birbirine bağlandı. Sistem yükselirken her parça diğerini güçlendirdi; güven kırıldığında aynı bağlantılar çöküşü hızlandırdı. Bu yapı modern finansal kırılganlığın erken bir laboratuvarı gibidir.\n\nTarih yazımı Law konusunda ikiye bölünür: bir gelenek onu maceracı ve balon üreticisi olarak görür; modern çalışmalar ise onu ciddi bir para teorisyeni ve politika tasarımcısı olarak yeniden değerlendirir. Her iki okuma birlikte gereklidir. Law’un başarısızlığı, kredi yaratımının üretken gücünü ortadan kaldırmaz; ama devlet gücüyle desteklenen finansal genişlemenin güven, şeffaflık ve gerçek gelir beklentisi olmadan sürdürülemeyeceğini gösterir.',
      },
      keyClaims: [
        'Para sadece metal stokundan ibaret değildir; kredi ve dolaşım kapasitesi ticareti büyütebilir.',
        'Devlet borcu, banka parası ve imtiyazlı şirket tekeli tek bir finansal mimaride birleşebilir.',
        'Mississippi balonu, erken modern finansal inovasyonun hem gücünü hem kırılganlığını gösterir.',
      ],
      related: [
        { to: 'bullionism', type: 'karşıt-tez', note: 'Law, metal para kıtlığına bağlı servet anlayışını aşmaya çalışır.' },
        { to: 'chartered-companies', type: 'araç-amaç', note: 'Mississippi Company, finansal ve sömürgesel tekeli birleştirir.' },
        { to: 'public-credit', type: 'etkiler', note: 'Kredi, devlet borcu ve ticaret genişlemesini aynı modelde düşünür.' },
        { to: 'south-sea-bubble', type: 'paralel/karşılaştırılabilir', note: '1720 spekülatif krizleri birlikte okunmalıdır.' },
      ],
      sourceRefs: [
        { source: 'primary-law-money-trade', locator: 'money, credit, and trade proposal', quote: null, status: PENDING_MCP },
        { source: 'secondary-murphy-john-law', locator: 'system design and collapse', quote: null, status: PENDING_MCP },
        { source: 'secondary-heckscher-mercantilism', locator: 'money and credit in mercantilist policy', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1705-law-money-trade', 'evt-1716-banque-generale', 'evt-1720-mississippi-bubble'],
    },
    {
      id: 'james-steuart',
      label: 'James Steuart',
      category: 'classic-mercantilist',
      categoryLabel: 'Klasik Batı merkantilisti',
      type: 'thinker',
      geography: ['Scotland'],
      era: '1713-1780',
      years: { birth: 1713, death: 1780 },
      works: [{ title: 'An Inquiry into the Principles of Political Oeconomy', year: 1767 }],
      tags: ['political-oeconomy', 'statesman', 'late-mercantilism', 'managed-trade', 'transition-to-classical'],
      depth: {
        intro: 'James Steuart, Smith’ten hemen önce büyük ve sistematik bir politik iktisat kitabı yazan son önemli merkantilist figürdür. Ekonomiyi kendi haline bırakılacak bir alan değil, devlet adamının dikkatle yöneteceği karmaşık bir düzen olarak gördü.',
        intermediate: 'Steuart’un 1767 tarihli eseri, merkantilist düşüncenin geç ve olgun bir sentezidir. Nüfus, tarım, sanayi, para, kredi, dış ticaret ve devlet yönetimini tek bir sistem içinde ele alır. Ona göre politika, ülkenin gelişme aşamasına göre değişmelidir; bir yerde serbestlik işe yararken başka bir yerde koruma ve yönlendirme gerekebilir.\n\nBu nedenle Steuart, Smith’in doğal özgürlük sisteminden farklıdır. Smith piyasa rekabetinin kendi düzenini vurgularken, Steuart “statesman”in dengeleyici rolünü öne çıkarır. İşsizlik, fiyat dalgalanması, dış rekabet ve para darlığı gibi sorunlar karşısında devletin pasif kalmaması gerektiğini düşünür.',
        advanced: 'Steuart’u “son merkantilist” yapmak biraz basitleştirici ama öğreticidir. O, eski bullionist kalıpları aynen tekrarlamaz; aksine ticaret, para ve sanayi ilişkisini gelişme aşamalarına göre analiz eder. Bu yönüyle statik bir doktrin değil, tarihsel ve kurumsal farklılıklara duyarlı bir yönetim bilimi sunar. Politik iktisadın görevi, soyut evrensel serbestlik reçetesi vermekten çok, belirli bir toplumdaki bağımlılıkları çözmektir.\n\nSmith ile farkı burada keskinleşir. Smith’in eleştirisi imtiyaz, tekel ve korumacılığın rant üretmesine odaklanır. Steuart ise ani serbestleşmenin toplumsal düzeni ve istihdamı bozabileceğinden kaygılanır. Piyasanın kendiliğinden düzenine güvenmek yerine, devlet adamının geçişleri yönetmesi gerektiğini savunur. Bu, modern kalkınma devleti ve sanayi politikası tartışmalarında Steuart’a yeniden ilgi duyulmasının nedenlerinden biridir.\n\nSteuart aynı zamanda merkantilist çağın kapanışını temsil eder. 1767’de büyük sistemini yayımlar; 1776’da Smith, merkantil sistemi teorik olarak mahkum eden daha etkili metni çıkarır. Bu kronoloji Steuart’u yenilmiş taraf gibi gösterir, fakat gerçekte on dokuzuncu ve yirminci yüzyıldaki korumacı kalkınma, ulusal sanayi ve geç sanayileşme tartışmaları Steuart’un sorularını tekrar gündeme getirir.',
      },
      keyClaims: [
        'Ekonomi, ülkenin gelişme aşamasına göre yönetilmesi gereken tarihsel bir düzendir.',
        'Devlet adamı istihdam, para, sanayi ve dış ticaret dengesini aktif biçimde gözetmelidir.',
        'Smith öncesi son büyük sistematik politik iktisat, merkantilist mirası olgunlaştırır.',
      ],
      related: [
        { to: 'adam-smith', type: 'karşıt-tez', note: 'Smith’in doğal özgürlük sistemiyle Steuart’un yönetilen ekonomi anlayışı karşıt okunur.' },
        { to: 'john-law', type: 'paralel/karşılaştırılabilir', note: 'İkisi de para ve kredi yönetimini devlet politikası içinde düşünür; Law daha deneysel ve krizlidir.' },
        { to: 'friedrich-list', type: 'tarihsel-öncel', note: 'Ulusal gelişme aşaması ve sanayi politikası duyarlılığı List ile karşılaştırılabilir.' },
      ],
      sourceRefs: [
        { source: 'primary-steuart-principles', locator: 'Book I and trade-policy discussions', quote: null, status: PENDING_MCP },
        { source: 'secondary-magnusson-shaping', locator: 'late mercantilist language and Steuart', quote: null, status: PENDING_MCP },
        { source: 'secondary-heckscher-mercantilism', locator: 'late systematic mercantilism', quote: null, status: PENDING_MCP },
      ],
      events: ['evt-1767-steuart-principles', 'evt-1776-smith-wealth-of-nations'],
    },
  ];

  // ADR-006 unified fragment pattern: push into window.MerkantilizmFragments.
  const F = window.MerkantilizmFragments = window.MerkantilizmFragments || {
    concepts: [], events: [], cases: [], quizzes: [],
    modernLinks: [], sources: [], terminology: [], conceptGroups: {}
  };

  function mergeUniqueById(target, additions) {
    const ids = new Set(target.map(x => x.id));
    additions.forEach(item => {
      if (item && item.id && !ids.has(item.id)) {
        target.push(item);
        ids.add(item.id);
      }
    });
  }

  mergeUniqueById(F.sources, CLASSIC_WEST_SOURCES);
  mergeUniqueById(F.concepts, CLASSIC_WEST_CONCEPTS);

  F.conceptGroups.classicWest = {
    id: 'classicWest',
    label: 'Klasik Batı merkantilistleri',
    task: 'T003',
    conceptIds: CLASSIC_WEST_CONCEPTS.map(c => c.id),
    sourceIds: CLASSIC_WEST_SOURCES.map(s => s.id),
    reviewNotes: [
      'Page-level quotes intentionally left null until kb-mcp indexes local sources.',
      'Colbert is modeled as statesman rather than author because the task is concept coverage, not only texts.',
    ],
  };

  console.log('[fragment:concepts-bati-klasik] registered',
    CLASSIC_WEST_CONCEPTS.length, 'concepts +',
    CLASSIC_WEST_SOURCES.length, 'sources');
})();
