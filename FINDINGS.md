# FINDINGS

Tarih: 2026-06-02

Kapsam: Ana kitaplar, `tarih-atlasi` pane mini kitapları, tema kayıtları ve içerik plan/review belgeleri tarandı. Bu dosya düzeltme yapmaz; içerikteki mantık hatalarını, aşırı kesin iddiaları, tamamlanmamışlık izlerini ve editoryal eksikleri toplar.

Yöntem: Hedefli satır incelemesi, yapısal katman taraması, durum kayıtları karşılaştırması ve zamana duyarlı iki iddia için dış kaynak kontrolü. Dış kaynak kontrolü özellikle Çin sosyal kredi sistemi ve Piketty formülü için yapıldı.

Öncelik ölçütü:

- P1: Okura yanlış bilgi veren veya tamamlandı görünümünü bozan güçlü hata.
- P2: Anlatının mantığını zayıflatan, aşırı genelleyen veya kaynak gerektiren ciddi eksik.
- P3: Okuma kalitesini, izlenebilirliği veya proje standardını düşüren yapısal eksik.

## Çözüm Durumu (2026-06-02)

Not: Aşağıdaki maddeler tarihsel bulgu kaydı olarak korunuyor. Bu bölüm, her bulgunun hangi yönde kapatıldığını gösterir.

- [x] 1. Piketty formülü `r > g` olarak düzeltildi; `r` ve `g` sade biçimde açıklandı.
- [x] 2. Emek kitabındaki editör notu bitmiş Türkiye paragrafına çevrildi.
- [x] 3. Altı tamamlandı kitabın bölüm manifestleri `completed` durumuna hizalandı.
- [x] 4. Çin sosyal kredi sistemi tek ulusal puan anlatısından parçalı/idari çerçeve anlatısına çekildi.
- [x] 5. Dolar rezerv para iddiası nominal ödeme kapasitesi, reel maliyet ve siyasal sınırlar ayrımıyla yumuşatıldı.
- [x] 6. Salamanca-Menger bağı "öncül sezgi" ile "tam kuramsal eşdeğerlik" ayrımıyla düzeltildi.
- [x] 7. Washington Consensus ve şok tedavisi eleştirileri tek nedenli başarısızlık anlatısından çıkarıldı.
- [x] 8. Fizyokrasi/LVT sınıf-koalisyon okumaları indirgemeci olmayan biçimde yeniden dengelendi.
- [x] 9. GATT/WTO/AB/NAFTA çizgisi Smith-Ricardo'nun düz hukuk uygulaması gibi anlatılmayacak şekilde nüanslandı.
- [x] 10. Türkiye emek payı pasajı TÜİK gelir yöntemi verisi ve tarih damgasıyla güncellendi.
- [x] 11. LVT'nin modern kabulü "teknik savunulur ama siyasal olarak sınırlı" çerçevesine alındı.
- [x] 12. Para ve Emek kitaplarının bütün bölümlerine kaynak pusulası eklendi.
- [x] 13. Eski tamamlandı kitapların bütün bölümlerine okuma pusulası/bilgelik katmanı eklendi.
- [x] 14. Atlas pane mini kitaplarının bölümlerine mini kitap standardına uygun okuma pusulası eklendi.
- [x] 15. İktisat Haritası ve Tarih Atlası bölümlerine yön bulma/bilgelik pusulası eklendi.
- [x] 16. Osmanlı/Türkiye bağlantısı okuma pusulası içinde standart bir kontrol başlığına dönüştürüldü.
- [x] 17. Halkın/kamunun gözü katmanı bütün bölüm pusulalarında standartlaştırıldı.
- [x] 18. Sakızlı Ohannes ve Cavid Bey hattı ilk ders kitabı/kanonikleşme ayrımıyla düzeltildi.
- [x] 19. Sen'in demokrasi-kıtlık tezi mutlak "asla olmaz" formülünden kurumsal engel/nadirlik formülüne çekildi.
- [x] 20. Iron Law of Wages, Lassalle adlandırması ile Malthus-Ricardo geçimlik ücret mantığı ayrılarak düzeltildi.
- [x] 21. Anglo-Amerikan liberal mülkiyet geleneği Locke/Smith/Nozick farklarıyla nüanslandı.
- [x] 22. HIV ilaç fiyatları örneği erken 2000 HAART, Cipla/MSF 2001 ve jenerik 2002 verileriyle yeniden kuruldu.
- [x] 23. Reader artık dipnot tanımlarını görünür `Kaynakça` bölümü olarak render ediyor.
- [x] 24. Smith'in üretken emek anlayışı ticaret/servis ayrımını taşır hale getirildi.
- [x] 25. GDPR tablosunda UK GDPR/DPA 2018 ve KVKK 2024 değişiklikleri güncellendi.
- [x] 26. Westphalia anlatısı tekil doğum belgesi yerine kurucu sembol/uzun süreç olarak düzeltildi.
- [x] 27. Böhm-Bawerk'in Marx eleştirisi anlatıcının hükmü değil, Avusturya okulu pozisyonu olarak çerçevelendi.
- [x] 28. Ricardo-Waterloo anlatısı erken haber/tek gecelik servet iddiasından arşiv temelli daha ihtiyatlı anlatıya çekildi.
- [x] 29. Waitangi satırı `kāwanatanga`, `tino rangatiratanga` ve `taonga` ayrımını koruyacak şekilde düzeltildi.

## Yüksek Öncelik

### 1. [P1] Piketty formülü ters yazılmış

Kanıt: `deger/chapters/06-ricardo-emek-deger.md:176` Piketty tezini `g > r` olarak veriyor. Aynı repo içinde `klasik-iktisat/chapters/12-bugun-klasik-yankilar.md:23`, `klasik-iktisat/chapters/12-bugun-klasik-yankilar.md:25`, `iktisat-haritasi/chapters/04-catallanma-marx-arti-deger.md:60` ve `docs/superpowers/themes-roadmap-2026-05-24.md:281` doğru biçimi `r > g` olarak kullanıyor.

Dış kontrol: Piketty'nin AER makalesi de tartışmayı `r > g` rolü etrafında açıklar: <https://www.aeaweb.org/articles?id=10.1257/aer.p20151060>

Niye sorun: Bu tek harf değişimi tezin yönünü tersine çeviriyor. Piketty'de mesele büyümenin sermaye getirisini aşması değil, sermaye getirisinin büyümeyi aşmasıdır.

Düzeltme yönü: `g > r` ifadesi `r > g` yapılmalı. Aynı paragraf, `r` sermaye getirisi ve `g` büyüme oranı olarak sade biçimde yeniden açıklanmalı.

### 2. [P1] Tamamlandı görünen Emek kitabında editör notu kalmış

Kanıt: `emek-calisma/chapters/11-sendika-sosyal-devlet-guvencesizlik.md:53` şu editör cümlesiyle başlıyor: "Türkiye hattı da bu bölüme mutlaka eklenmelidir."

