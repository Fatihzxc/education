# Education repo'sunun genişletme tasarımı

**Tarih**: 2026-05-24
**Konum**: github.com/Fatihzxc/education
**Durum**: Brainstorm tamamlandı, implementation plan üretilecek

## Context

Merkantilizm projesi başarıyla tamamlandı:
- 12 bölümlük uzun-form kitap (~33,000 kelime), book.html + chapters/
- kb-mcp HTTP bridge: BM25 + sentence-transformer semantic + verify_claim hybrid
- Eski interaktif playground appendix'e taşındı, hâlâ çalışır
- A11y düzeltmeleri, focus trap, mobil responsive, MCP topbar gösterge, cache-disabled dev server

Şimdi proje **tek-kitap-tek-konu**'dan **çoklu-tema-multi-disiplin** öğrenme repo'suna evrilecek.

## Stratejik kararlar

Aşağıdaki seçimler kullanıcıyla yapılan brainstorm sonucudur (geri çekme olursa spec tekrar gözden geçirilir):

| Eksen | Karar |
|---|---|
| **Repo kimliği** | Sosyal bilimler kavşağı (Stanford SEP + Cambridge HET merged) |
| **İçerik mimari** | Tematik kesişmeler — disiplin değil tema önce |
| **İlk yeni tema** | "Değer kavramının tarihi" (Merkantilizm'in doğal devamı) |
| **Yöntem** | Sadece okuma + mevcut altyapı reused; yeni interaktif öğe yok |
| **Repo mimarisi** | Tema-başına subfolder + landing page |
| **Üretim süreci** | Claude Opus tek tek yazar (Merkantilizm formülü) |
| **Hız** | ~6-8 hafta/tema, ~5-6 tema/yıl, ~2-3 yılda repo "olgun" |

## 1. Repo Mimarisi

```
education/
├── index.html              # YENİ — landing; tema kartları
├── styles/
│   ├── book.css            # mevcut, ortak
│   └── landing.css         # YENİ — kart grid
├── modules/                # mevcut + birkaç eklenti
│   ├── book/               # reader/toc/progress — tema-agnostik
│   ├── content-fragments/  # her tema kendi fragment'larını burada (namespace'li)
│   ├── theme-registry.js   # YENİ — tema metadata (~60 satır)
│   ├── mcp-config.js, terminology.js, bookmarks.js, vs.
│   └── ...
├── merkantilizm/           # mevcut, dokunulmaz
│   ├── book.html
│   ├── chapters/
│   └── appendix/playground.html
├── deger/                  # YENİ — ilk yeni tema
│   ├── book.html           # merkantilizm/book.html'in kopyası, chapter path farklı
│   └── chapters/
│       ├── _index.json
│       └── 01..12-*.md
├── kb-mcp/                 # mevcut, ORTAK (tüm temalar aynı havuzu kullanır)
├── sources/                # mevcut, ORTAK
├── docs/superpowers/specs/ # design docs (bu dosya dahil)
├── serve.py                # mevcut no-cache dev server
└── README.md
```

**Temel ilkeler**:
- `merkantilizm/` tamamen dokunulmaz. Yeni iş, yan klasörlerde olur.
- `modules/`, `kb-mcp/`, `sources/` ORTAK — tüm temalar paylaşır.
- `kb-mcp` ortak çünkü: Aristoteles hem "değer" hem "egemenlik" temasında kullanılabilir; tek havuz mantıklı.
- Her tema kendi `book.html`'ini taşır (HTML kopyası), çünkü chapter path'i farklı.
- Topbar TOC'ten "Diğer Temalar" linki tüm tema'lara ulaşır.

## 2. Landing Page (yeni `/index.html`)

```html
<!doctype html>
<html lang="tr" data-theme="dark">
  <head>...</head>
  <body>
    <header>
      <h1>Sosyal Bilimler Kütüphanesi</h1>
      <p class="subtitle">Tematik kesişmeler — iktisat, felsefe, hukuk, siyaset bilimi</p>
    </header>
    <main class="theme-grid">
      <a class="theme-card draft" href="merkantilizm/book.html">
        <h2>Merkantilizm</h2>
        <p>16-18. yy iktisat düşüncesi; Osmanlı ve Batı perspektifinden</p>
        <span class="status">12 bölüm · tamamlandı</span>
      </a>
      <a class="theme-card pending" href="deger/book.html">
        <h2>Değer kavramının tarihi</h2>
        <p>Aristoteles'ten Sen'e — emek-değer, marjinalizm, kapabiliteler</p>
        <span class="status">12 bölüm · taslak</span>
      </a>
      <!-- daha sonra eklenecek tema kartları -->
    </main>
    <footer>
      <a href="#">Roadmap</a> · <a href="appendix/">Appendix</a> · github.com/Fatihzxc/education
    </footer>
  </body>
</html>
```

Mevcut `/index.html` zaten 10-satırlık redirect — onu landing'e çevirmek geri-uyumluluğu bozar (book.html kısayolu artık landing). Bu kabul edilebilir; eski URL'leri kullanan yok.

## 3. theme-registry.js (yeni modül, ~60 satır)

```javascript
window.MerkantilizmThemes = [
  {
    slug: 'merkantilizm',
    title: 'Merkantilizm',
    subtitle: '16-18. yy iktisat düşüncesi',
    chapterCount: 12,
    status: 'completed',
    primaryAuthors: ['Mun', 'Smith', 'Colbert', 'Genç', 'Pamuk', 'İbn Haldun'],
  },
  {
    slug: 'deger',
    title: 'Değer kavramının tarihi',
    subtitle: "Aristoteles'ten Sen'e",
    chapterCount: 12,
    status: 'draft',
    primaryAuthors: ['Aristoteles', 'Aquinas', 'Smith', 'Ricardo', 'Marx', 'Menger', 'Jevons', 'Marshall', 'Sen'],
  },
  // ...
];
```

Landing bu listeden kartları üretir. Cmd+K palette de bu listeyi okuyup "tema değiştir" sonuçları gösterebilir (ileride).

## 4. İlk Yeni Tema: "Değer Kavramının Tarihi"

### Bölüm haritası (~40,000 kelime, 12 bölüm)

| # | Başlık | Çekirdek kaynaklar | Merkantilizm bağlantısı |
|---|---|---|---|
| 1 | Niye "değer"? — terminoloji sorunu | Aristoteles ekon/krematistik, Marx use/exchange ayrımı | Bölüm 1 (terim arkeolojisi) |
| 2 | Antik temeller — adil değiş | Aristoteles Nikomakhos V, Plato Devlet | (yeni) |
| 3 | Skolastik fiyat doktrini | Aquinas Summa II-II, Salamanca okulu | Aquinas zaten kb'de |
| 4 | İbn Haldun'un emek-değer çekirdeği | Mukaddime II/695, 713 | **Bölüm 8'in DERINLEŞMESI** |
| 5 | Smith'in büyük sentezi | WoN I.5-7 | Bölüm 9'un genişlemesi |
| 6 | Ricardo ve emek-değer'in inceltilmesi | Principles 1817 | (yeni) |
| 7 | Marx'ın eleştirisi | Kapital I | (yeni) |
| 8 | Avusturya okulu — sübjektif değer | Menger 1871, Böhm-Bawerk | (yeni) |
| 9 | Jevons ve Walras — marjinalist devrim | Jevons 1871, Walras Eléments | (yeni) |
| 10 | Marshall sentezi — talep + arz | Principles 1890 | (yeni) |
| 11 | 20. yy Cambridge controversy + Sraffa | Sraffa 1960; neo-Ricardyen | (yeni) |
| 12 | Sen, kapabiliteler, değerin yeni anlamı | Sen Inequality Re-examined | (yeni) |

### Eksik kaynaklar (eklenmesi gerekir)

✓ kb-mcp'de zaten: Aquinas, Mukaddime, Smith WoN, Hume, Bodin, Steuart, Pamuk, Genç, Heckscher, Magnusson, Reinert, Chang, Beckert, Koçi Bey, Hörnigk.

Eklenecek (büyük çoğunluğu **public domain**, kalanlar fair-use kısa alıntı):
- Marx — *Das Kapital* Cilt I (Almanca orijinal 1867 PD; İng. Moore-Aveling çevirisi PD; archive.org)
- Menger — *Grundsätze der Volkswirtschaftslehre* 1871 (Alm. PD; Mises Institute İng. çeviri)
- Jevons — *Theory of Political Economy* 1871 (PD; gutenberg.org)
- Walras — *Eléments d'économie politique pure* 1874 (Fr. PD; Jaffé İng. çeviri kütüphane)
- Marshall — *Principles of Economics* 1890 (PD; archive.org)
- Sraffa — *Production of Commodities* 1960 (telifli; fair-use ≤15-kelime alıntılarla)
- Sen — *Inequality Re-examined* 1992 (telifli; aynı strateji)
- Ricardo — *Principles of Political Economy and Taxation* 1817 (PD)

**Kaynak temin saati**: ~1 saat / kitap (indir, sources/'a koy, reindex tetikle, catalog.json'da author/year doldur). Toplam: ~8 saat (bazıları zaten elden temin).

**Kaynak ekleme süreci** (her biri ~5 dk):
1. PDF'i `sources/secondary/` (ya da primary) altına koy
2. Reindex panelinden "BM25 + Semantik" başlat
3. `kb-mcp/data/catalog.json` auto-discovery ile günceller; manuel olarak author/year/title doldur
4. verify_claim ile birkaç probe at, doğru çalıştığını gözle

### İçerik üretim akışı (bölüm-başı, ~2 saat)

Merkantilizm'de denenmiş süreç:

1. **Kaynak hazırlığı** (10 dk): Eksik PDF varsa eklenir, reindex
2. **MCP keşif** (15 dk): 3-5 semantic_search probe, top hit'lerin sayfa/yer notu
3. **İskelet** (10 dk): 8-10 H2 başlığı + tek cümle özet
4. **Yazma** (60-90 dk): 3,000-3,500 kelime; her ana iddiaya blockquote + dipnot
5. **Doğrulama** (15 dk): rastgele 3 alıntı için verify_claim — weak/no-evidence varsa düzelt
6. **Render testi** (10 dk): book.html'de aç, footnote/terim/Cmd+K hepsi çalışıyor mu
7. **Manifest** (1 dk): `_index.json`'da `"status": "draft"`

**Tüm kitap**: ~25-30 saat aktif üretim + ~10 saat kaynak kazandırma = **35-40 saat / 6-8 hafta**.

## 5. Sonraki Temalar (öneri sırası — taahhüt değil)

Aşağıdaki sıralama bir "natural order" önerisidir; her tema bağımsız olarak ileriye/geriye çekilebilir.

1. **Değer kavramının tarihi** ← bu spec'in odağı
2. **Mülkiyet kavramının tarihi** — hukuk + felsefe + iktisat; Aristoteles/Roma → Locke → Marx → Ostrom
3. **Egemenlik ve modern devletin doğuşu** — Bodin → Hobbes → Foucault; Merkantilizm Bölüm 3'ü genişletir
4. **Adalet teorisi** — Plato → Rawls → Sen
5. **Bilim sosyolojisi** — Kuhn → Lakatos → modern bilim kurumları
6. **Hukuk düşüncesi tarihi** — Roma → doğal hukuk → pozitivizm → eleştirel teori

Sıralama gerekçe: her tema öncelinin üzerine kavramsal olarak inşa olur. Değer → Mülkiyet (değer'in hukuksal sahipliği) → Egemenlik (mülkiyeti koruyan kurum) → Adalet (egemenliğin meşruiyeti) → Bilim sosyolojisi (bu kavramları kim üretir) → Hukuk (uygulayan).

Kullanıcı her temanın 1. bölümünü okuduktan sonra Stop/Continue/Re-order kararı verir.

## 6. Reused mevcut altyapı

| Bileşen | Tema-agnostik mi? | Notlar |
|---|---|---|
| `modules/book/reader.js` | ✓ Evet | Manifest path'ini hash'ten alır |
| `modules/book/toc.js` | ✓ Evet | İlişkili manifest'ten besleniyor |
| `modules/book/progress.js` | ✓ Evet | Per-chapter scroll memory |
| `modules/terminology.js` | ⚠ Kısmen | Mevcut 78 terim merkantilizm-odaklı. Tema-spesifik terim listeleri eklenecek (terimler-deger.js gibi). |
| `modules/bookmarks.js` | ✓ Evet | Chapter ID prefix tema-bağımsız |
| `modules/command-palette.js` | ✓ Evet | Tema seçici eklenebilir |
| `modules/mcp-config.js` | ✓ Evet | URL config + safeStorage |
| `modules/reindex-panel.js` | ✓ Evet | Tema-agnostik |
| `styles/book.css` | ✓ Evet | Ortak tipografi |
| `kb-mcp/` | ✓ Evet | Çok kaynaklı, çok tema |

**Yeni eklenecek modüller**:
- `modules/theme-registry.js` — tema metadata (~60 satır)
- `styles/landing.css` — kart grid + responsive (~80 satır)
- `index.html` (landing) — ~100 satır HTML
- Her tema için: `<theme>/book.html` (kopya, manifest path farklı) + `<theme>/chapters/_index.json` + chapter MD'leri

**Yeniden yazılmayacak**: Reader engine, MCP integration, terminology decoration, bookmarks, Cmd+K. Yatırılan iş kalıcı.

## 7. Doğrulama Kriterleri

Her yeni tema için:
- ✓ 12 (±1) bölüm yazılmış, hepsi `status: draft` veya üzeri
- ✓ Her bölüm ~3,000-3,500 kelime; her bölümün ≥5 footnote + ≥3 blockquote
- ✓ Random 5 alıntı için `verify_claim` → en az 4'ü `supported`
- ✓ Landing'den tema kartına tıkla → book.html açılıyor → 12 bölüm TOC'ta görünüyor
- ✓ Term tooltip + footnote expand + Cmd+K hepsi çalışıyor
- ✓ Cmd+K'da tema-değiştir option çıkıyor (yeni feature)
- ✓ Mobile (375px): landing kartları stack oluyor, book.html responsive

## 8. Zaman çerçevesi

**Faz 5A — Mimari Geçiş** (~6-8 saat):
1. `theme-registry.js` yaz — tema metadata listesi
2. Root `index.html`'i landing'e çevir; eski redirect tamamen kaldırılır
3. `styles/landing.css` yaz — tema kart grid + responsive
4. `deger/book.html` (merkantilizm/book.html kopyası, sadece manifest path + sayfa başlığı farklı)
5. `deger/chapters/_index.json` (12 pending bölüm; başlık + subtitle dolu, status pending)
6. `command-palette.js`'e tema-değiştir adapter ekle (theme-registry'den çek; Enter → ilgili book.html'e nav)
7. Smoke test: landing → merkantilizm → çalışıyor; landing → deger → bölüm 1 "pending" stub gösteriyor

**Faz 5B — "Değer" kitabı** (~35-40 saat / 6-8 hafta):
- Kaynak ekleme: ~10 saat (Marx, Menger, Jevons, Marshall, Sraffa, Sen kütüphane)
- 12 bölüm × ~2-2.5 saat = 25-30 saat
- End-to-end doğrulama: 2-3 saat

**Faz 5C — Sonraki tema (Mülkiyet)**: aynı kalıp, ~6-8 hafta

**Yıllık hedef**: 5-6 tema = repo "olgun" 2-3 yılda.

## 9. Açık sorular / kapsam dışı

- **i18n**: İngilizce paralel versiyon istenmez — Türkçe sabit.
- **TTS / dinleme**: kapsam dışı.
- **Print/PDF export**: mevcut print stylesheet yeterli; ayrıca yapılacak iş yok.
- **Interaktif öğeler** (sim/quiz/grafik): bu fazda yapılmıyor; gelecek karar.
- **Yorum/anotasyon**: kullanıcı tek başına; yorum sistemi gereksiz.

## 10. Riskler

| Risk | Etki | Hafifletme |
|---|---|---|
| Marx/Menger/Sraffa için PDF temin edememe | Kitap kalitesi düşer | Public domain (1923 öncesi) önce; modern kaynaklar fair-use kısa alıntı |
| Bir tema "sıkışır" — 3 bölümde takılıp diğerlerine ilgi azalır | Repo dağınık | Pilot bölüm sonrası kullanıcı her tema için Stop/Continue kararı verebilir |
| Mevcut Merkantilizm okuyucularına link kırılır (URL değişikliği) | UX kayıp | Eski `/merkantilizm/book.html` URL'i korunur; landing eklenir, redirect kaldırılır |
| kb-mcp ortak havuz: bir temada eklenen kaynak diğer temaların aramalarını "kirletir" | Search kalitesi | Kaynak metadata'ya `themes: ['deger', 'merkantilizm']` array ekle; filtreli arama opsiyonel |

## Sonraki adım

Bu spec onaylandığında `writing-plans` skill'i ile implementation plan üretilir. Plan, Faz 5A (mimari) + Faz 5B (Değer kitabı) adımlarını **sıralı, çalıştırılabilir** halde tanımlar.
