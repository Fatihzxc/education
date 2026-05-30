# Tema Yol Haritası — Education Repo Genişlemesi

**Tarih:** 2026-05-24
**Son güncelleme:** 2026-05-30 — **Fizyokratik Düşünce**, **Klasik İktisat** ve **Para, Borç ve Finans** kitapları ana katalogda tamamlandı olarak işaretlendi.
**Bağlam:** Yedi kitap tamamlandı olarak işaretli (Merkantilizm, Fizyokrasi, Klasik İktisat, Değer, Mülkiyet, Egemenlik, Para-Borç-Finans). Bu doküman olası sonraki temaları envanterler. Bağlayıcı değil — yazma sırası kullanıcının her temanın pilot bölümünden sonra vereceği karara bağlı.

---

## ✅ Tamamlanan kitap — Klasik İktisat

**Slug:** `klasik-iktisat/` · **Alt başlık:** Smith'ten Mill'e, Marx'a ve marjinal devrime · **Durum:** 12/12 completed · **Toplam:** ~42.7K kelime (hedef ~37K aşıldı) · **Sıra:** theme-registry'de 3. konum (kronolojik bloğun tamamlayıcısı: merkantilizm → fizyokrasi → klasik).

### Tasarım kararları

- **Marx KÖPRÜ formunda Ch 11'de** — ayrı tam-bölüm değil; "Klasik'in iki karşıt mirasçısı" çerçevesi (marjinalistler + Marx hattı birlikte). Tam Marx tartışması `deger/07` ve `mulkiyet/08`'de.
- **Smith Ch 2'de bütüncül sentez** — 4 dağınık Smith bölümünün (merkantilizm/09, fizyokrasi/09, deger/05, mulkiyet/06) tek-okuyuşa toplaması. *Wealth*'i 5 cilt iç-mantığı olarak sunar.
- **Osmanlı Ch 10** — Mehmed Cavid Bey, Sakızlı Ohannes, Münif Paşa. Sister kitap paralelliği korunur.

### 12-bölüm yayı

1. Niye "klasik iktisat"? — terim, kanon, 1776-1870 yayı
2. Smith'in sistemi — *Wealth*'i 5 cilt iç-mantığı
3. Malthus ve nüfusun sınırları — *Essay on Population* (1798)
4. Ricardo'nun *Principles*'ı — emek-değer + rant + karşılaştırmalı üstünlük + parasal teori
5. Klasik makro — Say's Law, ücret fonu, sermaye birikim
6. Klasik büyüme teorisi — Smithian artan-getiri vs Ricardian azalan-getiri
7. Karşılaştırmalı üstünlük ve serbest ticaret — Anti-Corn-Law League, 1846
8. Klasik iktisat ve İngiliz politik bağlamı — Reform Bill, Chartism, Engels 1845, ütopyacı sosyalistler
9. J.S. Mill ve klasik sentez — *Principles* (1848), *On Liberty*, kadın ve mülkiyet
10. Klasik iktisat ve Osmanlı modernleşmesi — Cavid Bey *İlm-i İktisad*
11. Klasik'in iki karşıt mirasçısı — marjinal devrim + Marx hattı
12. Bugün — Sraffian/neo-Ricardian, Piketty, eşitsizlik

### kb-mcp kaynak durumu

Klasik döneme ait birincil kaynakların büyük bölümü `C:\Users\Fatih\github\kb-mcp\data\catalog.json`'da zaten indekslenmiş: Ricardo *Principles*, Malthus *Essay*, Mill *Principles*, Say *Treatise*, Bastiat *Sophisms*, Marx *Capital* Vol 1, Menger, Walras, Marshall, Schumpeter, Piketty. Yeni eklenen 8 girdi (`indexed: false`): Mill *On Liberty*, Mill *Subjection of Women*, Engels *Condition*, Marx *Theories of Surplus Value*, Cavid Bey *İlm-i İktisad*, Sraffa *Production of Commodities*, Blaug *Economic Theory in Retrospect*, Hollander *Classical Economics*.

---

## ✅ Tamamlanan kitap — Fizyokratik Düşünce (önceki tur)

**Slug:** `fizyokrasi/` · **Alt başlık:** Cantillon'dan Henry George'a · **Durum:** 12/12 completed · **Toplam:** ~45.8K kelime · **Sıra:** theme-registry'de 2. konum (merkantilizm'in halefi olarak).

### İkinci tur entegrasyon (2026-05-26)

`docs/fizyokrasi-kok-sebep-analizi.md` (Problem→Sebep→Çözüm→Değerlendirme) ve `docs/aydinlanma-ve-devrim-sinif-analizi.md` (karşı-tarihçiler + sınıf-çıkar haritası) materyali 10 bölüme cerrahi olarak dağıtıldı:

- **Ch 1** (+700): 18. yy Fransa paradoksu — kireçlenmiş kurumsal zemin teşhisi
- **Ch 3** (+1900): Colbert üç ölümcül seçim + Aydınlanma'nın görünmeyen altyapısı (salon/loca/Encyclopédie)
- **Ch 4** (+640): İçeriden reformcu olarak Quesnay, *société de pensée* analitik bağı
- **Ch 6** (+780): İdeolojinin prototipi — sınıf transferi olarak *impôt unique*
- **Ch 7** (+780): Aile hatları — Mirabeau père/fils, Du Pont→DuPont, Mercier→Catherine
- **Ch 8** (+1440): *Guerre des farines* genişletilmiş + "Düşüş ve gölgenin uzunluğu" + dört-eksen değerlendirme
- **Ch 9** (+400): Smith ve fizyokratlar — yükselen sınıfın teorisyenleri
- **Ch 10** (+2400): Dört-eksen sistematik eleştiri + karşı-tarihçiler (Burke, Maistre, Taine, Cochin, Furet) + Cochin merceği sentezi
- **Ch 11** (+670): Karşı-okuma merceği Türkiye'ye (Jön Türkler, Cumhuriyet kadrosu, vakıf ekosistemi)
- **Ch 12** (+1150): Friedman "least bad tax" + Polanyi *Büyük Dönüşüm* çifte hareket + ideoloji okuma metodolojisi olarak miras + Doc 1 kapanış aforizması

**Bölüm 2 ve 5 dokunulmadı** (Cantillon teknik öncül + *Tableau* salt model exposition).