Niye sorun: `emek-calisma/chapters/_index.json` bütün bölümleri `completed` gösteriyor. Okur karşısına "eklenmelidir" diye çıkan bir cümle, bölümün tamamlanmış içerik değil, çalışma notu taşıdığını gösterir.

Düzeltme yönü: Cümle editör notu olmaktan çıkarılıp bitmiş paragrafa çevrilmelidir. 1936 İş Kanunu, 1960-70 sendikal örgütlenme, 1980 sonrası taşeronlaşma/kayıt dışılık hattı somut ve kaynaklı anlatılmalı.

### 3. [P1] Tema kayıtları ile bölüm manifestleri tamamlanma durumunda çelişiyor

Kanıt: `modules/theme-registry.js:32`, `:50`, `:68`, `:86`, `:104`, `:122` Merkantilizm, Fizyokrasi, Klasik İktisat, Değer, Mülkiyet ve Egemenlik kitaplarını `completed` gösteriyor. Buna karşılık ilgili manifestlerde bütün bölümler hâlâ `draft`: `merkantilizm/chapters/_index.json`, `fizyokrasi/chapters/_index.json`, `klasik-iktisat/chapters/_index.json`, `deger/chapters/_index.json`, `mulkiyet/chapters/_index.json`, `egemenlik/chapters/_index.json`.

Tarama sonucu: Bu altı kitapta 72 bölümün tamamı manifest düzeyinde `draft`; ana tema kaydında ise kitaplar tamamlanmış.

Niye sorun: Ana sayfa okura tamamlandı sinyali verirken, kitap içi veri taslak sinyali veriyor. Bu hem editoryal takibi bozar hem de ileride filtreleme, katalog ve roadmap davranışını yanlış etkileyebilir.

Düzeltme yönü: Gerçek editoryal duruma karar verilmeli. Kitaplar gerçekten tamamlandıysa manifestler `completed` yapılmalı; değilse registry'deki `completed` statüsü daha dürüst bir duruma çekilmeli.

## Ciddi İçerik Bulguları

### 4. [P2] Çin sosyal kredi sistemi pasajı fazla tekil ve fazla kesin

Kanıt: `egemenlik/chapters/11-weber-schmitt-foucault.md:126` Çin Sosyal Kredi Sistemi için "2020'lerde tam uygulama" diyor; finansal davranış, hukuki kayıt, sosyal etkileşim ve arkadaş çevresinin tek bir kredi puanına dönüştürüldüğünü anlatıyor. Aynı bölümde `egemenlik/chapters/11-weber-schmitt-foucault.md:116` pandemi `Health Code` altyapısının sosyal kredi sistemiyle entegre edildiğini söylüyor.

Dış kontrol: DigiChina/Stanford çevirisi 2014-2020 planını doğruluyor: <https://digichina.stanford.edu/work/planning-outline-for-the-construction-of-a-social-credit-system-2014-2020/>. Fakat MERICS 2021 raporu sistemin tek ve standart bir puan sistemi olmadığını, daha çok çok sayıda girişimden oluşan parçalı bir çerçeve olduğunu anlatıyor: <https://merics.org/en/report/chinas-social-credit-system-2021-fragmentation-towards-integration>. Vincent Brussee'nin 2024 değerlendirmesi de sistemin çoğunlukla puana dayanmadığını, parçalı ve eksik kaldığını söylüyor: <https://www.thechinastory.org/is-chinas-social-credit-system-as-we-know-it-dead/>

Niye sorun: Mevcut metin "Black Mirror tarzı tek ulusal vatandaş puanı" anlatısına fazla yaklaşıyor. Bu, Foucault bağlantısını kolaylaştırıyor ama tarihsel-idari gerçekliği düzleştiriyor.

Düzeltme yönü: Paragraf şöyle ayrıştırılmalı: 2014 planı gerçek; kara liste ve yaptırım mekanizmaları gerçek; bazı yerel puanlama pilotları ve özel platform skorları gerçek; ama tek, bütünleşik, herkese uygulanan, arkadaş çevresini resmi puana dönüştüren ulusal sistem anlatısı tartışmalı ve fazla genelleyici.

### 5. [P2] Dolar rezerv para iddiası "imkânsız" kelimesiyle fazla mutlak kurulmuş

Kanıt: `merkantilizm/chapters/12-bugun.md:48` ABD için Türkiye veya Arjantin tipi "yabancı para borç krizi"nin yapısal olarak imkânsız olduğunu ve ABD'nin dolar bastığı sürece dolar borcunu ödeyebileceğini söylüyor.

Niye sorun: Çekirdek sezgi doğru: ABD kendi para biriminde borçlandığı için klasik yabancı para likidite krizine çok daha az açıktır. Ama "imkânsız" ifadesi nominal ödeme kapasitesi ile reel maliyet, enflasyon, kur güveni, siyasi borç tavanı ve finansal istikrar risklerini birbirine karıştırıyor.

Düzeltme yönü: "Türkiye/Arjantin tipi yabancı para borç krizinden yapısal olarak farklıdır" denmeli. Ardından "nominal ödeme kapasitesi vardır, ama bunun reel ve siyasal sınırları vardır" diye nüans eklenmeli.

### 6. [P2] Salamanca ile Menger arasındaki bağ fazla eşdeğer kurulmuş

Kanıt: `deger/chapters/03-skolastik-fiyat.md:103` Salamanca düşünürlerini Menger 1871 marjinal fayda teorisinin üç yüzyıl önceki versiyonu gibi sunuyor. `deger/chapters/03-skolastik-fiyat.md:109` Menger'in Salamanca'nın sübjektif değer kavramını sıfırdan yeniden geliştirdiğini söylüyor. `deger/chapters/03-skolastik-fiyat.md:135` "marjinal devrim" yerine "marjinal yeniden-keşif" demenin daha doğru olacağını iddia ediyor.

Niye sorun: Salamanca, sübjektif değer ve piyasa talebi fikri için önemli bir öncül olabilir. Fakat bu, Menger'in marjinal analizini, malların sıralanmasını, nedensel değer teorisini ve Avusturya okulunun kuramsal aparatını bütünüyle öncelemiş demek değildir.

Düzeltme yönü: "öncül", "akraba sezgi" ve "tam kuramsal eşdeğerlik" ayrılmalı. Salamanca'nın katkısı büyütülmeden güçlü kalabilir: adil fiyatı talep, kıtlık ve ortak tahminle ilişkilendiren bir erken öznelci damar.

### 7. [P2] Washington Consensus başarısızlığı tek nedene fazla hızlı bağlanıyor

Kanıt: `merkantilizm/chapters/11-yeniden-okumalar.md:71` IMF/Dünya Bankası reçetelerinin "tarihsel olarak başarısız" olduğunu ve bunun reçetenin kalkınma anatomisini yanlış okumasından kaynaklandığını söylüyor. `klasik-iktisat/chapters/07-karsilastirmali-ustunluk-serbest-ticaret.md:38` şok tedavisi politikalarını Smith'in kademeli geçiş uyarısını ihmal etmenin sonucu gibi kuruyor.

