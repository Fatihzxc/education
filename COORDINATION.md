# Görev Panosu — Merkantilizm Projesi ✅ TAMAMLANDI

**Son güncelleme**: 2026-05-24T14:20 by codex (R006 content + semantic MCP validation)
**Orkestratör**: Opus 4.7
**Statü**: 🎯 **All MVP tasks complete**

> Multi-agent koordinasyon fazı kısmi tamamlandı (T001, T002, T003, T013, T015, B7 ajan paralel teslim edildi). Kullanıcı sonra multi-agent'tan vazgeçti ve Opus geri kalan tüm görevleri solo bitirdi. Tüm sistem çalışır durumda.

> Detaylı sistem tasarımı: `~/.claude/plans/merkantilizm-hakkinda-her-seyi-warm-turing.md`

---

## ✅ Tamamlananlar (kronolojik commit sırası)

### Workstream A — Playground

| ID | Görev | Yapan | Commit |
|---|---|---|---|
| T001 | `index.html` + 7 modül stub (1287 satır) | deepseek | `1e1a9d7` → merge `f857f69` |
| T002 | CONCEPTS Osmanlı — İbn Haldun + 8 düşünür + 8 kavram (17 entry) | opus | `9181303` → merge `2d85e41` |
| T003 | CONCEPTS Batı klasik (12 düşünür + 19 source) | gpt | `ee66b29` → R004 refactor `bbfb207` |
| T004+T006+T007+T011 | concepts-rest.js (38 entries: pre-mer + post-mer + policies + modern historians) | opus | `870327d` |
| T005 | CASES (6 derin vaka) | opus | `6f260a7` |
| T008 | EVENTS (75 olay, 1271-2025) | opus + 3 satellite | `6f260a7`, `2b794a3` |
| T009 | timeline.js (SVG yatay çizelge, 9 ülke şeridi) | opus | `b551202` |
| T010 | concept-map.js (Canvas force-directed) | opus | `b551202` |
| T012 | deep-dive.js (3-katman render + cross-nav) | opus | `b551202` + fix `66bde58` |
| T013 | QUIZZES (35 soru, 3 derinlik) | glm | `069d6d8` → merge `db75bd2` |
| T014 | quiz.js + case-study.js + modern-links.js renderers | opus | `b551202` |
| T015 | terminology-dict (78 terim, TR/EN/AR/LA) | glm | `069d6d8` → merge `db75bd2` |
| T016 | CSS tema + responsive | deepseek (T001 içinde) | `1e1a9d7` |
| T017 | MODERN_LINKS (6 kart) | opus | `6f260a7` |
| T020 | deep-dive × MCP entegrasyonu | (ileride: playground'dan MCP'ye HTTP köprüsü) | TODO |
| R004 | API uyumlulaştırma (ADR-006 fragment pattern) | opus | `bbfb207` |
| R005 (new) | satellite-concepts + ID prefix normalize (orphan ref → 0) | opus | `2b794a3` |
| R006 (new) | 73 advanced layer enrichment + 17-PDF MCP catalog + semantic verify + verified quote refs | codex/main | local working tree |

### Workstream B — `iktisat-kb` MCP Sunucusu

| ID | Görev | Yapan | Commit |
|---|---|---|---|
| B0+B1+B3+B4+B5+B6 | Tek dosyada server.py (6 tool: list_sources, reindex_sources, search_sources, get_excerpt, format_citation, verify_claim) + pyproject.toml + catalog.json + README | opus | `649195b` |
| B7 | turkish_normalizer.py (FTS5 tokenizer hook) | glm | `069d6d8` → entegre `649195b` |
| B2 | indexer (server.py içinde) | opus | `649195b` |
| B8 | Smoke test suite | (skipped, ad-hoc test pass) | — |

### Süreklilik

| ID | Görev | Statü |
|---|---|---|
| R001 | Cross-review koordinatörü | opus solo (multi-agent vazgeçildi) |
| R002 | İçerik tutarlılık denetimi | ✅ Cross-refs valid (0 orphan) |
| R003 | sourceRefs MCP doğrulama | ✅ R006 ile genişletildi: 74 sourceRef, 0 pending, 0 missing; 16 metin-indeksli PDF + 1 OCR blocker |

