# İktisat Düşüncesinin Haritası — Tasarım Belgesi

Tarih: 2026-05-28
Statü: onaylandı (brainstorming → spec)
Tür: yeni tema (sentez / üst-kitap)

## 1. Amaç ve konum

Kütüphanede zaten altı derin tema var (`merkantilizm`, `fizyokrasi`, `klasik-iktisat`,
`deger`, `mulkiyet`, `egemenlik`). Bunların dördü iktisadi düşünceyi *ekol ekol, derinlemesine*
işliyor. Eksik olan, bu ekolleri **tek bir soy ağacında bağlayan, eleştirel bir sentez
katmanı**dır.

`iktisat-haritasi` bu boşluğu doldurur. İki işlevi var:

1. **Sentez** — Merkantilizmden monetarizme uzanan zinciri tek bir harita ve tek bir
   analitik mercek altında toplar; derin temalara çapraz-bağ verir, kazıyı tekrarlamaz.
2. **Özgün katkı** — Post-klasik düğümler (Marshall/neoklasik, Keynes, monetarizm) için
   kütüphanede ilk derli toplu yer burasıdır; mevcut temalar marjinalizm/Marx eşiğinde kesiliyor.

**Konum kuralı:** Her ekol bölümü, derinini ilgili kardeş kitaba devreder
("derini `klasik-iktisat/04`'te") ve burada yalnızca *sentez + mercek* sunar.

## 2. Merkez tez (kitabın omurgası)

Kitap boyunca işletilen tek bir analitik mercek vardır:

> Her büyük teorik geçiş **aynı anda** (a) gerçek bir analitik ilerleme **ve** (b) belirli bir
> yükselen sınıfın/koalisyonun meşrulaştırılmasıdır; bu iki katman *ayrılamaz biçimde* iç içedir.

Bu merceğe iki yardımcı ilke eşlik eder:

- **Anti-Whig uyarısı:** "Galip gelen doğruydu" okuması (Whig tarihçiliği) tam da kaçınılması
  gereken yanlılıktır.
- **"Hiçbir ekol tam ölmez":** Marx, marjinalizm, Keynes — hepsinin bugün canlı versiyonları var.

Kapanışta mercek *okurun kendi çağına* çevrilir: bugünün teorileri de konumlanmıştır.

## 3. Genealoji haritası (görsel)

Statik PNG yerine **tema-duyarlı inline HTML/CSS diyagramı**, Bölüm 1'e gömülü. `book.css`
değişkenleriyle (renkler, kenarlık, metin) koyu/açık moda uyumlu. Diyagram bir `.eco-map`
prefiksiyle scope'lanmış küçük bir `<style>` bloğu + kutular/bağlantılar içerir; marked.js ham
HTML'i geçirir, reader.js makaleye enjekte eder.

**Zincir:** Merkantilizm → Fizyokrasi → Klasik → ⑂ ( Marx | Marjinalizm ) → Neoklasik (Marshall)
→ Keynes → Monetarizm.

**Renk lejantı (kullanıcının görseline göre):**

- 🟦 **teal** — emek-değer ailesi: **Klasik, Marx**
- 🟪 **mor** — marjinalist / denge soyu: **Marjinalizm, Neoklasik, Monetarizm**
- **kök tonu** — pre-klasik: **Merkantilizm, Fizyokrasi**
- **mavi/ayrı ton** — talep/müdahale: **Keynes** (monetarizm onu kırıp mor geleneğe döner)

Diyagramın altında kısa bir lejant ve "düz zincir yanılsaması" uyarısı (anti-Whig) yer alır.

## 4. Bölüm yapısı (8 bölüm)