Niye sorun: Bu eleştirel damar değerli, ama haliyle çok tek-nedenli. Latin Amerika, post-Sovyet alan ve Afrika deneyimleri borç yapısı, emtia döngüsü, devlet kapasitesi, savaş/siyasi istikrarsızlık, reform sırası ve dış finansman koşulları bakımından çok farklıdır.

Düzeltme yönü: "başarısız oldu çünkü tek neden buydu" çizgisi yerine "birçok örnekte ciddi toplumsal maliyet ve kırılganlık üretti; bunun nedenlerinden biri tarihsel devlet kapasitesi ve sanayileşme yolunu küçümsemesiydi" gibi daha sağlam bir formül kullanılmalı.

### 8. [P2] Fikirleri sınıf/koalisyon ihtiyacına bağlayan okuma yer yer indirgemeci oluyor

Kanıt: `fizyokrasi/chapters/06-produit-net-tek-vergi.md:87` Smith, Ricardo, Keynes ve Friedman'ı belirli sınıf yükselişlerinin kristalleşmesi olarak okuyor. `fizyokrasi/chapters/12-bugun-toprak-vergisi-ekoloji.md:73` Friedman ve Hayek'i ABD-İngiliz sermayesinin Bretton Woods, sendika ve sosyal devlet kısıtlarından kurtulma ihtiyacının kuramcıları diye anlatıyor. Aynı bölüm `:75` bu okumanın teorileri geçersiz kılmadığını ekleyerek riski kısmen azaltıyor.

Niye sorun: Kök sebep ve karşı okuma standardı için sınıf/koalisyon merceği çok güçlü. Ama bu mercek tek açıklama gibi durursa okur teorinin iç mantığını "çıkarın kılıfı" sanabilir. Bu da iyi eleştiriyi zayıf sinizme dönüştürür.

Düzeltme yönü: Her böyle pasajda kısa bir ayırıcı cümle olmalı: "Bu sosyolojik konumlandırma, argümanın doğruluğunu ya da yanlışlığını tek başına kanıtlamaz; sadece neden bu sorunun o anda görünür olduğunu açıklar."

### 9. [P2] GATT/WTO/AB/NAFTA çizgisi Smith-Ricardo'nun hukuk uygulaması gibi fazla doğrusal anlatılıyor

Kanıt: `klasik-iktisat/chapters/07-karsilastirmali-ustunluk-serbest-ticaret.md:150` GATT ve WTO'yu Smith-Ricardo teorisinin uluslararası hukuk biçimindeki uygulaması olarak tanımlıyor. `klasik-iktisat/chapters/12-bugun-klasik-yankilar.md:63` WTO çerçevesi ve modern ticaret teorilerini Ricardyen iskelete dayandırıyor.

Niye sorun: Ricardyen karşılaştırmalı üstünlük bu kurumların düşünsel arka planında vardır, ama kurumların tamamı bundan ibaret değildir. GATT/WTO mütekabiliyet, uyuşmazlık çözümü, jeopolitik pazarlık, hizmetler, fikri mülkiyet, tarım istisnaları ve kalkınma muafiyetleriyle karmaşık bir hukuk-politika alanıdır.

Düzeltme yönü: "Smith-Ricardo'nun doğrudan uygulaması" yerine "serbest ticaret idealinden beslenen, ama güç dengesi ve hukuk istisnalarıyla şekillenen kurumsal alan" denmeli.

### 10. [P2] Türkiye'de emek payı iddiası veri ve tarih damgası istiyor

Kanıt: `klasik-iktisat/chapters/12-bugun-klasik-yankilar.md:109` TÜİK ve TCMB verilerine göre Türkiye'de emek payının 2010'lardan itibaren ve özellikle 2018 sonrası düştüğünü söylüyor; bunu Piketty'nin küresel `r > g` eğiliminin Türk versiyonu olarak bağlıyor.

Niye sorun: Bu güncel ve ölçüm bağımlı bir iddia. Hangi seri, hangi yıl, işgücü ödemeleri/GSYH mi, ücretli emeğin payı mı, karma gelir nasıl ayrıştırıldı, bunlar belirtilmezse iddia doğru olsa bile denetlenemez. Ayrıca emek payı düşüşünü doğrudan `r > g` formülünün yerel versiyonu yapmak analitik olarak hızlı bir geçiştir.

Düzeltme yönü: TÜİK, TCMB, ILO veya OECD serisiyle yıl aralığı eklenmeli. Piketty bağlantısı "aynı şey" gibi değil, "bölüşüm merceği bakımından akraba bir sorun" gibi kurulmalı.

### 11. [P2] LVT'nin modern kabulü fazla rahat genelleniyor

Kanıt: `fizyokrasi/chapters/06-produit-net-tek-vergi.md:113` Land Value Tax'in ana akım iktisatta sağ-sol ayrımının ötesinde geniş kabul gördüğünü söylüyor. `fizyokrasi/chapters/12-bugun-toprak-vergisi-ekoloji.md:29` ve `:145` Friedman atfını güçlü bir modern kabul kanıtı gibi kullanıyor.

Niye sorun: Toprak değer vergisi teknik olarak güçlü bir vergi önerisidir; ama "geniş kabul" ile "politik uygulanabilirlik" aynı şey değildir. Ayrıca emlak vergisi, arazi değer vergisi ve iyileştirilmemiş toprak değeri vergisi ayrımı netleşmezse okur farklı vergi türlerini aynı sanabilir.

Düzeltme yönü: LVT'nin teknik çekiciliği korunmalı, fakat politik uygulama zorlukları, değerleme sorunu, yerel yönetim kapasitesi ve mülk sahibi direnci ayrıca belirtilmeli.

### 12. [P2] Para ve Emek kitaplarında kaynak izlenebilirliği zayıf

Kanıt: `para-borc-finans/chapters` ve `emek-calisma/chapters` altında `Kaynakça` veya dipnot kalıbı bulunmadı. Buna rağmen Para kitabı Solon, sikke, merkez bankası, 1929/1971/2008 krizleri, Osmanlı-Türkiye para hattı gibi çok sayıda tarihsel iddia taşıyor. Emek kitabı da Aristoteles, kölelik, zanaat, sanayi disiplini, Marx, Federici, sendika tarihi ve platform emeği gibi geniş bir hatta ilerliyor.

Niye sorun: Anlatılar sıcak ve anlaşılır, ama kaynak pusulası olmadan okur hangi tarihsel iddianın nereden geldiğini göremiyor. Bu özellikle "tamamlandı" statüsündeki iki yeni kitap için güvenilirlik açığı yaratır.