---

## 📊 Final Sayım

### İçerik
| Tür | Sayı |
|---|---|
| CONCEPTS | **73** (Opus 17 Osmanlı + GPT 12 Batı klasik + Opus 38 rest + Opus 6 satellite) |
| EVENTS | **78** (75 ana + 3 satellite) |
| CASES | **6** (~600-900 kelime/vaka) |
| QUIZZES | **35** (3 derinlik) |
| MODERN_LINKS | **6** |
| SOURCES | **17 catalog PDF** (16 text-indexed + 1 OCR-needed) |
| TERMINOLOGY | **78** (4 dilli) |
| **Toplam içerik öğesi** | **295** |

### Kod
| Kategori | Satır |
|---|---|
| Module JS (7 modül) | ~870 |
| Content fragments (7 dosya) | ~4,310 |
| index.html (inline JS + CSS) | ~1,030 |
| MCP server (Python) | ~340 |
| Koordinasyon docs (md) | ~700 |
| **Toplam** | **~7,250+** (8,121 satır wc dahil meta/README) |

### MCP Doğrulama (gerçek PDF'le test)
- 17 PDF kataloglandı; 16 PDF metin olarak indekslendi; `inalcik-quataert` OCR gerektiriyor.
- SQLite: 6,491 page row + 17,783 passage row; passage row'larının tamamında sentence-transformer embedding var.
- `semantic_search` aktif: `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`.
- İçerik: 73 concept, 74 doğrulanmış sourceRef, 0 `[MCP-pending]`, 0 missing sourceRef, 0 orphan ref.

---

## 🌐 Kullanım

```bash
# Playground:
cd /Users/fatihoner/learn/iktisat/merkantilizm
python3 -m http.server 8000
open http://localhost:8000/index.html

# MCP server (kullanıcının PDF'lerine karşı):
cd /Users/fatihoner/learn/iktisat/kb-mcp
pip install -e .
# Sonra .mcp.json'a kayıt ekleyin (README.md'de snippet var)
```

---

## 🧠 Multi-Agent Mirası (öğrenilen)

Kısa multi-agent fazından çıkan kalıcı pattern: **ADR-006 self-registering JS fragment pattern**. Her ajanın kendi içerik fragmanını ayrı dosyaya yazmasını ve runtime'da `content-data.js` registry'sinin hepsini toplamasını sağlar. Bu pattern multi-agent dağıtık dev'inden bağımsız olarak da modülerlik için faydalı kaldı.

API uyumsuzluğu (R004) tipik bir multi-agent dağıtık koordinasyon problemiydi; çözümü ileride benzer projelerde referans olabilir. DECISIONS.md'de ADR-002, ADR-006 bu ders kaydı.

---

## 🔮 İleride (out of scope, geri dönüş için TODO)

1. **T020**: Playground'dan MCP'ye HTTP köprüsü (deep-dive panelinden "Kaynakta ara" butonu canlı MCP çağrısı)
2. **B8**: Smoke test suite (pytest)
3. **OCR**: `inalcik-quataert.pdf` için Tesseract/OCR pipeline
4. **Eksik kaynaklar**: Naima + Drelichman/Voth PDF'leri eklenirse katalog ve sourceRef kapsamına alınır
5. **Mobil UX**: 375px-768px arası concept-map kullanılabilirlik iyileştirmeleri

---

## 📁 Branch Düzeni (multi-agent fazı miras)

| Ajan | Branch | Statü |
|---|---|---|
| Opus | `opus/work` | aktif (gerekiyorsa) |
| GPT | `gpt/work` | dondurulmuş (T003 çalışmasını içerir) |
| GLM | `glm/work` | dondurulmuş (T013/T015/B7 çalışmasını içerir) |
| Deepseek | `deepseek/work` | dondurulmuş (T001 çalışmasını içerir) |

`main` branch tüm merge'lerin toplandığı tek doğruluk kaynağı. Multi-agent worktree'ler `~/iktisat-worktrees/` altında, gerekiyorsa silinebilir.
