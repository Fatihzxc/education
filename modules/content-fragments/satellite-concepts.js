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
      lens: {
        root: `Tek kişinin yapamayacağı karmaşık üretim, birçok insanın uzmanlaşmış emeğini bir araya getirince mümkün hale gelir.`,
        dominant: `Smith ve klasik iktisat için iş bölümü, verimlilik artışının en açık mekanizmasıdır: beceri artar, zaman kaybı azalır, alet gelişir.`,
        counter: `Marx ve Durkheim çizgisi, aynı uzmanlaşmanın insanı yaptığı işin bütününden koparıp yabancılaştırabileceğini söyler.`,
        publicEye: `İşçi için uzmanlaşma düzenli gelir ve beceri olabilir; ama aynı zamanda tekdüze iş, fabrika disiplini ve kendi emeğine uzaklaşma da olabilir.`,
        control: `Verimlilik artışı kimin hayatını kolaylaştırıyor, kimin işini daha dar ve daha bağımlı hale getiriyor?`
      },
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
      lens: {
        root: `Devlet gelir ararken üreticiyi fazla sıkarsa, vergi oranı yükselse bile üretim ve toplam gelir daralabilir.`,
        dominant: `İbn Haldun'un bakışı, vergiyle üretme isteği arasındaki bağı görür; devletin gücü toplumun canlılığını boğmamalıdır.`,
        counter: `Modern maliye okuması, her vergi artışının otomatik çöküş getirmediğini; kamu hizmeti, güven ve adaletin sonucu değiştirdiğini hatırlatır.`,
        publicEye: `Köylü, esnaf ve ücretli için bu döngü soyut eğri değil; çalışmanın karşılığını alıp alamama ve vergi memuruyla karşılaşma meselesidir.`,
        control: `Vergi yükü kamu düzeni ve hizmet üretiyor mu, yoksa üretme isteğini kıran çıplak tahsilata mı dönüşüyor?`
      },
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
      lens: {
        root: `Devlet yalnız kurumlarla değil, insanları birlikte hareket ettiren dayanışma ve güven duygusuyla da kurulur.`,
        dominant: `İbn Haldun için asabiyye, siyasal gücün yakıtıdır; grup dayanışması güçlü olduğunda fetih ve devlet kurma mümkün olur.`,
        counter: `Modern karşı okuma, bu döngünün şehir, hukuk, ticaret ve bireysel hakların dönüştürücü gücünü fazla ikincil gösterebileceğini söyler.`,
        publicEye: `Bir topluluk için asabiyye güven ve aidiyet demektir; dışarıda kalan içinse dışlanma, zor ve hiyerarşi anlamına gelebilir.`,
        control: `Dayanışma ne zaman ortak güç üretir, ne zaman dışarıdakini susturan kapalı bir sadakate dönüşür?`
      },
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
      lens: {
        root: `Ticari toplum büyüdükçe lüks tüketimin ahlaki çürüme mi yoksa iş ve talep kaynağı mı olduğu tartışmalı hale geldi.`,
        dominant: `Mandeville-Hume-Smith hattı, arzunun ve tüketimin üretimi canlandırabileceğini; toplum sonuçlarının niyetlerden farklı olabileceğini gösterir.`,
        counter: `Rousseau ve erdemci okuma, lüksün eşitsizlik, kıskançlık, borç ve kamusal ahlak kaybı doğurabileceğini savunur.`,
        publicEye: `Zanaatkâr için lüks talebi iş, yoksul için dışlanma duygusu, elit için statü ve devlet için vergi tabanı olabilir.`,
        control: `Bir harcama istihdam yaratıyor diye toplumsal olarak iyi midir, yoksa nasıl bir arzu ve eşitsizlik düzeni kurduğuna da bakmalı mıyız?`
      },
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
      lens: {
        root: `Savaş ve hazine baskısı arttığında devlet, paranın içeriğini azaltarak kısa vadeli kaynak yaratmaya yöneldi.`,
        dominant: `Mali devlet için tağşiş, zor zamanda nakit açığını kapatan pratik bir araç gibi görünebilir.`,
        counter: `Pamuk ve para tarihi okuması, bu çözümün fiyatlara, ücretlere ve güvene yayılan uzun vadeli maliyetini görünür kılar.`,
        publicEye: `Asker için maaşın alım gücü, esnaf için fiyat istikrarı, hane için pazar sepeti doğrudan etkilenir.`,
        control: `Hazineyi rahatlatan para müdahalesi halkın güvenini ve alım gücünü eritiyorsa gerçekten çözüm sayılır mı?`
      },
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
      lens: {
        root: `Amerika gümüşü, nüfus artışı, savaş finansmanı ve arz baskıları birleşince Avrupa fiyatları uzun süreli yükselişe geçti.`,
        dominant: `Para teorisi açısından fiyat devrimi, para arzı ile fiyat düzeyi arasındaki bağı görünür kılan büyük tarihsel laboratuvardır.`,
        counter: `Modern revizyon, her şeyi gümüşe bağlamanın eksik olduğunu; nüfus, iklim, savaş ve kurumların birlikte çalıştığını söyler.`,
        publicEye: `Halk için fiyat devrimi teori değil, ekmek, kira, ücret ve vergi arasında sıkışan gündelik geçim hesabıdır.`,
        control: `Fiyat artışını tek nedenle açıklamak kolaydır; peki hangi bölgede hangi mekanizma daha belirleyiciydi?`
      },
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
    { id: `evt-1623-misselden-circle-commerce`, year: 1623, country: `İngiltere`, title: `Misselden - Circle of Commerce`, lens: { root: `Tek tek para çıkışlarını zarar sayan eski külçeci bakış, uzak ticaretin dairesel kazanç mantığını açıklamakta yetersiz kalıyordu.`, dominant: `Misselden için ticaret, para, mal ve yeniden ihracatın aynı döngü içinde hesaplanması gereken geniş bir akıştır.`, counter: `Malynes çizgisi para çıkışını tehlike görür; Smithçi çizgi ise ticaret fazlası hedefinin kendisini refah için yanlış pusula sayar.`, publicEye: `Şirket tüccarı için esneklik, tüketici için yeni mal, yerli üretici için rekabet, devlet için dış hesap yönetimi anlamına gelir.`, control: `Bu argüman genel refahı mı açıklıyor, yoksa İngiliz tüccarının daha geniş hareket alanını mı ulusal çıkar diliyle savunuyor?` }, summary: { intro: `Misselden, ticareti tek yönlü para çıkışı değil, mal, ödeme ve yeniden ihracat akışı olarak düşünür.`, intermediate: `Bu metnin temel katkısı, ticareti dairesel bir hareket gibi görmesidir. Bir ülke bazen para öder, mal alır, o malı işler veya başka pazara satar, sonunda daha geniş bir kazanç elde eder. Böyle düşününce "para dışarı çıktı, ülke fakirleşti" yargısı fazla acele görünür.`, advanced: `Karşı okuma, Misselden'in de ulusal çıkar ve tüccar çıkarı içinden konuştuğunu hatırlatır. Onun daha esnek ticaret dengesi fikri kaba bullionizmi aşar; ama bu fikir aynı zamanda İngiliz tacirlerinin daha geniş hareket alanı istemesine hizmet eder. İyi okuma, teorik ilerlemeyi ve çıkar konumunu birlikte görür.` }, conceptRefs: [`edward-misselden`, `balance-of-trade`] },
    { id: `evt-1667-colbert-tariff`, year: 1667, country: `Fransa`, title: `Colbert 1667 Tarife`, lens: { root: `Fransa yerli imalatını büyütmek ve Hollanda-İngiliz rekabetini yavaşlatmak için dış malların kapı eşiğini yükseltti.`, dominant: `Colbertçi bakış için tarife yalnız vergi değil, sanayi öğrenmesine zaman kazandıran bir devlet aracıdır.`, counter: `Tüketici, kaçakçı ve serbest ticaret savunucusu için aynı tarife pahalı mal, sert denetim ve diplomatik gerilim doğurabilir.`, publicEye: `Yerli üretici nefes alabilir; hane daha pahalı mal alabilir; tüccar ticaret yolunu değiştirmek zorunda kalabilir.`, control: `Koruma gerçekten üretim kapasitesi kuruyor mu, yoksa fiyatı artırıp ayrıcalıklı üreticiyi mi rahatlatıyor?` }, summary: { intro: `Colbert'in 1667 tarifesi, Fransız sanayisini Hollanda ve İngiliz rekabetine karşı daha sert biçimde korumaya çalışır.`, intermediate: `Burada basit mantık şudur: Fransa lüks ve stratejik imalatı kendi içinde büyütmek ister; dış mallar pahalılaşırsa yerli üretici nefes alır. Tarife, yalnız vergi değil, sanayi seçme ve yön verme aracıdır.`, advanced: `Karşı okuma tüketici ve dış politika tarafından gelir. Koruma yerli sanayiyi büyütebilir; ama fiyatları artırabilir, kaçakçılığı teşvik edebilir ve rakip devletlerle gerilimi tırmandırabilir. Colbertizm bu yüzden kalkınmacı devlet aklının hem üretken hem çatışmalı yüzüdür.` }, conceptRefs: [`jean-baptiste-colbert`, `protectionism`] },
    { id: `evt-1698-davenant-publick-revenues`, year: 1698, country: `İngiltere`, title: `Davenant - Discourses on the Publick Revenues`, lens: { root: `Savaş ve kamu borcu büyüdükçe devlet gelirini sezgiyle değil, ticaret, nüfus ve vergi hesabıyla yönetmek zorunda kaldı.`, dominant: `Davenant'ın bakışı mali devleti sayılarla güçlendirir; gelir, ticaret ve savaş kapasitesi aynı defterde okunmalıdır.`, counter: `Karşı okuma, istatistiğin toplumu yalnız daha iyi anlamakla kalmayıp daha kolay vergilenebilir ve yönetilebilir hale getirdiğini söyler.`, publicEye: `Halk bunu gümrük fiyatı, tüketim vergisi, savaş masrafı ve kayıt altına alınma olarak hissedebilir.`, control: `Devletin daha iyi sayması toplumun yararına mı, yoksa daha etkili tahsilat ve savaş finansmanı için mi kullanılıyor?` }, summary: { intro: `Davenant, devlet gelirlerini ticaret, nüfus ve istatistikle birlikte okuyarak mali devlet aklını güçlendirir.`, intermediate: `Devlet gelirini anlamak için yalnız kasaya giren paraya bakmak yetmez. Vergi tabanı, ticaret hacmi, ithalat-ihracat, nüfus ve savaş maliyeti birlikte düşünülür. Davenant bu yüzden Petty'nin politik aritmetik geleneğini sürdürür: devleti sayılarla kendini tanımaya çağırır.`, advanced: `Karşı okuma, sayıların iktidarını sorar. İstatistik devletin kör noktalarını azaltır; ama toplumu daha kolay vergilenebilir, sınıflandırılabilir ve yönetilebilir hale de getirir. Davenant'ın önemi, modern mali devletin bilgiyle nasıl beslendiğini göstermesidir.` }, conceptRefs: [`charles-davenant`, `public-credit`] }
  ];

  Array.prototype.push.apply(F.concepts, concepts);
  Array.prototype.push.apply(F.events, events);
  console.log('[fragment:satellite-concepts] registered concepts:', concepts.length, 'events:', events.length);
})();