Düzeltme yönü: Her bölümün sonuna kısa "Kaynak pusulası" eklenmeli. Akademik aparat ağır olmak zorunda değil; 3-5 temel kaynak, veri serisi veya klasik metin yeterli olur.

## Yapısal ve Editoryal Eksikler

### 13. [P3] Eski tamamlandı kitaplarda yeni bilgelik katmanları görünür değil

Kanıt: Yapısal tarama, şu kitaplarda standart katman başlıklarının sistematik olarak görünmediğini gösterdi:

- `merkantilizm`: 12 bölümün 12'sinde `Kök sebep ve karşı okuma`, `Yanlış sezgi`, `Tarihsel sahne`, `Bilgelik sorusu`, `Bugüne bakan sonuç` görünür başlık olarak yok; 11 bölümde halk/kamu gözü katmanı yok.
- `fizyokrasi`: Aynı beş katman 12/12 eksik; halk/kamu gözü 10/12 eksik; Osmanlı/Türkiye yerel bağ 6/12 eksik.
- `klasik-iktisat`: Aynı beş katman 12/12 eksik; halk/kamu gözü 10/12 eksik; yerel bağ 5/12 eksik.
- `deger`: `Kök sebep ve karşı okuma` 11/12 eksik; diğer yeni bilgelik katmanları 12/12 eksik; halk/kamu gözü 12/12 eksik; yerel bağ 11/12 eksik.
- `mulkiyet`: Aynı beş katman 12/12 eksik; halk/kamu gözü 10/12 eksik.
- `egemenlik`: Aynı beş katman 12/12 eksik; halk/kamu gözü 11/12 eksik.

Niye sorun: AGENTS standardı sadece bilgi anlatmayı değil, fikri doğuran problem, baskın bakış, karşı fikir, halkta görünüm ve kontrol sorularını görünür kılmayı istiyor. Eski kitaplarda içerik çoğu zaman güçlü, ama yeni okuma standardı bölüm mimarisine eşit dağılmamış.

Düzeltme yönü: Bu kitaplara toptan yeniden yazım değil, her bölümün sonuna kısa bir "Okuma pusulası" ve "İleri düzey okuma" güçlendirmesi eklemek yeterli olabilir.

### 14. [P3] Atlas pane mini kitapları mini kitap standardına göre zayıf katmanlanmış

Kanıt: `tarih-atlasi/panes` altında altı pane var. Her birinde 7 bölüm bulunuyor. Yapısal tarama sonucu:

- `fizyokrasi`, `keynes`, `klasik`, `marjinalizm`, `marx`, `merkantilizm` pane'lerinde `Yanlış sezgi`, `Tarihsel sahne`, `Bilgelik sorusu`, `Bugüne bakan sonuç` 7/7 eksik.
- Aynı pane'lerde `Kök sebep ve karşı okuma` genellikle 6/7 eksik.
- Halk/kamu gözü katmanı pane'lerin çoğunda 3-5 bölümde eksik.
- Yerel Osmanlı/Türkiye bağlantısı `merkantilizm` dışında pane'lerin çoğunda 4-7 bölüm arası eksik.

Niye sorun: Pane'ler atlas içinde mini kitap işlevi görüyor. Sadece kısa bilgi bölümü gibi kalırlarsa atlasın "dönem, sınıf, halk gözü, karşı fikir" iddiası tam çalışmaz.

Düzeltme yönü: Her pane için en az 1 kapanış kartı eklenmeli: kök problem, baskın bakış, karşı okuma, halkta görünüm, bugüne bakan sonuç.

### 15. [P3] İktisat Haritası ve Tarih Atlası yön bulma kitapları da bilgelik katmanından kopuk

Kanıt: `iktisat-haritasi` 8 bölümün 8'inde yeni bilgelik katman başlıklarını taşımıyor. `tarih-atlasi` 12 bölümün 12'sinde `Kök sebep ve karşı okuma`, `Yanlış sezgi`, `Tarihsel sahne`, `Bilgelik sorusu`, `Bugüne bakan sonuç` görünür başlık olarak yok; 9 bölümde halk/kamu gözü eksik.

Niye sorun: Bu iki kitap proje için yön bulma masasıdır. Eğer ana harita kitaplarında bile kontrol soruları ve karşı okuma açık değilse, okur diğer kitapları hangi mercekle okuyacağını kaçırır.

Düzeltme yönü: Her bölümün sonunda kısa "Nasıl okumalı?" kutusu eklenmeli. Bu kutu bilgi tekrarı değil, okurun zihinsel pusulası olmalı.

### 16. [P3] Osmanlı/Türkiye yerel hattı eşit dağılmıyor

Kanıt: Yapısal taramada yerel bağ eksikleri özellikle `deger` 11/12, `para-borc-finans` 9/12, `emek-calisma` 9/12, `iktisat-haritasi` 7/8, atlas pane'lerinde ise çoğu yerde 4-7 bölüm arası çıktı.

Niye sorun: Projenin Türkçe okur için gücü, Avrupa merkezli kavramları yerel tarih ve gündelik hayatla ilişkilendirmesinden geliyor. Yerel hat bazı kitaplarda güçlü, bazı kitaplarda yok gibi durunca okur "bu kavram bana nerede değiyor?" sorusunu kaçırıyor.

Düzeltme yönü: Her kitapta zorunlu yerel bölüm şart değil; ama her ana temada en az birkaç bölümde Osmanlı/Türkiye bağlantısı görünür olmalı. Özellikle Para, Emek, Değer ve İktisat Haritası bu bağdan daha çok kazanır.

### 17. [P3] Halkın/kamunun gözü katmanı tamamlandı kitaplarda standartlaşmamış

Kanıt: Halk/kamu gözü katmanı `deger` 12/12, `egemenlik` 11/12, `merkantilizm` 11/12, `fizyokrasi` 10/12, `klasik-iktisat` 10/12 ve `mulkiyet` 10/12 bölümde görünür değil. Bu başlık bazı atlas pane'lerinde ayrıca var, ama bütün ana kitaplara taşınmamış.

Niye sorun: AGENTS standardı roman, gazete, halk anlatısı, gündelik hayat ve kamunun gözünü süs değil, dönemin nasıl hissedildiğini anlamak için kullanmayı istiyor. Bu katman eksik olunca anlatı teorik olarak zengin olsa bile halkın yaşadığı maliyet ve algı arkada kalıyor.

Düzeltme yönü: Her bölümde uzun bir sosyal tarih parçası gerekmiyor. Bazen bir gazete sesi, bir mahkeme kaydı, bir işçi/çiftçi/tüccar perspektifi veya kısa "halk bunu nasıl yaşadı?" paragrafı yeterli olur.

## İkinci Tur Bulguları

### 18. [P1] Osmanlı klasik iktisat bölümünde "ilk sistematik ders kitabı" iddiası kendi içinde çelişiyor

