// concepts-rest.js — T004 + T006 + T007 + T011 consolidated content fragment
// Author: opus (solo mode after multi-agent abandonment)
// Self-registers into window.MerkantilizmFragments (ADR-006).
//
// Coverage:
//   T004 — Salamanca okulu + pre-mercantilist (7 düşünür)
//   T006 — Modern revizyonist tarihçiler (5)
//   T007 — Politika kavramları (~16 kavram)
//   T011 — Karşıtlar / klasik iktisada geçiş (8 düşünür)
//
// Pragmatic content depth: intro/intermediate doluya yakın, advanced bazılarında
// kısa tutuldu (özet TODO'lar bırakıldı) — kapsam vs derinlik dengesi için.

(function() {
  "use strict";
  const F = window.MerkantilizmFragments = window.MerkantilizmFragments || {
    concepts: [], events: [], cases: [], quizzes: [],
    modernLinks: [], sources: [], terminology: [], conceptGroups: {}
  };

  const PENDING = "[MCP-pending]";

  const concepts = [

    // ===========================================================
    // T004 — Pre-mercantilist & Salamanca
    // ===========================================================

    {
      id: "thomas-aquinas",
      label: "Thomas Aquinas",
      lens: {
        root: "Ortaçağ dünyasında pazar, yalnız kâr alanı değil; günah, adalet, komşuluk ve geçim düzeniyle birlikte düşünülüyordu.",
        dominant: "Aquinas'ın bakışı, fiyatı toplumun ahlaki dengesi içinde tutmak ister: alıcı da satıcı da insan onurunu zedelemeden yaşamalıdır.",
        counter: "Salamanca ve modern piyasa okuması, değerin yalnız ahlaki ölçüyle değil, kıtlık, talep ve ortak takdirle oluştuğunu söyler.",
        publicEye: "Esnaf ve alıcı için adil fiyat, soyut teori değil; ekmeğin, kumaşın ve borcun gündelik hayatta haksızlığa dönüşmemesi demektir.",
        control: "Bir fiyat yasal ve gönüllü olsa bile, tarafların zorunlulukları eşit değilse gerçekten adil sayılır mı?"
      },
      fullName: "Aziz Thomas Aquinas (1225-1274)",
      category: "pre-mercantilist",
      era: "13. yüzyıl",
      depth: {
        intro: "Skolastik düşüncenin doruğu; *iustum pretium* (adil fiyat) ve faiz yasağı doktrinleri ortaçağ iktisat ahlâkının temelini attı.",
        intermediate: "*Summa Theologica* II-II'de Aquinas adil fiyatı 'ortak takdir' + 'maliyet + makul kâr' karışımı olarak tanımlar; faizi (usura) yasaklar (paranın doğası gereği steril olduğu argümanıyla). Bu doktrinler 16. yy Salamanca okulu tarafından revizyona uğradı: değer subjektivizmi ve kambiyo etiği ile faiz yasağının pratik istisnaları geliştirildi.",
        advanced: "Aquinas'ın iktisat ahlâkı merkantilizmin doğrudan öncülü değil, ama \"devletin ekonomik düzene meşru müdahalesi\" fikrinin Hıristiyan teolojik tabanını sağlar. Joseph Schumpeter *History of Economic Analysis*'te Aquinas'ı klasik öncesi sistematik iktisat düşüncesinin başlangıcı sayar. İslâm hukukundaki ihtikâr yasağı ve adil fiyat doktrini ile paralellikler vardır (Aristoteles ortak kaynak).",
        "tetikleyici-soru": "Aquinas'ın \"adil fiyat\" tanımı bugünkü \"piyasa fiyatı\"ndan ne kadar farklı? Devlet narh sistemi adil fiyatın uygulaması mı, ihlali mi?"
      },
      related: [
        { to: "salamanca-okulu", type: "etkiler" },
        { to: "iasecilik", type: "paralel" },
        { to: "ihtisab-narh", type: "paralel" }
      ],
      sourceRefs: [{ source: "aquinas-summa", page: 0, quote: PENDING }],
      events: ["evt-1271-summa-theologica"]
    },

    {
      id: "salamanca-okulu",
      label: "Salamanca Okulu",
      lens: {
        root: "Amerika gümüşü, fiyat artışı ve fetih ahlakı aynı anda patlayınca eski skolastik cevaplar yetmez hale geldi.",
        dominant: "Salamanca düşünürleri, ticareti ve parayı ahlaki hukuk içinde anlamak ister; amaç hem piyasayı görmek hem vicdanı kaybetmemektir.",
        counter: "Klasik merkantilist ve imparatorlukçu bakış, bu ahlaki sorgulamayı çoğu zaman devlet çıkarı ve hazine ihtiyacı karşısında ikinci plana iter.",
        publicEye: "İspanya'da fiyatlar yükselirken, Amerika'da fetih ve maden emeği başka bir bedel üretiyordu; aynı gümüş iki ayrı hayatı etkiledi.",
        control: "Bir teori fiyat mekanizmasını doğru sezse bile, imparatorluk çıkarı onu duymak istemiyorsa bilgi ne kadar etkili olur?"
      },
      fullName: "Geç Skolastik İspanyol İlahiyatçıları (16. yy)",
      category: "pre-mercantilist",
      era: "16. yüzyıl",
      depth: {
        intro: "16. yy İspanyol Dominiken ve Cizvit ilahiyatçılarının Salamanca Üniversitesi merkezli okul; Amerika gümüş akışını yorumlayarak paranın miktar teorisini, değer subjektivizmini ve uluslararası ticaret ahlâkını formüle ettiler.",
        intermediate: "Üyeleri: Francisco de Vitoria, Martín de Azpilcueta, Tomás de Mercado, Luis de Molina, Domingo de Soto. Üç temel katkıları: (1) Quantity theory of money — Azpilcueta 1556'da, Bodin'den 12 yıl önce, fiyat artışını para arzına bağladı; (2) Subjective value theory — Molina değerin \"ortak takdir\"den (estimatio) doğduğunu söyledi; (3) International just war + property rights — Vitoria Amerika fethinin meşruluğunu sorguladı.",
        advanced: "Salamanca okulu Avusturya iktisat okulunun (Menger, Mises, Hayek) doğrudan entelektüel öncülü sayılır — Murray Rothbard *Economic Thought Before Adam Smith*'te bu hat üzerinde durur. Klasik merkantilizmden farkı: devletler-arası rekabetçi pozisyon değil, ahlâki-hukuki çerçeve odaklı. Ancak quantity theory pratikte İspanya'nın bullion bolluğu paradoksunu açıklamada kullanıldı — bullion artışı fiyatları artırdığı için zenginlik yaratmıyor sonucu Hume 1752'nin öncülüydü.",
        "tetikleyici-soru": "Eğer Salamanca okulu bullion-fiyat ilişkisini 1550'lerde anlamışsa, İspanya neden hala bullion biriktirmeye odaklanan bir politika izledi?"
      },
      related: [
        { to: "jean-bodin", type: "paralel" },
        { to: "david-hume", type: "tarihsel-öncel" },
        { to: "thomas-aquinas", type: "etkiler" },
        { to: "bullionism", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "salamanca-grice-hutchinson", page: 0, quote: PENDING }],
      events: ["evt-1556-azpilcueta-comentario"]
    },

    {
      id: "jean-bodin",
      label: "Jean Bodin",
      lens: {
        root: "Fransa din savaşları, para tağşişi ve fiyat artışıyla sarsılırken devletin hem egemenliğini hem de para düzenini açıklamak gerekiyordu.",
        dominant: "Bodin'in gözüyle güçlü egemenlik, dağınık çatışmayı toparlayan ve ekonomik düzensizliği okunabilir kılan merkezdir.",
        counter: "Liberal ve çoğulcu karşı okuma, mutlak egemenliğin düzen sağlarken yerel hakları ve denge mekanizmalarını boğabileceğini hatırlatır.",
        publicEye: "Sıradan insan için egemenlik teorisi, çoğu zaman vergi, para değerinin düşmesi ve savaşın pazardaki fiyatlara yansıması olarak hissedilir.",
        control: "Devlet düzen kurmak için güç topladığında, o gücü kim denetler ve bedeli kim öder?"
      },
      fullName: "Jean Bodin (1530-1596)",
      category: "pre-mercantilist",
      era: "16. yüzyıl",
      depth: {
        intro: "Fransız hukukçu ve siyaset filozofu; 1568 *Réponse à Malestroit* eseriyle Avrupa fiyat artışını Amerika gümüş akışına bağlayan ilk Avrupalı (Azpilcueta'dan 12 yıl sonra ama bağımsız) ve aynı zamanda erken merkantilist.",
        intermediate: "Bodin'in iki ana katkısı: (1) Quantity theory of money — *Réponse à Malestroit* (1568): Malestroit fiyat artışını para tağşişine bağlarken Bodin altın/gümüş arzının artışına bağladı; (2) Devlet teorisi — *Les Six livres de la République* (1576): mutlak egemenlik (souveraineté absolue) kavramı, modern devlet kuramının temeli. İktisadi olarak merkantilist eğilimleri vardır: ihracat teşviki, korumacılık, lüks ithalata vergi.",
        advanced: "Bodin'in Salamanca okuluyla bağımsız olarak aynı quantity theory'ye varması iktisat tarihinde paralel keşfin klasik örneği. Bodin Avrupa kanalında daha etkili oldu (Mun, Petty, Hume hattı); Salamanca İspanyol kanalında izole kaldı. Bodin'in egemenlik teorisi merkantilizmin meşruluk temelidir — merkantilist devletin ekonomi üzerindeki regülasyon yetkisi Bodin'in egemenlik kavramından beslenir.",
        "tetikleyici-soru": "Bodin'in \"mutlak egemenlik\" kuramı modern devletin ekonomi üzerindeki regülasyon yetkisinin kaynağı mı?"
      },
      related: [
        { to: "salamanca-okulu", type: "paralel" },
        { to: "david-hume", type: "tarihsel-öncel" },
        { to: "bullionism", type: "etkiler" }
      ],
      sourceRefs: [{ source: "bodin-reponse", page: 0, quote: PENDING }],
      events: ["evt-1568-bodin-reponse"]
    },

    {
      id: "giovanni-botero",
      label: "Giovanni Botero",
      lens: {
        root: "Erken modern devlet için nüfus, aynı anda asker, üretici, vergi kaynağı ve şehir canlılığı demekti.",
        dominant: "Botero'nun bakışı nüfusu yük değil güç olarak görür; çok insan doğru düzenlenirse devletin kapasitesi büyür.",
        counter: "Malthusçu karşı okuma, nüfus artışının kaynak sınırına çarpınca yoksulluk, kıtlık ve ücret baskısı üreteceğini savunur.",
        publicEye: "Halk için nüfus siyaseti aile, iş, askerlik ve şehir kalabalığıdır; devletin güç hesabı evin geçim hesabıyla çakışmayabilir.",
        control: "Nüfusu güç sayarken, insanların kendi hayatını mı yoksa devletin kapasitesini mi merkeze alıyoruz?"
      },
      fullName: "Giovanni Botero (1544-1617)",
      category: "pre-mercantilist",
      era: "16-17. yüzyıl",
      depth: {
        intro: "İtalyan cizvit; 1589 *Della Ragion di Stato* (Devletin Aklı) eseriyle nüfus = güç tezini sistemli formüle eden ilk Avrupalı. \"Populationist\" merkantilizmin tohumunu attı.",
        intermediate: "Botero'ya göre devletin gücünün temel kaynağı nüfustur: daha çok kişi = daha çok asker + daha çok üretici + daha çok vergi. Bu fikir 17-18. yy merkantilist düşünürlerinde (Petty, Hörnigk, Mun'un ardılları) sürekli tekrarlandı. Botero ayrıca şehir büyümesinin nedenlerini analiz ederek erken kentleşme iktisadına katkıda bulundu.",
        advanced: "Botero'nun populationizmi Malthus'tan (1798) tam tersi yönde gider — Malthus nüfus artışını refahın düşmanı görürken, Botero kaynak olarak görür. Bu fark 18-19. yy iktisadi düşüncesindeki büyük epistemolojik kayma: kıtlık paradigmasına geçiş. Modern okuma: Botero'nun mantığı bir nevi \"endogenous growth theory\" öncülü — beşeri sermaye = ulusal güç.",
        "tetikleyici-soru": "Botero (1589) ve Malthus (1798) arasında neden bu büyük kayma yaşandı? Sanayi devrimi mi, başka bir şey mi?"
      },
      related: [
        { to: "populationism", type: "etkiler" },
        { to: "william-petty", type: "etkiler" },
        { to: "philipp-von-hornigk", type: "etkiler" }
      ],
      sourceRefs: [{ source: "botero-ragion", page: 0, quote: PENDING }],
      events: ["evt-1589-botero-ragion"]
    },

    {
      id: "antonio-serra",
      label: "Antonio Serra",
      lens: {
        root: "Madenleri olmayan bir krallık altın ve gümüşe nasıl ulaşır sorusu, üretim kapasitesi meselesini ticaretin merkezine taşıdı.",
        dominant: "Serra için sanayi, tarımdan farklıdır; öğrenme, ölçek ve uzmanlaşma sayesinde ülkeyi daha yüksek gelir alanına çıkarabilir.",
        counter: "Fizyokrat ve klasik serbest ticaret okuması, toprağı ya da mevcut karşılaştırmalı üstünlüğü daha doğal başlangıç noktası sayabilir.",
        publicEye: "Zanaatkâr için sanayi politikası iş ve beceri; tüketici için fiyat; çiftçi için kaynakların şehir imalatına kayması anlamına gelebilir.",
        control: "Bir ülke bugünkü ucuz üretimine mi razı olmalı, yoksa pahalı ve zor olsa da yarının sanayi kapasitesini mi kurmalı?"
      },
      fullName: "Antonio Serra (?-1613?)",
      category: "classical-mercantilist",
      era: "17. yüzyıl",
      depth: {
        intro: "Napoli'li düşünür; 1613 *Breve trattato* eseri **ilk sistematik merkantilist eser** kabul edilir. Sanayi vs tarım, ölçek getirileri ve ticaret dengesinin teorik mantığını formüle etti.",
        intermediate: "*Breve trattato delle cause che possono far abbondare li regni d'oro e d'argento dove non sono miniere* (Madenleri olmayan krallıkların altın ve gümüşe nasıl ulaşabileceği üzerine kısa risale) — başlık merkantilist soruyu netleştirir. Serra cevap olarak: (1) sanayi (manufatture) tarımdan üstündür çünkü artan getirileri vardır; (2) ihracat ticaret dengesi pozitif kalmalı; (3) devlet sanayi kurulumunu desteklemeli. Erik Reinert'in 2007 *How Rich Countries Got Rich* tezinde Serra modern kalkınma iktisadının atası olarak konumlandırılır.",
        advanced: "Serra'nın \"ölçek getirileri\" sezgisi 20. yy iktisadında (Krugman 1979'da Nobel'le taçlanan endogenous growth literatürü) ancak resmileşti. Klasik iktisat (Smith, Ricardo) sanayi-tarım eşitliği veya tarım üstünlüğü varsaymıştı — Serra ise sanayinin nitel olarak farklı olduğunu söyledi. Bu farkı yeniden tartışmaya açan Reinert ekolünün kalkınma politikası önerileri (sanayi öncelikli politika, korumacılık) doğrudan Serra üzerine inşa edilmiştir.",
        "tetikleyici-soru": "Serra 1613'te söylediğini, 1997 Asya krizinden sonra Stiglitz neden yeniden söylemek zorunda kaldı?"
      },
      related: [
        { to: "thomas-mun", type: "tarihsel-öncel" },
        { to: "erik-reinert", type: "tarihsel-öncel" },
        { to: "protectionism", type: "araç-amaç" },
        { to: "import-substitution", type: "araç-amaç" },
        { to: "manufactures-royales", type: "tarihsel-öncel" }
      ],
      sourceRefs: [{ source: "serra-breve-trattato", page: 0, quote: PENDING }],
      events: ["evt-1613-serra-breve"]
    },

    // ===========================================================
    // T011 — Karşıtlar / Klasik iktisada geçiş
    // ===========================================================

    {
      id: "david-hume",
      label: "David Hume",
      lens: {
        root: "Merkantilist devletler kalıcı dış fazla ve külçe birikimi ararken Hume, para akışının fiyatları nasıl geri teptirdiğini açıklamak istedi.",
        dominant: "Hume'un gözüyle ekonomi, paniğe kapılmadan mekanizma kurarak anlaşılabilir: altın girer, fiyat yükselir, denge geri gelir.",
        counter: "Karşı okuma, otomatik denge fikrinin çıkar gruplarını, savaş baskısını ve sömürge zorunu yeterince açıklamadığını söyler.",
        publicEye: "Fiyat artışı esnaf, ücretli ve çiftçi için soyut denge değil; satın alma gücü ve geçim baskısı demektir.",
        control: "Bir mekanizma teorik olarak doğruysa, devletler ve çıkar grupları neden ona uygun davranmaz?"
      },
      fullName: "David Hume (1711-1776)",
      category: "karsit",
      era: "18. yüzyıl",
      depth: {
        intro: "İskoç filozof ve iktisatçı; 1752'de *Political Discourses* içinde formüle ettiği *price-specie flow mechanism* merkantilist bullion-biriktirme stratejisine teorik ölümcül darbeyi vurdu.",
        intermediate: "Hume'un argümanı: ihracat fazlası bullion akışı yaratırsa, ülke içinde para arzı artar, fiyatlar artar, ihracat pahalılaşır ve daralır, ithalat ucuzlar ve artar — denge kendiliğinden kurulur. Bu otomatik dengeleyici mekanizma, merkantilizmin \"kalıcı bullion fazlası\" hedefinin imkânsızlığını kanıtlar. *Of the Balance of Trade*, *Of Money*, *Of Commerce* makalelerinde geliştirilir. Hume Smith'ten önce klasik iktisat teorisinin matematiksel temellerini attı.",
        advanced: "Hume'un price-specie flow modeli 20. yy uluslararası para teorisinin temel taşı oldu. Altın standardının (1880-1914) işleyiş varsayımı Hume modeline dayanır. Hume'un argümanı ayrıca quantity theory of money'nin (Salamanca + Bodin) klasik formülasyonunu sağlar. Smith *Wealth of Nations*'da Hume'a defalarca atıf yapar. Mehmet Genç'in Osmanlı analizinde Hume mekanizması çalışmaz — çünkü Osmanlı zaten bullion biriktirmiyordu (iaşecilik), bu yüzden teorik karşıtlık pratik bir polemiğe dönüşmedi.",
        "tetikleyici-soru": "Hume'un teorik argümanı 1752'de yayımlandığında merkantilist devlet politikalarını hemen değiştirmedi. Niye? Fikir mi yetersizdi, çıkar koalisyonları mı engelledi?"
      },
      related: [
        { to: "salamanca-okulu", type: "etkiler" },
        { to: "jean-bodin", type: "etkiler" },
        { to: "bullionism", type: "karşıt-tez" },
        { to: "balance-of-trade", type: "karşıt-tez" },
        { to: "adam-smith", type: "etkiler" }
      ],
      sourceRefs: [{ source: "hume-political-discourses", page: 0, quote: PENDING }],
      events: ["evt-1752-hume-political-discourses"]
    },

    {
      id: "richard-cantillon",
      label: "Richard Cantillon",
      lens: {
        root: "Para, toprak, girişimci risk ve fiyatların nasıl birbirine bağlandığı hâlâ parçalı anlatılıyordu; Cantillon bu dolaşımı bütün olarak görmek istedi.",
        dominant: "Cantillon'un bakışı, ekonomiyi tek bir emir zinciri değil, farklı aktörlerin risk aldığı ve fiyatların kademeli yayıldığı bir akış sistemi gibi okur.",
        counter: "Basit miktar teorisi, para artışını ortalama fiyat artışı gibi görür; Cantillon etkisi ise paranın önce kimin eline geçtiğini sormayı gerektirir.",
        publicEye: "Yeni para önce banker, saray veya tüccara ulaşırsa, ücretli ve küçük üretici fiyat artışını gelir artışından önce hissedebilir.",
        control: "Para artışı herkesi aynı anda ve aynı ölçüde etkilemiyorsa, enflasyon tartışmasında kazananı ve kaybedeni nasıl ayırırız?"
      },
      fullName: "Richard Cantillon (1680?-1734)",
      category: "karsit",
      era: "18. yüzyıl",
      depth: {
        intro: "İrlandalı-Fransız banker; 1755'te ölümünden sonra basılan *Essai sur la nature du commerce en général* eseri ilk genel denge sezgisi ve \"Cantillon etkisi\" (para arzı artışının fiyatları heterojen etkilemesi) ile tanınır.",
        intermediate: "*Essai* üç bölümde gelişir: (1) zenginliğin doğası (toprak ve emek), (2) ticaret ve dolaşım, (3) bankacılık ve uluslararası para. Cantillon ekonomik sistemi bir dolaşım modeli olarak düşünür — Quesnay'ın Tableau Économique'inin (1758) doğrudan öncülü. Cantillon etkisi: yeni para girdiği nokta civarında fiyatlar erken yükselir, uzak noktalarda gecikir; bu eşitsiz dağılım yarar/zarar dağılımını da eşitsiz yapar. Bu fikir Friedman ve Hayek tarafından 20. yy'da yeniden değerlendirildi.",
        advanced: "Cantillon Mississippi Bubble'da (1720) John Law'ın sisteminin çöküşünden kâr eden bankerlerden biriydi; bu deneyim *Essai*'nin para psikolojisi analizini şekillendirir. Schumpeter *Essai*'yi \"the cradle of political economy\" olarak nitelendirir — Smith'in 22 yıl önce Cantillon'dan ilham aldığı (ama nadiren atıf yaptığı) iyi belgelenmiştir. Modern Avusturya okulu Cantillon'u Salamanca-Hume-Menger hattının kritik halkası sayar.",
        "tetikleyici-soru": "Cantillon ölmeden yayımlanmamış olsa, klasik iktisat tarihi nasıl şekillenirdi? Smith'in özgün katkısı ne kadar küçülürdü?"
      },
      related: [
        { to: "francois-quesnay", type: "etkiler" },
        { to: "adam-smith", type: "etkiler" },
        { to: "david-hume", type: "paralel" },
        { to: "john-law", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "cantillon-essai", page: 0, quote: PENDING }],
      events: ["evt-1755-cantillon-essai"]
    },

    {
      id: "francois-quesnay",
      label: "François Quesnay",
      lens: {
        root: "Fransa'da tarım, rant, vergi adaletsizliği ve ağır devlet müdahalesi birbirine düğümlenmişti; fizyokrasi bu düğüme düzen aradı.",
        dominant: "Quesnay için toprak, toplumun gerçek fazla üreten kaynağıdır; ekonomi bir beden gibi akışlarla yaşar.",
        counter: "Colbertçi ve Smithçi karşı okuma, sanayi ve ticaretin üretkenliğini küçümsemenin büyük bir hata olduğunu söyler.",
        publicEye: "Köylü için mesele net ürün değil, kira, vergi, hasat ve ekmek fiyatıdır; fizyokrat düzen bu yükleri gerçekten hafifletiyor mu diye bakmak gerekir.",
        control: "Toprağı merkeze almak dönemin Fransa'sını anlamak mı, yoksa sanayi çağını kaçırmak mı?"
      },
      fullName: "François Quesnay (1694-1774)",
      category: "karsit",
      era: "18. yüzyıl",
      depth: {
        intro: "Fransız hekim ve iktisatçı; Fizyokrat okulun kurucusu. 1758 *Tableau Économique* iktisat tarihinin ilk matematiksel-grafik akış modelidir. *Laissez-faire, laissez-passer* sloganının ilham kaynağı.",
        intermediate: "Fizyokratlar üç sınıflı bir model kurar: produktif sınıf (toprak işleyen köylüler, tek net hasıla yaratıcı), steril sınıf (zanaatkâr, tüccar), proprietary sınıf (toprak sahipleri, rant alıcısı). *Tableau Économique* bu sınıflar arası geliri ve harcamayı kademeli akış olarak izler. Politika çıkarımları: (1) tek vergi (impôt unique) sadece toprak rantı üzerine; (2) tarım yatırımı önceliği; (3) iç ve dış ticarette serbestlik (laissez-faire). Bu Colbertizm'in tam karşıtıdır.",
        advanced: "Fizyokratların tarihsel etkisi sınırlıydı (Turgot'un kısa nâzırlığı 1774-76 hariç) ama teorik etkisi büyük: Marx *Tableau*'yu artı-değer analizinin öncülü saydı; modern girdi-çıktı analizi (Leontief, Nobel 1973) doğrudan Quesnay üzerine inşa edilmiştir. Smith Fizyokratları \"tarım sınıfı tek üretken\" tezi konusunda eleştirir ama metodolojik olarak benimser. Erik Reinert'in modern eleştirisi: Fizyokratlar Fransa'nın sanayi geri kalışını derinleştiren bir ideoloji sundu (tarım önceliği = sanayi ihmal).",
        "tetikleyici-soru": "Quesnay'ın \"toprak tek net üretici\" varsayımı bir hata mı, dönem koşullarının doğru gözlemi mi?"
      },
      related: [
        { to: "richard-cantillon", type: "etkiler" },
        { to: "anne-robert-jacques-turgot", type: "etkiler" },
        { to: "adam-smith", type: "etkiler" },
        { to: "jean-baptiste-colbert", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "quesnay-tableau", page: 0, quote: PENDING }],
      events: ["evt-1758-quesnay-tableau"]
    },

    {
      id: "anne-robert-jacques-turgot",
      label: "Turgot",
      lens: {
        root: "Fransa'da ayrıcalıklar, tahıl düzeni ve mali kriz öyle sıkışmıştı ki reform artık düşünce değil, yönetim sorunu haline geldi.",
        dominant: "Turgot'nun reformcu gözüyle serbestlik, köylünün ve üretimin üzerindeki eski bağları gevşetip ekonomiyi nefes aldıracak bir yoldur.",
        counter: "Şehirli yoksul ve lonca bakışı, ani serbestleşmenin ekmek fiyatını, iş güvenliğini ve toplumsal huzuru bozabileceğini söyler.",
        publicEye: "Tahıl serbestisi teoride akış demektir; sokaktaki insan içinse ekmek fiyatı yükselirse doğrudan öfke ve açlık korkusudur.",
        control: "Doğru görünen reform, geçiş bedelini taşıyacak insanları hesaba katmazsa neden başarısız olur?"
      },
      fullName: "Anne-Robert-Jacques Turgot (1727-1781)",
      category: "karsit",
      era: "18. yüzyıl",
      depth: {
        intro: "Fransız iktisatçı ve devlet adamı; 1774-76 yılları arasında Louis XVI'nın maliye nâzırı (Contrôleur général des finances). Fizyokrat ilkeleri uygulamaya çalıştı ve 21 ayda görevden alındı.",
        intermediate: "Turgot'un reformları: (1) iç gümrüklerin kaldırılması (tahıl serbest dolaşımı), (2) zorla çalıştırmanın (corvée) kaldırılması, (3) lonca tekellerinin kaldırılması, (4) bütçe disiplini. Bu paket fizyokrat *laissez-faire* programının ilk somut uygulanışıydı. Aristokrasi ve lonca direnişi, kısa süreli kötü hasat ve unlu mal isyanları reformları yıktı — Turgot 1776 Mayıs'ında istifaya zorlandı, aynı yıl Smith *Wealth of Nations*'ı yayımladı.",
        advanced: "Turgot'un başarısızlığı politik iktisadın çıkar siyasetiyle çarpışmasının klasik örneğidir: teorik olarak doğru reformlar pratik koalisyonlar tarafından engellendi. Bu örüntü 18-19. yy liberalleşme süreçlerinde tekrarlanır (İngiltere Corn Laws 1815-1846, Osmanlı 1838 Balta Limanı zorla dayatması). Turgot'un kişisel yazıları (*Réflexions sur la formation et la distribution des richesses*, 1766) sermaye birikimi, faiz teorisi ve değer üzerine erken klasik formülasyonlar içerir — Smith'in *Wealth of Nations*'a doğrudan etkisi vardır.",
        "tetikleyici-soru": "Eğer Turgot reformları başarılı olsaydı, 1789 Devrimi yaşanır mıydı?"
      },
      related: [
        { to: "francois-quesnay", type: "etkiler" },
        { to: "adam-smith", type: "paralel" }
      ],
      sourceRefs: [{ source: "turgot-reflexions", page: 0, quote: PENDING }],
      events: ["evt-1774-turgot-naizir", "evt-1776-turgot-istifa"]
    },

    {
      id: "adam-smith",
      label: "Adam Smith",
      lens: {
        root: "Ticaret tekelleri, loncalar, sömürge maliyeti ve imtiyazlı şirketler zenginlik diliyle savunuluyordu; Smith bu dili ters çevirdi.",
        dominant: "Smith'in güçlü bakışı, refahı devletin tuttuğu külçede değil, emeğin verimliliği, iş bölümü ve rekabette arar.",
        counter: "Magnusson ve kalkınmacı tarihçiler, Smith'in merkantilizmi fazla tek parça gösterdiğini ve geç sanayileşen ülkelerin koruma ihtiyacını küçümsediğini söyler.",
        publicEye: "Tüketici için daha ucuz mal umudu, işçi için disiplinli fabrika düzeni, sömürge halkları için ise imparatorluk maliyetinin başka yüzü vardı.",
        control: "Smith ayrıcalıkları mı eleştiriyor, yoksa sanayide güçlenmiş Britanya'nın artık daha açık pazar istemesini mi meşrulaştırıyor?"
      },
      fullName: "Adam Smith (1723-1790)",
      category: "karsit",
      era: "18. yüzyıl",
      depth: {
        intro: "İskoç ahlâk filozofu ve iktisatçı; 1776 *An Inquiry into the Nature and Causes of the Wealth of Nations* eseri klasik iktisadın kurucu metni ve **merkantilist sistemin sistematik reddiyesidir** (özellikle Kitap IV).",
        intermediate: "*Wealth of Nations* beş kitapta gelişir; merkantilizm Kitap IV'ün ana hedefidir (\"Of Systems of Political Œconomy\"). Smith'in eleştirisi: (1) bullion = zenginlik denklemi yanlış (Hume'un price-specie flow argümanından beslenir); (2) ihracat fazlası bir hedef olamaz çünkü dış ticaret iki yanlı yarar üretir (mutuality); (3) tekel imtiyazları (EIC, RAC) refahı düşürür; (4) lonca + tarife sistemleri verimsiz iş bölümünü pekiştirir. Smith'in pozitif tezi: serbest piyasa + iş bölümü + \"görünmez el\" (invisible hand) refah üretir.",
        advanced: "*Wealth of Nations* 1776'da yayımlandı — Amerikan Bağımsızlık Bildirgesi'yle aynı yıl. Bu rastlantı simgesel: merkantilist sömürge sisteminin hem teorik (Smith) hem pratik (Amerikan kolonileri) reddi. Smith'in eleştirisinin gücü Mun, Colbert, Steuart gibi merkantilistleri ad ad isimlendirip somut argümanlarını çürütmesidir. Modern eleştiri: Smith'in \"merkantilist sistem\" portresi bir straw-man olabilir (Lars Magnusson 1994); Heckscher 1935'in klasik anlatısı Smith'in çerçevesini fazla kabul eder. Mehmet Genç Osmanlı bağlamında Smith'in evrensel anlatısının yetersiz olduğunu gösterir.",
        "tetikleyici-soru": "Smith'in 1776'da inşa ettiği \"merkantilizm\" kavramı tarihsel olarak gerçek bir sistemi mi, yoksa kendi savunduğu liberalizmin daha çekici görünmesi için yaratılmış bir karşı-portreyi mi temsil eder?"
      },
      related: [
        { to: "david-hume", type: "etkiler" },
        { to: "francois-quesnay", type: "etkiler" },
        { to: "richard-cantillon", type: "etkiler" },
        { to: "thomas-mun", type: "karşıt-tez" },
        { to: "jean-baptiste-colbert", type: "karşıt-tez" },
        { to: "james-steuart", type: "karşıt-tez" },
        { to: "david-ricardo", type: "etkiler" },
        { to: "ibn-haldun", type: "tarihsel-öncel" }
      ],
      sourceRefs: [{ source: "smith-wealth-of-nations", page: 0, quote: PENDING }],
      events: ["evt-1776-smith-wealth-of-nations"]
    },

    {
      id: "david-ricardo",
      label: "David Ricardo",
      lens: {
        root: "Serbest ticaretin yalnız sezgiyle değil, açık bir karşılıklı kazanç mantığıyla savunulması gerekiyordu.",
        dominant: "Ricardo'nun bakışı, ülkelerin mutlak güçlerine değil göreli fırsat maliyetlerine bakar; kazanç, uzmanlaşma düzeninden çıkar.",
        counter: "List, Reinert ve Chang çizgisi, bugünkü göreli üstünlüğün geçmiş güç ilişkileriyle kurulduğunu ve sanayi öğrenmesini kilitleyebileceğini söyler.",
        publicEye: "Ucuz ithalat tüketiciyi rahatlatabilir; fakat kapanan atölye, işsiz kalan usta ve kaybolan beceri başka bir tablo çizer.",
        control: "Karşılaştırmalı üstünlük bugünü verimli kılarken, yarının üretim kapasitesini zayıflatıyorsa hâlâ iyi bir rehber midir?"
      },
      fullName: "David Ricardo (1772-1823)",
      category: "karsit",
      era: "19. yüzyıl",
      depth: {
        intro: "İngiliz iktisatçı; 1817 *On the Principles of Political Economy and Taxation* ile **karşılaştırmalı üstünlük teorisi** serbest ticaretin matematiksel temelini sundu.",
        intermediate: "Ricardo'nun karşılaştırmalı üstünlük argümanı: bir ülke tüm mallarda mutlak üstünlüğe sahip olsa bile, kaynakları görece daha üretken olduğu mallara yöneltmek ve diğerlerini ithal etmek karşılıklı kazanç yaratır. Klasik örnek: Portekiz şarap + İngiliz kumaş. Bu teorem merkantilizmin son entelektüel kalesini yıktı — \"her ülke kendi kendine yetmeli\" varsayımı matematiksel olarak optimal olmadığı kanıtlandı. Ricardo ayrıca emek-değer teorisini geliştirdi (Marx'ın doğrudan öncülü), rant teorisini formülledi.",
        advanced: "Ricardo'nun karşılaştırmalı üstünlüğü 200 yıldır iktisat öğretiminin köşe taşı. Modern eleştiriler: (1) ölçek getirileri ve teknoloji öğrenme eğrisi modelde yok — Erik Reinert ve Ha-Joon Chang bu eksikliği \"kicking away the ladder\" çerçevesinde ele alır; (2) endogenous growth ve dinamik üstünlük teorileri (Krugman 1979) Ricardo modelini genişletir; (3) gerçek dünyada karşılaştırmalı üstünlük statik değil dinamiktir — bugünün geri kalmış sanayisi yarının lider sanayisi olabilir (örn. Güney Kore 1960-2000). Mehmet Genç'in Osmanlı analizi 1838 Balta Limanı sonrası serbest ticaret rejiminin Ricardo modelinde \"verimli\" görünmesine rağmen Anadolu sanayisini yıktığını gösterir.",
        "tetikleyici-soru": "Ricardo modelinin \"olduğu yerde kalmak optimal\" sonucu kalkınma yolundaki ülkeler için fakirleşme tuzağı mı oluşturur?"
      },
      related: [
        { to: "adam-smith", type: "etkiler" },
        { to: "comparative-advantage", type: "araç-amaç" },
        { to: "free-trade", type: "araç-amaç" },
        { to: "erik-reinert", type: "karşıt-tez" },
        { to: "ha-joon-chang", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "ricardo-principles", page: 0, quote: PENDING }],
      events: ["evt-1817-ricardo-principles"]
    },

    {
      id: "john-stuart-mill",
      label: "John Stuart Mill",
      lens: {
        root: "Sanayi toplumunda yalnız üretimin nasıl arttığı değil, üretilenin nasıl bölüşüldüğü ve özgürlükle nasıl bağlandığı sorusu büyüdü.",
        dominant: "Mill'in bakışı liberal geleneğin içinden konuşur ama katı değildir; piyasa düzeniyle sosyal reform arasında geçit arar.",
        counter: "Daha sert laissez-faire okuma müdahaleyi tehlikeli görürken, Marxçı okuma Mill'in reformculuğunu mülkiyet ilişkilerini fazla nazikçe ele almakla eleştirir.",
        publicEye: "İşçi, yoksul hane ve kooperatif arayan üretici için Mill, serbest piyasanın soğuk diline küçük ama önemli bir nefes payı açar.",
        control: "Üretim kuralları doğa gibi işliyorsa bile, bölüşüm kuralları toplum tarafından yapılabiliyorsa hangi eşitsizlikler değiştirilebilir?"
      },
      fullName: "John Stuart Mill (1806-1873)",
      category: "karsit",
      era: "19. yüzyıl",
      depth: {
        intro: "İngiliz filozof ve iktisatçı; 1848 *Principles of Political Economy* klasik iktisadın 19. yy ortası sentezi; Smith-Ricardo geleneğinin liberal varisi ama nüansları olan reformcu.",
        intermediate: "Mill'in nüansları: (1) \"üretim doğa yasalarına, dağıtım toplumsal kurallara tabidir\" — bu fakir destek programları, miras vergisi, kooperatif organizasyonu için teorik açık alan yaratır; (2) çocuk sanayi (infant industry) argümanını kabul etti — geçici korumacılık genç sanayi için meşru olabilir; (3) durağan-durum ekonomisi (stationary state) — Mill kapitalizmin sonsuz büyümeyi hedeflemesini sorguladı, yaşam kalitesi üzerine vurgu.",
        advanced: "Mill'in \"infant industry\" kabulü merkantilist korumacı politikalara klasik liberalizmin içinden kapı araladı. Friedrich List 1841'de Almanya için bu argümanı tam formüle etti; 19. yy ABD, Almanya, Japonya, 20. yy Güney Kore, Çin sanayileşme stratejileri Mill'in nüansından doğan teorik meşruiyetle desteklenir. Mill ayrıca John Maynard Keynes'in \"moral economy\" yöneliminin doğrudan öncülüdür.",
        "tetikleyici-soru": "Eğer Mill 1848'de infant industry argümanını klasik iktisada dahil ettiyse, neden \"serbest ticaret = doğru\" denklemini kabul ettirmek 20. yy IMF politikalarına kadar sürdü?"
      },
      related: [
        { to: "adam-smith", type: "etkiler" },
        { to: "david-ricardo", type: "etkiler" },
        { to: "friedrich-list", type: "etkiler" }
      ],
      sourceRefs: [{ source: "mill-principles", page: 0, quote: PENDING }],
      events: ["evt-1848-mill-principles"]
    },

    {
      id: "friedrich-list",
      label: "Friedrich List",
      lens: {
        root: "Sanayileşmiş İngiltere serbest ticareti savunurken, geç kalan Almanya ve ABD gibi ülkeler kendi üretici güçlerini nasıl kuracağını soruyordu.",
        dominant: "List'in bakışı, ulusu bir öğrenme alanı gibi görür; bebek sanayi büyümeden açık rekabete atılırsa ezilebilir.",
        counter: "Smith-Ricardo çizgisi, korumanın tüketiciyi pahalı mala mahkum edeceğini ve ayrıcalıklı üretici grupları yaratacağını savunur.",
        publicEye: "Korumacılık işçiye ve sanayiciye zaman kazandırabilir; tüketiciye ise daha pahalı mal ve vergi yükü olarak dönebilir.",
        control: "Koruma gerçekten öğrenme için mi kullanılıyor, yoksa verimsiz ayrıcalığı sonsuza kadar saklamak için mi?"
      },
      fullName: "Friedrich List (1789-1846)",
      category: "karsit",
      era: "19. yüzyıl",
      depth: {
        intro: "Alman iktisatçı; 1841 *Das nationale System der politischen Ökonomie* eseriyle Smith'in evrensel serbest ticaret savunusuna karşı \"ulusal sistem\" (sanayi devresi geçinceye kadar korumacılık) tezini formüle etti — neo-merkantilizmin 19. yy manifestosu.",
        intermediate: "List'in argümanı: Smith'in serbest ticaret modeli zaten sanayileşmiş ülkenin (İngiltere) çıkarına; geri kalmış ülke (Almanya, ABD, Japonya) önce kendi sanayisini koruma altında geliştirmeli, sonra serbest ticarete geçmeli. Bu argüman 19. yy Alman gümrük birliği Zollverein, ABD Hamilton tarifeleri (1791+), Japon Meiji sanayileşmesi, 20. yy Güney Kore-Tayvan ihracat-odaklı kalkınma modellerinin teorik tabanını sağlar.",
        advanced: "List'in \"kicking away the ladder\" formülasyonu Ha-Joon Chang 2002'de aynı isimli kitabıyla popülerleştirdi: zengin ülkeler korumacılıkla zenginleştikten sonra serbest ticaret dayatarak gelişmekte olan ülkelerin yolunu kapatır. List 21. yy küresel kalkınma tartışmasının (Çin Made in China 2025, ABD CHIPS Act, AB CBAM) entelektüel öncülüdür. Mehmet Genç çerçevesinde Osmanlı 19. yy'da List'i okumadı ama Listçi politika izleme şansını 1838 Balta Limanı ile kaybetti.",
        "tetikleyici-soru": "Eğer Osmanlı 1838 Balta Limanı yerine 1834 Zollverein tarzı bir gümrük birliği kurabilseydi, 20. yy nasıl şekillenirdi?"
      },
      related: [
        { to: "protectionism", type: "araç-amaç" },
        { to: "philipp-von-hornigk", type: "etkiler" },
        { to: "ha-joon-chang", type: "etkiler" },
        { to: "james-steuart", type: "etkiler" },
        { to: "adam-smith", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "list-nationale-system", page: 0, quote: PENDING }],
      events: ["evt-1841-list-nationale-system"]
    },

    // ===========================================================
    // T006 — Modern revizyonist tarihçiler
    // ===========================================================

    {
      id: "eli-heckscher",
      label: "Eli Heckscher",
      lens: {
        root: "İktisat tarihi, dağınık erken modern politikaları anlamak için büyük bir kategoriye ihtiyaç duyuyordu: 'merkantilizm' bu ihtiyacı karşıladı.",
        dominant: "Heckscher'in bakışı sistem kurucudur; farklı uygulamaları güçlü devlet ve ulusal pazar inşası etrafında toplar.",
        counter: "Magnusson ve Coleman çizgisi, bu bütünlüğün fazla düzgün olduğunu ve tarihsel çeşitliliği tek kaba doldurduğunu söyler.",
        publicEye: "Bu tür büyük tarih yazımı, halkın vergi, kıtlık, sömürge ve çalışma deneyimini çoğu zaman devlet kapasitesinin arka planına iter.",
        control: "Bir kavram açıklama kolaylığı sağladığında, hangi farklı sesleri ve yerel ayrıntıları görünmez kılıyor?"
      },
      fullName: "Eli Heckscher (1879-1952)",
      category: "modern-historian",
      era: "20. yüzyıl",
      depth: {
        intro: "İsveçli iktisat tarihçisi; 1931 *Merkantilismen* (1935 İngilizce *Mercantilism*) klasik merkantilizm tarih yazımının kurucu metnidir. Merkantilizmi tutarlı, sistemli bir devlet inşası ve birleşik ulusal pazar oluşturma projesi olarak sundu.",
        intermediate: "Heckscher'in tezi: merkantilizm dağınık politikalar değil, beş temel hedefi olan bir sistemdir — (1) birleşik ulusal pazar (iç gümrüklerin kaldırılması), (2) güçlü merkezi devlet, (3) ihracat fazlası ile bullion biriktirme, (4) nüfus artışı, (5) sömürge tekeli. Bu çerçeve 1935-1960 arası akademik konsensüs oldu. Heckscher ayrıca Heckscher-Ohlin uluslararası ticaret modelinin (1933, faktör donanımı temelli) ortak yaratıcısıdır.",
        advanced: "Heckscher'in klasik anlatısı 1970'lerden itibaren revizyona uğradı: D.C. Coleman *Revisions in Mercantilism* (1969), Lars Magnusson *Mercantilism: The Shaping of an Economic Language* (1994). Eleştiriler: (1) \"merkantilizm\" Smith'in icat ettiği retrospektif bir kategori, çağdaşlar kendilerini öyle adlandırmadı; (2) 17-18. yy iktisat pratiği çok daha çeşitliydi; (3) Heckscher Anglo-merkez bakışı evrenselleştirdi (Osmanlı, Çin, Japonya yok). Buna rağmen Heckscher hala alanın referans noktası — onsuz tartışma yapılamaz.",
        "tetikleyici-soru": "Eğer \"merkantilizm\" tutarlı bir sistem değilse, neden 90 yıldır iktisat tarihi onu bir kategori olarak kullanmaya devam ediyor?"
      },
      related: [
        { to: "adam-smith", type: "etkiler" },
        { to: "lars-magnusson", type: "karşıt-tez" },
        { to: "mehmet-genc", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "heckscher-mercantilism", page: 0, quote: PENDING }],
      events: ["evt-1931-heckscher-mercantilism"]
    },

    {
      id: "lars-magnusson",
      label: "Lars Magnusson",
      lens: {
        root: "Merkantilizm tek bir öğreti gibi anlatıldığında, dönemin kendi kelimeleri ve tartışma bağlamları kayboluyordu.",
        dominant: "Magnusson'un bakışı, fikirleri sonradan verilmiş etiketlerle değil, yazıldıkları anda hangi işi gördükleriyle okumak ister.",
        counter: "Reinert ve kalkınmacı okuma, dil çeşitliliğine rağmen korumacı sanayi politikalarının gerçek tarihsel etkisini küçümsememek gerektiğini söyler.",
        publicEye: "Dil tartışması soyut görünebilir; ama bir politikayı 'ulusal kalkınma' ya da 'tekelci ayrıcalık' diye adlandırmak insanların onu nasıl meşrulaştırdığını değiştirir.",
        control: "Bir fikir akımı gerçekten var mı, yoksa sonraki kuşakların anlamak için çizdiği kullanışlı bir harita mı?"
      },
      fullName: "Lars Magnusson (1952-)",
      category: "modern-historian",
      era: "20-21. yüzyıl",
      depth: {
        intro: "İsveçli iktisat tarihçisi; 1994 *Mercantilism: The Shaping of an Economic Language* eseriyle merkantilizm revizyonizminin önde gelen temsilcisi. Tezi: \"merkantilizm\" bir sistem değil, Smith'in 1776'da kategorize ettiği bir dil-aile yaklaşımı.",
        intermediate: "Magnusson'un argümanı: 16-18. yy \"merkantilist\" düşünürler birbirleriyle çelişiyordu (Mun vs Malynes, Colbert vs fizyokratlar). Tutarlı bir \"merkantilizm\" yok; \"merkantilist dil\" var — devletin ekonomik güç hedefiyle politikalar arasındaki retorik çerçeve. Smith bu dağınık tartışmayı *Wealth of Nations*'ta tek bir \"sistem\" portresine yıktı, kendi liberalizmini karşı-portre olarak sundu.",
        advanced: "Magnusson'un revizyonu Cambridge entelektüel tarih okulu (Skinner, Pocock, Tully) ile uyumlu: kavramların tarihsel anlamlarını dönem aktörlerinin kullanımından okumalı, sonradan dayatılan kategorilerle değil. Bu pencerede Mehmet Genç'in Osmanlı analizi bir tür \"Magnusson kontrolü\" sağlar — eğer \"merkantilizm\" tek doğal kategori olsaydı Osmanlı'nın paralel ama farklı sistemi açıklanamazdı. Modern eleştiri olarak Erik Reinert Magnusson'a karşı çıkar: merkantilizmin reel etkileri (sanayileşme, korumacılık) tarihsel olarak vardı, sadece bir \"dil\" değildi.",
        "tetikleyici-soru": "Magnusson haklıysa, bu kursta öğrendiğimiz \"merkantilizm\" gerçek mi, yoksa Smith'in bize miras bıraktığı bir hayalet mi?"
      },
      related: [
        { to: "eli-heckscher", type: "karşıt-tez" },
        { to: "adam-smith", type: "etkiler" },
        { to: "erik-reinert", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "magnusson-shaping", page: 0, quote: PENDING }],
      events: []
    },

    {
      id: "erik-reinert",
      label: "Erik Reinert",
      lens: {
        root: "Yoksul ülkelerin neden serbest ticaret reçetesiyle hızla zenginleşmediği sorusu, eski merkantilist sanayi korumasını yeniden gündeme getirdi.",
        dominant: "Reinert'in bakışı, zengin ülkelerin gerçek tarihinde sanayi, öğrenme, ölçek ve korumanın belirleyici olduğunu vurgular.",
        counter: "Ana akım serbest ticaret ve bazı revizyonist okuma, bu yaklaşımın başarısız korumacılık örneklerini ve devlet kapasitesi sorununu hafife aldığını savunur.",
        publicEye: "Sanayi politikası iş, beceri ve ücret artışı vaat eder; ama kötü yönetilirse pahalı mal, vergi yükü ve kapalı çıkar grupları da doğurur.",
        control: "Bir ülke koruma isterken gerçekten öğrenme mi yaratıyor, yoksa rekabet etmeyen ayrıcalıklı sektörleri mi büyütüyor?"
      },
      fullName: "Erik S. Reinert (1949-)",
      category: "modern-historian",
      era: "21. yüzyıl",
      depth: {
        intro: "Norveçli iktisat tarihçisi; 2007 *How Rich Countries Got Rich… and Why Poor Countries Stay Poor* eseri merkantilizmin modern kalkınma iktisadı için rehabilitasyonunu önerir. Antonio Serra'yı \"ilk gerçek iktisatçı\" konumuna yerleştirir.",
        intermediate: "Reinert'in argümanı: Smith-Ricardo modeli (statik karşılaştırmalı üstünlük, free trade) zaten zenginleşmiş ülkelerin kendi geçmişini sansürleyerek yarattıkları bir \"iktisat\" — Serra-List-Hamilton hattının \"diğer iktisat\" geleneği aslında zengin olmayı sağlayan gerçek tekniklerdir. Sanayi ekonomisi, ölçek getirileri, dinamik öğrenme, korumacılık + sanayi politikası — bu paket \"rich-country mercantilism\"in 21. yy versiyonudur (Çin, Güney Kore, Tayvan, ABD CHIPS-IRA, AB CBAM tarafından bilfiil uygulanır).",
        advanced: "Reinert'in projesi sadece tarihsel değil, politik: IMF/Dünya Bankası'nın gelişmekte olan ülkelere dayattığı \"Washington consensus\" (serbest ticaret + devletin küçüklüğü) modelini kalkınma sabotajı olarak görür. Onun yerine Serra-List metodu önerir: erken aşamada korumacılık + sanayi politikası, olgunlaştıktan sonra kademeli serbest ticarete açılma. Mehmet Genç Osmanlı çerçevesi Reinert'in tezine paraleldir ama tam çakışmaz: Osmanlı klasik merkantilist olmadı, dolayısıyla Reinert'in sanayileşme stratejisini de izlemedi; bu Osmanlı'nın geri kalışının yapısal nedenidir.",
        "tetikleyici-soru": "Reinert ile Magnusson çatışıyor: Reinert merkantilizmi rehabilite ederken, Magnusson onu mit olarak çözüyor. Hangisi haklı?"
      },
      related: [
        { to: "antonio-serra", type: "etkiler" },
        { to: "friedrich-list", type: "etkiler" },
        { to: "philipp-von-hornigk", type: "etkiler" },
        { to: "david-ricardo", type: "karşıt-tez" },
        { to: "lars-magnusson", type: "karşıt-tez" },
        { to: "ha-joon-chang", type: "paralel" },
        { to: "mehmet-genc", type: "paralel" }
      ],
      sourceRefs: [{ source: "reinert-how-rich", page: 0, quote: PENDING }],
      events: ["evt-2007-reinert-how-rich"]
    },

    {
      id: "ha-joon-chang",
      label: "Ha-Joon Chang",
      lens: {
        root: "Zengin ülkelerin kendi yükselişinde kullandığı korumacı araçları yoksul ülkelere yasaklaması, kalkınma tartışmasının ahlaki düğümünü oluşturdu.",
        dominant: "Chang'in bakışı, tarihsel hafızayı geri çağırır: bugünün serbest ticaret öğüdünü, dünün korumacı pratiğiyle karşılaştırır.",
        counter: "Karşı okuma, geçmişte işe yarayan araçların her ülkede tekrarlanamayacağını; kurum, yolsuzluk ve küresel teknoloji farklarının sonucu değiştirdiğini söyler.",
        publicEye: "Kalkınma politikası sıradan insan için fabrika işi, ucuz mal, vergi ve eğitim fırsatı gibi somut kapılardan hissedilir.",
        control: "Merdiven gerçekten dışarıdan mı çekildi, yoksa içeride merdiveni kuracak kurumlar da eksik miydi?"
      },
      fullName: "Ha-Joon Chang (1963-)",
      category: "modern-historian",
      era: "21. yüzyıl",
      depth: {
        intro: "Güney Koreli kalkınma iktisatçısı; 2002 *Kicking Away the Ladder: Development Strategy in Historical Perspective* eseriyle zengin ülkelerin korumacılıkla zenginleştikten sonra serbest ticareti dayatma çelişkisini sergiledi.",
        intermediate: "Chang'in tezi: İngiltere, ABD, Almanya, Fransa, Japonya 18-20. yy'larda yüksek tarifeler, sanayi sübvansiyonları, devlet işletmeleri, ihracat teşvikleriyle zenginleştiler. Şimdi (1980+) Dünya Bankası ve IMF üzerinden gelişmekte olan ülkelere \"serbest ticaret + minimal devlet\" formülünü dayatmak, kendi tırmandıkları merdiveni aşağı çekmek (kicking away the ladder) anlamına gelir. Chang'in dikkatlice belgelediği: 19. yy ABD ortalama tarife oranı %35-45, Almanya %20-30, Japonya korumacı; bunlar İngiltere'nin serbest ticareti dayattığı dönemler.",
        advanced: "Chang'in çalışması List, Hamilton, Reinert geleneğini 21. yy küresel kalkınma politikası tartışmasına taşır. Etkisi büyük olmuştur: Çin'in Made in China 2025 stratejisi açıkça Chang-Reinert çerçevesini benimser; Hindistan, Brezilya, Türkiye sanayi politikası tartışmalarında Chang sürekli referans verilir. Mehmet Genç'in Osmanlı analizi Chang çerçevesinde okunduğunda: Osmanlı klasik merkantilist olmadı, dolayısıyla Avrupa merdivenini tırmanma şansını kaçırdı; 1838 sonrası serbest ticarete zorlanması ise \"ladder kicked away\" sürecinin erken örneğidir.",
        "tetikleyici-soru": "Bugün Türkiye sanayi politikası tartışmasında \"Chang çerçevesi\" (sektörel koruma + devlet sermayesi) ne kadar uygulanabilir, ne kadar nostaljik?"
      },
      related: [
        { to: "friedrich-list", type: "etkiler" },
        { to: "erik-reinert", type: "paralel" },
        { to: "david-ricardo", type: "karşıt-tez" },
        { to: "mehmet-genc", type: "paralel" }
      ],
      sourceRefs: [{ source: "chang-kicking-away", page: 0, quote: PENDING }],
      events: ["evt-2002-chang-kicking"]
    },

    {
      id: "sophus-reinert",
      label: "Sophus Reinert",
      lens: {
        root: "Fikirler kitap rafında durmaz; rakip devletler birbirinden öğrenirken çeviri, uyarlama ve taklit yoluyla dolaşır.",
        dominant: "Sophus Reinert'in bakışı, ekonomik fikirleri imparatorluk rekabetinin canlı araçları gibi okur: tercüme etmek, rakibin tekniğini kendi dünyana çevirmektir.",
        counter: "Yapısal tarih okuması, çeviri olsa bile kurum, sermaye ve güç dengesi yoksa fikrin tek başına politika yaratamayacağını hatırlatır.",
        publicEye: "Bir metnin çevrilmemesi halkın gündelik hayatında görünmezdir; ama uzun vadede hangi politikanın hayal edilebilir olduğuna sınır çizebilir.",
        control: "Bir toplum yalnız mal ve teknoloji ithal edip fikir dilini çevirmediğinde, hangi seçenekleri hiç düşünemez hale gelir?"
      },
      fullName: "Sophus A. Reinert (1973-)",
      category: "modern-historian",
      era: "21. yüzyıl",
      depth: {
        intro: "Norveçli iktisat tarihçisi (Erik Reinert'in oğlu); 2011 *Translating Empire: Emulation and the Origins of Political Economy* eseri Avrupa içi merkantilist fikir dolaşımının nasıl çeviri ve uyarlama yoluyla gerçekleştiğini detaylandırır.",
        intermediate: "Sophus Reinert'in tezi: merkantilist düşünce monolitik değildi, Avrupa içinde aktif çeviri-uyarlama trafiği vardı. Antonio Serra İtalyancadan İngilizceye 1796'da çevrildi (geç); Mun İngilizceden Fransızcaya, İtalyancaya, Almancaya tercüme edildi 17-18. yy'larda; Hörnigk Almanca-İtalyanca-İspanyolca çevirileri vardı. Bu çeviriler basit aktarım değil, *emulation* (rakipten öğrenme): bir ülke rakibinin başarılı politikalarını kendi diline + bağlamına uyarlardı.",
        advanced: "Sophus Reinert'in çalışması Cambridge entelektüel tarih ekolünün (Skinner) merkantilizme uygulanışı: fikirler bağlam içinde aktörlerin politik amaçlarıyla iç içe okunur. Bu yöntemle Osmanlı'nın Avrupa merkantilist literatürüne neredeyse hiç çeviri-emulation kanalı açmamış olduğu çarpıcı kontrast olarak ortaya çıkar — Osmanlı kapitülasyonlarla mal trafiğine açıkken, fikir trafiğine kapalıydı.",
        "tetikleyici-soru": "Eğer Mun, Colbert, Hörnigk Osmanlı'da 18. yy'da Türkçeye çevrilseydi, II. Mahmud reformları nasıl şekillenirdi?"
      },
      related: [
        { to: "erik-reinert", type: "etkiler" },
        { to: "antonio-serra", type: "etkiler" },
        { to: "thomas-mun", type: "etkiler" },
        { to: "philipp-von-hornigk", type: "etkiler" }
      ],
      sourceRefs: [{ source: "sophus-reinert-translating", page: 0, quote: PENDING }],
      events: []
    },

    // ===========================================================
    // T007 — Politika kavramları
    // ===========================================================

    {
      id: "bullionism",
      label: "Bullionism (Külçecilik)",
      lens: {
        root: "Savaş, borç ve uluslararası ödeme dünyasında altın-gümüş devlet için en görünür güvenlik yastığı gibi görünüyordu.",
        dominant: "Erken modern yönetici için hazine doluysa asker ödenir, dış borç çevrilir ve devlet daha güvenli görünür.",
        counter: "Salamanca, Bodin ve Hume çizgisi metalin tek başına servet değil; fiyat, üretim ve güven ilişkisi olduğunu gösterir.",
        publicEye: "Maden halkları için zor emek, şehirli tüketici için fiyat artışı, üretici için rekabet kaybı doğabilir.",
        control: "Bir şey kasada durduğu için zenginlik midir, yoksa üretim kapasitesine dönüşmediğinde sadece ağır bir yanılsama mı?"
      },
      category: "policy",
      era: "15-18. yüzyıl",
      depth: {
        intro: "Ulusal zenginliğin altın/gümüş stoku ile ölçüldüğü görüş. Erken merkantilist düşüncenin temeli — sonraları \"ticaret dengesi\" daha sofistike bir form aldı.",
        intermediate: "Bullionism iki versiyona ayrılır: (1) **Saf bullionism** (16. yy): altın/gümüşün doğrudan biriktirilmesi, ihracı yasak (İspanyol modeli); (2) **Ticaret bullionismi** (17. yy Mun, Misselden): bullion ihracı izinli ama toplam ticaret dengesi pozitif olmalı (kâr bullion olarak geri döner). Hume'un 1752 price-specie flow argümanı her iki versiyonu da teorik olarak çürüttü.",
        advanced: "Bullionism'in tarihsel ironi: 1500-1650 arası Potosi'den İspanya'ya 17,000 ton gümüş aktı ama İspanya zenginleşmedi, Hollanda zenginleşti. Hamilton 1934 *American Treasure and the Price Revolution*'da bu paradoksu sistemli analiz etti — Salamanca quantity theory + Hume price-specie flow birlikte açıklar: bullion fazlası iç fiyatları artırarak göreli dezavantaj yaratır. Mehmet Genç çerçevesinde Osmanlı bullion biriktirmedi ama akçe tağşişiyle benzer enflasyon yaşadı (Şevket Pamuk).",
        "tetikleyici-soru": "Bugün merkez bankalarının altın rezervleri biriktirmesi (Çin, Rusya, Türkiye 2020+) bullionism'in modern hali mi, farklı bir şey mi?"
      },
      related: [
        { to: "balance-of-trade", type: "tarihsel-öncel" },
        { to: "david-hume", type: "karşıt-tez" },
        { to: "salamanca-okulu", type: "karşıt-tez" },
        { to: "fiskalizm", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "hamilton-treasure", page: 0, quote: PENDING }],
      events: ["evt-1545-potosi"]
    },

    {
      id: "balance-of-trade",
      label: "Ticaret Dengesi (Balance of Trade)",
      lens: {
        root: "Devletler dış ticareti yalnız mal alışverişi değil, para, gemi, istihdam ve savaş kapasitesi meselesi olarak görmeye başladı.",
        dominant: "Mun çizgisi için toplam fazla, ulusal gücün hesabını tutan pratik bir pusuladır.",
        counter: "Hume ve Smith, fazla hedefinin fiyat mekanizması ve karşılıklı kazanç fikriyle kendi sınırına çarptığını savunur.",
        publicEye: "İhracatçı için teşvik, ithalatçı için engel, tüketici için fiyat, sömürge üreticisi için zorunlu pazar anlamına gelebilir.",
        control: "Ticaret dengesi bir sağlık göstergesi mi, yoksa yanlış hedefe dönüşünce ekonomiyi daraltan bir takıntı mı?"
      },
      category: "policy",
      era: "17-18. yüzyıl",
      depth: {
        intro: "İhracatın ithalattan fazla olması; klasik merkantilizmin merkez kavramı. Thomas Mun'un *England's Treasure by Forraign Trade* (1664) eserinin tematik omurgası.",
        intermediate: "Mun'un formülasyonu: tek tek işlemler değil, **toplam yıllık ticaret dengesi** önemlidir. Belirli bir ürün için bullion ihracı (örn. EIC'in Hindistan baharatı için gümüş çıkışı) toplam dengeyi pozitif yapıyorsa kabul edilir. Bu nüans Mun'u \"saf bullionist\" Malynes'ten ayırır. Politika araçları: ihracat sübvansiyonu, ihracat ham madde yasağı, ithalata yüksek tarife, lüks ithalata mutlak yasak.",
        advanced: "Ticaret dengesi kavramı modern uluslararası iktisatta da kullanılır (current account, BoT) ama anlamı değişti: bugün bir göstergedir, hedef değil. Çin'in 2001-2015 büyük ticaret fazlası, Almanya'nın sürekli fazlası modern bağlamda mun-tarzı politika sayılabilir. Eichengreen, Bernanke 2000'ler \"global imbalances\" tartışması Hume mekanizmasının küresel para sistemi altında niye yetersiz işlediğini analiz eder.",
        "tetikleyici-soru": "Çin'in 2001-2015 milyar dolarlık ticaret fazlası onu zenginleştirdi mi? Yoksa içerideki \"fiyat şişkinliği\" Hume'un öngördüğü dezavantajı mı yarattı?"
      },
      related: [
        { to: "thomas-mun", type: "etkiler" },
        { to: "bullionism", type: "tarihsel-öncel" },
        { to: "david-hume", type: "karşıt-tez" },
        { to: "protectionism", type: "araç-amaç" }
      ],
      sourceRefs: [{ source: "mun-englands-treasure", page: 0, quote: PENDING }],
      events: ["evt-1664-mun-treasure-published"]
    },

    {
      id: "protectionism",
      label: "Korumacılık (Protectionism)",
      lens: {
        root: "Güçlü dış üretici karşısında yeni veya stratejik yerli üretimin ezilmemesi için devlet kapı eşiğini yükseltmek ister.",
        dominant: "Kalkınmacı bakış için koruma, öğrenme zamanı ve sanayi hafızası kazandıran geçici bir kalkan olabilir.",
        counter: "Liberal ve tüketici odaklı karşı fikir, korumanın pahalı mal, verimsiz şirket ve çıkar koalisyonu üretebileceğini söyler.",
        publicEye: "İşçi için fabrika güvencesi, tüketici için yüksek fiyat, küçük girişimci için bazen fırsat bazen kapalı pazar demektir.",
        control: "Koruma gerçekten öğrenme ve verimlilik doğuruyor mu, yoksa sadece güçlü gruplara süre uzatımı mı veriyor?"
      },
      category: "policy",
      era: "17-19. yüzyıl + 21. yüzyıl",
      depth: {
        intro: "Yerli üretimi yabancı rekabetten korumak için gümrük tarifesi, kota, sübvansiyon, ithal ikamesi gibi politika araçları toplamı.",
        intermediate: "Klasik merkantilist korumacılığın araçları: (1) ithalata yüksek gümrük (özellikle mamul mala), (2) ihracat ham madde yasağı, (3) yerli üreticiye sübvansiyon ve tekel imtiyazı, (4) lonca sistemi (yerli üretim standartları + giriş engeli). 19. yy klasik liberalizmin (Smith-Ricardo) hedefi tam bu paketin yıkımıydı. 20. yy depresyon dönemi (1929-1945) korumacılığa geri dönüş (Smoot-Hawley 1930). 1947-1980 GATT liberalleşmesi. 1980-2010 hyper-globalisation. 2018+ Trump tarifeleri korumacılığın geri dönüşü.",
        advanced: "Korumacılığın modern teorik savunusu: (1) infant industry argümanı (Mill, List); (2) ölçek getirileri ve öğrenme eğrisi (Krugman 1979); (3) ulusal güvenlik / stratejik sektörler; (4) çevre standartları (CBAM 2023). Chang ve Reinert tüm bunları \"rich-country mercantilism\" başlığı altında toparlar. Mehmet Genç çerçevesinde Osmanlı klasik korumacılık değil iaşecilik uyguladı; bu fark Osmanlı sanayisinin Avrupa rekabetine 1838 sonrası açık kalmasının yapısal nedenidir.",
        "tetikleyici-soru": "Korumacılık hangi koşullarda kalkınma aracı, hangi koşullarda yapısal verimsizlik tuzağı?"
      },
      related: [
        { to: "navigation-acts", type: "araç-amaç" },
        { to: "calico-acts", type: "araç-amaç" },
        { to: "jean-baptiste-colbert", type: "araç-amaç" },
        { to: "antonio-serra", type: "etkiler" },
        { to: "friedrich-list", type: "etkiler" },
        { to: "adam-smith", type: "karşıt-tez" },
        { to: "iasecilik", type: "paralel" }
      ],
      sourceRefs: [{ source: "chang-kicking-away", page: 0, quote: PENDING }],
      events: ["evt-1651-navigation-act", "evt-1664-colbert-tariff"]
    },

    {
      id: "navigation-acts",
      label: "Navigation Acts",
      lens: {
        root: "İngiltere deniz taşımacılığında Hollanda üstünlüğünü kırmak ve sömürge ticaretini kendi limanlarına bağlamak istedi.",
        dominant: "İngiliz devlet ve tüccar bakışı için bu yasalar, donanma gücü ve ticari güvenlik üreten meşru bir ulusal stratejiydi.",
        counter: "Koloni tüccarı, Hollandalı taşıyıcı ve serbest ticaret savunucusu için aynı düzen tekel, pahalı taşıma ve siyasal bağımlılık demekti.",
        publicEye: "Liman işçisi için iş, koloni üreticisi için kısıt, tüketici için fiyat, kaçakçı için fırsat doğurabilirdi.",
        control: "Deniz gücü bahanesi kamu yararını mı koruyor, yoksa belli tüccarların tekelini ulus diliyle mi savunuyor?"
      },
      category: "policy",
      era: "17-19. yüzyıl",
      depth: {
        intro: "İngiltere'nin 1651, 1660, 1663, 1673 ve sonraki yıllarda çıkardığı dizi yasa; sömürge ticaretinin İngiliz/sömürge gemilerinde taşınmasını zorunlu kıldı, Hollanda nakliye hegemonyasını kırmayı hedefledi.",
        intermediate: "Temel hükümler: (1) sömürge mallarının Avrupa'ya İngiliz limanlarından geçmesi zorunlu; (2) sömürgeye ithalat İngiliz gemileri ile; (3) gemi mürettebatının %75'i İngiliz olmalı; (4) \"enumerated commodities\" (şeker, tütün, çivit, kereste) sadece İngiltere veya sömürgesine ihraç. 1660-1675 İngiliz-Hollanda savaşları büyük ölçüde bu yasalar nedeniyle. 1849'da iptal — İngiltere serbest ticaret zaferi.",
        advanced: "Navigation Acts merkantilist sömürge sisteminin paradigmatik örneğidir. Etkisi: (1) İngiliz nakliye sektörü büyüdü, donanma temeli atıldı; (2) Hollanda nakliye 1670-1700 arası göreli düşüş; (3) Amerikan kolonileri ekonomik öfke (1773 Boston Çay Olayı, 1776 Bağımsızlık). McCusker & Menard *Economy of British America* (1985) Navigation Acts'in kolonilere uzun vadeli net etkisini analiz eder — biraz negatif ama abartılmamalı. Mehmet Genç çerçevesinde Osmanlı'nın kapitülasyonları Navigation Acts'in tam karşıtıdır: Osmanlı Avrupalı tüccara ayrıcalık verirken, İngiltere kendi tüccarına ayrıcalık veriyordu.",
        "tetikleyici-soru": "Navigation Acts İngiltere'yi zenginleştirdi mi yoksa zaten zengin İngiltere bu yasaları çıkardığı için mi başarılı sayıldı?"
      },
      related: [
        { to: "protectionism", type: "araç-amaç" },
        { to: "balance-of-trade", type: "araç-amaç" },
        { to: "east-india-company", type: "paralel" },
        { to: "kapitulasyonlar", type: "karşıt-tez" },
        { to: "iasecilik", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "mccusker-menard", page: 0, quote: PENDING }],
      events: ["evt-1651-navigation-act"]
    },

    {
      id: "calico-acts",
      label: "Calico Acts",
      lens: {
        root: "Hint pamukluları İngiliz yün ve pamuk üreticilerini ciddi biçimde zorladı; İngiltere kendi pazarını kapatarak öğrenme zamanı kazandı.",
        dominant: "İngiliz üretici ve parlamento için yasak, yerli sanayi doğana kadar gerekli bir koruma kalkanı gibi görünüyordu.",
        counter: "Hint dokumacı, tüketici ve sömürge eleştirisi için bu kalkan başkasının pazarını daraltan ve emeğini ucuzlatan bir güç aracıdır.",
        publicEye: "Lancashire'da iş umudu büyürken Bengal dokumacısının pazarlık gücü kırıldı; aynı kumaş iki ayrı hayat hikayesi üretti.",
        control: "Bir ülkenin sanayi devrimi başka bir bölgenin sanayisizleşmesine dayanıyorsa bunu doğal rekabet diye anlatabilir miyiz?"
      },
      category: "policy",
      era: "18. yüzyıl",
      depth: {
        intro: "1700 ve 1721 yıllarında İngiltere'nin Hindistan'dan ithal pamuklu kumaş (calico) yasağı; yerli yün ve sonra pamuk sanayisini korumak için. Hint dokumacılığının deindustrialization'ının başlangıç noktası.",
        intermediate: "1700 yasası: Hint pamuklu kumaş ithalatı yasak (ham pamuk ithal edilebilir). 1721 yasası: yasak genişletilir, basılı pamuklu (printed calico) tüketimi de yasak. Bu yasaklar İngiliz yün lobi ve sonra Lancashire pamuk sanayisinin politik baskısıyla geldi. Sonuç: İngiliz pamuk sanayisi 1760'larda teknolojik atılım (spinning jenny 1764, water frame 1769) için korunaklı pazar buldu — sanayi devriminin kuluçkası.",
        advanced: "Calico Acts kapitalizmin doğum koşullarının doğrudan korumacılığa borçlu olduğunun klasik örneğidir. Sven Beckert *Empire of Cotton* (2014) bu argümanı belgeler: pamuğun küresel ticareti Hindistan-Britanya-Amerika üçgeninde sadece sanayi devrimi değil, kölelik ve sömürgeciliğin de mihveriydi. Hint dokumacılığı 1700-1850 arasında Calico Acts + Britanya işgali ile sistematik çöktü; bu Britanya sanayisinin yükselişinin maliyetidir. Mehmet Genç çerçevesinde Osmanlı 1838 sonrası kapitülasyonlar nedeniyle calico-tarzı korumacılık uygulayamadı; bu yapısal eşitsizliğin sebebi.",
        "tetikleyici-soru": "Britanya kendi sanayisini korumak için Hint sanayisini yıktığında ahlâki olarak ne yapıyordu? Kapitalist gelişmenin temeli bu mu?"
      },
      related: [
        { to: "protectionism", type: "araç-amaç" },
        { to: "east-india-company", type: "paralel" },
        { to: "navigation-acts", type: "paralel" },
        { to: "kapitulasyonlar", type: "karşıt-tez" },
        { to: "men-i-ihracat", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "beckert-empire-cotton", page: 0, quote: PENDING }],
      events: ["evt-1700-calico-acts", "evt-1721-calico-acts-2"]
    },

    {
      id: "populationism",
      label: "Populationism (Nüfus Politikası)",
      lens: {
        root: "Erken modern devlet için boş toprak, asker ihtiyacı, vergi tabanı ve üretim kapasitesi nüfus sorusunda birleşti.",
        dominant: "Merkantilist bakış nüfusu güç kaynağı sayar: daha çok insan, doğru örgütlenirse daha çok üretim ve daha büyük ordu demektir.",
        counter: "Malthusçu ve geçim odaklı karşı okuma, nüfus artışının kaynak, ücret ve gıda baskısını büyütebileceğini söyler.",
        publicEye: "Devlet nüfusu sayı olarak görürken, aile için mesele çocuk bakımı, iş bulma, askerlik ve evin geçimidir.",
        control: "Nüfus politikasında insanı kapasite olarak mı, kendi hayatı olan özne olarak mı görüyoruz?"
      },
      category: "policy",
      era: "16-18. yüzyıl",
      depth: {
        intro: "Nüfus = ulusal güç tezi; daha çok kişi = daha çok asker + daha çok üretici + daha çok vergi mükellefi. Botero 1589, Petty 1690, Hörnigk 1684'te formüle edilen merkantilist temel ilke.",
        intermediate: "Politika araçları: (1) evlilik teşviki, doğurganlık ödülü; (2) sağlık önlemleri (Petty istatistiksel demografisinin başlangıcı); (3) iş gücü göçü kısıtı (yetişmiş zanaatkârın ülkeden çıkması yasak); (4) tersine göç teşviki (Huguenotların 1685 Fransa'dan çıkışı Brandenburg-Hollanda-İngiltere için kazanım). 18. yy'da Malthus 1798'de bu paradigmaya tam karşıt argüman geliştirir.",
        advanced: "Populationism Malthus dönüşümünden sonra kayboldu ama 20. yy'da farklı bağlamda geri döndü: pronatalist politikalar (Mussolini İtalya, Hitler Almanya), modern Çin'in 2015 sonrası tek çocuk politikasından dönüşü, Macaristan-Polonya 2010+ aile teşvikleri. Beşeri sermaye teorisi (Becker, Schultz) modern bir populationism formudur — nüfus = uzun vadeli üretim potansiyeli.",
        "tetikleyici-soru": "Türkiye'nin 2008 sonrası \"üç çocuk\" politikasının arkasında modern populationism mi var?"
      },
      related: [
        { to: "giovanni-botero", type: "etkiler" },
        { to: "william-petty", type: "etkiler" },
        { to: "philipp-von-hornigk", type: "etkiler" }
      ],
      sourceRefs: [{ source: "botero-ragion", page: 0, quote: PENDING }],
      events: ["evt-1589-botero-ragion", "evt-1685-nantes"]
    },

    {
      id: "east-india-company",
      label: "Doğu Hindistan Şirketleri (EIC, VOC)",
      lens: {
        root: "Uzak ticaret pahalı, riskli ve askeri koruma istiyordu; devletler bu riski imtiyazlı şirketlere devrederek küresel kâr alanı açtı.",
        dominant: "Şirket ve metropol devlet için EIC/VOC, ticaret, donanma, vergi ve diplomasi yükünü aynı kurumda toplayan verimli bir araçtı.",
        counter: "Sömürge halkları, yerel üreticiler ve modern eleştiri için bu yapı özel kârı yarı-egemen zor gücüyle birleştiren tehlikeli bir düzendi.",
        publicEye: "Londra yatırımcısı temettü görürken Bengal köylüsü vergi ve kıtlık riskiyle, Asyalı üretici ise zorlayıcı sözleşmeyle karşılaşabilirdi.",
        control: "Bir şirket vergi topluyor, ordu kuruyor ve savaş yapıyorsa onu hâlâ sadece ticari aktör diye okuyabilir miyiz?"
      },
      category: "colonial",
      era: "17-19. yüzyıl",
      depth: {
        intro: "Devletin tekel imtiyazıyla kurulan kraliyet bayraklı ticaret şirketleri. İngiliz EIC (1600), Hollanda VOC (1602), Fransız Compagnie (1664) — merkantilist sömürge düzeninin operasyonel araçları.",
        intermediate: "EIC ve VOC işlevleri: (1) Asya ticaretinin tekeli (baharat, çay, kahve, ipek, pamuklu); (2) güvenlik (kendi orduları, donanmaları, kaleleri); (3) yarı-egemen idare (Bengal, Java, Tayland'da vergi tahsil etme, savaş ilan etme). VOC tarihsel olarak ilk modern anonim şirket — Amsterdam Borsa'sında hisseleri işlem gördü. EIC 1857 Hint İsyanı sonrası Britanya devletine devredildi. Şirketler tekel kârının kraliyet hazinesine akıttığı pay ile devleti finanse etti.",
        advanced: "Chartered companies merkantilist devletin paradoksudur: özel kâr motivasyonu + kamusal güvenlik fonksiyonu birleşir. Modern eleştiri (Niall Ferguson, William Dalrymple *The Anarchy*): bu şirketler \"vahşi kapitalizm\"in erken örneği — kâr ile sömürge yönetimi birbirinden ayrılmadığı için sistematik istismar üretti (1770 Bengal kıtlığı 10 milyon kişi). Mehmet Genç ve Halil İnalcık çerçevesinde Osmanlı'nın benzer bir chartered company'si olmadı — devlet aracı yerine doğrudan kapitülasyon kanalıyla yabancı tüccar trafiğine açıldı. Bu fark Osmanlı'nın global ticaretten kâr alma yapısının zayıf kalmasının nedenidir.",
        "tetikleyici-soru": "Bugün Çin'in Belt and Road Initiative'i yeni bir VOC mu, yoksa farklı bir kurumsal yapı mı?"
      },
      related: [
        { to: "thomas-mun", type: "paralel" },
        { to: "josiah-child", type: "paralel" },
        { to: "navigation-acts", type: "paralel" },
        { to: "calico-acts", type: "karşıt-tez" },
        { to: "kapitulasyonlar", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "dalrymple-anarchy", page: 0, quote: PENDING }],
      events: ["evt-1600-east-india-company", "evt-1602-voc"]
    },

    {
      id: "manufactures-royales",
      label: "Manufactures Royales",
      lens: {
        root: "Fransa pahalı lüks mamulleri dışarıdan almak yerine kendi beceri, kalite ve ihracat kapasitesini kurmak istedi.",
        dominant: "Colbertçi bakış için kraliyet imalathanesi, dağınık zanaatı disipline eden ve ülkeye prestijli üretim kazandıran bir okul gibidir.",
        counter: "Liberal karşı okuma, devlet imtiyazının gerçek rekabeti bozup saraya yakın üreticileri koruyabileceğini söyler.",
        publicEye: "Usta için yeni iş ve standart; küçük üretici için ağır kural; tüketici için pahalı ama kaliteli yerli mal anlamına gelebilir.",
        control: "Devletin kurduğu üretim kapasitesi ne zaman öğrenme alanı, ne zaman pahalı bir prestij projesi olur?"
      },
      category: "policy",
      era: "17-18. yüzyıl",
      depth: {
        intro: "Fransa'da 1664+ Colbert'in kurduğu kraliyet desteğine sahip imalathaneler. Modern sanayi politikasının erken örneği; devletin doğrudan üretim sektörü oluşturma denemesi.",
        intermediate: "Tipik *manufacture royale*: kraliyet imtiyazıyla kurulmuş (tekel), kraliyetten sermaye + işçi desteği almış, özel yöntem ve kalite standartlarıyla rakipsiz konumda. Örnekler: Gobelins (duvar halısı), Saint-Gobain (ayna ve cam — 1665), Sèvres (porselen — 1740), Beauvais (halı). Colbert ayrıca textile sanayisinde yerel atölyeleri (Lyon ipek, Sedan kumaş) sıkı standartlarla denetledi. Hedef: İtalyan + Hollanda lüks ürün ithalatından kurtulmak, ihracat geliri yaratmak.",
        advanced: "Manufactures Royales karışık başarı: Saint-Gobain 350 yıl yaşadı, hâlâ ayakta (CAC 40 şirketi); Gobelins ve Sèvres prestijli ama küçük kaldı; tekstil standartları lonca direnişiyle çatıştı. Erik Reinert çerçevesinde manufactures Avrupa kalkınma modelinin doğum yatağı — sanayi politikası, kalite ölçeği, ihracat hedefli üretim. Çağdaş paralel: Çin \"national champions\" politikası (Huawei, SAIC, BYD), Güney Kore chaebol (Samsung, Hyundai). Mehmet Genç çerçevesinde Osmanlı'nın benzer girişimleri (Hayrabolu çuha 1709, Selim III dönemi atölyeleri) küçük çaplı kaldı ve sürdürülemedi — iaşecilik mantığı sanayi yatırımına alan açmıyordu.",
        "tetikleyici-soru": "Saint-Gobain 1665'te Venedik cam tekelini kırmak için kuruldu. 2025'te TOGG Tesla'yı dengelemek için kuruluyor. Aynı strateji mi?"
      },
      related: [
        { to: "jean-baptiste-colbert", type: "araç-amaç" },
        { to: "antonio-serra", type: "etkiler" },
        { to: "protectionism", type: "paralel" },
        { to: "import-substitution", type: "araç-amaç" }
      ],
      sourceRefs: [{ source: "cole-colbert", page: 0, quote: PENDING }],
      events: ["evt-1664-colbert-tariff"]
    },

    {
      id: "lonca-sistemi",
      label: "Lonca Sistemi (Guild System)",
      lens: {
        root: "Şehir üretiminde kalite, eğitim, fiyat ve geçim güvenliği piyasanın tek başına bırakılamayacağı kadar hassas görülüyordu.",
        dominant: "Lonca bakışı, mesleği bir geçim ahlakı ve ustalık zinciri olarak korur; amaç kötü malı, hileyi ve düzensiz rekabeti sınırlamaktır.",
        counter: "Smithçi ve liberal karşı okuma, loncanın giriş engeli, yüksek fiyat ve yenilik direnci ürettiğini savunur.",
        publicEye: "Çırak için meslek yolu, usta için statü, tüketici için kalite güvencesi, dışarıda kalan işçi için kapalı kapı olabilir.",
        control: "Kaliteyi koruyan kural ile yeni geleni dışlayan ayrıcalık arasındaki çizgiyi nereden çizeriz?"
      },
      category: "policy",
      era: "12-19. yüzyıl",
      depth: {
        intro: "Şehir zanaatkâr örgütlenmesi: usta, kalfa, çırak hiyerarşisi, üretim kotaları, kalite standartları, giriş engelleri. Avrupa ve Osmanlı ortak özelliği.",
        intermediate: "Lonca işlevleri: (1) kalite kontrolü (standart altında üretim yasak), (2) eğitim (çıraklık → kalfa → ustalık çoklu yıl), (3) fiyat denetimi (genelde \"adil fiyat\" üzerinden), (4) sosyal güvenlik (hasta üye yardımı, dul yardımı), (5) politik temsil (şehir konseyinde söz). Olumsuz yüzü: yeni teknolojiye direniş, dış rekabete kapalılık, lonca dışı emeği bastırma.",
        advanced: "Lonca sistemi 18-19. yy serbest piyasa liberalizminin temel hedeflerinden biriydi — Turgot 1776'da Fransa'da kaldırmaya çalıştı, başaramadı; nihayetinde 1791 Le Chapelier yasasıyla kaldırıldı. Osmanlı'da lonca (esnaf teşkilatı) gedik sistemi ile 19. yy ortasına kadar yaşadı, 1859-1913 arası kademeli çözüldü. Mehmet Genç çerçevesinde Osmanlı loncası iaşecilik (halka kaliteli mal arzı) + gelenekçilik (kanun-ı kadîme bağlılık) ilkelerinin pratik kurumsal taşıyıcısıdır. Modern paralel: günümüz meslek odaları, baroları, tıp odaları — lonca işlevlerinin (giriş engelleri + kalite standardı) profesyonelleşmiş hali.",
        "tetikleyici-soru": "Bugün avukatlık barosunun ehliyet zorunluluğu modern bir lonca mı, kalite garantisi mi?"
      },
      related: [
        { to: "iasecilik", type: "araç-amaç" },
        { to: "gelenekcilik", type: "araç-amaç" },
        { to: "ihtisab-narh", type: "paralel" },
        { to: "adam-smith", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "epstein-prak", page: 0, quote: PENDING }],
      events: ["evt-1791-le-chapelier"]
    },

    {
      id: "import-substitution",
      label: "İthal İkamesi (Import Substitution)",
      lens: {
        root: "Bir ülke sürekli pahalı mamul alıp ucuz hammadde satıyorsa, zenginleşme merdiveninin alt basamağında sıkışabilir.",
        dominant: "Kalkınmacı bakış için ithal ikamesi, dış bağımlılığı azaltan ve yerli sanayiye öğrenme zamanı veren geçiş stratejisidir.",
        counter: "Liberal ve rekabetçi karşı okuma, kapalı pazarın verimsiz şirketler, pahalı ürün ve teknoloji tembelliği üretebileceğini söyler.",
        publicEye: "Tüketici kısa vadede pahalı ve sınırlı seçenekle karşılaşabilir; işçi ve mühendis içinse yeni beceri ve istihdam kapısı açılabilir.",
        control: "Yerli üretim koruması ihracata ve öğrenmeye bağlanıyor mu, yoksa içeride rahat bir tekel mi kuruyor?"
      },
      category: "policy",
      era: "17-21. yüzyıl",
      depth: {
        intro: "Yurt dışından ithal edilen malları yerli üretimle ikame etme stratejisi. Hörnigk'in 9 kuralında merkez ilke (1684); 20. yy'da Latin Amerika ve Hindistan kalkınma modelinin temeli.",
        intermediate: "İthal ikamesinin araçları: yüksek ithalat tarifeleri + yerli üretici sübvansiyonu + teknoloji transferi (lisanslama, zorunlu yerli ortak) + yatırım finansmanı (devlet bankaları). 17-18. yy Avrupa'da Colbert manufactures, Hörnigk Avusturya programı, İngiliz textile sanayisi. 20. yy Latin Amerika ECLA okulu (Prebisch, Singer) bunu kalkınma stratejisi olarak teorize etti. 1980 sonrası Washington consensus altında terk edildi.",
        advanced: "İthal ikamesinin tartışmalı sonucu: Brezilya, Arjantin, Hindistan 1950-1980 arası iç sanayisini büyüttü ama ihracata açılmadığı için verimsizlik birikti. Güney Kore-Tayvan farklı yol izledi: ithal ikamesi + ihracat zorunluluğu birlikte (Park Chung-hee modeli). Bu fark \"ihracat-odaklı kalkınma\"yı (Chang, Reinert savunusu) \"kapalı ithal ikamesi\"nden ayırır. Mehmet Genç çerçevesinde Osmanlı'nın iaşecilik politikası bir tür gizli ithal ikamesi sayılabilir mi? Genç hayır der: amaç iç tedarik değil iç tüketim koruma; ihracat hedef değil.",
        "tetikleyici-soru": "Türkiye'nin TOGG, savunma sanayii yerlileştirme, gıda kendine yeterlilik politikaları kapalı ithal ikamesi mi, ihracat-odaklı strateji mi?"
      },
      related: [
        { to: "philipp-von-hornigk", type: "etkiler" },
        { to: "manufactures-royales", type: "paralel" },
        { to: "protectionism", type: "paralel" },
        { to: "antonio-serra", type: "etkiler" },
        { to: "friedrich-list", type: "etkiler" }
      ],
      sourceRefs: [{ source: "chang-kicking-away", page: 0, quote: PENDING }],
      events: []
    },

    {
      id: "asiento-de-negros",
      label: "Asiento de Negros",
      lens: {
        root: "Amerika plantasyonları zorla çalıştırılacak emek isterken Avrupa devletleri bu insan ticaretini kârlı bir imtiyaz sözleşmesine çevirdi.",
        dominant: "Metropol devlet ve şirket açısından asiento, sömürge üretimini besleyen ve kamu borcuna gelir umudu veren stratejik bir tekeldi.",
        counter: "Köleleştirilen Afrikalıların ve sömürge eleştirisinin gözünden bu, insanı mal gibi sayan şiddetli bir ticaret rejimidir.",
        publicEye: "Avrupa borsasında beklenti ve hisse fiyatı yükselirken, Atlantik geçişinde aileler parçalandı ve bedenler çalışma makinesine indirildi.",
        control: "Devlet gelirini artıran bir sözleşme insan hayatını mala çeviriyorsa iktisadi başarı diye anlatılabilir mi?"
      },
      category: "colonial",
      era: "17-18. yüzyıl",
      depth: {
        intro: "İspanya Krallığı'nın Amerika sömürgelerine köle Afrikalı tedarik etme tekel sözleşmesi. 1713 Utrecht Antlaşması'yla İngiltere'ye geçti — Britanya'nın Atlantic köle ticaretindeki hâkimiyetinin temeli.",
        intermediate: "Asiento sahibinin hakları: belirli sayıda Afrikalı köleyi belirli süre içinde İspanyol Amerika limanlarına teslim etme + ek mal ticareti hakkı (genelde küçük bir İngiliz gemisinin Vera Cruz, Cartagena gibi limanlarda mal satması izinli). Bu \"kaçak ticaret\" izni asiento'yu özellikle kârlı yaptı. 1713-1750 arası İngiliz South Sea Company asiento sahibiydi — 1720 South Sea Bubble bu beklentinin spekülatif çöküşüydü.",
        advanced: "Asiento merkantilist sömürge ticaretinin kanı yüzlü tarafıdır: insan ticareti devletler-arası rekabette en kazançlı \"mal\". Sven Beckert *Empire of Cotton* ve Walter Rodney *How Europe Underdeveloped Africa* (1972) bu sistemi Avrupa kalkınmasının doğrudan finansörü olarak analiz eder — Atlantic ticareti kâr edilen sermaye İngiliz sanayi devrimine yatırıldı (Eric Williams *Capitalism and Slavery* 1944 klasik tezi). Mehmet Genç çerçevesinde Osmanlı'nın benzer bir kıtalararası köle ticareti sistemi yoktu (yerel köle pazarı vardı ama küresel kapitalist sermaye akışı yok); bu fark Osmanlı'nın bu kanaldan zenginleşememesinin nedenidir.",
        "tetikleyici-soru": "Bugün Atlantic köle ticaretinin Avrupa kalkınmasına katkısı tarihsel borç olarak hesaplanmalı mı?"
      },
      related: [
        { to: "triangular-trade", type: "paralel" },
        { to: "navigation-acts", type: "paralel" },
        { to: "east-india-company", type: "paralel" }
      ],
      sourceRefs: [{ source: "eric-williams-capitalism-slavery", page: 0, quote: PENDING }],
      events: ["evt-1713-utrecht-asiento"]
    },

    {
      id: "triangular-trade",
      label: "Üçgen Ticaret (Triangular Trade)",
      lens: {
        root: "Avrupa mamulleri, Afrika'da zorla koparılan emek ve Amerika plantasyon malları aynı kâr döngüsüne bağlandı.",
        dominant: "Metropol tüccarı için üçgen ticaret, gemiyi her aşamada dolu tutan ve sermaye devrini hızlandıran akıllı bir lojistik modeldi.",
        counter: "Afrikalı toplumlar, köleleştirilen insanlar ve sömürge eleştirisi için bu model, kârın zor, savaş ve insan kaybı üzerine kurulmasıdır.",
        publicEye: "Liverpool'da liman geliri artarken Afrika'da toplumsal yıkım, Karayipler'de plantasyon şiddeti ve Avrupa'da ucuz şeker aynı anda büyüdü.",
        control: "Bir ticaret ağı kâr üretirken insan kaybını görünmez kılıyorsa, sayılar tek başına neyi saklar?"
      },
      category: "colonial",
      era: "17-19. yüzyıl",
      depth: {
        intro: "Avrupa → Afrika → Amerika → Avrupa döngüsünde mal ve insan ticareti: mamul mal Afrika'ya, köle Amerika'ya, şeker/tütün/pamuk Avrupa'ya.",
        intermediate: "Tipik döngü: (1) Bristol/Liverpool/Nantes'den silah, tekstil, alkol Afrika'ya — Afrika kralları kölelerle takas etti; (2) köleler Atlantic geçişiyle Karayipler ve Amerika'ya — plantasyonlarda zorla çalıştırıldı; (3) plantasyon malları (şeker, ram, tütün, pamuk) Avrupa'ya — büyük kâr. 1700-1810 yaklaşık 12 milyon Afrikalı bu döngüde köleleştirildi (1.5 milyon Atlantic geçişinde öldü).",
        advanced: "Üçgen ticaret merkantilist sömürge ekonomisinin operasyonel iskeletidir. Eric Williams 1944'te bu döngünün kapitalist sermaye birikiminin doğrudan kaynağı olduğunu argüman etti (Williams thesis) — Stanley Engerman ve diğerleri 1970-1990 arasında bunu kantitatif olarak eleştirdiler (kâr yüzdeleri belki abartılı), ama 2010 sonrası Beckert + Klaas Van der Vleuten + Daron Acemoğlu çalışmaları Williams'ı kısmen rehabilite etti. Tartışma bugün aktif: kapitalizm köle emeğine ne kadar borçlu? Mehmet Genç çerçevesinde Osmanlı bu küresel kâr döngüsüne entegre değildi.",
        "tetikleyici-soru": "Eğer Williams thesis tarihsel olarak haklıysa, Britanya 2025'te eski sömürgelerine tazminat öder mi?"
      },
      related: [
        { to: "asiento-de-negros", type: "paralel" },
        { to: "east-india-company", type: "paralel" },
        { to: "calico-acts", type: "paralel" }
      ],
      sourceRefs: [{ source: "eric-williams-capitalism-slavery", page: 0, quote: PENDING },
                   { source: "beckert-empire-cotton", page: 0, quote: PENDING }],
      events: []
    },

    {
      id: "low-interest-policy",
      label: "Düşük Faiz Politikası",
      lens: {
        root: "Ticaret ve sanayi sermaye ister; pahalı borç girişimciyi boğduğunda devlet faizi politika aracı olarak düşünmeye başlar.",
        dominant: "Child çizgisi için düşük faiz, yatırımı ve ticareti canlandıran bir kalkınma kaldıraçıdır.",
        counter: "Locke ve daha piyasa odaklı okuma, faizi yapay biçimde bastırmanın kredi kıtlığı, güven kaybı ve enflasyon üretebileceğini savunur.",
        publicEye: "Borçlanan tüccar için rahatlama, tasarruf sahibi için gelir kaybı, ücretli için ise fiyat artışı riski doğabilir.",
        control: "Faizi düşürmek üretimi mi artırıyor, yoksa paraya güveni zayıflatıp başka bir krizi mi hazırlıyor?"
      },
      category: "policy",
      era: "17-18. yüzyıl",
      depth: {
        intro: "Josiah Child'ın 1693 *A New Discourse of Trade* eserinin merkez argümanı: faiz oranını yasayla düşürmek sermaye yatırımını ucuzlatır, ticaret ve sanayiyi canlandırır.",
        intermediate: "Child'a göre Hollanda'nın 17. yy başarısının kaynağı düşük faiz oranıydı (Amsterdam Bankası'nda %3-4); İngiltere %6-8 idi. Faiz oranını yasayla düşürmek ticaretin önünü açar. Bu argüman 17. yy İngiltere'sinde aktif tartışıldı, 1714'te yasal üst sınır %5'e düşürüldü. John Locke faizin doğal piyasa olgusu olduğunu, yasayla düşürmenin yan etkiler doğuracağını argüman etti.",
        advanced: "Child argümanı modern para politikası tartışmasında geri döner: merkez bankası faiz oranını düşürerek yatırımı teşvik etmeli mi (Keynes, Lin-Yifu) yoksa enflasyon riski gerekçesiyle yüksek tutmalı mı (Friedman, Lucas)? Modern Türkiye 2018-2023 düşük faiz deneyimi (Erdoğan'nın \"faiz sebep, enflasyon sonuç\" tezi) Child'ın 1693 önermesinin 21. yy ekonomik politik versiyonudur — yan etkiler aynı: kur baskısı, sermaye kaçışı.",
        "tetikleyici-soru": "Child'ın 1693 önerisi ile Erdoğan'ın 2018-2023 politikası teorik olarak aynı argüman mı?"
      },
      related: [
        { to: "josiah-child", type: "etkiler" },
        { to: "public-credit", type: "paralel" }
      ],
      sourceRefs: [{ source: "child-new-discourse", page: 0, quote: PENDING }],
      events: ["evt-1693-child-new-discourse"]
    },

    {
      id: "public-credit",
      label: "Kamusal Kredi (Public Credit)",
      lens: {
        root: "Uzun savaşları ve donanmaları finanse etmek için devletin bugünkü vergi gelirinden fazlasına, yani geleceğe borçlanmasına ihtiyaç vardı.",
        dominant: "Tüccar-banker ve mali devlet bakışı için kamusal kredi, güvenilir vergi düzeni sayesinde savaş kapasitesini büyüten modern bir buluştur.",
        counter: "Vergi mükellefi ve borç eleştirisi açısından aynı sistem, gelecekteki halk gelirini bugünkü savaş ve imparatorluk projelerine ipotek edebilir.",
        publicEye: "Tahvil sahibi faiz alırken, sıradan hane bu faizi tüketim vergileri ve dolaylı yükler üzerinden ödeyebilir.",
        control: "Devletin borçlanma gücü özgürlük ve temsil pazarlığı mı doğuruyor, yoksa sürekli savaşın finansmanını mı kolaylaştırıyor?"
      },
      category: "policy",
      era: "17-19. yüzyıl",
      depth: {
        intro: "Devletin uzun vadeli borçlanma kapasitesi; merkantilist devlet inşasının temel mali aracı. İngiltere Bankası 1694 ve sonra \"consols\" tahvilleri ile sistematikleşti.",
        intermediate: "Public credit'in işleyişi: devlet uzun vadeli tahvil çıkarır, vatandaşlar (özellikle tüccar-banker sınıfı) satın alır, devletin yıllık vergi gelirinden faiz öder. Bu mekanizma savaş finansmanı için kritikti — 18. yy Britanya-Fransa rekabetinde Britanya'nın daha iyi public credit'i savaş kazanma avantajı yarattı. Niall Ferguson *The Ascent of Money* (2008) bu noktayı vurgular: Britanya'nın 1689-1815 arası tüm büyük savaşları kazanmasının altında üstün mali kapasitesi vardı.",
        advanced: "Public credit modern devlet inşasının temel kurumudur. Charles Tilly *Coercion, Capital and European States* (1990) tezinin işleyiş mekanizması: savaş baskısı → mali sistem ihtiyacı → vatandaşlık + temsil pazarlığı → modern parlamenter devlet. Osmanlı 1854'e kadar dış borç almadı, iç tahvil sistemi (esham) sınırlı kaldı; bu modern mali kapasiteyi geç inşa etmesinin nedenidir. 1881 Düyûn-ı Umumiyye dış borç krizinin sonucudur. Bugün egemen tahvil piyasası modern bir public credit sistemidir; Türkiye Hazine tahvilleri, ABD treasuries.",
        "tetikleyici-soru": "Eğer Osmanlı 1700'lerde İngiltere benzeri bir merkez bankası + tahvil sistemi kurabilseydi, 19. yy nasıl şekillenirdi?"
      },
      related: [
        { to: "low-interest-policy", type: "paralel" },
        { to: "charles-davenant", type: "etkiler" },
        { to: "fiskalizm", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "ferguson-ascent-money", page: 0, quote: PENDING }],
      events: ["evt-1694-bank-of-england"]
    },

    {
      id: "classical-political-economy",
      label: "Klasik Politik İktisat",
      lens: {
        root: "Sanayi, piyasa, nüfus ve bölüşüm aynı anda büyüyünce iktisat, ahlak felsefesinden kopmadan daha sistemli bir açıklama dili kurdu.",
        dominant: "Klasik bakış, refahı iş bölümü, üretken emek, rekabet ve uzun dönem bölüşüm yasalarıyla açıklamaya çalışır.",
        counter: "Marx, List ve kurumsalcı okuma; sınıf gücü, ulusal gelişme aşaması ve kurum farklarını bu genel yasaların içine geri çağırır.",
        publicEye: "Klasik metinlerdeki ücret, rant ve kâr; işçi için geçim, toprak sahibi için gelir, sanayici için yatırım kararıdır.",
        control: "Klasik iktisat toplumun mekanizmasını mı keşfediyor, yoksa sanayileşen Britanya'nın deneyimini evrensel yasa gibi mi anlatıyor?"
      },
      category: "karsit",
      era: "18-19. yüzyıl",
      depth: {
        intro: "Smith-Ricardo-Mill geleneğinde gelişen iktisat teorisi; serbest piyasa, iş bölümü, karşılaştırmalı üstünlük, emek-değer kavramları etrafında örgütlüdür. Merkantilizmin entelektüel halefi ve karşıtı.",
        intermediate: "Klasik politik iktisadın temel öncülleri: (1) bireysel rasyonalite ve görünmez el (Smith); (2) emek-değer teorisi (Smith, Ricardo, Marx); (3) karşılaştırmalı üstünlük (Ricardo); (4) Say yasası (arz kendi talebini yaratır); (5) durağan-durum (Mill). Politika çıkarımları: serbest ticaret, lonca tekellerinin kaldırılması, devlet minimum, altın standardı.",
        advanced: "Klasik politik iktisat 1870'lerde marjinal devrimle (Menger, Jevons, Walras) \"modern iktisat\"a dönüştü — emek-değer yerine marjinal fayda merkez. Klasik gelenek hem liberal ana akıma (Hayek, Friedman) hem Marx'a (artı-değer teorisi) miras bıraktı. Erik Reinert'in eleştirisi: klasik iktisat zenginleşmiş bir ülkenin pencerelerinden bakar; geri kalmış ülke için Serra-List geleneği daha uygun.",
        "tetikleyici-soru": "Bugün ana akım iktisat dersleri klasik geleneğin çocuğu mu, marjinal devrimin çocuğu mu? Hangi varsayımları ikisinden devraldık?"
      },
      related: [
        { to: "adam-smith", type: "etkiler" },
        { to: "david-ricardo", type: "etkiler" },
        { to: "john-stuart-mill", type: "etkiler" },
        { to: "erik-reinert", type: "karşıt-tez" }
      ],
      sourceRefs: [],
      events: []
    },

    {
      id: "comparative-advantage",
      label: "Karşılaştırmalı Üstünlük",
      lens: {
        root: "Merkantilist sıfır-toplam düşünceye karşı Ricardo, farklı ülkelerin uzmanlaşarak birlikte kazanabileceğini göstermek istedi.",
        dominant: "Serbest ticaret savunucusu için teori, herkesin göreli güçlü olduğu alana yönelmesini sağlayan zarif bir kazanç mantığıdır.",
        counter: "List, Chang ve Reinert çizgisi, mevcut üstünlüğün tarihsel olarak kurulmuş olabileceğini ve öğrenme sürecini kilitleyebileceğini söyler.",
        publicEye: "Ucuz ithalat tüketiciyi rahatlatabilir; ama kapanan atölye ve sanayi öğrenmesinin kaybı başka bir toplumsal fatura çıkarır.",
        control: "Bugünkü üstünlüğe uymak mı doğru, yoksa yarının üstünlüğünü kurmak için bugünkü modele direnmek mi?"
      },
      category: "karsit",
      era: "19-21. yüzyıl",
      depth: {
        intro: "Ricardo 1817'de formüle ettiği teorem: her ülke göreli olarak daha verimli olduğu mala odaklanır + diğerlerini ithal ederse karşılıklı kazanç sağlar.",
        intermediate: "Klasik örnek: Portekiz hem şarapta hem kumaşta İngiltere'den verimli olsa bile, şaraba odaklanıp kumaşı İngiltere'den almak iki ülkeye de fayda sağlar. Bu, merkantilist \"sıfır-toplam dünya\" görüşünün matematiksel reddidir. WTO ve serbest ticaret rejiminin teorik tabanı.",
        advanced: "Modern eleştiriler: (1) ölçek getirileri ve teknoloji öğrenme statik teoremde yok — Krugman 1979'da bunu modele ekledi; (2) gerçek dünyada üstünlük dinamiktir (Güney Kore 1960'larda elektronikte üstün değildi, 2000'lerde lider); (3) Erik Reinert: model \"fakir kalmayı meşrulaştırıyor\" çünkü mevcut faktör donanımına demir atıyor.",
        "tetikleyici-soru": "Eğer Türkiye Ricardo modeline tam uysaydı, tarım ihracatçısı kalır endüstride hiç gelişmezdi. Karşılaştırmalı üstünlüğe aldırmayan strateji ne sağlardı?"
      },
      related: [
        { to: "david-ricardo", type: "araç-amaç" },
        { to: "free-trade", type: "araç-amaç" },
        { to: "erik-reinert", type: "karşıt-tez" },
        { to: "ha-joon-chang", type: "karşıt-tez" }
      ],
      sourceRefs: [{ source: "ricardo-principles", page: 0, quote: PENDING }],
      events: ["evt-1817-ricardo-principles"]
    },

    {
      id: "free-trade",
      label: "Serbest Ticaret (Free Trade)",
      lens: {
        root: "Ticaret tekelleri, tarifeler ve lonca ayrıcalıkları fiyatları yükseltiyor ve rekabeti boğuyor diye görüldü.",
        dominant: "Liberal bakış için serbest ticaret, tüketiciyi rahatlatan, verimliliği artıran ve ülkeleri karşılıklı kazanca açan düzendir.",
        counter: "Kalkınmacı karşı okuma, serbest ticaretin güçlü sanayi ülkeleri için adil, geç kalan ülkeler için kilitleyici olabileceğini söyler.",
        publicEye: "Ucuz mal hane bütçesini rahatlatır; ama yerli üretici ve işçi için ani rekabet geçim krizine dönüşebilir.",
        control: "Serbest ticaret aynı anda hem özgürleştirici hem eşitsizliği sabitleyici olabilir mi?"
      },
      category: "karsit",
      era: "19-21. yüzyıl",
      depth: {
        intro: "Mal ve hizmetlerin uluslararası dolaşımına gümrük tarife ve kota engeli olmaması ilkesi. Smith-Ricardo-Cobden-Bright klasik liberal hattı 19. yy'da resmileştirdi.",
        intermediate: "1846 Britanya Corn Laws iptali serbest ticaretin resmi başlangıcıdır. 1848 Cobden-Chevalier Antlaşması (İngiltere-Fransa) Avrupa'ya yayılan ilk modern serbest ticaret antlaşmasıdır. 1880-1914 ilk küreselleşme. 1929-1945 korumacılığa geri dönüş. 1947 GATT serbest ticaret rejiminin yeniden inşası. 1995 WTO. 1980-2010 hiper-küreselleşme. 2018+ kısmi geri çekilme.",
        advanced: "Serbest ticaretin tarihsel ironisi: en güçlü savunucuları (Britanya 19. yy, ABD 20. yy ortası) zaten korumacılıkla zirveye çıkmış, sonra serbest ticareti dayatmıştır (Chang \"kicking away the ladder\"). Bugün Çin tam tersini yapıyor: korumacılıkla yükselirken serbest ticareti savunan retorik kullanıyor (RCEP, Belt and Road).",
        "tetikleyici-soru": "Serbest ticaret evrensel bir doğru mu, yoksa belli aşamalarda belli ülkeler için işe yarayan bir strateji mi?"
      },
      related: [
        { to: "comparative-advantage", type: "araç-amaç" },
        { to: "adam-smith", type: "etkiler" },
        { to: "david-ricardo", type: "etkiler" },
        { to: "protectionism", type: "karşıt-tez" },
        { to: "ha-joon-chang", type: "karşıt-tez" }
      ],
      sourceRefs: [],
      events: ["evt-1846-corn-laws-repeal"]
    },

    {
      id: "wool-acts",
      label: "Wool Acts",
      lens: {
        root: "Britanya kendi yün sanayisini korumak isterken İrlanda'nın aynı alanda rekabet etmesini siyasal olarak sınırladı.",
        dominant: "İngiliz üretici ve parlamento için bu yasalar yerli sanayiyi ve istihdamı koruyan stratejik bir kalkınma aracıdır.",
        counter: "İrlanda açısından aynı politika, başka bir toplumun sanayi öğrenmesini kıran ve onu hammadde üretimine sıkıştıran bağımlılık düzenidir.",
        publicEye: "İngiliz dokumacı için iş güvencesi, İrlandalı zanaatkâr için meslek kaybı ve göç baskısı aynı kararın iki yüzüdür.",
        control: "Bir ülkenin koruma politikası başka bir bölgenin üretim hakkını yok ediyorsa, bunu yalnız ulusal çıkar diye okuyabilir miyiz?"
      },
      category: "policy",
      era: "17-18. yüzyıl",
      depth: {
        intro: "1699 İngiliz Wool Act: İrlanda'da yün dokumacılığını yasaklayarak Britanya yün sanayisini korudu. İrlanda'nın iktisadi geri kalışının önemli nedeni.",
        intermediate: "Wool Act'in hükümleri: (1) İrlanda'da yün dokuma yasak (sadece İngiltere'ye ham yün ihraç edebilirdi); (2) bu yün İngiliz dokumacılarınca işlenir, mamul olarak satılır. Sonuç: İrlanda dokumacılığı çöktü, vasıflı işçiler İngiltere'ye ya da kıtaya göç etti; İrlanda tarımsal ekonomide kilitlendi. 18. yy Patrick prensesinin Avrupa'ya tekstil göçü bu yasalardan kaynaklanır.",
        advanced: "Wool Act, \"kicking away the ladder\" mantığının klasik örneği — başkasının sanayisini yıkıp kendininkini koruma. İrlanda 1690-1840 arası nispi geri kalışın derinleştiği dönem; Wool Act bu sürecin parçası. Mehmet Genç çerçevesinde Osmanlı 1838 sonrası benzer bir asimetrik konumda kaldı: ham madde ihraç + mamul ithal denklemine zorlandı. Bu açıdan Osmanlı 19. yy'da bir nevi \"Avrupa'nın İrlandası\" olarak okunabilir.",
        "tetikleyici-soru": "Wool Act ahlaki olarak ne kadar farklı 1838 Balta Limanı'ndan? İkisi de güçlü ülkenin zayıfa dayattığı sanayi-kıran politikadır."
      },
      related: [
        { to: "protectionism", type: "araç-amaç" },
        { to: "calico-acts", type: "paralel" },
        { to: "navigation-acts", type: "paralel" }
      ],
      sourceRefs: [{ source: "cullen-economic-history", page: 0, quote: PENDING }],
      events: ["evt-1699-wool-act"]
    },

    {
      id: "chartered-companies",
      label: "Chartered Companies (İmtiyazlı Şirketler)",
      lens: {
        root: "Devletler uzak coğrafyada riskli ticareti ve sömürge operasyonlarını özel sermayeyle paylaşmak istedi.",
        dominant: "Metropol açısından imtiyazlı şirket, kamu maliyetini azaltan ve özel sermayeyi ulusal stratejiye bağlayan pratik bir kurumdu.",
        counter: "Yerel halklar ve anti-sömürgeci okuma, bu kurumda kâr hırsı ile egemen zorun birleştiğini görür.",
        publicEye: "Yatırımcı için temettü, denizci için iş, yerel üretici için tek alıcı baskısı, köylü için vergi ve şiddet doğabilir.",
        control: "Kâr amacı taşıyan bir kurum kamu yetkisi kullanınca hesap verme hakkı kimde kalır?"
      },
      category: "colonial",
      era: "16-19. yüzyıl",
      depth: {
        intro: "Devletin tekel imtiyazı (charter) verdiği özel sermayeli şirketler; sömürge ticareti, kolonileştirme ve yarı-askeri operasyonların aracı. EIC, VOC, RAC, Hudson's Bay tipi.",
        intermediate: "Tipik charter'ın getirdiği haklar: (1) belirli coğrafyada ticaret tekeli, (2) silah taşıma + ordu/donanma kurma, (3) yerel sözleşme yapma + savaş ilan etme, (4) yerel yönetim (vergi tahsil, yargı). Karşılığında devlete: (a) düzenli ödeme, (b) kâr payı, (c) jeopolitik etki (charter şirketi devletin sömürge politikasını uygular). EIC, VOC, Royal African Company, Hudson's Bay Company, Massachusetts Bay Company tipik örnekler.",
        advanced: "Chartered companies devlet ve özel sermayenin hibrit kurumu — Yeni Kurumsal İktisat (North, Acemoğlu) bu yapıyı modern anonim şirketin atası olarak inceler. Olumsuz yüzü: kâr motivasyonu + yarı-egemen yetki kombinasyonu yıkıcı istismar üretti (Bengal 1770 kıtlığı EIC yönetiminde; Kongo Leopold döneminde özel-yarı-özel ortaklık). 19. yy'da hepsi kademeli olarak ya devlete devredildi (EIC 1857) ya da serbest ticaret rejimine entegre oldu. Mehmet Genç çerçevesinde Osmanlı kendi chartered company'sini kurmadı — bu küresel ticaret kârından sistematik pay almama nedenidir.",
        "tetikleyici-soru": "Bugünün çok uluslu şirketleri (Saudi Aramco, COFCO, Vale) devlet ortaklıklı yapılarıyla yeni-chartered companies mi?"
      },
      related: [
        { to: "east-india-company", type: "paralel" },
        { to: "thomas-mun", type: "paralel" },
        { to: "navigation-acts", type: "paralel" }
      ],
      sourceRefs: [{ source: "dalrymple-anarchy", page: 0, quote: PENDING }],
      events: ["evt-1600-east-india-company", "evt-1602-voc", "evt-1672-rac", "evt-1670-hbc"]
    },

    {
      id: "south-sea-bubble",
      label: "South Sea Bubble + Mississippi Bubble",
      lens: {
        root: "Devlet borcu, imtiyazlı şirket kârı ve sömürge hayali birleşince finansal beklenti gerçek gelirden kopabildi.",
        dominant: "Yatırımcı ve mali devlet bakışı, şirket hisselerini borcu hafifleten ve gelecekteki ticaret kârına ortak eden yeni bir araç gibi gördü.",
        counter: "Kriz okuması, şeffaf olmayan imtiyaz ve kalabalık coşkusunun servet değil kırılganlık ürettiğini söyler.",
        publicEye: "Zengin spekülatör kadar küçük birikim sahibi de yükseliş hikayesine kapılabilir; çöküş geldiğinde kayıp topluma yayılır.",
        control: "Bir finansal yenilik gerçek üretim kapasitesine mi dayanıyor, yoksa insanların aynı hikayeye inanmasına mı?"
      },
      category: "policy",
      era: "18. yüzyıl",
      depth: {
        intro: "1720'de patlayan eş zamanlı iki spekülasyon balonu: İngiliz South Sea Company hisseleri ve Fransız Mississippi Company. Modern finansal balon prototipleri.",
        intermediate: "South Sea Company 1711'de İngiliz devlet borcunu hisselere çevirme amacıyla kurulmuştu; 1719-1720 arası hisseleri 100£'den 1000£'ye çıktı, sonra düştü. Mississippi Company (John Law'ın projesi) Fransa için aynı şeyi 1717-1720 arası yaptı, ardından çöktü. İki olay da merkantilist chartered company sisteminin spekülatif istismarını ortaya koydu. Newton'un ünlü kaybı (£20,000) burada — \"Yıldızların hareketini hesaplayabilirim ama insanların deliliğini değil\" dediği iddiası bu döneme aittir.",
        advanced: "South Sea Bubble + Mississippi Bubble modern finans tarihinin ilk büyük spekülatif krizleri. Kindleberger *Manias, Panics, and Crashes* (1978) bunları paradigmatik örnekler olarak inceler. Sonuçları: (1) 1720 Bubble Act İngiltere'de yeni anonim şirket kurmayı yasakladı (1825'e kadar), bu sanayi devrimini geciktirdi; (2) Fransa'da Banque Royale çöktü, banka şüpheciliği Fransız mali sisteminin gelişmesini yavaşlattı. Mehmet Genç çerçevesinde Osmanlı bu krizden uzaktı (chartered company yoktu, hisse senedi yoktu), ama bu eksiklik aynı zamanda modern finansal kapasitenin gecikmesinin nedeniydi.",
        "tetikleyici-soru": "2008 ABD subprime krizi 1720 South Sea Bubble'ın torunu mu? Spekülasyon dinamikleri 300 yıl boyunca aynı mı kalıyor?"
      },
      related: [
        { to: "john-law", type: "etkiler" },
        { to: "chartered-companies", type: "paralel" },
        { to: "public-credit", type: "paralel" }
      ],
      sourceRefs: [{ source: "kindleberger-manias", page: 0, quote: PENDING }],
      events: ["evt-1720-mississippi-bubble", "evt-1720-south-sea-bubble"]
    }
  ];

  Array.prototype.push.apply(F.concepts, concepts);

  console.log('[fragment:concepts-rest] registered concepts:', concepts.length);
})();
