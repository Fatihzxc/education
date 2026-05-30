# Para, Borç ve Finans Tasarımı

**Tarih:** 2026-05-30  
**Durum:** Brainstorm kararı uygulandı; 12/12 bölüm tamamlandı  
**Kapsam:** Yeni uzun-form kitap: `para-borc-finans/`

## 1. Temel Karar

`Para, Borç ve Finans` tek entegre kitap olacak. Para, borç, faiz ve bankacılığı ayrı kitaplara bölmek yerine aynı tarihsel-mekanik hatta okuyacağız. Çünkü okurun asıl kavraması gereken şey şudur: para yalnızca değişim aracı değildir; borç yalnızca geri ödenecek miktar değildir; finans da yalnızca banka tekniği değildir. Bunlar birlikte güveni, geleceği, iktidarı ve gündelik hayatı bugüne bağlayan kurumlardır.

Bu kitap bu yüzden en basit sorudan başlayacak: "İnsanlar neden aralarında bir ödeme vaadine inanır?" Sonra adım adım sikke, borç, faiz, riba, kamu kredisi, merkez bankası, finansallaşma, kriz ve bugünkü dijital para tartışmasına ilerleyecek.

Okuma hissi özellikle felsefe kitabı gibi olacak: bölüm önce varsayımı kuracak, sonra akıl yürütme basamaklarını gösterecek, sonra hangi argümana ulaştığını açıkça söyleyecek. Okur yalnız bilgi almayacak; bir fikrin nasıl inşa edildiğini görecek.

## 2. Okuma Merceği

Her bölüm ilk taslakta altı felsefi katmanla kurulacak:

1. **En basit fikir:** Okur önce meseleyi gündelik örnekle kavrar.
2. **Temel varsayım:** Bölüm hangi insan, toplum, güven, zaman veya devlet varsayımıyla başlıyor?
3. **Akıl yürütme:** Varsayımdan sonuca hangi basamaklarla gidiliyor?
4. **Argüman:** Bölümün savunduğu ana düşünce açıkça yazılır.
5. **Kök sebep ve karşı okuma:** Bu fikir hangi maddi-siyasal problemi çözüyor, kimin gözünden makul, kim buna itiraz ediyor?
6. **İleri düzey okuma:** Görünmeyen varsayım, teori içi gerilim veya tarihsel-politik sonuç açılır.

Bilgelik seviyesi turunda bu omurgaya dört ek katman bağlanacak:

7. **Yanlış sezgi:** Okurun ilk bakışta doğru sanabileceği ama eksik kalan yorum açıkça kırılır.
8. **Tarihsel sahne:** Soyut argüman bir dönemin somut kurumu, krizi veya insan deneyimiyle yere indirilir.
9. **Bilgelik sorusu:** Okurun para, borç ve finans olaylarını değerlendirirken soracağı kontrol sorusu verilir.
10. **Bugüne bakan sonuç:** Bölüm kredi kartı, kira, konut, devlet borcu, merkez bankası, kripto veya dijital ödeme gibi bugünkü karşılıklara bağlanır.

## 3. Bölüm Yayı

1. **Niye para, borç ve finans?** — Para güven, borç zaman, finans örgütlenmiş vaat olarak tanıtılır.
2. **Paranın en basit hali** — Ölçü, değişim aracı, değer saklama; ama her işlevin toplumsal güvene bağlı olduğu gösterilir.
3. **Borç: geleceğin bugüne bağlanması** — Borç, insan ilişkisi ve iktidar ilişkisi olarak açıklanır.
4. **Faiz: zamanın fiyatı mı, güç ilişkisi mi?** — Faiz hem bekleme bedeli hem de borçlunun kırılganlığı üzerinden okunur.
5. **Antik dünya: sikke, borç affı ve yurttaşlık** — Mezopotamya borç temizliği, Yunan-Roma borç gerilimleri, Aristoteles.
6. **Din, ahlak ve riba** — Skolastik faiz yasağı, İslam riba tartışması, adil kazanç sorusu.
7. **Erken modern para ve devlet kredisi** — Savaş, hazine, ticaret, kamu borcu ve merkezileşme.
8. **Bankalar ve merkez bankaları** — Mevduat, kredi yaratımı, son borç verme mercii, para egemenliği.
9. **Kapitalizm ve finansallaşma** — Bankacılıktan varlık piyasalarına; üretim, rant ve spekülasyon ayrımı.
10. **Krizler: 1929, 1971, 2008** — Kriz finansın kaza hali değil, güven zincirinin kırılması olarak okunur.
11. **Osmanlı ve Türkiye hattı** — Akçe, tağşiş, dış borç, Düyun-u Umumiye, enflasyon, kredi ve hane bütçesi.
12. **Bugün: kart, konut, kripto, CBDC** — Gündelik borçlu hayat ve dijital para düzeni.

## 4. Proje Standardı

Bu kitap `turkish-warm-explainer` ve `AGENTS.md` yazım standardına göre yazılacak:

- En basit fikirle başlayacak, sonra karmaşıklığı artıracak.
- Teknik terim hemen sade biçimde açıklanacak.
- Her bölümde "Kök sebep ve karşı okuma" bulunacak.
- Her bölümde "İleri düzey okuma" bulunacak.
- Her bölümde "Temel varsayım", "Akıl yürütme" ve "Bölümün argümanı" açık başlıklarla yer alacak.
- Kazananların ve finansal merkezlerin bakışı varsayılan hakikat gibi sunulmayacak.
- Borçlu, ücretli, köylü, küçük esnaf, kiracı, göçmen ve hane bütçesi görünür kalacak.

## 5. Uygulama

Yeni kitap klasörü:

```text
para-borc-finans/
├── book.html
└── chapters/
    ├── _index.json
    ├── 01-niye-para-borc-finans.md
    ├── ...
    └── 12-bugun-kart-konut-kripto.md
```

Registry entegrasyonu:

- `modules/theme-registry.js` içinde `MerkantilizmThemes` listesine `para-borc-finans` eklenecek.
- Status bilgelik seviyesi derinleştirme turundan sonra `completed` olacak.
- `homeGroup` değeri `main` olacak; çünkü kitap ana katalogda tamamlanan çekirdek kitaplar arasına taşındı.
- `MerkantilizmPlannedThemes` içinden aynı slug çıkarılacak; planlanan şablon artık gerçek kitap olacak.

## 6. Doğrulama

Tamamlanmış saymak için:

- `para-borc-finans/book.html` mevcut olmalı.
- `para-borc-finans/chapters/_index.json` 12 bölümü göstermeli.
- Her bölüm dosyası mevcut olmalı.
- Her bölümde "Kök sebep ve karşı okuma" ve "İleri düzey okuma" başlıkları bulunmalı.
- Registry kitabı readable theme olarak göstermeli; planned placeholder listesinde kalmamalı.
- `node --test tools/navigation-pages.test.mjs` geçmeli.
- Tarayıcıda `http://127.0.0.1:8772/para-borc-finans/book.html#bolum/1` yüklenmeli.
