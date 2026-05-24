// terminology-dict.js — Multilingual dictionary 70 terms in TR/EN/AR/LA
// Author: glm (T015)
// Auto-converted from JSON to self-registering JS (R004 / ADR-006).
(function() {
  'use strict';
  const F = window.MerkantilizmFragments = window.MerkantilizmFragments || {
    concepts: [], events: [], cases: [], quizzes: [],
    modernLinks: [], sources: [], terminology: [], conceptGroups: {}
  };

  const _terminology = [
  {
    "id": "term.bullionism",
    "tr": "Külçecilik",
    "en": "Bullionism",
    "la": null,
    "ar": null,
    "category": [
      "policy",
      "classic-mercantilist"
    ],
    "definition": {
      "tr": "Altın ve gümüş külçe stoklarını ulusal zenginliğin temel ölçüsü olarak gören merkantilist görüş.",
      "en": "The mercantilist doctrine that a nation's wealth is measured by its stock of gold and silver bullion."
    },
    "conceptRef": "concept.bullionism"
  },
  {
    "id": "term.balance-of-trade",
    "tr": "Ticaret Dengesi",
    "en": "Balance of Trade",
    "la": null,
    "ar": null,
    "category": [
      "policy",
      "economic-concept"
    ],
    "definition": {
      "tr": "Bir ülkenin ihracatının ithalatından fazla olması ilkesi; merkantilist politikaların temel hedefi.",
      "en": "The principle that a country's exports should exceed its imports; the core objective of mercantilist policy."
    },
    "conceptRef": "concept.balance-of-trade"
  },
  {
    "id": "term.zero-sum",
    "tr": "Sıfır-Toplam Dünya Görüşü",
    "en": "Zero-Sum Worldview",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept",
      "classic-mercantilist"
    ],
    "definition": {
      "tr": "Uluslararası ticarette bir ülkenin kazancının kaçınılmaz olarak başka bir ülkenin kaybı olduğu inancı.",
      "en": "The belief that in international trade, one country's gain is necessarily another's loss."
    },
    "conceptRef": "concept.zero-sum"
  },
  {
    "id": "term.protectionism",
    "tr": "Korumacılık",
    "en": "Protectionism",
    "la": null,
    "ar": null,
    "category": [
      "policy",
      "economic-concept"
    ],
    "definition": {
      "tr": "Yerli sanayiyi korumak için gümrük tarifeleri, ithalat kotaları ve diğer ticaret kısıtlamalarının kullanılması.",
      "en": "The use of tariffs, import quotas, and other trade restrictions to shield domestic industry from foreign competition."
    },
    "conceptRef": "concept.protectionism"
  },
  {
    "id": "term.import-substitution",
    "tr": "İthal İkamesi",
    "en": "Import Substitution",
    "la": null,
    "ar": null,
    "category": [
      "policy",
      "economic-concept"
    ],
    "definition": {
      "tr": "İthal edilen malları yerli üretimle değiştirme stratejisi; merkantilist dönemde ithalat azaltma aracı.",
      "en": "A strategy of replacing imported goods with domestic production; used in the mercantilist era to reduce imports."
    },
    "conceptRef": "concept.import-substitution"
  },
  {
    "id": "term.navigation-acts",
    "tr": "Gemi Yasaları",
    "en": "Navigation Acts",
    "la": null,
    "ar": null,
    "category": [
      "policy"
    ],
    "definition": {
      "tr": "1651, 1660, 1663 ve 1673'te çıkarılan İngiliz yasaları; sömürge ticaretini yalnızca İngiliz gemileriyle sınırlandırdı.",
      "en": "English laws (1651, 1660, 1663, 1673) restricting colonial trade to English vessels, aimed at breaking Dutch shipping dominance."
    },
    "conceptRef": "concept.navigation-acts"
  },
  {
    "id": "term.calico-acts",
    "tr": "Kaliko Yasaları",
    "en": "Calico Acts",
    "la": null,
    "ar": null,
    "category": [
      "policy"
    ],
    "definition": {
      "tr": "1700 ve 1721'de çıkarılan yasalar; Hint pamuklu kumaşların ithalatını yasaklayarak İngiliz tekstil sanayisini korudu.",
      "en": "Acts of 1700 and 1721 banning the import of Indian cotton textiles to protect the English woolen industry."
    },
    "conceptRef": "concept.calico-acts"
  },
  {
    "id": "term.wool-acts",
    "tr": "Yün Yasaları",
    "en": "Wool Acts",
    "la": null,
    "ar": null,
    "category": [
      "policy"
    ],
    "definition": {
      "tr": "1699'da çıkarılan yasa; İrlanda'nın yün ihracatını yasaklayarak İngiliz yün sanayisini korudu.",
      "en": "1699 act banning Irish wool exports to protect the English wool industry."
    },
    "conceptRef": "concept.wool-acts"
  },
  {
    "id": "term.asiento",
    "tr": "Asiento (Köle Tedarik Tekeli)",
    "en": "Asiento de Negros",
    "la": "Asiento de Negros",
    "ar": null,
    "category": [
      "colonial",
      "policy"
    ],
    "definition": {
      "tr": "İspanyol sömürgelerine köle tedarik etme tekeli; 1713 Utrecht Antlaşması ile İngiltere'ye verildi.",
      "en": "Monopoly contract to supply enslaved Africans to Spanish colonies; granted to Britain by the 1713 Treaty of Utrecht."
    },
    "conceptRef": "concept.asiento"
  },
  {
    "id": "term.triangular-trade",
    "tr": "Üçgen Ticaret",
    "en": "Triangular Trade",
    "la": null,
    "ar": null,
    "category": [
      "colonial"
    ],
    "definition": {
      "tr": "Avrupa'dan Afrika'ya mamul eşya, Afrika'dan Amerika'ya köle, Amerika'dan Avrupa'ya hammadde döngüsü.",
      "en": "The trade cycle: manufactured goods from Europe to Africa, enslaved people from Africa to the Americas, raw materials from the Americas to Europe."
    },
    "conceptRef": "concept.triangular-trade"
  },
  {
    "id": "term.manufactures-royales",
    "tr": "Kraliyet Fabrikaları",
    "en": "Manufactures Royales",
    "la": "Manufactures Royales",
    "ar": null,
    "category": [
      "policy",
      "classic-mercantilist"
    ],
    "definition": {
      "tr": "Fransa'da Colbert döneminde kurulan devlet destekli fabrikalar (Gobelins, Saint-Gobain); lüks üretim ve istihdam aracı.",
      "en": "State-supported factories established under Colbert in France (e.g., Gobelins, Saint-Gobain); instruments of luxury production and employment."
    },
    "conceptRef": "concept.manufactures-royales"
  },
  {
    "id": "term.guild",
    "tr": "Lonca Sistemi",
    "en": "Guild System",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept"
    ],
    "definition": {
      "tr": "Üretim regülasyonu, kalite kontrolü ve sektöre giriş engeli koyan meslek örgütleri; merkantilist ekonominin temel birimi.",
      "en": "Craft associations regulating production, quality control, and market entry; a fundamental unit of the mercantilist economy."
    },
    "conceptRef": "concept.guild"
  },
  {
    "id": "term.populationism",
    "tr": "Nüfusçuluk",
    "en": "Populationism",
    "la": null,
    "ar": null,
    "category": [
      "policy",
      "economic-concept"
    ],
    "definition": {
      "tr": "Nüfus artışının ulusal gücün kaynağı olduğu görüşü; daha fazla kişi = daha fazla asker + ucuz işgücü.",
      "en": "The view that population growth is a source of national power; more people = more soldiers + cheaper labor."
    },
    "conceptRef": "concept.populationism"
  },
  {
    "id": "term.exchange-control",
    "tr": "Kambiyo Kontrolü",
    "en": "Foreign Exchange Control",
    "la": null,
    "ar": null,
    "category": [
      "policy"
    ],
    "definition": {
      "tr": "Devletin döviz işlemlerini düzenleyerek altın/gümüş çıkışını engelleme politikası.",
      "en": "State regulation of foreign exchange transactions to prevent the outflow of gold and silver."
    },
    "conceptRef": "concept.exchange-control"
  },
  {
    "id": "term.export-bounty",
    "tr": "İhracat Primi",
    "en": "Export Bounty / Subsidy",
    "la": null,
    "ar": null,
    "category": [
      "policy",
      "economic-concept"
    ],
    "definition": {
      "tr": "İhracatı teşvik etmek için devletin üreticilere verdiği ödeme; merkantilist ihracat artırma aracı.",
      "en": "Government payment to producers to encourage exports; a mercantilist tool for increasing the trade surplus."
    },
    "conceptRef": "concept.export-bounty"
  },
  {
    "id": "term.monopoly-charter",
    "tr": "Tekel İmtiyazı (Kraliyet Beratı)",
    "en": "Royal Charter Monopoly",
    "la": null,
    "ar": null,
    "category": [
      "policy",
      "colonial"
    ],
    "definition": {
      "tr": "Kraliyet tarafından verilen tek ticaret hakkı; Doğu Hindistan Şirketleri (EIC, VOC) ve benzerleri bu yolla kuruldu.",
      "en": "Exclusive trading rights granted by royal decree; East India Companies (EIC, VOC) and similar entities were established through charters."
    },
    "conceptRef": "concept.monopoly-charter"
  },
  {
    "id": "term.eic",
    "tr": "İngiliz Doğu Hindistan Şirketi",
    "en": "East India Company (EIC)",
    "la": null,
    "ar": null,
    "category": [
      "colonial"
    ],
    "definition": {
      "tr": "1600'de kraliyet imtiyazıyla kurulan İngiliz ticaret şirketi; Hindistan'da sömürge yönetiminin aracı.",
      "en": "English trading company chartered in 1600; became the instrument of colonial rule in India."
    },
    "conceptRef": "concept.eic"
  },
  {
    "id": "term.voc",
    "tr": "Hollanda Doğu Hindistan Şirketi",
    "en": "Vereenigde Oostindische Compagnie (VOC)",
    "la": "Vereenigde Oostindische Compagnie",
    "ar": null,
    "category": [
      "colonial"
    ],
    "definition": {
      "tr": "1602'de kurulan Hollanda ticaret şirketi; ilk hissedar şirketi; Baharat Adaları'nda tekel.",
      "en": "Dutch trading company founded in 1602; the world's first joint-stock company; held a spice monopoly in the East Indies."
    },
    "conceptRef": "concept.voc"
  },
  {
    "id": "term.price-specie-flow",
    "tr": "Fiyat-Külçe Akış Mekanizması",
    "en": "Price-Specie Flow Mechanism",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept",
      "critique"
    ],
    "definition": {
      "tr": "Hume'un 1752 teorisi: ticaret fazlası altın girişine → iç fiyat artışına → ihracat azalışına yol açar; merkantilizmin kendini dengesizleştirdiğini kanıtlar.",
      "en": "Hume's 1752 theory: trade surplus leads to gold inflow → domestic price rise → export decline, proving mercantilism self-defeating."
    },
    "conceptRef": "concept.hume"
  },
  {
    "id": "term.physiocracy",
    "tr": "Fizyokrasi",
    "en": "Physiocracy",
    "la": null,
    "ar": null,
    "category": [
      "critique",
      "economic-concept"
    ],
    "definition": {
      "tr": "Quesnay liderliğindeki 18. yy Fransız düşünce okulu; toprağı tek net hâsıla kaynağı görür; laissez-faire ilkesini ortaya koydu.",
      "en": "18th-century French school led by Quesnay; viewed land as the sole source of net product; introduced the laissez-faire principle."
    },
    "conceptRef": "concept.physiocracy"
  },
  {
    "id": "term.laissez-faire",
    "tr": "Laissez-faire (Bırakınız Yapsınlar)",
    "en": "Laissez-faire",
    "la": "Laissez faire, laissez passer",
    "ar": null,
    "category": [
      "economic-concept",
      "critique"
    ],
    "definition": {
      "tr": "Devletin ekonomiye müdahalesinin minimumda tutulması gerektiği ilkesi; fizyokratlar ve ardından klasik iktisatçılar tarafından savunuldu.",
      "en": "The principle that government interference in the economy should be minimal; advocated by physiocrats and later classical economists."
    },
    "conceptRef": "concept.laissez-faire"
  },
  {
    "id": "term.comparative-advantage",
    "tr": "Karşılaştırmalı Üstünlük",
    "en": "Comparative Advantage",
    "la": null,
    "ar": null,
    "category": [
      "critique",
      "economic-concept"
    ],
    "definition": {
      "tr": "Ricardo'nun 1817 teorisi: her ülkenin göreli olarak en verimli olduğu alanda uzmanlaşmasıyla her iki taraf da kazanır; merkantilist sıfır-toplam görüşünün teorik çürütmesi.",
      "en": "Ricardo's 1817 theory: each country gains by specializing in goods where it has relative efficiency; the theoretical refutation of the mercantilist zero-sum view."
    },
    "conceptRef": "concept.ricardo"
  },
  {
    "id": "term.price-revolution",
    "tr": "Fiyat Devrimi",
    "en": "Price Revolution",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept"
    ],
    "definition": {
      "tr": "1500-1650 arasında Amerika gümüşünün Avrupa'ya akmasıyla ortaya çıkan enflasyonist dönem; fiyatlar 3-4 kat arttı.",
      "en": "The inflationary period of 1500-1650 caused by the influx of American silver into Europe; prices rose 3-4 fold."
    },
    "conceptRef": "concept.price-revolution"
  },
  {
    "id": "term.quantity-theory",
    "tr": "Para Miktar Teorisi",
    "en": "Quantity Theory of Money",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept"
    ],
    "definition": {
      "tr": "Para arzındaki artışın fiyat düzeyini yükselttiği teorisi; Azpilcueta (1556) ve Bodin (1568) tarafından formüle edildi.",
      "en": "The theory that increases in the money supply raise the price level; formulated by Azpilcueta (1556) and Bodin (1568)."
    },
    "conceptRef": "concept.quantity-theory"
  },
  {
    "id": "term.encomienda",
    "tr": "Enkomiyenda Sistemi",
    "en": "Encomienda",
    "la": "Encomienda",
    "ar": null,
    "category": [
      "colonial"
    ],
    "definition": {
      "tr": "İspanyolların Amerika'da yerel nüfusu çalıştırma hakkı verdikleri toprak sistemi; sömürge emek sömürüsünün yasal çerçevesi.",
      "en": "Spanish colonial system granting settlers the right to extract labor from indigenous populations; a legal framework for colonial exploitation."
    },
    "conceptRef": "concept.encomienda"
  },
  {
    "id": "term.mita",
    "tr": "Mita (Zorunlu İşgücü)",
    "en": "Mita",
    "la": null,
    "ar": null,
    "category": [
      "colonial"
    ],
    "definition": {
      "tr": "İnka döneminden alınan İspanyol zorunlu işgücü sistemi; özellikle Potosi gümüş madenlerinde kullanıldı.",
      "en": "Forced labor system adapted from Inca practice by the Spanish; especially used in the Potosí silver mines."
    },
    "conceptRef": "concept.mita"
  },
  {
    "id": "term.treasure-fleet",
    "tr": "Hazine Filosu",
    "en": "Spanish Treasure Fleet (Flota de Indias)",
    "la": "Flota de Indias",
    "ar": null,
    "category": [
      "colonial"
    ],
    "definition": {
      "tr": "Amerika'dan İspanya'ya gümüş ve altın taşıyan düzenli konvoy sistemi; merkantilist külçe akışının ana damarı.",
      "en": "Regular convoy system transporting silver and gold from the Americas to Spain; the main artery of the mercantilist bullion flow."
    },
    "conceptRef": "concept.treasure-fleet"
  },
  {
    "id": "term.asabiyyah",
    "tr": "Asabiyye (Toplumsal Bağ)",
    "en": "Asabiyyah (Social Solidarity)",
    "la": null,
    "ar": "عصبية",
    "category": [
      "pre-mercantilist",
      "ottoman"
    ],
    "definition": {
      "tr": "İbn Haldun'un kavramı: toplumsal dayanışma gücü; devletin yükseliş ve düşüşünü belirleyen temel dinamik.",
      "en": "Ibn Khaldun's concept: the bond of social solidarity; the fundamental dynamic determining the rise and fall of states."
    },
    "conceptRef": "concept.ibn-haldun"
  },
  {
    "id": "term.iasecilik",
    "tr": "İaşecilik",
    "en": "Provisionism",
    "la": null,
    "ar": null,
    "category": [
      "ottoman",
      "economic-concept"
    ],
    "definition": {
      "tr": "Mehmet Genç'in tanımladığı Osmanlı ekonomik doktrini: devletin önceliği halkın bol, ucuz ve kaliteli mala ulaşımıdır; ihracat fazlası değil.",
      "en": "Ottoman economic doctrine defined by Mehmet Genç: the state prioritizes the people's access to abundant, cheap, quality goods — not export surpluses."
    },
    "conceptRef": "concept.iasecilik"
  },
  {
    "id": "term.fiskalizm",
    "tr": "Fiskalizm",
    "en": "Fiscalism",
    "la": null,
    "ar": null,
    "category": [
      "ottoman",
      "economic-concept"
    ],
    "definition": {
      "tr": "Genç triadının ikinci ayağı: devletin hazinesinin kısa vadeli gelir sağlaması; vergi ve maliye politikalarının ekonomik davranıştan bağımsız yürütülmesi.",
      "en": "Second pillar of Genç's triad: the state's focus on short-term treasury revenue; fiscal policy conducted independently of economic behavior."
    },
    "conceptRef": "concept.fiskalizm"
  },
  {
    "id": "term.gelenekcilik",
    "tr": "Gelenekçilik",
    "en": "Traditionalism",
    "la": null,
    "ar": null,
    "category": [
      "ottoman",
      "economic-concept"
    ],
    "definition": {
      "tr": "Genç triadının üçüncü ayağı: mevcut ekonomik ve toplumsal düzenin bozulmaması ilkesi; yeniliklere karşı ihtiyatlı yaklaşım.",
      "en": "Third pillar of Genç's triad: the principle of preserving the existing economic and social order; cautious approach to innovation."
    },
    "conceptRef": "concept.gelenekcilik"
  },
  {
    "id": "term.kapitulasyon",
    "tr": "Kapitülasyonlar",
    "en": "Capitulations",
    "la": "Capitulationes",
    "ar": null,
    "category": [
      "ottoman",
      "policy"
    ],
    "definition": {
      "tr": "Osmanlı'nın Avrupalı tüccarlara verdiği ticari imtiyazlar; 1536'da ilk Fransız kapitülasyonu; uzun vadede ekonomik sömürgeleşme aracı.",
      "en": "Trade privileges granted by the Ottoman Empire to European merchants; first French capitulation in 1536; became a tool of economic colonization over time."
    },
    "conceptRef": "concept.kapitulasyon"
  },
  {
    "id": "term.narh",
    "tr": "Narh (Fiyat Tavanı)",
    "en": "Narh (Price Ceiling)",
    "la": null,
    "ar": "النرخ",
    "category": [
      "ottoman",
      "economic-concept"
    ],
    "definition": {
      "tr": "Osmanlı'da devletin belirlediği azami fiyat uygulaması; ihtisab nizamının bir aracı; iaşecilik politikasının uygulayıcı mekanizması.",
      "en": "Ottoman practice of state-set maximum prices; a tool of the ihtisab system; enforcement mechanism of provisionism."
    },
    "conceptRef": "concept.narh"
  },
  {
    "id": "term.ihtisab",
    "tr": "İhtisab Nizamı",
    "en": "Ihtisab (Market Inspection System)",
    "la": null,
    "ar": "احتساب",
    "category": [
      "ottoman",
      "policy"
    ],
    "definition": {
      "tr": "Osmanlı pazar denetim sistemi; muhtesib tarafından yürütülür; narh uygulaması, ölçü-tartı denetimi ve esnaf gözetimi.",
      "en": "Ottoman market inspection system; administered by the muhtesib; enforced narh, weights & measures, and guild oversight."
    },
    "conceptRef": "concept.ihtisab"
  },
  {
    "id": "term.men-i-ihracat",
    "tr": "Men-i İhracat (İhracat Yasağı)",
    "en": "Export Ban (Men-i İhracat)",
    "la": null,
    "ar": "منع التصدير",
    "category": [
      "ottoman",
      "policy"
    ],
    "definition": {
      "tr": "Osmanlı'da stratejik malların (tahıl, deri, pamuk, gemi malzemesi) yurtdışına çıkışının yasaklanması; iaşeciliğin bir aracı.",
      "en": "Ottoman ban on exporting strategic goods (grain, leather, cotton, shipbuilding materials); an instrument of provisionism."
    },
    "conceptRef": "concept.men-i-ihracat"
  },
  {
    "id": "term.iltizam",
    "tr": "İltizam (Vergi Toplama Hakkı)",
    "en": "Tax Farming (İltizam)",
    "la": null,
    "ar": "التزام",
    "category": [
      "ottoman",
      "economic-concept"
    ],
    "definition": {
      "tr": "Devletin vergi toplama hakkını peşin bedelle özel kişilere devretmesi; mültezimler kâr amacıyla topladı; mali çürümenin yollarından biri.",
      "en": "State delegation of tax collection rights to private individuals for upfront payment; tax farmers collected for profit, contributing to fiscal decay."
    },
    "conceptRef": "concept.iltizam"
  },
  {
    "id": "term.malikane",
    "tr": "Malikâne Sistemi",
    "en": "Malikâne (Lifetime Tax Farm)",
    "la": null,
    "ar": null,
    "category": [
      "ottoman",
      "economic-concept"
    ],
    "definition": {
      "tr": "17. yy sonundan itibaren ömür boyu vergi toplama hakkı; iltizamın kalıcı hali; ayanlık ve taşra güçlenmesinin ekonomik temeli.",
      "en": "Lifetime tax farming rights from the late 17th century; a permanent form of iltizam; economic basis of provincial magnate power."
    },
    "conceptRef": "concept.malikane"
  },
  {
    "id": "term.timar",
    "tr": "Tımar Sistemi",
    "en": "Timar (Feudal Land Grant)",
    "la": null,
    "ar": "طيمار",
    "category": [
      "ottoman",
      "economic-concept"
    ],
    "definition": {
      "tr": "Osmanlı klasik döneminin askeri-tarımsal düzeni; sipahilere toprak karşılığında askerlik hizmeti.",
      "en": "Ottoman classical-era military-agricultural system; cavalrymen received land grants in exchange for military service."
    },
    "conceptRef": "concept.timar"
  },
  {
    "id": "term.akce",
    "tr": "Akçe",
    "en": "Akçe (Ottoman Silver Coin)",
    "la": null,
    "ar": "آقچه",
    "category": [
      "ottoman",
      "economic-concept"
    ],
    "definition": {
      "tr": "Osmanlı'nın temel gümüş parası; sürekli devalüasyon yaşadı; Pamuk'un çalışmasının konusu.",
      "en": "The Ottoman basic silver coin; subject to continuous devaluation; studied by Şevket Pamuk."
    },
    "conceptRef": "concept.akce"
  },
  {
    "id": "term.gedik",
    "tr": "Gedik (Lonca Ruhsatı)",
    "en": "Gedik (Guild License)",
    "la": null,
    "ar": null,
    "category": [
      "ottoman",
      "economic-concept"
    ],
    "definition": {
      "tr": "Osmanlı lonca sisteminde bir esnafın çalışma hakkı; atölye, alet ve müşteri kitininin devredilemez hakkı.",
      "en": "In the Ottoman guild system, a craftsman's non-transferable license to practice; the right to a workshop, tools, and clientele."
    },
    "conceptRef": "concept.gedik"
  },
  {
    "id": "term.justum-pretium",
    "tr": "Adil Fiyat",
    "en": "Just Price (Iustum Pretium)",
    "la": "Iustum pretium",
    "ar": null,
    "category": [
      "pre-mercantilist",
      "economic-concept"
    ],
    "definition": {
      "tr": "Aquinas'ın Summa Theologica'sındaki kavram: bir malın adil karşılığı; fiyatın ahlaki sınırı; skolastik iktisadın temeli.",
      "en": "Aquinas's concept from Summa Theologica: the fair equivalent of a good; moral boundary of price; foundation of scholastic economics."
    },
    "conceptRef": "concept.aquinas"
  },
  {
    "id": "term.usury",
    "tr": "Faiz Yasağı (Faiz Karşıtlığı)",
    "en": "Usury Prohibition",
    "la": null,
    "ar": "ربا (Riba)",
    "category": [
      "pre-mercantilist",
      "economic-concept"
    ],
    "definition": {
      "tr": "Skolastik ve İslami düşüncede faiz alınmasının ahlaki olarak reddi; Aquinas ve İbn Haldun'da benzer yaklaşımlar.",
      "en": "The moral rejection of charging interest in scholastic and Islamic thought; similar approaches in Aquinas and Ibn Khaldun."
    },
    "conceptRef": "concept.usury"
  },
  {
    "id": "term.cantillon-effect",
    "tr": "Cantillon Etkisi",
    "en": "Cantillon Effect",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept",
      "critique"
    ],
    "definition": {
      "tr": "Para arzındaki artışın toplumda eşit dağılmadığı; paraya ilk erişenlerin kazandığı, son erişenlerin kaybettiği olgu.",
      "en": "Phenomenon where money supply increases are not evenly distributed; those who access new money first gain, latecomers lose."
    },
    "conceptRef": "concept.cantillon"
  },
  {
    "id": "term.colbertism",
    "tr": "Kolbertçilik",
    "en": "Colbertism",
    "la": null,
    "ar": null,
    "category": [
      "policy",
      "classic-mercantilist"
    ],
    "definition": {
      "tr": "Colbert'in Fransa'daki ekonomik sistemi: kraliyet fabrikaları, gümrük tarifeleri, lonca reorganizasyonu, donanma inşası.",
      "en": "Colbert's economic system in France: royal factories, tariffs, guild reorganization, naval construction."
    },
    "conceptRef": "concept.colbert"
  },
  {
    "id": "term.plantation-economy",
    "tr": "Plantasyon Ekonomisi",
    "en": "Plantation Economy",
    "la": null,
    "ar": null,
    "category": [
      "colonial",
      "economic-concept"
    ],
    "definition": {
      "tr": "Sömürgelerde tek ürün (şeker, tütün, pamuk, kahve) üretimine dayalı ekonomi; köle emeğine bağımlı.",
      "en": "Colonial economy based on single-crop production (sugar, tobacco, cotton, coffee); dependent on enslaved labor."
    },
    "conceptRef": "concept.plantation"
  },
  {
    "id": "term.laffer-precursor",
    "tr": "Laffer Eğrisi Öncülü (İbn Haldun)",
    "en": "Laffer Curve Precursor (Ibn Khaldun)",
    "la": null,
    "ar": null,
    "category": [
      "pre-mercantilist",
      "economic-concept"
    ],
    "definition": {
      "tr": "İbn Haldun'un Mukaddime'deki vergi teorisi: düşük vergi refahı artırır, aşırı vergi üretimi yok eder; 20. yy Laffer eğrisinin 14. yy öncülü.",
      "en": "Ibn Khaldun's tax theory in the Muqaddimah: low taxes increase prosperity, excessive taxes destroy production; 14th-century precursor to the Laffer Curve."
    },
    "conceptRef": "concept.ibn-haldun"
  },
  {
    "id": "term.division-of-labor",
    "tr": "İş Bölümü",
    "en": "Division of Labor",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept",
      "pre-mercantilist"
    ],
    "definition": {
      "tr": "Üretim sürecinin farklı görevlere ayrılması; İbn Haldun Mukaddime'de, Smith Wealth of Nations'da temel kavram.",
      "en": "Separation of the production process into distinct tasks; fundamental concept in Ibn Khaldun's Muqaddimah and Smith's Wealth of Nations."
    },
    "conceptRef": "concept.division-of-labor"
  },
  {
    "id": "term.hornigk-nine-rules",
    "tr": "Hörnigk'un 9 Kuralı",
    "en": "Hörnigk's Nine Rules",
    "la": null,
    "ar": null,
    "category": [
      "classic-mercantilist",
      "policy"
    ],
    "definition": {
      "tr": "1684'te yayınlanan Österreich über alles'teki merkantilist kalkınma reçetesi: kaynak haritalama, yerli işleme, nüfus, altın tutma, ithal ikamesi, lüks vergisi, ihracat teşviki, ham ihracat yasağı, kendine yetme.",
      "en": "Mercantilist development recipe from Österreich über alles (1684): resource mapping, domestic processing, population, gold retention, import substitution, luxury tax, export incentives, raw export bans, self-sufficiency."
    },
    "conceptRef": "concept.hornigk"
  },
  {
    "id": "term.fable-of-bees",
    "tr": "Arıların Masalı",
    "en": "Fable of the Bees",
    "la": null,
    "ar": null,
    "category": [
      "classic-mercantilist",
      "economic-concept"
    ],
    "definition": {
      "tr": "Mandeville'in 1714 eseri; 'özel kötülük = kamu yararı' tezi; lüks tüketim savunusu; Smith'in dolaylı öncülü.",
      "en": "Mandeville's 1714 work; thesis that 'private vices = public benefits'; defense of luxury consumption; indirect precursor to Smith."
    },
    "conceptRef": "concept.mandeville"
  },
  {
    "id": "term.mississippi-bubble",
    "tr": "Mississippi Balonu",
    "en": "Mississippi Bubble",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept"
    ],
    "definition": {
      "tr": "John Law'un 1717-1720 Fransa'sındaki kağıt para ve hisse senedi balonu; merkantilist para manipülasyonunun çöküşü.",
      "en": "John Law's 1717-1720 paper money and stock bubble in France; the collapse of mercantilist monetary manipulation."
    },
    "conceptRef": "concept.john-law"
  },
  {
    "id": "term.amsterdam-bank",
    "tr": "Amsterdam Bankası",
    "en": "Bank of Amsterdam (Wisselbank)",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept"
    ],
    "definition": {
      "tr": "1609'da kurulan halka açık mevduat bankası; uluslararası ödeme sisteminin merkezi; Hollanda ticaret hegemonyasının aracı.",
      "en": "Public deposit bank founded in 1609; center of the international payment system; instrument of Dutch commercial hegemony."
    },
    "conceptRef": "concept.amsterdam-bank"
  },
  {
    "id": "term.bank-of-england",
    "tr": "İngiltere Bankası",
    "en": "Bank of England",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept"
    ],
    "definition": {
      "tr": "1694'te kurulan merkez bankası; İngiliz savaş finansmanını sağlamak için; modern merkez bankacılığının öncüsü.",
      "en": "Central bank founded in 1694 to finance English war efforts; precursor to modern central banking."
    },
    "conceptRef": "concept.bank-of-england"
  },
  {
    "id": "term.political-economy",
    "tr": "İktisat (Siyasal Ekonomi)",
    "en": "Political Economy",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept"
    ],
    "definition": {
      "tr": "Montchrestien'in 1615'te ilk kullandığı terim; devlet ve ekonomi ilişkisini inceleyen disiplin.",
      "en": "Term first used by Montchrestien in 1615; the discipline studying the relationship between state and economy."
    },
    "conceptRef": "concept.montchrestien"
  },
  {
    "id": "term.mercantilism",
    "tr": "Merkantilizm",
    "en": "Mercantilism",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept"
    ],
    "definition": {
      "tr": "16-18. yy'da Avrupa'da hâkim ekonomik düşünce: devletin ticaret fazlası yoluyla altın/gümüş biriktirmesi ve ulusal gücü artırması. Terim Smith'in Kitap IV eleştirisinden sonra kullanıldı.",
      "en": "Dominant economic thought in 16th-18th century Europe: the state accumulates gold/silver through trade surpluses to increase national power. Term coined after Smith's Book IV critique."
    },
    "conceptRef": "concept.mercantilism"
  },
  {
    "id": "term.dutch-disease-precursor",
    "tr": "Hollanda Hastalığı Öncülü (İspanya)",
    "en": "Dutch Disease Precursor (Spain)",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept"
    ],
    "definition": {
      "tr": "İspanya'nın Amerikan gümüşüyle yaşadığı olgu: zengin kaynaklı gelirin yerli sanayiyi geriletmesi.",
      "en": "Spain's experience with American silver: resource-driven income undermining domestic industry; an early instance of 'Dutch disease'."
    },
    "conceptRef": "concept.spanish-silver"
  },
  {
    "id": "term.muhtesib",
    "tr": "Muhtesib",
    "en": "Muhtesib (Market Inspector)",
    "la": null,
    "ar": "محتسب",
    "category": [
      "ottoman",
      "policy"
    ],
    "definition": {
      "tr": "Osmanlı'da pazar denetiminden sorumlu görevli; narh uygulaması, esnaf denetimi ve ahlaki gözetim.",
      "en": "Ottoman official responsible for market inspection; enforced narh, guild regulation, and moral oversight."
    },
    "conceptRef": "concept.muhtesib"
  },
  {
    "id": "term.corn-laws",
    "tr": "Tahıl Yasaları",
    "en": "Corn Laws",
    "la": null,
    "ar": null,
    "category": [
      "policy",
      "critique"
    ],
    "definition": {
      "tr": "1815'te çıkarılan İngiliz tahıl ithalat vergisi; 1846'da iptal edilerek serbest ticaretin resmi zaferi.",
      "en": "British grain import tariff enacted in 1815; repealed in 1846, marking the official triumph of free trade."
    },
    "conceptRef": "concept.corn-laws"
  },
  {
    "id": "term.balta-limani",
    "tr": "Balta Limanı Anlaşması",
    "en": "Treaty of Baltalimanı",
    "la": null,
    "ar": null,
    "category": [
      "ottoman",
      "policy"
    ],
    "definition": {
      "tr": "1838'de Osmanlı ile İngiltere arasında imzalanan ticaret antlaşması; Osmanlı'yı serbest ticarete zorlayarak korumacı politikaları sona erdirdi.",
      "en": "1838 trade treaty between the Ottoman Empire and Britain; forced the Ottomans into free trade, ending protectionist policies."
    },
    "conceptRef": "concept.balta-limani"
  },
  {
    "id": "term.cash-crop",
    "tr": "Nakit Ürün (Ticari Ürün)",
    "en": "Cash Crop",
    "la": null,
    "ar": null,
    "category": [
      "colonial",
      "economic-concept"
    ],
    "definition": {
      "tr": "Sömürge plantasyonlarında yetiştirilen ve satış için üretilen ürünler; şeker, tütün, pamuk, kahve.",
      "en": "Crops grown on colonial plantations for sale rather than subsistence; sugar, tobacco, cotton, coffee."
    },
    "conceptRef": "concept.cash-crop"
  },
  {
    "id": "term.labour-value",
    "tr": "Emek-Değer Teorisi",
    "en": "Labor Theory of Value",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept"
    ],
    "definition": {
      "tr": "Bir malın değerinin üretimine harcanan emekle belirlendiği görüşü; Petty'nin tohumu ('emek babadır, toprak anadır'); Smith ve Ricardo'da gelişti.",
      "en": "View that a good's value is determined by the labor invested in its production; seeded by Petty ('labor is the father, land the mother'); developed by Smith and Ricardo."
    },
    "conceptRef": "concept.labour-value"
  },
  {
    "id": "term.yamaklik",
    "tr": "Yamaklık",
    "en": "Yamaklık (Guild Apprenticeship)",
    "la": null,
    "ar": null,
    "category": [
      "ottoman",
      "economic-concept"
    ],
    "definition": {
      "tr": "Osmanlı lonca sisteminde çıraklık ve kalfalığın birleşimi; ustadan öğrenme ve gedik kazanma süreci.",
      "en": "Combined apprenticeship and journeyman stage in the Ottoman guild system; learning from a master and earning a gedik."
    },
    "conceptRef": "concept.yamaklik"
  },
  {
    "id": "term.serra-treatise",
    "tr": "Breve Trattato (Serra)",
    "en": "Breve Trattato (Serra's Treatise)",
    "la": "Breve trattato delle cause che possono far abbondare li regni d'oro e d'argento dove non sono miniere",
    "ar": null,
    "category": [
      "classic-mercantilist"
    ],
    "definition": {
      "tr": "Antonio Serra'nın 1613 Napoli eseri; ilk sistematik merkantilist yazım; sanayi vs tarım, ölçek getirileri, ticaret dengesi teorisi.",
      "en": "Antonio Serra's 1613 Neapolitan work; first systematic mercantilist treatise; industry vs agriculture, returns to scale, balance of trade theory."
    },
    "conceptRef": "concept.serra"
  },
  {
    "id": "term.mukaddime",
    "tr": "Mukaddime",
    "en": "Muqaddimah (Prolegomena)",
    "la": null,
    "ar": "المقدمة",
    "category": [
      "pre-mercantilist"
    ],
    "definition": {
      "tr": "İbn Haldun'un 1377'de tamamladığı evrensel tarih eserinin giriş bölümü; iktisat, sosyoloji ve tarih felsefesinin kurucu metni.",
      "en": "Ibn Khaldun's 1377 introduction to his universal history; founding text of economics, sociology, and philosophy of history."
    },
    "conceptRef": "concept.ibn-haldun"
  },
  {
    "id": "term.wealth-of-nations",
    "tr": "Milletlerin Zenginliği",
    "en": "The Wealth of Nations",
    "la": "An Inquiry into the Nature and Causes of the Wealth of Nations",
    "ar": null,
    "category": [
      "critique"
    ],
    "definition": {
      "tr": "Adam Smith'in 1776 eseri; Kitap IV'te merkantilist sistemi sistematik olarak reddetti; serbest ticaretin manifestosu.",
      "en": "Adam Smith's 1776 work; Book IV systematically rejected the mercantilist system; manifesto of free trade."
    },
    "conceptRef": "concept.smith"
  },
  {
    "id": "term.kicking-away-ladder",
    "tr": "Merdiveni Tekmelemek",
    "en": "Kicking Away the Ladder",
    "la": null,
    "ar": null,
    "category": [
      "modern-historiography"
    ],
    "definition": {
      "tr": "Ha-Joon Chang'un tezi: zengin ülkeler korumacılıkla zenginleşti, sonra gelişmekte olan ülkelere serbest ticaret dayattı.",
      "en": "Ha-Joon Chang's thesis: rich countries developed through protectionism, then imposed free trade on developing nations."
    },
    "conceptRef": "concept.chang"
  },
  {
    "id": "term.infant-industry",
    "tr": "Bebek Sanayi Argümanı",
    "en": "Infant Industry Argument",
    "la": null,
    "ar": null,
    "category": [
      "economic-concept",
      "modern-historiography"
    ],
    "definition": {
      "tr": "Gelişmekte olan sanayilerin geçici korumaya ihtiyacı olduğu tezi; Hamilton (1791) ve List (1841); merkantilist mirasın devamı.",
      "en": "Thesis that developing industries need temporary protection; Hamilton (1791) and List (1841); continuation of the mercantilist legacy."
    },
    "conceptRef": "concept.infant-industry"
  },
  {
    "id": "term.deindustrialization",
    "tr": "Sanayisizleşme (Deindüstryalizasyon)",
    "en": "Deindustrialization",
    "la": null,
    "ar": null,
    "category": [
      "colonial",
      "economic-concept"
    ],
    "definition": {
      "tr": "Calico Yasaları sonucu Hindistan'daki el dokumacılığının çöküşü; sömürgeci politikaların yerel sanayiyi yok etmesi.",
      "en": "Collapse of Indian handloom weaving due to the Calico Acts; colonial policies destroying local industry."
    },
    "conceptRef": "concept.deindustrialization"
  },
  {
    "id": "term.cbam",
    "tr": "Karbon Sınır Vergisi",
    "en": "Carbon Border Adjustment Mechanism (CBAM)",
    "la": null,
    "ar": null,
    "category": [
      "modern-historiography",
      "policy"
    ],
    "definition": {
      "tr": "AB'nin 2023'ten itibaren uyguladığı karbon kaçağını engelleme görünümünde sanayi koruması; yeşil neo-merkantilizm.",
      "en": "EU mechanism from 2023 to prevent carbon leakage while protecting industry; green neo-mercantilism."
    },
    "conceptRef": "concept.cbam"
  },
  {
    "id": "term.reshoring",
    "tr": "Yeniden Yurtiçi Üretim (Reshoring)",
    "en": "Reshoring",
    "la": null,
    "ar": null,
    "category": [
      "modern-historiography",
      "policy"
    ],
    "definition": {
      "tr": "ABD'nin IRA ve CHIPS Act ile yarı iletken ve yeşil enerji üretimini yurtiçine çekmesi; Hamilton'un Report on Manufactures'ına bilinçli atıf.",
      "en": "US bringing semiconductor and green energy production home via IRA and CHIPS Act; conscious echo of Hamilton's Report on Manufactures."
    },
    "conceptRef": "concept.reshoring"
  },
  {
    "id": "term.asafname",
    "tr": "Âsafnâme",
    "en": "Asafname (Book of the Vizier)",
    "la": null,
    "ar": null,
    "category": [
      "ottoman"
    ],
    "definition": {
      "tr": "Lütfi Paşa'nın eseri; ideal vezir el kitabı; mali disiplin ve devlet yönetimi önerileri.",
      "en": "Lütfi Paşa's work; handbook for the ideal vizier; proposals on fiscal discipline and state governance."
    },
    "conceptRef": "concept.lutfi-pasa"
  },
  {
    "id": "term.koci-bey-risalesi",
    "tr": "Koçi Bey Risalesi",
    "en": "Koçi Bey's Treatise",
    "la": null,
    "ar": null,
    "category": [
      "ottoman"
    ],
    "definition": {
      "tr": "Koçi Bey'in IV. Murad'a (1631) ve İbrahim'e (1640) sunduğu risaleler; devletin gerilemesinin yapısal analizi.",
      "en": "Koçi Bey's treatises to Murad IV (1631) and Ibrahim (1640); structural analysis of the state's decline."
    },
    "conceptRef": "concept.koci-bey"
  },
  {
    "id": "term.naima-cycle",
    "tr": "Naima'nın 5 Evre Teorisi",
    "en": "Naima's Five-Stage Theory",
    "la": null,
    "ar": null,
    "category": [
      "ottoman"
    ],
    "definition": {
      "tr": "Naima'nın İbn Haldun'cu devlet döngüsünü Osmanlı tarihine uygulaması; devletin 5 evresi: kuruluş, yükseliş, duraklama, gerileme, çöküş.",
      "en": "Naima's application of Ibn Khaldun's state cycle to Ottoman history; five stages: foundation, rise, stagnation, decline, collapse."
    },
    "conceptRef": "concept.naima"
  },
  {
    "id": "term.salamanca-school",
    "tr": "Salamanca Okulu",
    "en": "School of Salamanca",
    "la": null,
    "ar": null,
    "category": [
      "pre-mercantilist"
    ],
    "definition": {
      "tr": "16. yy İspanya'sında geç skolastik düşünce okulu; para miktar teorisi, değer subjektivizmi ve adil fiyat tartışmaları.",
      "en": "Late scholastic school in 16th-century Spain; quantity theory of money, value subjectivism, and just price debates."
    },
    "conceptRef": "concept.salamanca"
  },
  {
    "id": "term.tableau-economique",
    "tr": "Ekonomik Tablo",
    "en": "Tableau Économique",
    "la": "Tableau Économique",
    "ar": null,
    "category": [
      "critique",
      "economic-concept"
    ],
    "definition": {
      "tr": "Quesnay'nin 1758 eseri; ekonomik dolaşımın ilk görsel modeli; fizyokrat düşüncenin temel metni.",
      "en": "Quesnay's 1758 work; first visual model of economic circulation; foundational text of physiocratic thought."
    },
    "conceptRef": "concept.quesnay"
  },
  {
    "id": "term.sugar-act",
    "tr": "Şeker Yasası",
    "en": "Sugar Act (1764)",
    "la": null,
    "ar": null,
    "category": [
      "policy"
    ],
    "definition": {
      "tr": "1764'te çıkarılan İngiliz yasa; sömürge şeker ithalatına gümrük; Amerikan kolonistlerinin öfkesinin tetikleyicilerinden.",
      "en": "1764 British act imposing duties on colonial sugar imports; one of the triggers of American colonial anger."
    },
    "conceptRef": "concept.sugar-act"
  },
  {
    "id": "term.molasses-act",
    "tr": "Melas Yasası",
    "en": "Molasses Act (1733)",
    "la": null,
    "ar": null,
    "category": [
      "policy"
    ],
    "definition": {
      "tr": "1733'te çıkarılan İngiliz yasa; Fransız ve Hollanda sömürgelerinden melas ithalatına yüksek gümrük.",
      "en": "1733 British act imposing high duties on molasses imported from French and Dutch colonies."
    },
    "conceptRef": "concept.molasses-act"
  },
  {
    "id": "term.code-noir",
    "tr": "Siyah Kanun (Code Noir)",
    "en": "Code Noir",
    "la": "Code Noir",
    "ar": null,
    "category": [
      "colonial",
      "policy"
    ],
    "definition": {
      "tr": "Colbert'in hazırladığı 1685 kölelik kodu; Fransız sömürgelerinde kölelerin statüsünü düzenledi.",
      "en": "Colbert's 1685 slave code; regulated the status of enslaved people in French colonies."
    },
    "conceptRef": "concept.code-noir"
  },
  {
    "id": "term.cotton-empire",
    "tr": "Pamuk İmparatorluğu",
    "en": "Empire of Cotton",
    "la": null,
    "ar": null,
    "category": [
      "colonial",
      "modern-historiography"
    ],
    "definition": {
      "tr": "Sven Beckert'in 2014 eseri; pamuk üretiminin küresel kapitalizmi nasıl şekillendirdiği; merkantilist sömürge düzeninin devamı.",
      "en": "Sven Beckert's 2014 work; how cotton production shaped global capitalism; continuation of the mercantilist colonial order."
    },
    "conceptRef": "concept.beckert"
  }
];
  Array.prototype.push.apply(F.terminology, _terminology);

  console.log('[fragment:terminology-dict] registered', 'terminology:', _terminology.length);
})();
