// satellite-concepts.js — Yan kavramlar (orphan ref'leri kapatmak için stub'lar)
// Author: opus
// Diğer concept'lerin related[] listelerinden referans alınan ama henüz tam yazılmamış
// satellite kavramları. Compact intro + intermediate, advanced ileride genişletilebilir.

(function() {
  'use strict';
  const F = window.MerkantilizmFragments = window.MerkantilizmFragments || {
    concepts: [], events: [], cases: [], quizzes: [],
    modernLinks: [], sources: [], terminology: [], conceptGroups: {}
  };

  const concepts = [
    {
      id: `is-bolumu`,
      label: `İş Bölümü (Division of Labor)`,
      category: `karsit`,
      era: `14-19. yüzyıl`,
      depth: {
        intro: `Üretim sürecinin farklı kişiler arasında uzmanlaşmış aşamalara ayrılması; klasik iktisadın verimlilik ilkesi.`,
        intermediate: `İbn Haldun *Mukaddime* 5. fasıl: "Bir kişinin kendi başına buğday üretmesi zorken, birçok kişinin işbirliğiyle bu kolay olur." Smith *Wealth of Nations* açılışı: iğne fabrikası analojisi (10 işçi günde 48,000 iğne; tek başına 20 zar zor). İş bölümü pazar büyüklüğüyle sınırlıdır (Smith) ve uzmanlaşmayla birlikte alet (sermaye) gelişimine zemin hazırlar.`,
        advanced: `Modern eleştiri (Marx, Durkheim): iş bölümü verimlilik kazandırırken yabancılaşma (alienation) ve toplumsal parçalanma üretir. Adam Smith bile *Wealth of Nations*'da bu maliyeti kabul etmiştir.`
      },
      related: [{ to: `ibn-haldun`, type: `tarihsel-öncel` }, { to: `adam-smith`, type: `etkiler` }],
      sourceRefs: [], events: []
    },
    {
      id: `vergi-devlet-dongusu`,
      label: `Vergi-Devlet Döngüsü (Laffer Öncülü)`,
      category: `pre-mercantilist`,
      era: `14-21. yüzyıl`,
      depth: {
        intro: `İbn Haldun'un *Mukaddime* 3. kitap 38-39. fasıllarında formüle ettiği döngü: vergi oranı arttıkça vergi tabanı daralır, toplam gelir azalır.`,
        intermediate: `İbn Haldun: "Hânedanın başlangıcında vergiler az olur ve gelir bol olur; sonunda vergiler çok olur ve gelir az olur." Bu modern Laffer eğrisinin (1974) 600 yıl öncülüdür. Mantık: yüksek vergi → üretim caydırıcı → ekonomik aktivite daralır → vergi tabanı azalır → toplam gelir düşer.`,
        advanced: `Modern iktisat tarihinde "Laffer eğrisi" Arthur Laffer'in 1974 napkin sketch'i ile tanınır, ancak İbn Haldun (1377) net şekilde formüle etmişti. Reagan dönemi vergi indirimleri (1981, 1986) Laffer mantığıyla savundu; pratik sonuçlar tartışmalıdır. Mehmet Genç çerçevesinde Osmanlı fiskalizminin sürekli vergi artırma eğilimi İbn Haldun'cu çöküş yolunu kanıtladı.`
      },
      related: [{ to: `ibn-haldun`, type: `araç-amaç` }, { to: `fiskalizm`, type: `paralel` }],
      sourceRefs: [], events: [`evt-1377-mukaddime`]
    },
    {
      id: `asabiyye`,
      label: `Asabiyye (Grup Dayanışması)`,
      category: `pre-mercantilist`,
      era: `14. yüzyıl`,
      depth: {
        intro: `İbn Haldun'un Mukaddime'sinin merkez kavramı: bir grubu birleştiren ve onun politik-askeri güç kullanmasını mümkün kılan dayanışma duygusu.`,
        intermediate: `Asabiyye İbn Haldun'a göre devlet kuruluşunun motorudur — güçlü asabiyyeye sahip bir grup (genelde göçebe) yerleşik medeniyetin "üzerine düşer" ve onu fetheder. Ancak şehir hayatı, lüks ve refah asabiyyeyi eritir (4-5 kuşakta), yeni bir göçebe gücün gelmesini mümkün kılan boşluk yaratır. Bu döngü Naima tarafından Osmanlı'ya uygulanmıştır (5-evre teorisi).`,
        advanced: `Modern okuma: Ernest Gellner *Muslim Society* (1981) asabiyyeyi İslâm devletinin temel kurumsal mantığı sayar; Patricia Crone bu çerçevenin tarihsel sınırını sorgular. İktisadi etkisi: asabiyye-temelli devlet çöküşü periyodik olarak sermaye birikimini sıfırlar, uzun vadeli kapitalist birikimi engeller.`
      },
      related: [{ to: `ibn-haldun`, type: `etkiler` }, { to: `naima`, type: `paralel` }],
      sourceRefs: [], events: []
    },
    {
      id: `luxury-debate`,
      label: `Lüks Tartışması (Luxury Debate)`,
      category: `pre-mercantilist`,
      era: `17-18. yüzyıl`,
      depth: {
        intro: `17-18. yy Avrupa düşüncesinde "lüks tüketim ekonomi için iyi mi, kötü mü?" tartışması. Mandeville, Hume, Smith, Rousseau farklı pozisyonlar aldı.`,
        intermediate: `**Lüks karşıtı** (geleneksel ahlâkçılar, Rousseau): lüks ahlâki çöküş, eşitsizlik ve israf üretir; cumhuriyet erdeminin düşmanı. **Lüks savunucusu** (Mandeville *Fable of the Bees* 1714, sonra Smith): özel lüks tüketim toplam talebi besler, üretim ve istihdam yaratır — "özel kötülük = kamu yararı". Smith'in dengeli pozisyonu: lüks tüketim üretkense iyi, israf ise kötü.`,
        advanced: `Lüks tartışması modern Keynesyen makro talep teorisinin entelektüel öncülüdür. Veblen *The Theory of the Leisure Class* (1899) lüks tüketimi statü işareti (conspicuous consumption) olarak yeniden çerçeveler.`
      },
      related: [{ to: `bernard-de-mandeville`, type: `araç-amaç` }, { to: `adam-smith`, type: `karşıt-tez` }, { to: `david-hume`, type: `paralel` }],
      sourceRefs: [], events: []
    },
    {
      id: `akce-devaluasyon`,
      label: `Akçe Devalüasyonu`,
      category: `ottoman-policy`,
      era: `15-19. yüzyıl`,
      depth: {
        intro: `Osmanlı para birimi akçenin gümüş içeriğinin zaman içinde sistematik azaltılması; mali kriz dönemlerinin başlıca devlet aracı.`,
        intermediate: `Şevket Pamuk *Osmanlı'da Paranın Tarihi*: akçe 1469'da 1.2 gram gümüş içerirken 1914'te 0.001 gram. Büyük tağşiş dalgaları: 1585-1640 (genel kriz dönemi), 1690-1700 (Karlofça sonrası), 1789-1844 (modernleşme baskısı). Tağşiş kısa vadede hazineye nakit sağlar ama uzun vadede enflasyon, halk hoşnutsuzluğu (Celali İsyanları), ekonomik istikrarsızlık üretir.`,
        advanced: `Akçe tağşişi Genç'in fiskalizm çerçevesinin para politikası boyutudur — devlet mali ihtiyacı para arzı yönetiminin önüne geçer. Modern paralel: Türkiye'de 1970-2000 yüksek enflasyon dönemleri, 2018+ TL devalüasyonu fiskal baskının para sonuçları.`
      },
      related: [{ to: `sevket-pamuk`, type: `etkiler` }, { to: `fiskalizm`, type: `araç-amaç` }, { to: `fiyat-devrimi`, type: `paralel` }],
      sourceRefs: [], events: []
    },
    {
      id: `fiyat-devrimi`,
      label: `Fiyat Devrimi (Price Revolution)`,
      category: `policy`,
      era: `16-17. yüzyıl`,
      depth: {
        intro: `1500-1650 arası Avrupa'da yaşanan büyük fiyat artışı (yaklaşık 4-6 katı); Amerika gümüş akışı + nüfus artışı + tarımsal verimlilik kaybı birleşik etkisi.`,
        intermediate: `Earl Hamilton *American Treasure and the Price Revolution* (1934) klasik analizi: Potosi'den gelen gümüş Avrupa para arzını şişirdi, fiyatlar arttı. Modern revizyon (Goldstone, Munro): bullion akışı tek değişken değil — nüfus baskısı + iklim koşulları + savaş finansmanı birlikte etkili. Salamanca okulu (Azpilcueta 1556) ve Bodin (1568) sürecin orta noktasında quantity theory ile açıkladı.`,
        advanced: `Şevket Pamuk Osmanlı'nın fiyat devrimine paralel maruz kaldığını belgeler — bullion İspanya'dan Akdeniz ticaretiyle Osmanlı'ya da yayıldı. Bu Osmanlı'nın "kapalı sistem" olmadığını, küresel para sisteminin parçası olduğunu gösterir.`
      },
      related: [{ to: `bullionism`, type: `tarihsel-öncel` }, { to: `salamanca-okulu`, type: `etkiler` }, { to: `sevket-pamuk`, type: `etkiler` }],
      sourceRefs: [], events: [`evt-1500-price-revolution`]
    }
  ];

  // Add the missing events too
  const events = [
    { id: `evt-1623-misselden-circle-commerce`, year: 1623, country: `İngiltere`, title: `Misselden - Circle of Commerce`, summary: { intro: `Misselden, ticareti tek yönlü para çıkışı değil, mal, ödeme ve yeniden ihracat akışı olarak düşünür.`, intermediate: `Bu metnin temel katkısı, ticareti dairesel bir hareket gibi görmesidir. Bir ülke bazen para öder, mal alır, o malı işler veya başka pazara satar, sonunda daha geniş bir kazanç elde eder. Böyle düşününce "para dışarı çıktı, ülke fakirleşti" yargısı fazla acele görünür.`, advanced: `Karşı okuma, Misselden'in de ulusal çıkar ve tüccar çıkarı içinden konuştuğunu hatırlatır. Onun daha esnek ticaret dengesi fikri kaba bullionizmi aşar; ama bu fikir aynı zamanda İngiliz tacirlerinin daha geniş hareket alanı istemesine hizmet eder. İyi okuma, teorik ilerlemeyi ve çıkar konumunu birlikte görür.` }, conceptRefs: [`edward-misselden`, `balance-of-trade`] },
    { id: `evt-1667-colbert-tariff`, year: 1667, country: `Fransa`, title: `Colbert 1667 Tarife`, summary: { intro: `Colbert'in 1667 tarifesi, Fransız sanayisini Hollanda ve İngiliz rekabetine karşı daha sert biçimde korumaya çalışır.`, intermediate: `Burada basit mantık şudur: Fransa lüks ve stratejik imalatı kendi içinde büyütmek ister; dış mallar pahalılaşırsa yerli üretici nefes alır. Tarife, yalnız vergi değil, sanayi seçme ve yön verme aracıdır.`, advanced: `Karşı okuma tüketici ve dış politika tarafından gelir. Koruma yerli sanayiyi büyütebilir; ama fiyatları artırabilir, kaçakçılığı teşvik edebilir ve rakip devletlerle gerilimi tırmandırabilir. Colbertizm bu yüzden kalkınmacı devlet aklının hem üretken hem çatışmalı yüzüdür.` }, conceptRefs: [`jean-baptiste-colbert`, `protectionism`] },
    { id: `evt-1698-davenant-publick-revenues`, year: 1698, country: `İngiltere`, title: `Davenant - Discourses on the Publick Revenues`, summary: { intro: `Davenant, devlet gelirlerini ticaret, nüfus ve istatistikle birlikte okuyarak mali devlet aklını güçlendirir.`, intermediate: `Devlet gelirini anlamak için yalnız kasaya giren paraya bakmak yetmez. Vergi tabanı, ticaret hacmi, ithalat-ihracat, nüfus ve savaş maliyeti birlikte düşünülür. Davenant bu yüzden Petty'nin politik aritmetik geleneğini sürdürür: devleti sayılarla kendini tanımaya çağırır.`, advanced: `Karşı okuma, sayıların iktidarını sorar. İstatistik devletin kör noktalarını azaltır; ama toplumu daha kolay vergilenebilir, sınıflandırılabilir ve yönetilebilir hale de getirir. Davenant'ın önemi, modern mali devletin bilgiyle nasıl beslendiğini göstermesidir.` }, conceptRefs: [`charles-davenant`, `public-credit`] }
  ];

  Array.prototype.push.apply(F.concepts, concepts);
  Array.prototype.push.apply(F.events, events);
  console.log('[fragment:satellite-concepts] registered concepts:', concepts.length, 'events:', events.length);
})();