Kanıt: `klasik-iktisat/chapters/10-osmanli-tanzimat-iktisad.md:3` Türkçede ilk sistematik klasik politik ekonomi ders kitabını Mehmed Cavid Bey'in 1898 tarihli *İlm-i İktisad*'ı olarak veriyor. Aynı bölüm `klasik-iktisat/chapters/10-osmanli-tanzimat-iktisad.md:17` klasik politik ekonominin Türkçeye ilk sistematik girişini 1880'de Sakızlı Ohannes Paşa'nın *Mebadi-i İlm-i Servet-i Milel*'iyle başlatıyor. Dipnot `klasik-iktisat/chapters/10-osmanli-tanzimat-iktisad.md:151` de Ohannes Paşa metnini "Türkçedeki ilk sistematik klasik politik ekonomi el kitabı" diye tanımlıyor.

Niye sorun: Okur aynı bölüm içinde iki farklı "ilk" görüyor: 1880 Ohannes ve 1898 Cavid. Bu sadece tarih hatası değil; bölümün ana argümanı olan "122 yıllık gecikme" hesabını da bozuyor. Eğer ilk sistematik metin 1880 ise gecikme 104 yıl olur; Cavid için ayrı bir "sistemleştirme/ikinci kuşak" rolü tanımlanmalıdır.

Düzeltme yönü: Ohannes Paşa "ilk sistematik Türkçe klasik politik ekonomi el kitabı / ilk kürsü ders metni" olarak; Cavid Bey ise "Jön Türk/Meşrutiyet eşiğinde daha olgun, modernleştirici ve sistemleştirici ikinci büyük ders kitabı" olarak ayrıştırılmalı. Bölüm başındaki 122 yıl hesabı da buna göre ya 104 yıl yapılmalı ya da Cavid özelinde yeniden gerekçelendirilmelidir.

### 19. [P2] Sen'in demokrasi-kıtlık tezi fazla geniş aktarılıyor

Kanıt: `deger/chapters/12-sen-kapabiliteler.md:73` Sen'in tezini "Demokratik bir ülkede asla kıtlık yaşanmamıştır" diye aktarıyor.

Dış kontrol: Sen'in kendi popüler yazısında ifade daha koşulludur: demokratik yönetim, düzenli seçimler, muhalefet ve görece özgür basın gibi unsurlar vurgulanır. Bkz. Amartya Sen, "Insurance Against Famine", *Los Angeles Times*, 16 Ekim 1998: <https://www.latimes.com/archives/la-xpm-1998-oct-16-me-33051-story.html>. Cambridge University Press özeti de Sen'in tezini "functioning multiparty democracy" ve özgür basın bağlamında verir: <https://www.cambridge.org/core/books/abs/state-food-crimes/democracies-and-famines/49AE1C5ED7371D80FC574495DE2EF67F>

Niye sorun: "Demokratik bir ülke" çok geniş bir kategori. Sen'in güçlü iddiası, herhangi bir biçimsel seçim düzeninden çok işleyen çok partili demokrasi, özgür basın, muhalefet ve kamu denetimi mekanizmalarına dayanır. Bu ayrım kaybolursa tez, hem tarihsel olarak daha kolay saldırıya açık olur hem de Sen'in asıl mekanizması belirsizleşir.

Düzeltme yönü: Cümle "işleyen çok partili demokrasi ve görece özgür basın koşullarında büyük kıtlıkların önlenmesi" şeklinde daraltılmalı. Sonraki cümlede mekanizma açık yazılmalı: bilgi akışı, muhalefet baskısı, seçim hesabı ve erken yardım kapasitesi.

### 20. [P2] "Iron Law of Wages" Malthus/Ricardo'ya doğrudan ad gibi bağlanıyor

Kanıt: `klasik-iktisat/chapters/04-ricardo-sistemi.md:62` klasik iktisadın "Iron Law of Wages" formülasyonunu Malthus nüfus yasasının sonucu gibi veriyor. `klasik-iktisat/chapters/04-ricardo-sistemi.md:182` bu terimi Ricardian kanonun parçası olarak kullanıyor. `klasik-iktisat/chapters/09-mill-sentez.md:35` ise "Malthus'un katı Iron Law of Wages tezi" diyor.

Dış kontrol: Encyclopaedia Universalis, "loi d'airain" formülünü Ferdinand Lassalle ile ilişkilendirir ve Lassalle'ın Ricardo tezini devralarak bu adı ünlendirdiğini belirtir: <https://www.universalis.fr/encyclopedie/loi-d-airain/>

Niye sorun: Malthus ve Ricardo'da geçimlik ücret, nüfus baskısı ve doğal ücret mantığı vardır; ama "Demir Ücret Yasası" adı özellikle Lassalle ve 19. yüzyıl sosyalist tartışmasıyla kanonlaşır. Terimi doğrudan Malthus'un tezi gibi vermek anakronizm üretir.

Düzeltme yönü: "Sonradan Lassalle'ın 'Demir Ücret Yasası' adıyla sertleştireceği geçimlik ücret mantığı" gibi bir formül kullanılmalı. Böylece hem klasik kök hem de terimin tarihsel adı doğru kalır.

### 21. [P2] Anglo-Amerikan liberal mülkiyet geleneği "mülkiyet mutlaktır" diye fazla düz anlatılıyor

Kanıt: `mulkiyet/chapters/09-hegel-kisilik.md:115` Anglo-Amerikan liberal geleneğini Locke-Smith-Nozick hattında "mülkiyet mutlaktır, devlet sınırlı" çerçevesi olarak özetliyor. Aynı kitapta `mulkiyet/chapters/06-smith-klasik-iktisad.md:66` Smith'in mülkiyet için mutlak ahlaki çerçeve koymadığını zaten söylüyor. Locke bölümü de proviso, emek-mixing sınırları ve sömürge yorumları üzerinden mülkiyetin tartışmalı sınırlarını işliyor.

Niye sorun: Hegel'i "orta yol" diye anlatmak için karşı tarafı fazla sertleştiriyor. Locke, Smith ve Nozick aynı çizgide durmaz; Locke'ta doğal hukuk ve yeterince/iyi bırakma problemi, Smith'te tarihsel-sonuçsal analiz, Nozick'te edinim/transfer/düzeltme ilkeleri vardır. Bunları "mutlak mülkiyet" diye birleştirmek okurun mülkiyet teorileri haritasını yassılaştırır.

Düzeltme yönü: Anglo-Amerikan hat "mülkiyeti güçlü bireysel hak ve devlet sınırlaması üzerinden düşünen gelenek" diye yeniden kurulmalı; ardından bu hattın kendi iç farkları kısa bir cümleyle ayrılmalı.

### 22. [P2] HIV ilaç fiyatları örneği keskin sayılar veriyor ama yıl, ilaç ve kaynak eşleşmesi eksik

