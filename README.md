# iktisat — Sosyal Bilimler Kütüphanesi

Tematik kesişmeler üzerine uzun-form okuma kitapları + bunları yazarken kaynak doğrulaması yapan bir MCP sunucusu. Her kitap; ham birincil kaynak alıntılarıyla, dipnotlu, terim-tooltip'li ve Cmd+K aranabilir bir okuma deneyimi sunar.

## Tema'lar

| Tema | Durum | Bölüm sayısı |
|---|---|---|
| **`merkantilizm/`** — Merkantilizm: 16-18. yy iktisat düşüncesi | ✓ tamamlandı | 12 |
| **`deger/`** — Değer kavramının tarihi: Aristoteles'ten Sen'e | ⏳ taslak | 12 (yazılıyor) |

Sıradakiler için yol haritası: `docs/superpowers/specs/2026-05-24-education-expansion-design.md` §5 (Mülkiyet, Egemenlik, Adalet, Bilim sosyolojisi, Hukuk).

## Çalıştırma

Bağımlılık yok; statik dosyalar. Cache-disabled bir dev sunucusu içerir (her reload diskten okur):

```bash
cd iktisat
python3 serve.py                  # http://localhost:8772
# Landing → kart seç → kitabı oku
```

Kaynak doğrulaması (semantic_search + verify_claim) için MCP bridge'i de ayağa kaldırın:

```bash
cd kb-mcp && .venv/bin/python -m src.http_bridge   # http://127.0.0.1:8766
```

Açık olduğunda topbar'daki ✓ yeşil indikatör buna işaret eder; Reindex paneli (saat ikonuna tıklayın) yeni kaynak eklendiğinde indeksi tetikler.

## Mimari

Çoklu-tema mimarisi: `modules/`, `styles/`, `vendor/`, `kb-mcp/` ve `sources/` paylaşımlı; her tema kendi alt klasöründe yalnızca `book.html` shell'i ve `chapters/` markdown'ını taşır.

```
iktisat/
├── index.html                    # landing — tema kart grid'i
├── serve.py                      # no-cache dev sunucusu
├── styles/                       # ortak — book.css + landing.css
├── vendor/                       # ortak — marked.min.js
├── modules/                      # ortak — reader/toc/progress, MCP bridge,
│   │                             # terminoloji decoration, Cmd+K palette,
│   │                             # reindex paneli, theme-registry, vb.
│   ├── book/
│   │   ├── reader.js             # markdown → HTML + footnote engine
│   │   ├── toc.js                # sticky TOC + IntersectionObserver scroll-spy
│   │   └── progress.js           # per-bölüm scroll memory (localStorage)
│   ├── theme-registry.js         # tüm tema'ların tek-kaynak meta'sı
│   ├── mcp-config.js             # bridge URL, safeStorage, themeSlug helper
│   ├── command-palette.js        # Cmd+K (Tema, Bölüm, Kavram, Terim ara)
│   ├── bookmarks.js              # per-tema ⭐ favoriler + okuma badge'i
│   ├── reindex-panel.js          # topbar göstergesi + üç-tab popover
│   └── content-fragments/        # tema-spesifik kavram/terim/olay verileri
├── merkantilizm/
│   ├── book.html                 # kitap shell'i (paths: ../modules/...)
│   ├── chapters/                 # 12 markdown bölüm + _index.json
│   └── appendix/playground.html  # eski interaktif oyun alanı (kavram haritası,
│                                 # zaman çizelgesi, quiz, vaka çalışmaları)
├── deger/
│   ├── book.html
│   └── chapters/                 # 12 pending stub; üretim devam ediyor
├── kb-mcp/                       # MCP sunucusu — BM25 + sentence-transformer
│   ├── src/                      # semantic + verify_claim
│   └── data/catalog.json         # indekslenmiş kaynak meta'sı
└── sources/                      # PDF/EPUB birincil + ikincil kaynaklar
    ├── primary/                  # İbn Haldun, Smith, Mun, Marx, Menger, ...
    └── secondary/                # Heckscher, Genç, Reinert, Beckert, ...
```

PDF kaynaklar `.gitignore`'da; telifli olanlar repodan dışlanır, sadece `catalog.json` meta'sı versiyonlanır.

## Bir Sonraki Bölümü Yazmak

Yazım döngüsü (her bölüm ~2-2.5 saat):

1. **MCP keşfi**: `semantic_search` + `verify_claim` ile birincil pasajları topla
2. **İskelet**: 8-10 H2 başlığı + tek cümle özet
3. **Yazma**: 3,000-3,500 kelime; her ana iddiaya blockquote + dipnot
4. **Doğrulama**: rastgele 3 alıntı `verify_claim` → `supported` ya da `weak`
5. **Render**: `deger/book.html#bolum/N`'yi aç, footnote/Cmd+K/tooltip
6. **Manifest**: `_index.json`'da `status: pending` → `draft`

Yeni bir tema eklemek için:

- Yeni alt klasör (`<slug>/`); `book.html` kopyala, başlık + manifest path düzelt
- `chapters/_index.json` yaz (12 pending stub)
- `modules/theme-registry.js`'e bir entry ekle (landing'de otomatik çıkar)

## Plan ve Tasarım Dokümanları

- **Spec**: `docs/superpowers/specs/2026-05-24-education-expansion-design.md`
- **Plan**: `docs/superpowers/plans/2026-05-24-education-deger-book.md`
- **Eski iş notları**: `COORDINATION.md`, `DECISIONS.md`, `AGENTS.md`, `claims/`, `reviews/` (multi-agent merkantilizm fazından kalan)
