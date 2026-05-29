// quizzes-data.js — 35 pedagogical quiz questions across 3 depth levels
// Author: glm (T013)
// Auto-converted from JSON to self-registering JS (R004 / ADR-006).
(function() {
  'use strict';
  const F = window.MerkantilizmFragments = window.MerkantilizmFragments || {
    concepts: [], events: [], cases: [], quizzes: [],
    modernLinks: [], sources: [], terminology: [], conceptGroups: {}
  };

  const _quizzes = [
  {
    "id": "q001",
    "depth": 1,
    "question": "Merkantilizmde bir ülkenin zenginliğinin temel ölçüsü ne olarak görülüyordu?",
    "options": [
      "Nüfus büyüklüğü",
      "Tarımsal üretim kapasitesi",
      "Altın ve gümüş stoku",
      "Eğitim seviyesi"
    ],
    "correct": 2,
    "explanation": "Merkantilist düşünceye göre ulusal zenginlik, devletin hazinesindeki altın ve gümüş miktarıyla ölçülürdü. Bu görüşe 'külçecilik' (bullionism) denir.",
    "conceptRefs": [
      "bullionism",
      "balance-of-trade"
    ]
  },
  {
    "id": "q002",
    "depth": 1,
    "question": "İbn Haldun'un ünlü eseri Mukaddime hangi yüzyılda yazılmıştır?",
    "options": [
      "11. yüzyıl",
      "12. yüzyıl",
      "14. yüzyıl",
      "16. yüzyıl"
    ],
    "correct": 2,
    "explanation": "İbn Haldun Mukaddime'yi 1377'de tamamlamıştır. Bu eser, iş bölümü, vergi-devlet ilişkisi ve fiyat oluşumu gibi konularda Smith'ten yaklaşık 400 yıl öndedir.",
    "conceptRefs": [
      "ibn-haldun"
    ]
  },
  {
    "id": "q003",
    "depth": 1,
    "question": "Colbert hangi ülkede maliye nazırı (bakan) olarak görev yapmıştır?",
    "options": [
      "İngiltere",
      "İspanya",
      "Fransa",
      "Hollanda"
    ],
    "correct": 2,
    "explanation": "Jean-Baptiste Colbert, Louis XIV döneminde Fransa'da maliye nazırıydı. Onun ekonomik sistemine 'Kolbertçilik' (Colbertism) denir.",
    "conceptRefs": [
      "jean-baptiste-colbert"
    ]
  },
  {
    "id": "q004",
    "depth": 1,
    "question": "Adam Smith'in 'Milletlerin Zenginliği' (Wealth of Nations) hangi yıl yayınlanmıştır?",
    "options": [
      "1752",
      "1767",
      "1776",
      "1817"
    ],
    "correct": 2,
    "explanation": "Smith'in ünlü eseri 1776'da yayınlandı. Kitap IV'te merkantilist sistemi sistematik olarak eleştirmiştir.",
    "conceptRefs": [
      "adam-smith"
    ]
  },
  {
    "id": "q005",
    "depth": 1,
    "question": "Hollanda Doğu Hindistan Şirketi'nin (VOC) kuruluş yılı nedir?",
    "options": [
      "1600",
      "1602",
      "1609",
      "1615"
    ],
    "correct": 1,
    "explanation": "VOC (Vereenigde Oostindische Compagnie) 1602'de kuruldu ve dünyanın ilk hissedar şirketi kabul edilir.",
    "conceptRefs": [
      "east-india-company"
    ]
  },
  {
    "id": "q006",
    "depth": 1,
    "question": "Osmanlı'da devletin belirlediği azami fiyat uygulamasına ne ad verilirdi?",
    "options": [
      "İltizam",
      "Narh",
      "Gedik",
      "Tımar"
    ],
    "correct": 1,
    "explanation": "Narh, Osmanlı'da devletin belirlediği azami fiyat uygulamasıydı. İaşecilik politikasının bir aracı olarak halkın ucuz mala erişimini sağlardı.",
    "conceptRefs": [
      "ihtisab-narh",
      "iasecilik"
    ]
  },
  {
    "id": "q007",
    "depth": 1,
    "question": "'Political Economy' (Siyasal Ekonomi) terimini ilk kullanan düşünür kimdir?",
    "options": [
      "Adam Smith",
      "Antoine de Montchrestien",
      "William Petty",
      "Jean-Baptiste Colbert"
    ],
    "correct": 1,
    "explanation": "Montchrestien 1615'te yayınladığı 'Traicté de l'oeconomie politique' eserinde bu terimi ilk kez kullanmıştır.",
    "conceptRefs": [
      "antoine-de-montchrestien"
    ]
  },
  {
    "id": "q008",
    "depth": 1,
    "question": "1846'da iptal edilen ve serbest ticaretin resmi zaferi sayılan İngiliz yasası hangisidir?",
    "options": [
      "Navigation Acts",
      "Calico Acts",
      "Tahıl Yasaları (Corn Laws)",
      "Wool Acts"
    ],
    "correct": 2,
    "explanation": "1815'te çıkarılan Corn Laws (Tahıl Yasaları), 1846'da iptal edildi. Bu, serbest ticaret akımının merkantilist korumacılığa karşı resmi zaferi olarak kabul edilir.",
    "conceptRefs": [
      "free-trade",
      "protectionism"
    ]
  },
  {
    "id": "q009",
    "depth": 1,
    "question": "İspanyol sömürgelerine köle tedarik etme tekeli olan 'Asiento' 1713'te hangi ülkeye verildi?",
    "options": [
      "Hollanda",
      "Fransa",
      "Portekiz",
      "İngiltere"
    ],
    "correct": 3,
    "explanation": "1713 Utrecht Antlaşması ile Asiento hakkı İngiltere'ye verildi. Bu, İngiliz köle ticaretinin yasal temelini oluşturdu.",
    "conceptRefs": [
      "asiento-de-negros"
    ]
  },
  {
    "id": "q010",
    "depth": 1,
    "question": "Üçgen ticaret rotasında Afrika'dan Amerika'ya ne taşınırdı?",
    "options": [
      "İşlenmiş mamul eşyalar",
      "Köle",
      "Altın ve gümüş",
      "Baharat"
    ],
    "correct": 1,
    "explanation": "Üçgen ticaretin ikinci ayağında Afrika'dan Amerika'ya köle taşınırdı. İlk aşamada Avrupa→Afrika'ya mamul eşya, son aşamada Amerika→Avrupa'ya hammadde götürülürdü.",
    "conceptRefs": [
      "triangular-trade"
    ]
  },
  {
    "id": "q011",
    "depth": 1,
    "question": "Osmanlı'da 1838'de İngiltere ile imzalanan ve korumacı politikaları sona erdiren antlaşma hangisidir?",
    "options": [
      "Kapitülasyonlar",
      "Balta Limanı Anlaşması",
      "Treaty of Utrecht",
      "Nantes Fermanı"
    ],
    "correct": 1,
    "explanation": "1838 Balta Limanı Anlaşması Osmanlı'yı serbest ticarete zorlamış ve korumacı politikaları sona erdirmiştir.",
    "conceptRefs": [
      "kapitulasyonlar",
      "free-trade"
    ]
  },
  {
    "id": "q012",
    "depth": 1,
    "question": "İlk Fransız kapitülasyonu hangi Osmanlı padişahı döneminde verilmiştir?",
    "options": [
      "Yavuz Sultan Selim",
      "Kanuni Sultan Süleyman",
      "II. Selim",
      "IV. Murad"
    ],
    "correct": 1,
    "explanation": "İlk Fransız kapitülasyonu 1536'da Kanuni Sultan Süleyman döneminde verildi. Bu, uzun vadede ekonomik sömürgeleşmenin aracı oldu.",
    "conceptRefs": [
      "kapitulasyonlar"
    ]
  },
  {
    "id": "q013",
    "depth": 2,
    "question": "Hume'un 1752'deki 'price-specie flow' (fiyat-külçe akış) mekanizması neyi göstermiştir?",
    "options": [
      "Gümrük tarifelerinin iç fiyatları artırdığını",
      "Bullion fazlasının iç fiyatları artırıp ihracatı kendiliğinden azalttığını",
      "Sömürgelerin metropole ekonomik olarak bağımlı olduğunu",
      "Lonca sisteminin verimsiz olduğunu"
    ],
    "correct": 1,
    "explanation": "Hume'un argümanı: ticaret fazlası → altın girişi → iç fiyat artışı → ihracat pahalılaşır → ticaret fazlası erir. Bu, merkantilist 'ticaret fazlası biriktirme' hedefinin kendi kendini bozduğunu kanıtlar.",
    "conceptRefs": [
      "david-hume",
      "david-hume"
    ]
  },
  {
    "id": "q014",
    "depth": 2,
    "question": "Thomas Mun'un 'England's Treasure' eserindeki temel argüman nedir?",
    "options": [
      "Tüm altın ihracatı yasaklanmalıdır",
      "Önemli olan toplam ticaret dengesidir, tek tek işlemler değil",
      "Düşük faiz oranı ulusal güç için şarttır",
      "Sömürgeler serbest ticaret yapmalıdır"
    ],
    "correct": 1,
    "explanation": "Mun, Doğu Hindistan Şirketi'nin altın ihracını savunurken, tek tek işlemlerdeki altın çıkışının değil, genel ticaret dengesinin önemli olduğunu ileri sürdü. Bu, erken bullionist düşünceye göre daha rafine bir merkantilist pozisyondur.",
    "conceptRefs": [
      "thomas-mun"
    ]
  },
  {
    "id": "q015",
    "depth": 2,
    "question": "İspanya'nın Potosí gümüşünden zenginleşmesine rağmen geri kalmasının temel nedeni nedir?",
    "options": [
      "Gümüşün kalitesiz olması",
      "İngiltere'nin deniz üstünlüğü",
      "Kolay kaynak gelirinin yerli sanayiyi geliştirmeyi gereksiz kılması",
      "Protestan reformunun ekonomik büyümeyi engellemesi"
    ],
    "correct": 2,
    "explanation": "İspanya'nın deneyimi, 'Hollanda hastalığı'nın öncülüdür: kolay kaynak geliri, yerli sanayi gelişimini engeller ve uzun vadede rekabet gücünü yok eder.",
    "conceptRefs": [
      "bullionism"
    ]
  },
  {
    "id": "q016",
    "depth": 2,
    "question": "Mehmet Genç'in 'iaşecilik' kavramı Osmanlı'yı neden klasik merkantilistlerden ayırır?",
    "options": [
      "Osmanlı altın biriktirmiyordu",
      "Devletin önceliği halkın bol ve ucuz mala ulaşımıydı, ihracat fazlası değil",
      "Loncalar daha gevşek organize edilmişti",
      "Osmanlı'nın sömürgesi yoktu"
    ],
    "correct": 1,
    "explanation": "Genç'in triadı (iaşecilik, fiskalizm, gelenekçilik), Osmanlı'nın klasik merkantilist olmaktan ziyade halkın iaşesini (ucuz/bol/kaliteli mal) önceliklediğini gösterir. Bu nedenle Osmanlı ihracatı değil, ithalatı teşvik ediyordu.",
    "conceptRefs": [
      "iasecilik",
      "mehmet-genc"
    ]
  },
  {
    "id": "q017",
    "depth": 2,
    "question": "Antonio Serra'nın 1613 'Breve Trattato' eseri neden önemlidir?",
    "options": [
      "Serbest ticareti ilk savunan eser olması",
      "İlk sistematik merkantilist eser olması",
      "Köle ticaretini eleştiren ilk yazım",
      "Osmanlı ekonomisini analiz eden ilk Batılı eser"
    ],
    "correct": 1,
    "explanation": "Serra'nın Breve Trattato'su ilk sistematik merkantilist eser kabul edilir. Sanayi-tarım karşılaştırması, ölçek getirileri ve ticaret dengesi teorisi ile modern kalkınma iktisadının atası sayılır.",
    "conceptRefs": [
      "antonio-serra"
    ]
  },
  {
    "id": "q018",
    "depth": 2,
    "question": "Colbert'in 'Manufactures Royales' sistemi nasıl çalışıyordu?",
    "options": [
      "Özel teşebbüsün serbest rekabet ettiği sistem",
      "Devlet destekli fabrikalar kurarak lüks üretim ve istihdam sağlama",
      "Sömürgelerden hammade alıp işleyip yeniden satma",
      "Loncaların kendi kendini yönetmesi"
    ],
    "correct": 1,
    "explanation": "Manufactures Royales, devlet desteğiyle kurulan fabrikalardı (Gobelins halı, Saint-Gobain cam). Colbert, bunları hem lüks üretim hem de istihdam aracı olarak kullandı.",
    "conceptRefs": [
      "jean-baptiste-colbert",
      "manufactures-royales"
    ]
  },
  {
    "id": "q019",
    "depth": 2,
    "question": "Navigation Acts'in (1651 ve sonrası) temel amacı neydi?",
    "options": [
      "Fransız şarap ithalatını engellemek",
      "Hollanda nakliye hegemonyasını kırmak ve sömürgeleri metropole bağlamak",
      "Köle ticaretini yasaklamak",
      "Balıkçılık haklarını düzenlemek"
    ],
    "correct": 1,
    "explanation": "Navigation Acts, sömürge ticaretini yalnızca İngiliz gemileriyle sınırlandırarak Hollanda'nın deniz taşımacılığındaki üstünlüğünü kırmayı ve sömürgeleri metropole ekonomik olarak bağlamayı hedefledi.",
    "conceptRefs": [
      "navigation-acts"
    ]
  },
  {
    "id": "q020",
    "depth": 2,
    "question": "Ricardo'nun 'karşılaştırmalı üstünlük' teorisi merkantilizmi nasıl çürüttü?",
    "options": [
      "Ticaretin her zaman enflasyona yol açtığını göstererek",
      "Her ülkenin göreli verimliliğe göre uzmanlaşmasıyla tüm ülkelerin kazandığını kanıtlayarak",
      "Lonca sisteminin endüstriyel devrimi engellediğini göstererek",
      "Altın standardının gereksizliğini ileri sürerek"
    ],
    "correct": 1,
    "explanation": "Ricardo'nun 1817 teorisi, mutlak üstünlük yerine göreli (karşılaştırmalı) üstünlükle bile her iki tarafın ticaretten kazançlı çıktığını gösterdi. Bu, merkantilist 'sıfır-toplam' varsayımının teorik çürütmesi oldu.",
    "conceptRefs": [
      "david-ricardo",
      "comparative-advantage"
    ]
  },
  {
    "id": "q021",
    "depth": 2,
    "question": "Osmanlı 'men-i ihracat' (ihracat yasağı) politikasının amacı neydi?",
    "options": [
      "Yabancı paralara karşı korumacılık",
      "Stratejik malların (tahıl, deri, pamuk) yurt içinde kalmasını sağlamak",
      "Loncaların dış rekabetten korunması",
      "Kapitülasyonlara misilleme"
    ],
    "correct": 1,
    "explanation": "Men-i ihracat, stratejik öneme sahip malların (özellikle tahıl, deri, pamuk, gemi yapım malzemeleri) yurt dışına çıkışını yasaklardı. Bu, iaşecilik politikasının bir aracıydı.",
    "conceptRefs": [
      "men-i-ihracat",
      "iasecilik"
    ]
  },
  {
    "id": "q022",
    "depth": 2,
    "question": "Salamanca Okulu'nun iktisat düşüncesine katkısı nedir?",
    "options": [
      "Serbest piyasanın ilk savunucuları",
      "Para miktar teorisi ve değer subjektivizmi gibi erken iktisadi kavramları formüle etmeleri",
      "Marxist iktisadın temellerini atmaları",
      "Merkez bankası kavramını ortaya atmaları"
    ],
    "correct": 1,
    "explanation": "Salamanca Okulu (16. yy İspanya), Azpilcueta'nın para miktar teorisini, Molina'nın değer subjektivizmini ve Mercado'nun satın alma gücü paritesi sezgisini formüle etti.",
    "conceptRefs": [
      "salamanca-okulu"
    ]
  },
  {
    "id": "q023",
    "depth": 2,
    "question": "Fizyokratların (Quesnay ve arkadaşları) merkantilizme eleştirisi neydi?",
    "options": [
      "Sanayinin tarımdan daha önemli olduğunu savunmaları",
      "Toprağı tek net hâsıla kaynağı görmeleri ve laissez-faire ilkesini ortaya koymaları",
      "Sömürgeciliği ahlaki olarak reddetmeleri",
      "Paranın değerinin devlet tarafından belirlenmesi gerektiğini savunmaları"
    ],
    "correct": 1,
    "explanation": "Fizyokratlar toprağı tek 'net ürün' kaynağı saydı ve devlet müdahalesine karşı laissez-faire, laissez-passer ilkesini savundu. Bu, merkantilist devlet kontrollü ekonomiye temel bir eleştiriydi.",
    "conceptRefs": [
      "francois-quesnay"
    ]
  },
  {
    "id": "q024",
    "depth": 2,
    "question": "Calico Acts (1700, 1721) Hindistan'da hangi sonuca yol açtı?",
    "options": [
      "Hindistan tekstil teknolojisini modernleştirdi",
      "Hint el dokumacılığının çöküşüne ve sanayisizleşmeye (deindustrialization)",
      "Hindistan'ın ihracat fazlası vermesini sağladı",
      "İngiliz-Hint ticaretinin serbestleşmesini tetikledi"
    ],
    "correct": 1,
    "explanation": "Calico Acts, Hint pamuklu kumaşlarını yasaklayarak yerel el dokumacılığını çökertti. Bu, sömürgeci deindustrialization'un klasik bir örneğidir.",
    "conceptRefs": [
      "calico-acts",
      "protectionism"
    ]
  },
  {
    "id": "q025",
    "depth": 3,
    "question": "Magnusson'un 'revizyonist' tarih yazımına göre 'merkantilizm' kavramı neden sorunludur?",
    "options": [
      "Çünkü merkantilizm hiç var olmamıştır",
      "Çünkü 'merkantilizm' terimi Smith tarafından yaratılmış, tarihsel aktörler kendilerini böyle tanımlamamıştır",
      "Çünkü yalnızca İngiltere'de uygulanmıştır",
      "Çünkü kavram yalnızca sömürge politikalarını kapsar"
    ],
    "correct": 1,
    "explanation": "Magnusson, 'merkantilizm'in Smith'in Kitap IV'teki eleştirisinden sonra geriye dönük olarak inşa edilmiş bir kategori olduğunu savunur. Tarihsel aktörler (Mun, Colbert vb.) kendilerini 'merkantilist' olarak görmezdi.",
    "conceptRefs": [
      "lars-magnusson",
      "adam-smith"
    ]
  },
  {
    "id": "q026",
    "depth": 3,
    "question": "İbn Haldun'un vergi teorisi neden Laffer eğrisinin 'öncülü' olarak kabul edilir?",
    "options": [
      "İkisi de aynı matematiksel formülü kullanır",
      "İbn Haldun düşük verginin refahı artırdığını, aşırı verginin üretimi yok ettiğini Mukaddime'de açıklamıştır",
      "İbn Haldun vergi oranlarını deneysel olarak test etmiştir",
      "Laffer, İbn Haldun'dan esinlendiğini açıklamıştır"
    ],
    "correct": 1,
    "explanation": "Mukaddime'de İbn Haldun, düşük verginin teşvik edici, aşırı verginin ise üretimi engelleyici etkisini detaylı anlatır. Bu, 20. yy Laffer eğrisinin kavramsal öncülüdür, ancak Laffer bu bağlantıyı bilmeyebilir.",
    "conceptRefs": [
      "ibn-haldun",
      "vergi-devlet-dongusu"
    ]
  },
  {
    "id": "q027",
    "depth": 3,
    "question": "Ha-Joon Chang'ın 'Kicking Away the Ladder' tezinin merkantilizm tarih yazımına katkısı nedir?",
    "options": [
      "Merkantilizmin ahlaki olarak savunulamaz olduğunu kanıtlaması",
      "Zengin ülkelerin korumacılıkla zenginleşip sonra gelişmekte olan ülkelere serbest ticaret dayatmasının tarihsel modelini sunması",
      "Serbest ticaretin her zaman en iyi politika olduğunu istatistikle göstermesi",
      "Klasik iktisadın merkantilizm eleştirisini reddetmesi"
    ],
    "correct": 1,
    "explanation": "Chang, İngiltere, ABD ve diğer sanayileşmiş ülkelerin korumacılık (merkantilist) politikalarla geliştiğini, sonra 'merdiveni tekmeleyerek' gelişmekte olan ülkelere serbest ticaret dayattığını tarihsel kanıtlarla gösterir.",
    "conceptRefs": [
      "ha-joon-chang"
    ]
  },
  {
    "id": "q028",
    "depth": 3,
    "question": "Erik Reinert neden Antonio Serra'yı 'modern kalkınma iktisadının atası' olarak konumlandırır?",
    "options": [
      "Serra serbest ticareti savunduğu için",
      "Serra sanayi-tarım ayrımı, ölçek getirileri ve ihracat odaklı kalkınma teorisi oluşturduğu için",
      "Serra sömürgeciliği eleştirdiği için",
      "Serra matematiksel iktisat modeli kurduğu için"
    ],
    "correct": 1,
    "explanation": "Reinert, Serra'nın 'sanayi üstünlüğü → artan getiriler → refah' zincirini 1613'te formüle etmesinin, modern kalkınma iktisadının çekirdeğini oluşturduğunu savunur.",
    "conceptRefs": [
      "erik-reinert",
      "antonio-serra"
    ]
  },
  {
    "id": "q029",
    "depth": 3,
    "question": "Heckscher'ın klasik merkantilizm tarih yazımına yöneltilebilecek temel eleştiri nedir?",
    "options": [
      "Kaynakçasının yetersizliği",
      "Merkantilizmi tutarlı bir sistem olarak sunarken tarihsel çeşitliliği gözden kaçırması",
      "Yalnızca İngiliz merkantilizmini incelemesi",
      "Smith'i yeterince ciddiye almaması"
    ],
    "correct": 1,
    "explanation": "Heckscher'ın 1935 eseri, merkantilizmi tutarlı bir doktrin sistemi olarak sundu. Revizyonist tarihçiler (Magnusson vb.), bunun farklı ülkeler ve dönemler arasındaki büyük çeşitliliği gizlediğini eleştirir.",
    "conceptRefs": [
      "eli-heckscher",
      "lars-magnusson"
    ]
  },
  {
    "id": "q030",
    "depth": 3,
    "question": "Naima'nın İbn Haldun'cu 5 evre teorisini Osmanlı tarihine uygulaması ne açıdan yenilikçidir?",
    "options": [
      "Osmanlı'yı Avrupa'dan üstün göstermesi",
      "Osmanlı tarihini döngüsel bir modelle açıklaması ve gerilemenin yapısal nedenlerini araması",
      "Avrupa merkantilizmini taklit önermesi",
      "İlk kez Osmanlı ekonomisini sayısallaştırması"
    ],
    "correct": 1,
    "explanation": "Naima, İbn Haldun'un asabiyye-devlet döngüsünü Osmanlı'ya uygulayarak devletin yükseliş ve düşüşünü 5 evrede modelledi. Bu, Osmanlı gerilemesini ahlaki değil yapısal nedenlerle açıklama çabasıydı.",
    "conceptRefs": [
      "naima",
      "ibn-haldun"
    ]
  },
  {
    "id": "q031",
    "depth": 3,
    "question": "AB'nin CBAM (Karbon Sınır Ayarlaması Mekanizması) neden 'yeşil neo-merkantilizm' olarak eleştirilmektedir?",
    "options": [
      "Çevre politikalarına karşı olması",
      "Karbon kaçağını engelleme görünümünde AB sanayiini dış rekabetten koruması",
      "Yalnızca gelişmekte olan ülkeleri hedef alması",
      "Karbon fiyatını yapay olarak yüksek tutması"
    ],
    "correct": 1,
    "explanation": "CBAM, 'karbon kaçağını engelleme' gerekçesiyle AB dışındaki üreticilere maliyet yükleyerek yerli sanayiini koruyor. Bu, çevre kaygısıyla harmanlanmış bir neo-merkantilist korumacılık olarak görülüyor.",
    "conceptRefs": [
      "protectionism"
    ]
  },
  {
    "id": "q032",
    "depth": 3,
    "question": "Philipp von Hörnigk'un 9 kuralı neden modern kalkınma iktisadı açısından önemlidir?",
    "options": [
      "Serbest ticaretin kurallarını içermesi",
      "Kaynak haritalama, yerli işleme, ihracat teşviki ve ithal ikamesi gibi sanayi politikası araçlarını sistematize etmesi",
      "Matematiksel bir büyüme modeli sunması",
      "Sosyal adalet ilkeleri içermesi"
    ],
    "correct": 1,
    "explanation": "Hörnigk'un 9 kuralı, modern sanayi politikasının temel araçlarını (yerli işleme, ihracat teşviki, ithal ikamesi, lüks vergisi vb.) 17. yy'da sistematize etmiştir. Reinert bu kuralların modern kalkınma stratejilerine paralel olduğunu vurgular.",
    "conceptRefs": [
      "philipp-von-hornigk"
    ]
  },
  {
    "id": "q033",
    "depth": 3,
    "question": "Schumpeter'in 'History of Economic Analysis' eserinde İbn Haldun'u yok saymasının olası nedeni nedir?",
    "options": [
      "İbn Haldun'un eserinin henüz keşfedilmemiş olması",
      "Avrupa-merkezli iktisat tarih yazımının İslam dünyasının katkısını sistematik olarak dışlaması",
      "İbn Haldun'un iktisadi analiz yapmamış olması",
      "Schumpeter'in Arapça bilmemesi"
    ],
    "correct": 1,
    "explanation": "İbn Haldun'un iktisadi katkıları Schumpeter tarafından yok sayılmıştır. Bu, Avrupa-merkezli tarih yazımının bir yansıması olarak değerlendirilir. Spengler (1964) ve Boulakia (1971) tarafından modern keşfi yapılmıştır.",
    "conceptRefs": [
      "ibn-haldun"
    ]
  },
  {
    "id": "q034",
    "depth": 3,
    "question": "1838 Balta Limanı Anlaşması'nın Osmanlı ekonomisi üzerindeki uzun vadeli etkisi neydi?",
    "options": [
      "Osmanlı sanayisinin hızla modernleşmesi",
      "Korumacı politikaların kaldırılmasıyla Osmanlı'nın Avrupa'nın hammadde kaynağı ve mamul mal pazarına dönüşmesi",
      "Osmanlı'nın sömürge imparatorluğu kurması",
      "Ticaret hacminin azalması"
    ],
    "correct": 1,
    "explanation": "Balta Limanı, düşük gümrük tarifeleriyle Osmanlı'yı açık pazar haline getirdi. Sonuç: Osmanlı, Avrupa'nın hammadde (tahıl, pamuk) kaynağı ve sanayi mamulleri pazarı oldu. Bu, yarı-sömürge ekonomik yapının başlangıcı sayılır.",
    "conceptRefs": [
      "kapitulasyonlar",
      "free-trade"
    ]
  },
  {
    "id": "q035",
    "depth": 3,
    "question": "Mandeville'in 'Fable of the Bees' eserinin (1714) iktisat düşüncesine paradoksal katkısı nedir?",
    "options": [
      "Merkantilizmi doğrudan savunması",
      "Lüks tüketimi ve 'özel kötülük = kamu yararı' tezini ileri sürerek Smith'in görünmez el kavramına zemin hazırlaması",
      "İlk kez sınıf çatışmasını analiz etmesi",
      "Marx'ın düşüncesini doğrudan etkilemesi"
    ],
    "correct": 1,
    "explanation": "Mandeville'in 'özel kötülüklerin kamu yararına' argümanı, bireysel lüks tüketimin ekonomik canlılık yarattığını savundu. Bu paradoks, Smith'in 'görünmez el' kavramının dolaylı öncülü olarak kabul edilir.",
    "conceptRefs": [
      "bernard-de-mandeville"
    ]
  }
];
  Array.prototype.push.apply(F.quizzes, _quizzes);

  console.log('[fragment:quizzes-data] registered', 'quizzes:', _quizzes.length);
})();