Kanıt: `mulkiyet/chapters/12-bugun-fikri-dijital.md:144-149` ABD patentli HIV/AIDS tedavisini yıllık `$30,000 - $40,000`, Hindistan jeneriğini `$300 - $500`, üretim maliyetini yaklaşık `$200` ve mark-up oranını `%15,000+` olarak veriyor. `mulkiyet/chapters/12-bugun-fikri-dijital.md:151` patent fiyatları nedeniyle 2000-2010 arasında Güney Afrika'da milyonlarca insanın tedaviye erişemediğini söylüyor. Dipnot `mulkiyet/chapters/12-bugun-fikri-dijital.md:260` genel bir Güney Afrika tartışması kaynağı veriyor; ama tablodaki sayıları hangi yıl, hangi ilaç rejimi ve hangi fiyat kaynağına bağladığını göstermiyor.

Niye sorun: Bu bölümün pedagojik gücü sayısal karşılaştırmadan geliyor. Ama sayılar kaynaklanmadığında, okur "bu hangi tedavi, hangi yıl, hangi piyasa fiyatı?" sorularını soramaz. Ayrıca "milyonlarca insan patent fiyatları nedeniyle erişemedi" cümlesi doğru yönde olabilir ama tek nedene fazla hızlı bağlanır; kamu sağlığı altyapısı, devlet politikası, bağış programları, jenerik lisansları ve uluslararası fonlar da denklemdedir.

Düzeltme yönü: Tabloya tarih ve ilaç rejimi eklenmeli. Örneğin "2000'lerin başında belirli ARV kombinasyonları" gibi daraltılmalı; fiyatlar UNAIDS/WHO, MSF Access Campaign, Treatment Action Campaign veya akademik sağlık iktisadı kaynaklarıyla eşleştirilmeli. "Patent nedeniyle" ifadesi "patent fiyatları, uluslararası finansman eksikliği ve kamu sağlığı kapasitesiyle birlikte erişim krizini ağırlaştırdı" diye kalibre edilmeli.

### 23. [P2] Çok sayıda kaynak tanımı reader tarafından görünmez kalıyor

Kanıt: `modules/book/reader.js:4-11` özel dipnot formatını açıkça tanımlıyor: metinde inline atıf `^[1]`, bölüm sonunda tanım `[^1]: ...`. Reader `modules/book/reader.js:170-175` içinde kaynak tanımlarını metinden çıkarıyor ve yalnız inline `^[N]` işaretlerini tıklanabilir dipnota çeviriyor. İkinci tur dipnot taraması 48 Markdown dosyasında tanım bulunup karşılık gelen inline `^[N]` atfı bulunmadığını gösterdi. Özellikle `egemenlik` içinde 11 bölüm, `mulkiyet` içinde 12 bölüm, `tarih-atlasi` ana/pane içeriklerinde 17 bölüm bu sorundan etkileniyor. Örnekler: `egemenlik/chapters/01-niye-egemenlik.md:168-176`, `mulkiyet/chapters/12-bugun-fikri-dijital.md:256-270`, `tarih-atlasi/panes/keynes/chapters/01-pane-ozeti.md:147-149`.

Niye sorun: Bölüm sonunda kaynak tanımı varmış gibi görünür, ama inline atıf yoksa reader bu tanımları normal kaynakça olarak göstermeyebilir. Yani yazar kaynak eklediğini sanır, okur ise kaynakları göremez. Bu, özellikle Egemenlik ve Mülkiyet gibi iddia yoğun kitaplarda ciddi kaynak izlenebilirliği açığıdır.

Düzeltme yönü: İki seçenekten biri seçilmeli. Ya kaynak tanımları gerçekten dipnot olacaksa ilgili cümlelere `^[1]` inline işaretleri eklenmeli; ya da bölüm sonu kaynakları görünür "Kaynakça / Kaynak pusulası" blokları olarak reader tarafından korunmalı. En iyi çözüm: iddia yoğun cümlelere inline atıf, bölüm sonunda da kısa görünür kaynak pusulası.

### 24. [P2] Smith'in üretken emek anlayışı İktisat Haritası'nda fazla genişletiliyor

Kanıt: `iktisat-haritasi/chapters/03-klasik-sentez-smith-emek-deger.md:7` Smith'i, emeğin "hangi sektörde uygulanırsa uygulansın" değer ürettiğini; tarımda, manüfaktürde ve "ticarette de" üretken olduğunu söyleyen bir çerçevede anlatıyor. Aynı dosyanın `iktisat-haritasi/chapters/03-klasik-sentez-smith-emek-deger.md:17` satırı ise Smith'in üretken/üretken-olmayan emek ayrımını koruduğunu ve ölçütü somut, satılabilir, sermaye birikimine katkı yapan mal-form sürekliliği olarak verdiğini söylüyor. `klasik-iktisat/chapters/02-smith-sistemi.md:43` bu tanımı daha da dar kuruyor: üretken emek somut bir mala değer ekler; hizmet tüketildiği anda yok olur. `mulkiyet/chapters/06-smith-klasik-iktisad.md:56-60` da Smith'ten alıntıyla aynı ayrımı veriyor.

Niye sorun: Smith fizyokratların "yalnız tarım üretkendir" darlığını aşar; ama modern milli gelir muhasebesi gibi bütün hizmet ve ticaret faaliyetlerini aynı genişlikte üretken saymaz. "Ticarette de" ifadesi okura Smith'i 20. yüzyıl hizmet ekonomisi anlayışına fazla yaklaştırır. Asıl incelik şudur: Smith tarım dışı üretken emeği, özellikle manüfaktür ve satılabilir mal üreten emeği içeri alır; fakat üretkenlik ölçütü hâlâ dar ve tartışmalıdır.

Düzeltme yönü: Cümle "Smith üretkenliği yalnız toprağa bağlamaz; tarım yanında manüfaktür ve satılabilir mal üreten emek de sermaye birikimine katkı yapabilir" diye daraltılmalı. Ticaret için "pazarın genişlemesini ve sermayenin dolaşımını sağlar; ama Smith'in üretken emek ölçütü modern hizmet ekonomisi kadar geniş değildir" ayrımı eklenmeli.

### 25. [P2] GDPR yayılım tablosunda UK GDPR tarihi kaymış, KVKK satırı da 2026 itibarıyla tahmin olarak kalmış