**12-bölüm yayı:**
1. Niye "fizyokratlar"? — *physis* + *krátos*, 18. yy Fransası
2. Cantillon ve Gournay — fizyokrasi öncesi
3. Doğal düzen ve Aydınlanma — *ordre naturel*, *despotisme légal*
4. Quesnay — hekimden ekonomiste
5. *Tableau Économique* (1758) — üç sınıf, ilk makro model
6. *Produit net* ve *impôt unique*
7. Mirabeau ve fizyokrat ekolü
8. Turgot — pratik fizyokrat (1774-76 edicts)
9. Smith ve fizyokratlar — Paris ziyareti, *Wealth* II/IV.IX
10. Eleştiri ve sınırlar — Marx'ın değerlendirmesi
11. Osmanlı'ya yansımalar — Sarı Mehmed Paşa, Tanzimat
12. Bugün — Henry George, LVT, ekolojik iktisat

**kb-mcp kaynak durumu:**
- Mevcut: Quesnay *Tableau* (`quesnay-tableau`), Cantillon *Essai* (`cantillon-essai-commerce`), Smith *Wealth*, Marx, Sarı Mehmed Paşa *Nesayih*
- Eksik (catalog'da `indexed: false`): Turgot *Réflexions*, Mirabeau *L'Ami des hommes*, Du Pont *Physiocratie*, Meek *The Economics of Physiocracy*, Vaggi *The Economics of François Quesnay*, Henry George *Progress and Poverty*

**Çapraz bağlar:** Merkantilizm Ch9 (Smith eleştirisi), Değer Ch5 (Smith sentezi), Mülkiyet Ch6 (toprak), Egemenlik Ch8 (Aydınlanma doğal hukuk).

**Sonraki tur:** verify_claim ile her bölümün ≥3 birincil alıntısı doğrulanmalı; eksik PDF'ler edinilip ingest edilmeli; status `draft → completed`'a 12 bölüm bireysel düzeltme döngüsünden sonra çevrilir.

---

## 0. Çerçeve

### Tema seçim kriterleri (mevcut 4 kitabın deseninden çıkarılmış)

1. **Kavramsal yoğunluk:** Tek bir kelime/kavram (değer, mülkiyet, egemenlik) yirmi beş asır boyunca anlam evrimi gösterebiliyor mu?
2. **Birincil kaynak erişimi:** Anchor düşünürlerin metinleri kb-mcp'de var mı, yoksa proxy (Schumpeter, modern sentez metni) yeterli mi?
3. **Türkçe okunabilirlik:** Çoğu Türk üniversite öğrencisinin ulaşamadığı bir tartışmayı 22-24K kelime Türkçeyle açabilir miyiz?
4. **Mevcut kitaplarla bağ:** Yeni tema önceki dördünün bir kavramsal eksiğini kapatıyor mu, ya da bağımsız bir hat mı açıyor?
5. **Editöryal sürdürülebilirlik:** ~1-2 ay yarı zamanlı çalışmayla bitirilebilir mi (12 bölüm × 5-7 saat = 60-84 saat)?

### Standart kitap formu (sabit)

- 12 bölüm × ~1800-2200 kelime ≈ 22-26K kelime toplam
- Bölüm 1: framing (niye bu kavram, terimsel açılım, kitabın yolculuğu)
- Bölüm 2-11: tarihsel-kavramsal yay (antik → ortaçağ → erken modern → 18. yy → 19. yy → 20. yy)
- Bölüm 12: bugün + sentez
- Her bölüm: 5-9 dipnot, 1-4 doğrulanmış birincil kaynak alıntısı (≤15 kelime), 1-2 tablo/şema
- Türkçe ana metin, teknik terimler İngilizce/Latince parantez içinde

### Efor tahmini (kaba)

| Bileşen | Süre |
|---|---|
| Kaynak araştırma + kb-mcp ingestion (eksik kaynaklar) | 4-8 saat |
| Bölüm yazma (12 × 4-6 saat) | 48-72 saat |
| Düzeltme, dipnot doğrulama, verify_claim turu | 4-6 saat |
| Smoke test + commit + push | 1 saat |
| **Toplam** | **57-87 saat** (≈ 1-2 ay yarı zamanlı) |

### Mevcut 4 kitabın kavramsal ağı

```
Değer (ne için üretiyoruz?) ──→ Mülkiyet (kimin?) ──→ Egemenlik (kim koruyor?)
       │                              │                       │
       └── Merkantilizm (ulusal düzeyde değer biriktirme) ────┘
```

Her yeni tema bu ağa bir köprü eklemeli — ya bir düğüm derinleştirmeli (örn. Para = Değer'in araç boyutu), ya yeni bir düğüm açmalı (örn. Adalet = Egemenlik'in meşruiyet boyutu).

---

## I. Tier 1 — Spec §5'te zaten önerilmiş

Bunlar 2026-05-24 tarihli education-expansion spec'in 5. bölümünde "öneri sırası" olarak listelenenler. Kavramsal devamlılık güçlü.

### 1. Adalet teorisi
**Alt başlık:** Plato'dan Sen'e — hak, hakkaniyet, dağıtım

**Neden bu sırada?** Egemenlik kitabı "kim karar verir" sorusunu çözdü. Adalet "kararın doğruluğu" sorusunu açar. Egemenliğin meşruiyetinin felsefi temellendirmesi.

**12-bölüm yayı:**
1. Niye "adalet"? — *dikaiosyne*, *iustitia*, *adl*, *Gerechtigkeit*
2. Plato — *Devlet* — adalet bireyin ve şehrin ruhunda
3. Aristoteles — *Nikomakhos'a Etik* V — dağıtıcı/düzeltici/karşılıklılık
4. Roma — *ius* — herkese hakkını verme; Ulpianus formülü
5. Aquinas — doğal hukuk + sinaitik adalet
6. İbn Haldun + İslam hukuku — adalet asabiyye'nin temelinde
7. Hobbes vs Locke — sözleşmesel adalet
8. Hume + Smith — sempati, tarafsız gözlemci, *Theory of Moral Sentiments*
9. Kant — kategorik buyruk, ödev etiği
10. Mill — faydacılık ve dağıtım
11. Rawls — *A Theory of Justice* 1971 — orijinal pozisyon, fark ilkesi
12. Nozick → Sen → Walzer — özgürlükçü itiraz, kapabiliteler, kompleks eşitlik

**Anchor yazarlar:** Plato, Aristoteles, Aquinas, İbn Haldun, Hume, Smith, Kant, Mill, Rawls, Sen, Nozick

**kb-mcp kaynak durumu:**
- Mevcut: Aristoteles (Schumpeter), Aquinas, İbn Haldun, Smith *Wealth*, Marx
- Eksik (eklenmeli): Plato *Republic*, Smith *TMS*, Rawls *ToJ*, Sen *Idea of Justice*, Nozick *Anarchy State Utopia*, Mill *Utilitarianism*
- Public domain: Plato (Jowett), Mill, Smith TMS, Hume *Treatise*
- Telif: Rawls, Sen, Nozick → ≤15 kelime alıntı disiplini

**Çapraz bağlar:** Egemenlik Ch7-8 (Hobbes-Locke-Rousseau), Mülkiyet Ch4 (Locke), Değer Ch10 (Sen-Nussbaum)

**Tahmini efor:** 70 saat (5/10 zorluk; Rawls bölümü en yoğun)

---

### 2. Bilim sosyolojisi
**Alt başlık:** Kuhn'dan Latour'a — paradigma, kurum, ağ

**Neden bu sırada?** "Bu kavramları kim üretti, niye o anda, hangi kurumsal yapıda" — meta-soru. Önceki kitapların düşünürlerini bir bilgi-üretim sistemi içinde konumlandırır.

**12-bölüm yayı:**
1. Niye "bilim sosyolojisi"? — internalist vs externalist tarih
2. Antik bilgi yapıları — Akademia, Lyceum, Iskenderiye
3. Ortaçağ universitas + İslam medresesi
4. Bilim devrimi — Royal Society, Académie des Sciences
5. Mannheim — bilgi sosyolojisinin kuruluşu, *Ideologie und Utopie* 1929
6. Merton — bilim normları: communism, universalism, disinterestedness, organized skepticism (CUDOS)
7. Kuhn — *Structure of Scientific Revolutions* 1962 — paradigma kavramı
8. Lakatos vs Feyerabend — research programmes vs methodological anarchism
9. Bourdieu — bilimsel alan, sermaye, habitus
10. Latour + STS — *Laboratory Life* 1979 — ağ-aktör teorisi
11. Reproducibility krizi — 2010'lar, p-hacking, preregistration
12. Bugün — yapay zekanın bilim üretiminde rolü, açık bilim, Sci-Hub

**Anchor yazarlar:** Mannheim, Merton, Kuhn, Lakatos, Feyerabend, Bourdieu, Latour, Shapin

**kb-mcp kaynak durumu:**
- Mevcut: Schumpeter (proxy)
- Eksik (eklenmeli): Kuhn *Structure*, Latour-Woolgar *Laboratory Life*, Mannheim *Ideology and Utopia*, Merton *Sociology of Science*, Bourdieu *Homo Academicus*
- Telif: Kuhn, Latour → ≤15 kelime; Mannheim public domain'e yakın

**Çapraz bağlar:** Tüm kitaplardaki düşünür biyografilerini bir sistem içine yerleştirir. Özellikle Değer Ch7-8 (marjinalizm devrimi — bir Kuhnian paradigma kayması mı?), Egemenlik Ch11 (Weber'in bilim metodolojisi).

**Tahmini efor:** 75 saat (6/10 zorluk; STS bölümü Türkçede zayıf, çeviri yükü)

---

### 3. Hukuk düşüncesi tarihi
**Alt başlık:** Roma'dan eleştirel hukuk çalışmalarına — doğal, pozitif, eleştirel

**Neden bu sırada?** Egemenliğin uygulanma aracı. Bodin'in *Six Livres*'ini *jus*'la, Hobbes'un sözleşmesini Roma kontratıyla, Foucault'nun disiplinini hapishane hukukuyla bağlar.

**12-bölüm yayı:**
1. Niye "hukuk"? — *lex* vs *ius*, kanun vs hak, *Recht* vs *Gesetz*
2. Roma hukuku — XII Levha → Justinianus *Corpus Iuris Civilis* 529-534
3. Glossatorlar + Bologna — Roma'nın 12. yy yeniden keşfi
4. İslam hukuku — şeriat, fıkıh, dört mezhep, içtihat kapısının kapanması tartışması
5. Doğal hukuk: Aquinas → Grotius → Pufendorf
6. Hobbes vs Locke — kanun ve egemenlik
7. Beccaria + aydınlanma ceza reformu
8. Bentham + Austin — hukuk pozitivizminin doğuşu
9. Savigny + tarihsel hukuk okulu
10. Kelsen — *Pure Theory of Law* 1934 — temel norm
11. Hart vs Dworkin — kuralcı pozitivizm vs ilkelerin rolü
12. CLS, feminist hukuk, eleştirel ırk teorisi, hukuk + AI

**Anchor yazarlar:** Justinianus, Aquinas, Grotius, Hobbes, Bentham, Austin, Savigny, Kelsen, Hart, Dworkin

**kb-mcp kaynak durumu:**
- Mevcut: Aquinas (Summa), Hobbes (kısmen Schumpeter aracılığıyla)
- Eksik (eklenmeli): Justinianus *Institutiones* (Latince), Grotius *De Jure Belli ac Pacis*, Bentham *Of Laws in General*, Austin *Province of Jurisprudence*, Kelsen *Pure Theory*, Hart *Concept of Law*, Dworkin *Law's Empire*
- İslam hukuku için Türkçe ikincil literatür önemli (Halil İnalcık, Cengiz Kallek)

**Çapraz bağlar:** Egemenlik (özellikle Ch6 Bodin, Ch7 Hobbes), Mülkiyet (Roma *dominium*), Adalet (varsa)

**Tahmini efor:** 85 saat (7/10 zorluk; teknik hukuk terminolojisi Türkçe yoğun çalışma gerektirir)

---

## II. Tier 2 — Mevcut kitaplarla en güçlü kavramsal bağ

Bunlar spec'te yok ama yazılmış 4 kitabın bir kavramsal eksiğini doldurur. Değer/Mülkiyet/Egemenlik üçlüsünü genişletir.

### 4. Para'nın tarihi → Para, Borç ve Finans
**Alt başlık:** Güvenin, zamanın ve krizin tarihi

**Durum:** 2026-05-30 itibarıyla `para-borc-finans/` altında 12/12 completed kitap. Sadece para tarihini değil; borç, faiz, bankacılık, kamu kredisi, finansallaşma, kriz ve dijital para tartışmalarını aynı güven-zaman hattında birleştiriyor.

**12-bölüm yayı:**
1. Niye para, borç ve finans? — güven, zaman ve ödeme vaadi
2. Paranın en basit hali — ölçü, değişim aracı, değer saklama ve güven
3. Borç: geleceğin bugüne bağlanması — söz, kayıt, teminat ve iktidar ilişkisi
4. Faiz: zamanın fiyatı mı? — bekleme bedeli, risk primi ve güç ilişkisi
5. Antik dünya — sikke, borç affı ve yurttaşlık
6. Din, ahlak ve riba — meşru kazanç ile sömürü sınırı
7. Erken modern para ve devlet kredisi — savaş, hazine, kamu borcu
8. Bankalar ve merkez bankaları — mevduat, kredi yaratımı, son borç verme mercii
9. Kapitalizm ve finansallaşma — üretim, rant, varlık fiyatı ve spekülasyon
10. Krizler: 1929, 1971, 2008 — güven zincirinin kırılması
11. Osmanlı ve Türkiye hattı — akçe, dış borç, Düyun-u Umumiye, enflasyon
12. Bugün — kart, konut, kripto, CBDC ve borçlu hayat

**Anchor yazarlar:** Aristoteles, Aquinas, İbn Teymiyye, Hume, Marx, Wicksell, Keynes, Minsky, Graeber, Pamuk, Satoshi

**kb-mcp kaynak durumu:**
- Mevcut: Aristoteles (Schumpeter proxy), Pamuk *Osmanlı Parası*, Hume *Essays*, Marx *Capital*, Keynes (kısmen)
- Eksik: Friedman *Optimum Quantity of Money*, Wicksell *Interest and Prices*, Satoshi whitepaper, BIS raporları
- Çok güçlü mevcut kaynak temeli

**Çapraz bağlar:** Değer (para ve ölçü), Merkantilizm (külçecilik ve hazine), Mülkiyet (teminat ve varlık), Egemenlik (kamu borcu ve merkez bankası), Din-Ahlak-Ekonomi (riba ve meşruiyet)

**Tahmini efor:** İlk bilgelik seviyesi yazım ve bölüm derinleştirme turu tamamlandı; sonraki opsiyonel tur kaynak doğrulama ve dipnotlandırma olabilir.

**Önerilen sıra ranking:** Tamamlanan çekirdek kitaplar arasında.

---

### 5. Sermaye kavramının tarihi
**Alt başlık:** Quesnay'den Piketty'ye — birikim, akış, biçim

**Neden?** Değer ↔ Mülkiyet köprüsünün diğer yarısı. "Birikmiş değer" olarak sermayenin değişen tanımı.

**12-bölüm yayı:**
1. Niye "sermaye"? — *capital*, *Kapital*, *raʾsmāl*; stok vs akış
2. Erken modern: Genovesi, Cantillon, Quesnay *tableau économique*
3. Smith — sabit vs dolaşan sermaye, *Wealth* II
4. Ricardo + Marx I — değişen vs değişmez sermaye
5. Böhm-Bawerk — sermayenin Avusturyalı zaman teorisi
6. Schumpeter — yenilik finansmanı, *Theorie der wirtschaftlichen Entwicklung* 1911
7. Keynes — sermayenin marjinal verimliliği
8. Beşeri sermaye — Becker, Schultz, 1960'lar
9. Sosyal sermaye — Bourdieu, Coleman, Putnam
10. Doğal sermaye — Daly, ekolojik iktisat
11. Piketty — *Capital in the 21st Century* 2013 — r > g
12. Zuboff — gözetim kapitalizmi, dikkat sermayesi, veri sermayesi

**Anchor yazarlar:** Quesnay, Smith, Marx, Böhm-Bawerk, Schumpeter, Becker, Bourdieu, Piketty, Zuboff

**kb-mcp kaynak durumu:**
- Mevcut: Smith, Marx, Schumpeter, Bourdieu (kısmen)
- Eksik (eklenmeli): Quesnay *Tableau*, Böhm-Bawerk *Positive Theory*, Becker *Human Capital*, Piketty *Capital*, Zuboff *Surveillance Capitalism*

**Çapraz bağlar:** Değer (ayrılmaz), Mülkiyet (Marx kesişimi), Merkantilizm (zenginlik tartışması)

**Tahmini efor:** 70 saat (5/10)

---

### 6. Emek kavramının tarihi
**Alt başlık:** Kölelikten platform işine — bedensel, ücretli, dijital

**Neden?** Değer'in üretim tarafı; Mülkiyet'in karşıt tarafı. Locke'un "emek karıştırarak mülkiyet" tezini Marx'la, sonra çağdaş platform işiyle birleştirir.

**12-bölüm yayı:**
1. Niye "emek"? — *ergon*, *labor*, *opus*, *ʿamal*, *Arbeit*
2. Antik dünyada emek ve kölelik — Aristoteles *Politika* I, Eski Yunan
3. Roma'da serflik → ortaçağ feodal angarya
4. Loncalar — usta-kalfa-çırak sistemi, kalite kontrolü
5. İlkel birikim — *enclosure*, sömürge köleliği (Beckert)
6. Smith — iş bölümü, *Wealth* I.1 iğne fabrikası
7. Marx — yabancılaşma, *Pariser Manuskripte* 1844 + *Capital* I
8. Taylor + Ford — bilimsel yönetim, montaj hattı
9. Post-fordizm + esnek üretim
10. Polanyi — *Great Transformation* — emek meta haline gelirse ne olur?
11. Care work — feminist ekonominin emek genişletmesi
12. Platform işi — Uber, Deliveroo, Fiverr — yeni proletarya?

**Anchor yazarlar:** Aristoteles, Locke, Smith, Marx, Taylor, Polanyi, Federici, Rosa Luxemburg

**kb-mcp kaynak durumu:**
- Mevcut: Aristoteles, Smith, Marx, Polanyi, Beckert *Empire of Cotton*
- Eksik: Taylor *Principles of Scientific Management*, Marx *Pariser Manuskripte*, Federici *Caliban and the Witch*, çağdaş gig-ekonomi raporları
- Çok güçlü mevcut kaynak temeli

**Çapraz bağlar:** Değer (emek-değer kuramı), Mülkiyet (Locke emek-mixing)

**Tahmini efor:** 65 saat (5/10)

---

### 7. Demokrasi düşüncesinin tarihi
**Alt başlık:** Atina'dan demokratik gerileme çağına — temsil, katılım, kriz

**Neden?** Egemenlik kitabının demokratik çerçevesini derinleştirir. Halk egemenliğinin (Rousseau) tarihsel açımı.

**12-bölüm yayı:**
1. Niye "demokrasi"? — *demokratia*'dan modern temsile
2. Atina — Solon → Kleisthenes → Perikles
3. Roma'nın "cumhuriyet" deneyi — populus, senatus, comitia
4. Ortaçağ "cumhuriyet" deneyleri — İtalyan kent devletleri, Hansa
5. 17. yy İngiliz inşası — Long Parliament, Levellers, Glorious Revolution
6. ABD anayasası — federalist polemik (Madison, Hamilton, Jay)
7. Rousseau + Sieyès — Fransız Devrimi'nin tek-genel-irade modeli
8. Tocqueville — *De la démocratie en Amérique* 1835-40
9. Mill — *Considerations on Representative Government* 1861
10. Schumpeter — *Capitalism, Socialism and Democracy* 1942 — elitist demokrasi
11. Dahl — *Polyarchy* 1971; Habermas müzakereci demokrasi
12. 21. yy democratic backsliding — Levitsky-Ziblatt, Mounk, çoğunlukçu otoriterleşme

**Anchor yazarlar:** Tukidides, Aristoteles, Madison, Rousseau, Tocqueville, Mill, Schumpeter, Dahl, Habermas

**kb-mcp kaynak durumu:**
- Mevcut: Aristoteles, Rousseau (kısmen), Schumpeter, Mill (kısmen)
- Eksik: Tocqueville *Démocratie*, Federalist Papers, Dahl *Polyarchy*, Habermas *Strukturwandel*

**Çapraz bağlar:** Egemenlik Ch8 (Rousseau), Egemenlik Ch12 (otoriter dönüş)

**Tahmini efor:** 75 saat (6/10)

---

### 8. Özgürlük kavramının tarihi
**Alt başlık:** Stoacılardan negatif/pozitif ayrımına ve kapabilitelere

**Neden?** Egemenlik ↔ Adalet bağlantısının üçüncü ucu. Berlin'in iki kavram ayrımının uzun tarihi.

**12-bölüm yayı:**
1. Niye "özgürlük"? — *eleutheria*, *libertas*, *hürriyet*, *Freiheit*; negatif/pozitif
2. Stoacılar — Epiktetos, Marcus Aurelius — içsel özgürlük
3. Aquinas — *liberum arbitrium*, doğal hak temellendirme
4. Reformasyon — *Christianae libertas* (Luther, Calvin)
5. Hobbes — özgürlük = engelin yokluğu (negatif)
6. Locke — yaşam, özgürlük, mülkiyet
7. Rousseau — doğal vs sivil özgürlük, "zorla özgür"
8. Kant — özerklik, ahlaki yasa
9. Mill — *On Liberty* 1859 — zarar ilkesi
10. Marx — özgürlük = zorunluluk krallığının ötesi
11. Berlin — *Two Concepts of Liberty* 1958
12. Sen — özgürlük = kapabilite; *Development as Freedom*

**Anchor yazarlar:** Epiktetos, Aquinas, Luther, Hobbes, Locke, Rousseau, Kant, Mill, Marx, Berlin, Sen

**kb-mcp kaynak durumu:**
- Mevcut: Aquinas, Hobbes (Schumpeter), Locke (Schumpeter), Rousseau (kısmen), Mill, Marx
- Eksik: Berlin *Two Concepts*, Sen *Development as Freedom*, Epiktetos (public domain), Luther

**Çapraz bağlar:** Egemenlik (sınırlı egemenlik tartışması), Değer Ch10 (Sen), Mülkiyet Ch10 (Marx)

**Tahmini efor:** 65 saat (5/10)

---

### 9. Eşitlik kavramının tarihi
**Alt başlık:** Aritmetik/orantılıdan kapabiliteye — fırsat, sonuç, tanınma

**Neden?** Adalet temasının uzantısı. Aristotelesçi orantılı eşitliğin modern eşitsizlik tartışmalarına evrimi.

**12-bölüm yayı:**
1. Niye "eşitlik"? — aritmetik vs geometrik (Aristoteles)
2. Roma — *aequitas* praetorial reform
3. Hıristiyan üniversalizmi — "Tanrı önünde eşit"
4. Hobbes — doğal eşitlik (öldürme kapasitesi olarak)
5. Rousseau — *Discours sur l'origine de l'inégalité* 1755
6. Bentham — herkes "bir" sayılır, faydacılık
7. Tocqueville — koşullar eşitliği vs özgürlük gerilimi
8. Marx — sınıf eşitliği vs biçimsel eşitlik
9. Rawls — fark ilkesi, en kötü durumdakine en fazla yarar
10. Sen — kapabilite eşitliği, "neyin eşitliği?"
11. Piketty — sermaye eşitsizliği, r > g
12. Tanınma siyaseti — Honneth, Fraser, cinsiyet/ırk/kültürel eşitlik

**Anchor yazarlar:** Aristoteles, Hobbes, Rousseau, Bentham, Tocqueville, Marx, Rawls, Sen, Piketty, Fraser

**kb-mcp kaynak durumu:**
- Mevcut: Aristoteles (Schumpeter), Hobbes (Schumpeter), Marx
- Eksik: Rousseau *Discours*, Tocqueville, Rawls, Sen *Inequality Reexamined*, Piketty

**Çapraz bağlar:** Adalet (en güçlü), Özgürlük (negatif/pozitif gerilimi), Mülkiyet (Marx eleştirisi)

**Tahmini efor:** 70 saat (5/10)

---

## III. Tier 3 — Bağımsız ama özgün açıklar

Bunlar mevcut kitap setinde olmayan bağımsız konular. Repo'nun kapsamını genişletir.

### 10. Bilim tarihi (uzun yay)
**Alt başlık:** Babil'den çağdaş büyük bilim'e

**12-bölüm yayı (kısa taslak):**
Antik (Babil/Mısır/Yunan) → İslam altın çağı (İbn Sina, İbn Heysem, Ömer Hayyam) → 12. yy çeviri okulu → Rönesans (Kopernik) → bilim devrimi (Galileo, Newton) → kimya devrimi → Darwin → kuantum/görelilik → DNA → Big Science → açık bilim/AI

**kb-mcp kaynak gap:** İslam bilim kaynakları zayıf; eklenmesi gerek (Sezgin GAS, Saliba)
**Tahmini efor:** 85 saat (7/10 — geniş zaman aralığı)

---

### 11. Aydınlanma'nın tarihi
**Alt başlık:** Descartes'tan eleştirel teoriye — akıl, eleştiri, otoriteye karşı

**12-bölüm yayı:**
Önce-aydınlanma (Bacon, Descartes) → 18. yy Fransız (Voltaire, Diderot, Rousseau) → İskoç aydınlanması (Hume, Smith, Ferguson) → Alman (Kant, Lessing) → karşı-aydınlanma (Vico, Herder) → 19. yy pozitivizmi → Frankfurt eleştirisi (Horkheimer-Adorno *Aydınlanmanın Diyalektiği*) → postmodernizm → bugün eleştirel rasyonalite

**kb-mcp kaynak:** Çoğu primary public domain (Voltaire, Diderot, Hume, Kant) — kuvvetli erişim
**Tahmini efor:** 75 saat (6/10)

---

### 12. Kapitalizm'in tarihi
**Alt başlık:** Sözcüğün doğuşundan platform çağına — Werner Sombart'dan Wolfgang Streeck'e

**12-bölüm yayı:**
Kapitalizm sözcüğünün tarihi (Sombart 1902) → Marx'ın çözümlemesi → Weber'in *Protestan Etiği* → Schumpeter "yaratıcı yıkım" → fordizm/keynesçi → Bretton Woods düzeni → 1973 sonrası neoliberalizm → finansallaşma → 2008 krizi → platform/gözetim kapitalizmi

**kb-mcp kaynak:** Marx, Schumpeter, Polanyi, Beckert — güçlü temel; Weber *Protestan Etiği* yeni eklendi (catalog.json)
**Tahmini efor:** 70 saat (6/10)

---

### 13. Şehir/kent düşüncesinin tarihi
**Alt başlık:** Polis'ten mega-kente — siyasi, iktisadi, kültürel mekan

**12-bölüm yayı:**
Aristoteles *polis* → Roma *urbs* → İslam *şehir* (Cordoba, Bağdat) → ortaçağ Avrupa kentleri (Hansa, İtalyan komünleri) → Weber *Stadt* tipolojisi → sanayi şehri (Manchester, Engels) → Chicago Okulu (Park, Wirth) → Lefebvre *La production de l'espace* → Jacobs vs Moses → küresel kent (Sassen) → akıllı şehir, post-pandemik mekan

**kb-mcp kaynak gap:** Lefebvre, Sassen, Jacobs eklenmeli
**Tahmini efor:** 70 saat (6/10)

---

### 14. Toprak/Land kavramının tarihi
**Alt başlık:** Locke'tan toprak iadesine — emek-mixing, enclosure, rant, tapu

**12-bölüm yayı:**
Aristoteles tarım vs ticaret → Roma *ager publicus* → Osmanlı miri arazi (İnalcık-Quataert) → İngiliz *enclosure* → Locke emek-mixing → Henry George *Progress and Poverty* → ortak alan akademisi (Ostrom) → kolonyal toprak el koyma → toprak reformu hareketleri (MST) → toprak iadesi (decolonization) → 21. yy land grabs (Çin, körfez)

**kb-mcp kaynak:** İnalcık, Locke (Schumpeter), Ostrom — iyi temel; Henry George *Progress and Poverty* eklenmeli (public domain)
**Tahmini efor:** 65 saat (5/10)

---

### 15. Çevre/ekoloji düşüncesinin tarihi
**Alt başlık:** Malthus'tan Antroposen'e — doğa, sınır, gezegen

**12-bölüm yayı:**
Malthus *Essay on Population* 1798 → Marsh *Man and Nature* 1864 → Schumacher *Small is Beautiful* → Carson *Silent Sprinğ* 1962 → Hardin "Tragedy of Commons" 1968 → Daly ekolojik iktisat → IPCC raporları → Stern Review 2006 → Klein *This Changes Everything* → Ostrom çoklu-merkezli yönetim → Antroposen tartışması → degrowth

**kb-mcp kaynak gap:** Malthus public domain; Carson, Ostrom var; Klein eklenmeli
**Tahmini efor:** 65 saat (5/10)

---

### 16. İdeoloji kavramının tarihi
**Alt başlık:** Destutt de Tracy'den Žižek'e — yanlış bilinçten ideolojik ehlileştirmeye

**12-bölüm yayı:**
Destutt de Tracy 1796 → Marx *Alman İdeolojisi* + *Kapital* → Mannheim ideoloji vs ütopya → Gramsci hegemonya → Althusser İSA'lar → Žižek Lacan-Marx → çağdaş kültürel çalışmalar (Stuart Hall) → post-truth, deep fake çağı

**kb-mcp kaynak gap:** Mannheim, Althusser, Gramsci, Hall eklenmeli
**Tahmini efor:** 70 saat (6/10)

---

### 17. Devrim kavramının tarihi
**Alt başlık:** İngiliz iç savaşından "renkli" devrime — şiddet, kopuş, dönüşüm

**12-bölüm yayı:**
İngiliz 1640 → Amerikan 1776 → Fransız 1789 → 1848 Avrupa baharı → Paris Komünü 1871 → Rus 1917 → Çin 1949 → 1968 küresel → İran 1979 → Doğu Avrupa 1989 → renkli devrimler 2003-04 → Arap Baharı 2011-12

**Anchor:** Edmund Burke, Marx, Lenin, Mao, Hannah Arendt (*On Revolution*), Theda Skocpol
**kb-mcp kaynak gap:** Burke, Arendt, Skocpol eklenmeli
**Tahmini efor:** 75 saat (6/10)

---

## IV. Tier 4 — Tematik/uygulamalı (daha dar kapsam)

Bunlar daha küçük lensler. 12 bölüm yerine 8-10 bölümle de yapılabilir.

### 18. Kalkınma düşüncesi
**Yay:** Friedrich List → Rosenstein-Rodan büyük itici → Lewis dual economy → bağımlılık okulu (Frank, Cardoso) → Sen capabilities → Acemoğlu-Robinson kurumlar → çağdaş RCT yaklaşımı (Banerjee-Duflo) → Chang gelişmeye karşı küresel kurallar
**Mevcut kaynak:** Chang, Polanyi, North; List eklenmeli
**Efor:** 60 saat (4/10 — kompakt)

### 19. Faiz tarihi
**Yay:** Aristoteles → Aquinas faiz yasakları → Calvin reformu → Mun, Locke 17. yy → Hume → Wicksell doğal vs piyasa faizi → Keynes → Friedman → Bernanke düşük-faiz çağı → Powell faiz artırma → negatif faiz
**Mevcut kaynak:** çok güçlü (Mun, Hume, Marx, Keynes parçaları)
**Efor:** 50 saat (3/10 — en hazır)

### 20. Vergi tarihi
**Yay:** Bodin vergi tekeli → Smith *Wealth* V (4 vergi kuralı) → Mill → progresif vergi → ABD New Deal → AB-OECD BEPS → küresel asgari vergi 2021
**Mevcut kaynak:** Smith, Bodin (Schumpeter), Mill (kısmen); modern OECD raporları
**Efor:** 55 saat (4/10)

### 21. Borç tarihi
**Yay:** Mezopotamya borç temizliği (Hudson) → Roma *nexum* → İslam borç hukuku → İtalyan bankaları → 19. yy hükümet borçları → 1980'ler kalkınma borçları → 1998 LTCM → 2008 mortgage → öğrenci borçları → AB egemen borç krizi → çağdaş Çin borç diplomasisi
**Anchor:** David Graeber *Debt: The First 5000 Years*
**Mevcut kaynak gap:** Graeber eklenmeli; Hudson; Reinhart-Rogoff *This Time Is Different*
**Efor:** 65 saat (5/10)

### 22. Bankacılık tarihi
**Yay:** Babil tapınak finansı → Yahudi-İtalyan ortaçağ bankaları → Medici → Amsterdamsche Wisselbank 1609 → Bank of England 1694 → ABD merkez bankası tartışmaları → Fed 1913 → Bretton Woods → finansallaşma → 2008 sonrası shadow banking
**Anchor:** Charles Kindleberger, Carmen Reinhart, Adam Tooze
**Mevcut kaynak gap:** Kindleberger, Tooze *Crashed*
**Efor:** 60 saat (5/10)

### 23. İslam iktisat düşüncesi
**Yay:** Hz. Peygamber dönemi piyasa düzenlemesi → Ebu Yusuf *Kitab al-Kharaj* → Gazali → İbn Teymiyye → İbn Haldun → Şah Veliyullah Dehlevi → çağdaş İslam iktisadı (Sıddiki, Çapra, Asutay) → katılım bankacılığı pratiği
**Mevcut kaynak:** Çok güçlü Türkçe ikincil literatür temeli (Cengiz Kallek, Sabri Orman, Kayapınar)
**Çapraz bağ:** Merkantilizm Ch9 (Genç-İbn Haldun)
**Efor:** 80 saat (6/10 — kaynak açma süresi yüksek)

### 24. Türkiye'de iktisadi düşünce
**Yay:** Tanzimat ekonomi politiği → 1908 II. Meşrutiyet ekonomi tartışmaları → Cumhuriyet'in kuruluş iktisadı (İktisat Vekâleti) → İzmir İktisat Kongresi 1923 → planlı kalkınma DPT → 24 Ocak 1980 → 2001 krizi reformları → 2002 sonrası → çağdaş heterodoks tartışmalar (Yeldan, Akyüz, Pamuk)
**Mevcut kaynak:** Korkut Boratav *Türkiye İktisat Tarihi*, Pamuk; çok güçlü Türkçe literatür
**Efor:** 75 saat (6/10)

### 25. Osmanlı iktisat düşüncesi
**Yay:** 14. yy ahi gelenek → Defterdar Sarı Mehmed Paşa *Nesayih ül-Vüzera* → Naima → 18. yy iktisat literatürü → Mehmet Şerif Paşa → Sakızlı Ohannes → Mehmet Cavid → Tekin Alp → Cumhuriyet erken dönem
**Mevcut kaynak:** Mehmet Genç *Devlet ve Ekonomi*, Pamuk, İnalcık — güçlü temel
**Çapraz bağ:** Merkantilizm Ch9-10
**Efor:** 70 saat (5/10)

---

## V. Tier 5 — Uzak ihtimal / büyük efor

Bunlar geniş ölçekli; ya 20+ bölüm gerektirir ya da çok özel disiplin yetkinliği lazımdır. Şu an için kaydedip ertelemek mantıklı.

### 26. Felsefe tarihi (uzun yay)
Antik → Helenistik → İslam → skolastik → modern → analitik vs kıtasal → çağdaş. Tek bir kitaba sığmaz; 24-36 bölümlü çoklu cilt.

### 27. Türk düşünce tarihi
İbn Sina'dan günümüze; çok katmanlı (din, edebiyat, felsefe, iktisat). Disiplin yelpazesi geniş.

### 28. Coğrafya/jeopolitik düşüncesi
Ratzel → Mahan → Mackinder → Spykman → Brzezinski → çağdaş Çin "kuşak yol" doktrini. Niş ama önemli.

### 29. Diplomasi tarihi
Westphalia → Viyana 1815 → 1919 Versay → Bretton Woods → 1945 BM → 1975 Helsinki → bugün çok kutuplu düzen.

### 30. Eğitim düşüncesi tarihi
Sokrat → Konfüçyüs → Aquinas → Rousseau *Émile* → Dewey → Freire → Illich → MOOC çağı → AI-tutor. Şu an "öğrenme" konusundaki aciliyet için ilginç olabilir.

### 31. Hak kavramının tarihi
Roma *ius* → doğal hak → Bentham "*nonsense on stilts*" → Hohfeld → 1948 İHEB → 1966 ICCPR/ICESCR → çağdaş hak enflasyonu tartışması. Adalet teması içine sıkıştırılabilir veya bağımsız.

### 32. Suç ve ceza tarihi
Beccaria → Bentham *Panopticon* → Foucault zaten temel referans → restoratif adalet → kitle hapsetme (ABD) → ölüm cezası küresel gerileme.

### 33. Müzik düşüncesi tarihi
Pisagor → Boethius → Rameau → Wagner → Schönberg → Adorno → kayıt çağı → spotify ekonomi politiği. Disiplin spesifik.

### 34. Sanat düşüncesi tarihi
Aristoteles *Poetika* → Aquinas → Vasari → Kant → Hegel *Estetik* → Greenberg → Danto sonrası → NFT/AI sanatı. Disiplin spesifik.

---

## VI. Karar matrisi

### Önceliklendirme kriterleri (her tema 1-5 arası puan)

| Kriter | Açıklama | Ağırlık |
|---|---|---|
| Kavramsal bağ | Mevcut 4 kitabın eksiğini kapatır mı? | 30% |
| Kaynak erişimi | kb-mcp'de yeterli kaynak var mı? | 25% |
| Türkçe açık | Türkçe okurun ulaşamadığı bir tartışmayı açar mı? | 20% |
| Yazma kolaylığı | Düşük efor (60s saat altı) | 15% |
| Özgünlük | Mevcut Türkçe metinlerle örtüşmez mi? | 10% |

### Tier 1 + 2 hızlı tablo

| # | Tema | Bağ | Kaynak | TR açık | Kolaylık | Özgün | Toplam |
|---|---|---|---|---|---|---|---|
| 4 | Para'nın tarihi | 5 | 5 | 4 | 5 | 4 | **4.7** |
| 1 | Adalet teorisi | 5 | 3 | 4 | 3 | 4 | **3.9** |
| 6 | Emek tarihi | 5 | 4 | 4 | 4 | 4 | **4.3** |
| 5 | Sermaye tarihi | 5 | 3 | 4 | 3 | 5 | **4.0** |
| 7 | Demokrasi | 4 | 3 | 4 | 3 | 4 | **3.6** |
| 8 | Özgürlük | 4 | 4 | 4 | 4 | 4 | **4.0** |
| 9 | Eşitlik | 4 | 3 | 4 | 3 | 4 | **3.6** |
| 2 | Bilim sosyolojisi | 3 | 3 | 5 | 2 | 5 | **3.5** |
| 3 | Hukuk düşüncesi | 4 | 2 | 5 | 2 | 5 | **3.4** |

### Önerilen sıralama (puanlama bazlı, indirim katsayılı)

1. **Para'nın tarihi** — en yüksek puan, mevcut kaynak temeli en güçlü, Değer kitabının doğal devamı
2. **Emek kavramının tarihi** — Mülkiyet ↔ Değer köprüsünü doğal kapatır
3. **Sermaye kavramının tarihi** — Değer/Mülkiyet üçgenini tamamlar; "para-emek-sermaye" üçlüsünü kapatır
4. **Özgürlük kavramının tarihi** — Egemenlik kitabının doğal devamı
5. **Adalet teorisi** — spec'te önerilen sıra; Egemenlik-Özgürlük-Adalet üçgenini tamamlar
6. **Demokrasi düşüncesi** — Egemenlik kitabını derinleştirir
7. **Eşitlik kavramının tarihi** — Adalet kitabıyla yakın; sıralama esnek
8. **Bilim sosyolojisi** — meta-tema; tüm önceki kitaplara geri-yansıma sağlar
9. **Hukuk düşüncesi tarihi** — Egemenlik+Mülkiyet bağı güçlü ama teknik

---

## VII. Çapraz-tema sentez ihtimalleri (uzun vade)

8+ kitap birikince doğal hâle gelecek sentez denemeleri:

### "Modern öncesi" / "modern" hattı
Aristoteles → Aquinas → İbn Haldun → erken modern hat. Her temada görünen aynı isimleri **karşılaştırmalı** bir kitapta toplamak (örn. "Aristoteles'in iktisadi düşüncesi" — Değer Ch2, Mülkiyet Ch2, Egemenlik Ch2, Adalet Ch3'ten bir yeniden derleme).

### "20. yy Frankfurt" hattı
Adorno, Horkheimer, Marcuse, Habermas → birden çok temada görünüyor; bağımsız bir kitap mümkün.

### "Türkiye düşünce tarihi" hattı
Mehmet Genç, Pamuk, İnalcık, Boratav → Merkantilizm + Mülkiyet + Egemenlik kitaplarındaki Türk-Osmanlı malzemesini bir araya getiren bir sentez.

### Kavramsal sözlük (Wikipedia tarzı çapraz referans)
Her kavram için (rant, asabiyye, *dominium*, *sovereign exception*) bir sayfa; içeriği farklı kitaplardaki bölümlere link verir. theme-registry'nin bir genişletmesi olur.

---

## VIII. Süreç ve karar noktaları

### Pilot bölüm modeli (Mülkiyet'ten beri uygulanan)
1. Tema kararı verilir (bu doküman içinden seç).
2. theme-registry'ye stub eklenir, book.html + _index.json oluşturulur.
3. Bölüm 1 yazılır (~1800-2000 kelime).
4. Kullanıcı okur → "devam", "yön değiştir" veya "dur" der.
5. Devam derse 11 bölüm tek atımda yazılır (2-3 bölüm/commit).

### Standart commit deseni
- `feat(<tema>): infrastructure + chapters 1-2`
- `feat(<tema>): chapters 3 + 4 — <konu>`
- ...
- `feat(<tema>): chapters 11 + 12 + closure — <konu>`

### "Bu temayı atla" kriteri
Eğer kaynak araştırması 4 saatten fazla sürerse ve birincil kaynaklar hâlâ yetersizse, o temayı erteleyip daha hazır olanına geç.

### Şu anki durum (2026-05-24)
- Tamamlanmış: 4 kitap (Merkantilizm, Değer, Mülkiyet, Egemenlik)
- Tahmini toplam kelime: ~80-90K
- kb-mcp source count: 20+ birincil, 12+ ikincil
- Bir sonraki tema kararı bekleniyor.

---

## Ek: Listelenmemiş ama akla gelen diğer adaylar

Kısa not düşülmüş şekilde; tier ayrımı yapılmamış:

- **İktisat metodolojisinin tarihi** — Smith'in *TMS*'inden Friedman F-twist'e ve sonrası Sen "rational fools"
- **Aile kavramının tarihi** — Aristoteles *oikos*'tan çağdaş feminist eleştirisine
- **Ulus kavramının tarihi** — Renan, Anderson *Imagined Communities*, Gellner, Smith (Anthony)
- **Sınıf kavramının tarihi** — Marx → Weber → Bourdieu → çağdaş prekarya
- **Sömürgecilik düşüncesinin tarihi** — Bartolomé de las Casas → Mill → Fanon → çağdaş postkolonyalizm
- **Para felsefesi (Simmel hattı)** — Simmel *Philosophie des Geldes* 1900'ü merkeze koyan, Para'nın tarihi'nden ayrı bir okuma
- **Risk kavramının tarihi** — Bernstein *Against the Gods*: olasılığın icadından ChatGPT belirsizliğine
- **Zaman kavramının tarihi** — Augustinus → Newton → Bergson → çağdaş "hızlanma" toplumu (Hartmut Rosa)
- **Mekan kavramının tarihi** — Kant → Heidegger → Lefebvre → Harvey "time-space compression"
- **Beden kavramının tarihi** — Descartes düalizmi → Foucault disiplin → çağdaş trans-humanism

Bu listeler, "konsept-merkezli kitap" formatının ne kadar üretken olduğunu gösteriyor. Mevcut 4 kitabın deseni, 30+ benzer kitabı destekler.

---

**Sonuç:** Yapılacak iş, kitap eksikliği değil; **karar** ve **zaman** eksikliği. Bir sonraki temayı seçerken üç soruyu sorun:

1. Hangisini **siz** en çok merak ediyorsunuz?
2. Hangisi mevcut 4 kitabın bir okuruna en doğal görünür?
3. Hangisi yazıldıktan sonra **referans değer** taşır (Wikipedia düzeyinde değil, ders kitabı düzeyinde)?

Cevap üçü için aynıysa, başlayın. Cevap farklıysa, (1) kazanır — okurun ilgisi tükendiğinde hiçbir kitap bitirilemez.
