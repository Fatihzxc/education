# Emek ve Çalışma Tasarımı

**Tarih:** 2026-06-02
**Durum:** Uygulamaya alındı
**Kapsam:** Yeni uzun-form kitap: `emek-calisma/`

## Temel Karar

`Emek ve Çalışma` tek entegre kitap olacak. Emek yalnız üretim faktörü, çalışma yalnız işyeri davranışı gibi anlatılmayacak. Kitap, insan bedeninin, zamanının, dikkatinin, bakımının ve yaratıcılığının hangi kurumlar içinde değere çevrildiğini soracak.

Ana soru şudur: **Kim çalışır, kim yönetir, emeğin değerini kim belirler?**

Bu soru Değer, Mülkiyet, Egemenlik ve Para-Borç-Finans kitaplarının doğal devamıdır. Çünkü değer üretilmeden bölüşülemez; mülkiyet emekle meşrulaştırılabilir; egemenlik çalışmayı zorunlu, serbest veya disiplinli hale getirebilir; borç ise gelecekteki emeği bugüne bağlar.

## Okuma Merceği

Her bölüm aynı felsefi ve pedagojik omurgayla yazılacak:

1. **En basit fikir:** Okur meseleyi gündelik örnekle kavrar.
2. **Temel varsayım:** Bölüm hangi insan, beden, zaman, zorunluluk veya kurum varsayımıyla başlıyor?
3. **Akıl yürütme:** Varsayımdan sonuca hangi basamaklarla gidiliyor?
4. **Bölümün argümanı:** Ana düşünce açıkça söylenir.
5. **Kök sebep ve karşı okuma:** Fikri doğuran maddi-siyasal problem, baskın bakış, karşı fikir ve halkta görünüm açılır.
6. **İleri düzey okuma:** Görünmeyen varsayım, teori içi gerilim veya tarihsel-politik sonuç derinleşir.
7. **Yanlış sezgi:** Okurun kolay ama eksik yorumunu kırar.
8. **Tarihsel sahne:** Soyut argüman bir kurum, kriz veya insan deneyimiyle somutlaşır.
9. **Bilgelik sorusu:** Okurun kendi çağında soracağı kontrol sorusu verilir.
10. **Bugüne bakan sonuç:** Bölüm platform işi, yapay zeka, bakım emeği, işsizlik, sendika, kira ve borç gibi bugünkü yaşama bağlanır.

## Bölüm Yayı

1. **Niye emek ve çalışma?** — Emek beden, zaman ve geçim sorusu olarak kurulur.
2. **Antik dünya: emek, kölelik ve boş zaman** — Özgürlük fikrinin görünmeyen emek zemini.
3. **Toprak, serflik ve angarya** — Emek toprağa, statüye ve yükümlülüğe bağlanır.
4. **Loncalar ve zanaat emeği** — Ustalık, kalite, hiyerarşi ve meslek ahlakı.
5. **İlkel birikim ve zorla emek** — Enclosure, sömürge köleliği ve ücretli emeğin doğuş koşulları.
6. **Smith: iş bölümü ve verimlilik** — Üretkenlik artışı ile zihinsel daralma gerilimi.
7. **Marx: yabancılaşma ve artı-değer** — Emek gücü, sömürü ve sermaye ilişkisi.
8. **Taylor ve Ford: zamanın ölçülmesi** — Bilimsel yönetim, montaj hattı ve beden disiplini.
9. **Polanyi: emek meta mı?** — Piyasa toplumu ve insanın kurgu meta haline gelmesi.
10. **Bakım emeği ve feminist iktisat** — Ev içi emek, yeniden üretim ve görünmeyen değer.
11. **Sendika, sosyal devlet ve güvencesizlik** — İşçi hareketi, güvence ve neoliberal kırılma.
12. **Platform işi, yapay zeka ve geleceğin emeği** — Algoritmik yönetim, gig work ve insan emeğinin yeni sınırı.

## Proje Entegrasyonu

- `emek-calisma/` altında `book.html`, `chapters/_index.json` ve 12 Markdown bölüm olacak.
- `modules/theme-registry.js` içinde `emek-calisma`, `MerkantilizmThemes` listesine `completed` + `main` olarak taşınacak.
- `MerkantilizmPlannedThemes` içinden `emek-calisma` çıkarılacak.
- `tools/navigation-pages.test.mjs`, Emek kitabını completed wisdom book olarak doğrulayacak.

## Kabul Eşiği

- 12/12 bölüm `completed`.
- Her bölüm en az 1000 kelime.
- Her bölüm 10 zorunlu başlığı taşımalı.
- Ana sayfa Emek kitabını ana kitaplar içinde göstermeli.
- Planlanan temalarda Emek kalmamalı.
- `node --test tools/navigation-pages.test.mjs` geçmeli.
- Tarayıcıda `http://127.0.0.1:8772/emek-calisma/book.html#bolum/1` yüklenmeli ve konsol temiz olmalı.