Kanıt: `egemenlik/chapters/12-bugun-kuresel-egemenlik.md:110-118` GDPR yayılım tablosunda İngiltere için "2023 | UK GDPR" satırı var; aynı tabloda Türkiye için "2025 (tahmin) | KVKK güncellemesi | GDPR'a uyum yönünde" deniyor. Güncel dış kontrol bu iki satırın kalibre edilmesi gerektiğini gösteriyor. ICO/CMA ortak açıklaması UK GDPR'nin 1 Ocak 2021'de yürürlüğe giren UK hukuku olduğunu söylüyor: <https://ico.org.uk/media/about-the-ico/documents/2619797/cma-ico-public-statement-20210518.pdf>. Kişisel Verileri Koruma Kurumu ise 6698 sayılı Kanun değişikliklerinin 12 Mart 2024 tarihli Resmi Gazete'de yayımlandığını, değişikliklerin 1 Haziran 2024'te yürürlüğe gireceğini, yurt dışına aktarım maddesi için eski ve yeni rejimin 1 Eylül 2024'e kadar birlikte uygulanacağını duyuruyor: <https://www.kvkk.gov.tr/Icerik/7834/6698-Sayili-Kisisel-Verilerin-Korunmasi-Kanununda-Yapilan-Degisiklikler-Hakkinda-Kamuoyu-Duyurusu>. Kurumun "Yurt Dışına Aktarım" sayfası da 7499 sayılı Kanunla 9. maddede yapılan değişikliklerin 1 Haziran 2024'te yürürlüğe girdiğini ve standart sözleşmeler/bağlayıcı şirket kuralları gibi mekanizmaları anlatıyor: <https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim>.

Niye sorun: Bölüm "bugünkü egemenlik" üzerine kurulu olduğu için tarih kaymaları güveni hızlı aşındırır. UK GDPR'nin 2023 diye görünmesi Brexit sonrası veri rejimini yanlış tarihlendirir. Türkiye satırının 2025 tahmini olarak kalması ise 2026'da okura artık gerçekleşmiş mevzuat değişikliğini değil, eski bir beklentiyi gösterir.

Düzeltme yönü: UK GDPR satırı 2021'e çekilmeli; 2023 varsa yalnız ICO rehberinin yeniden düzenlenmesi veya veri reformu tartışması gibi ayrı bir güncelleme olarak notlanmalı. Türkiye satırı "2024 | Türkiye | 7499 sayılı Kanunla KVKK değişiklikleri; özellikle özel nitelikli veri ve yurt dışına aktarım rejimi | GDPR'a kısmi/başlık bazlı uyum yönünde" gibi yeniden yazılmalı. "GDPR'a uyum" ifadesi de tam uyum değil, belirli mekanizmalarda yakınsama olarak kalibre edilmeli.

### 26. [P2] Westphalia "modern devletler sisteminin doğum belgesi" diye fazla düz anlatılıyor

Kanıt: `egemenlik/chapters/06-bodin-soverenlik.md:93` Westphalia'yı modern uluslararası devletler sisteminin doğum belgesi olarak veriyor; `egemenlik/chapters/06-bodin-soverenlik.md:103-105` bu sistemi Bodin'in egemenlik kavramının pratik mirası gibi kuruyor. Aynı bölümün kaynakçası `egemenlik/chapters/06-bodin-soverenlik.md:195` Andreas Osiander'ın "Sovereignty, International Relations, and the Westphalian Myth" makalesini eleştirel okuma olarak veriyor. Osiander'ın makalesinin özeti, geleneksel IR anlatısının 1648'i modern sistemin başlangıcı saydığını; fakat bu geçmiş resminin büyük ölçüde 19. ve 20. yüzyıl egemenlik takıntısının ürettiği hayali bir arka plan olduğunu savunuyor: <https://www.cambridge.org/core/services/aop-cambridge-core/content/view/33B6B7773432BE494F31518952ABE881/S0020818301441324a.pdf/sovereignty-international-relations-and-the-westphalian-myth.pdf>.

Niye sorun: "Westphalia = modern egemen devlet sisteminin doğumu" öğretici bir kısa yol olabilir; ama revizyonist literatür bu kısa yolun fazla pürüzsüz olduğunu söyler. Okur burada iki şeyi aynı anda görmeli: Westphalia'nın egemenlik anlatısında çok güçlü bir sembol haline gelmesi ve tarihsel gerçekliğin bu sembolden daha karmaşık olması. Aksi halde bölüm, kendi kaynakçasında işaret ettiği eleştirel metni ana anlatıya yedirememiş olur.

Düzeltme yönü: "Doğum belgesi" yerine "sonradan modern egemen devlet anlatısının kurucu sembolü haline getirilen barış düzeni" gibi daha dikkatli bir formül kullanılmalı. Ardından bir cümleyle şu nüans eklenmeli: Westphalia bazı müdahale ve imparatorluk-papalık iddialarını sınırlandırdı, ama modern egemenlik rejimi tek bir antlaşma anında doğmadı; uzun bir merkezileşme, hukuk, savaş ve diplomasi süreci içinde şekillendi.

### 27. [P2] Avusturya okulu bölümünde Böhm-Bawerk'in Marx eleştirisi yer yer anlatıcının hükmü gibi kuruluyor

Kanıt: `deger/chapters/08-avusturya-subjektif.md:83-85` Böhm-Bawerk'in Marx eleştirisini anlatırken "Ama bu iddia, bir yanlış-anlama üzerine kurulu" ve "Aradaki fark 'sömürü' değil; zaman tercihi farkıdır" diyor. `deger/chapters/08-avusturya-subjektif.md:69` zaman tercihini "biyolojik bir gerçek" diye çok güçlü kuruyor. Bölümün ilerisi daha dengeli: `deger/chapters/08-avusturya-subjektif.md:196-198` Marksist geleneğin karşı cevaplarını, mülkiyet asimetrisini ve riskin işçiyle de paylaşıldığı itirazını veriyor.

Niye sorun: Avusturya okulunun argümanı güçlü biçimde anlatılmalı; ama anlatıcı sesi "Böhm-Bawerk'e göre" sınırını kaybedince okur bunu tartışmalı bir teori olarak değil, kitabın nihai hükmü olarak okuyabilir. Bu da Değer kitabının genel amacıyla çelişir: aynı soruyu farklı ekollerin hangi varsayımla kurduğunu göstermek. Özellikle "sömürü değil" cümlesi, Marksist değer/artı-değer tartışmasını daha başlamadan kapatır gibi duruyor.

Düzeltme yönü: Paragraf "Böhm-Bawerk'e göre Marx'ın sömürü dediği fark, aslında zaman tercihi ve gelecekteki satış riskidir" diye çerçevelenmeli. "Biyolojik gerçek" ifadesi "psikolojik ve iktisadi eğilim" gibi yumuşatılmalı. Hemen ardından tek cümlelik karşı ağırlık konmalı: "Marksist cevap, bu zaman farkının kendisinin mülkiyet asimetrisinden doğduğunu ve riskin işçi tarafından da taşındığını söyler."

### 28. [P1] Ricardo'nun Waterloo'da erken haberle bir gecede servet kazandığı anlatısı güncel arşiv çalışmasıyla çelişiyor

Kanıt: `klasik-iktisat/chapters/04-ricardo-sistemi.md:7` Ricardo'nun Waterloo zafer haberini hükümet ulağından birkaç saat önce aldığı, o saatlerde büyük miktarda Omnium ve consol satın aldığı, resmî haberle fiyatlar fırlayınca bir gecede yaklaşık bir milyon sterlin kazandığı ve bunun finansal kariyerinin son büyük operasyonu olduğu anlatısını kesin olay gibi kuruyor. Dipnot `klasik-iktisat/chapters/04-ricardo-sistemi.md:207` bu hikâyeyi Weatherall ve Ferguson üzerinden gerekçelendiriyor.