Sentez yoğunluğu: bölüm başına ~1.800–2.800 kelime (derin temaların 3.500–6.000'inden hafif).

| # | slug | Başlık | Düğüm | Renk |
|---|------|--------|-------|------|
| 1 | `01-nasil-okumali-harita` | Nasıl okumalı: harita, iki katman, anti-Whig | yöntem + HARİTA | — |
| 2 | `02-ilk-kopus-merkantilizm-fizyokrasi` | İlk kopuş: maden stoğundan *produit net*'e | Merkantilizm→Fizyokrasi | kök |
| 3 | `03-klasik-sentez-smith-emek-deger` | Klasik sentez: Smith ve emek-değer | Klasik | teal |
| 4 | `04-catallanma-marx-arti-deger` | Çatallanma I — Marx: emek-değerin radikalleşmesi | Marx | teal |
| 5 | `05-catallanma-marjinalist-devrim` | Çatallanma II — Marjinalist Devrim (1871) | Marjinalizm | mor |
| 6 | `06-marshall-neoklasik-terim-tuzagi` | Marshall ve neoklasik: bir terim tuzağı | Neoklasik | mor |
| 7 | `07-keynes-monetarizm` | Keynes → Monetarizm: Buhran, müdahale, karşı-devrim | Keynes/Monetarizm | mavi/mor |
| 8 | `08-kapanis-hicbir-ekol-olmez` | Kapanış: hiçbir ekol ölmez — mercek kendine döner | bugün + yanlılık | — |

### Bölüm özetleri

- **1 — Nasıl okumalı.** Yöntem bölümü: iki-katman tezi, anti-Whig, "hiçbir ekol ölmez",
  renk mantığı; ve genealoji HARİTASI. Kitabın kardeş temalarla ilişkisi (sentez vs kazı).
- **2 — İlk kopuş.** Merkantilizm "tek ekol bile değildi" (Mun, Colbert — broşür + politika).
  Fizyokrasi analitik çürütme (*produit net*, yalnızca toprak) + Fransız toprak sahibi sınıfının
  çıkarı (tek vergi toprağa). İki-katmanın ilk net örneği. → `merkantilizm/`, `fizyokrasi/`.
- **3 — Klasik sentez.** Smith hem "zenginlik=maden" hem "yalnızca tarım" darlığını aşar;
  değer=emek+işbölümü, görünmez el. Çıkar katmanı: Corn Laws etrafında yükselen sanayi/ticaret
  burjuvazisinin serbest ticaret talebi. → `klasik-iktisat/`, `deger/`.
- **4 — Marx.** Emek-değerin bıraktığı bomba: "değer emekten geliyorsa kârı kim yaratıyor?"
  → artı-değer, sömürü. teal aile. → `deger/07`, `mulkiyet/08`.
- **5 — Marjinalist Devrim.** 1871 Jevons/Menger/Walras eşzamanlılığı; değer=marjinal fayda.
  Kitabın *en sivri* sorusu burada: dürüst analitik atılım mı, emek-değeri (ve Marx kapısını)
  kapatan ideolojik manevra mı? Cevap: belirli oranda ikisi birden. → `deger/08`, `deger/09`.
- **6 — Marshall/neoklasik.** Terim tuzağı: Marshall 1890 sentezi (arz=maliyet + talep=fayda) =
  "neoklasik iktisat"; "neoklasik sentez" = savaş sonrası Samuelson'ın Keynes+neoklasik birleşimi.
  İkisini ayırmak.
- **7 — Keynes → Monetarizm.** Büyük Buhran Say Yasası'nı çökertir; Keynes (1936) toplam talep +
  devlet müdahalesi. 1970'ler stagflasyonu Keynesçi konsensüsü kırar; Friedman/Hayek karşı-devrim.
  Monetarizm = denge/marjinalist geleneğe dönüş (mor).
- **8 — Kapanış.** Hiçbir ekol ölmez (bugünkü canlı versiyonlar); anti-Whig; ve mercek okurun
  kendi çağına: bugünün teorileri de konumlanmış. → tüm kardeş kitapların 12. bölümlerine bağ.

## 5. Tekrarlayan bölüm iskeleti (her ekol bölümü)

1. **Analitik atılım** — bu ekol neyi çözdü, hangi hatayı aştı.
2. **Sınıf/çıkar katmanı** — kimin yükselişine/talebine denk düştü.
3. **Ayrılamazlık** — ikisinin tek metinde birlikte oluşu (ideoloji ≠ yalan).
4. **Çapraz-bağ** — derini hangi kardeş kitapta.
5. **Bugün canlı versiyonu** — ekolün modern yankısı.

## 6. Teknik plan ve konvansiyonlar

- **Dosyalar:**
  - `iktisat-haritasi/book.html` — `merkantilizm/book.html`'den kopya; başlık, `<title>`,
    açıklama ve kardeş-kitap linkleri güncellenir; modül yolları `../modules/...` korunur.
  - `iktisat-haritasi/chapters/_index.json` — 8 bölüm manifesti (`num`, `slug`, `title`,
    `subtitle`, `estWords`, `status`).
  - `iktisat-haritasi/chapters/NN-*.md` — 8 bölüm markdown.
  - `modules/theme-registry.js` — 7. tema kaydı (landing kartı otomatik).
- **Dipnot konvansiyonu (kritik — fizyokrasi/klasik derslerinden):** gövdede `^[N]`, Kaynakça'da
  `[^N]:`. Her bölüm: `## Kaynakça`, H2 alt-başlıklar (`X.Y`), "kardeş kitap" çapraz-referansları.
  Bölüm bittiğinde dipnot bütünlük testi (cited ⊆ defined, artan sıra) çalıştırılır.
- **Harita stili:** `book.css` değişkenleri (`--accent`, `--text-primary`, `--border`, vb.)
  + `.eco-map` scope'lu inline `<style>`; LaTeX YOK (MathJax yüklü değil), matematik gerekirse
  Unicode.
- **Diller/ton:** Türkçe akademik, mevcut temalarla aynı; İngilizce teknik terimler italik.

## 7. Kapsam dışı (YAGNI)

- İnteraktif JS concept-map modülü yok (statik inline diyagram yeterli).
- Derin biyografi/kazı yok (kardeş temalara devredilir).
- MCP/quiz/timeline entegrasyonu yok.
- Yeni paylaşımlı modül veya `book.css` değişikliği yok (harita kendi scope'unda).

## 8. Başarı ölçütü

- 8 bölüm `draft`; toplam ~16–22K kelime.
- Landing'de 7. kart otomatik görünür; `book.html#bolum/1` haritayı koyu/açık modda doğru render eder.
- Tüm dipnotlar çalışır (bütünlük testi temiz); kardeş-kitap çapraz-bağları tutarlı.
- Merkez tez (iki katman + anti-Whig) her ekol bölümünde görünür biçimde işler.