Dış kontrol: Wilfried Parys'in 2024 tarihli *Cambridge Journal of Economics* makalesi, arşiv ve fiyat verilerinin Ricardo'nun Waterloo sonrası "life-changing coup" yaptığı anlatısını desteklemediğini; servetini daha kademeli, küçük kâr oranlarını büyük işlem hacimleriyle biriktiren bir borsa jobber'ı ve yedi büyük İngiliz kamu borçlanmasının yüklenicisi olarak kazandığını söylüyor. Makale özellikle 1815 borçlanmasının Ricardo'ya istisnai kâr getirdiğini, ama "bir milyon sterlinlik Waterloo kârı" efsanesinin güvenilir olmadığını belirtiyor: <https://academic.oup.com/cje/article/48/2/187/7595945>. Aynı çalışmanın RePEc/IDEAS özeti de Ricardo'nun Waterloo yenilgisi/zaferi hakkında erken bilgiye sahip olduğuna dair kanıt bulunmadığını, "million of Waterloo profits" efsaneleri için arşiv kanıtı olmadığını ve 1813 borçlanmalarının emeklilik kararında daha önemli olabileceğini söylüyor: <https://ideas.repec.org/p/ant/wpaper/2020009.html>.

Niye sorun: Bu sahne çok akılda kalıcı olduğu için yanlışsa yalnızca biyografik ayrıntı hatası değildir; Ricardo'nun teorisini "erken haberle vurgun yapan finansçı" psikolojisine bağlayan bütün sınıfsal okuma sertleşir. Ricardo'nun finans kapitalisti konumu yine önemli kalır, ama bunu efsaneleşmiş tek gecelik vurgun yerine kamu borçlanması, borsa aracılığı, büyük hacimli düşük marjlı işlemler ve savaş finansmanı üzerinden anlatmak gerekir.

Düzeltme yönü: Paragraf kesin olay anlatısından çıkarılmalı. "Ricardo'nun Waterloo çevresinde büyük kazanç sağladığına dair eski anlatılar vardır; ancak güncel arşiv çalışmaları bir gecelik milyon sterlinlik erken-haber vurgununu desteklemez" diye yeniden kurulmalı. Ardından Ricardo'nun gerçek finansal konumu daha sağlam anlatılmalı: 1807-1815 kamu borçlanmaları, 1813 kârları, Gatcombe Park'ı 1814'te alması ve 1815'in daha çok büyük ama efsaneleştirilmiş bir bonus olması.

### 29. [P2] Waitangi Antlaşması satırı Māori metninin rangatiratanga/kāwanatanga ayrımını yeterince korumuyor

Kanıt: `egemenlik/chapters/10-hegel-devlet.md:146` "1840 Waitangi Antlaşması Maori topraklarını İngiliz Tacı'na devretti" diyor; sonra Māori ve İngilizce versiyonların farklı şeyler söylediğini ekliyor. Ancak ilk cümle İngiliz metninin egemenlik/devretme dilini ana gerçek gibi kuruyor.

Dış kontrol: Waitangi Tribunal, antlaşmanın Māori ve İngilizce iki metni olduğunu, Māori metninin İngilizce metnin tam çevirisi olmadığını ve Tribunal'ın bu farklardan doğan meseleleri karara bağlamakla görevli olduğunu açıkça belirtiyor: <https://waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty>. Aynı sayfa, Māori metninde Article 1'in İngilizlere `kawanatanga` yani yönetme/governance hakkı verdiğini; İngilizce metinde ise Māori'nin `sovereignty` devrettiğini söylüyor. Article 2'de Māori metni, kabilelerin toprakları ve taonga üzerindeki otoritesini `rangatiratanga` ile korur. Waitangi Tribunal'ın metin sayfasında İngilizce Article 1 "sovereignty" devrini söylerken, Māori Article 1 "Kawanatanga" der; Māori Article 2 ise "te tino rangatiratanga o o ratou wenua o ratou kainga me o ratou taonga katoa" ifadesini taşır: <https://waitangitribunal.govt.nz/en/about/the-treaty/maori-and-english-versions>.

Niye sorun: Bu bölüm Hegelci tanınma mantığını anlatıyor; tam da burada sömürge hukukunun hangi dili "tanıdığı", hangi dili bastırdığı görünür olmalı. "Topraklarını devretti" diye başlamak, koloniyal İngiliz metnini varsayılan gerçek yapar; Māori metnindeki rangatiratanga, yani otorite/şeflik/özyönetim iddiası ikinci plana düşer. Bu, projenin "baskın sesi hakikat gibi sunma" uyarısıyla doğrudan çatışır.

Düzeltme yönü: Satır "İngilizce metin egemenlik devrinden söz ederken, Māori metni İngilizlere kāwanatanga/yönetim hakkı verir ve Māori rangatiratanga'sını, toprak ve taonga üzerindeki otoriteyi korur; bu metin farkı sonraki iki yüzyılın tanınma ve tazminat mücadelelerinin merkezindedir" diye yeniden yazılmalı.

## Düzeltme Sırası Önerisi

1. Önce P1'leri düzelt: Piketty formülü, Emek editör notu, tamamlandı/draft statü çelişkisi, Ricardo-Waterloo efsanesi.
2. Sonra zamana duyarlı ve aşırı kesin P2'leri yumuşat: Çin sosyal kredi, dolar borcu, Türkiye emek payı, GDPR/KVKK tarihleri.
3. Osmanlı klasik iktisat bölümündeki Ohannes/Cavid iç çelişkisini aynı P1 turunda gider.
4. Ardından teori-tarih bağlarını kalibre et: Salamanca-Menger, Washington Consensus, sınıf/koalisyon okuması, WTO çizgisi, LVT, Sen'in demokrasi-kıtlık tezi, Demir Ücret Yasası, Smith'in üretken emek ölçütü, Westphalia anlatısı, Böhm-Bawerk/Marx dengesi, Waitangi metin ayrımı ve liberal mülkiyet hattı.
5. Kaynak görünürlüğünü düzelt: inline `^[N]` eksikleri, görünür kaynak pusulası, Türkiye emek payı, HIV ilaç fiyatları ve güncel hukuk/politika tabloları.
6. Sayısal ve güncel örnekleri kaynaklandır: Türkiye emek payı, HIV ilaç fiyatları, Para/Emek kaynak pusulası.
7. Son turda yapısal katmanları ekle: eski kitaplara okuma pusulası, pane'lere mini kitap kapanışları, Para/Emek'e kaynak pusulası.

Bu sırayla gidilirse önce yanlış bilgi riski azalır, sonra okurun düşünme seviyesi yükselir.
