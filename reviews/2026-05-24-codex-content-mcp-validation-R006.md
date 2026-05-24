# Review — R006 Content Depth + MCP Validation

**Tarih**: 2026-05-24  
**Yazar**: Codex  
**Hedef**: 73 kavramın ileri katmanı, PDF indeksleme, gerçek kaynak alıntıları, semantic `verify_claim`

## Durum

- 17 PDF kataloglandı.
- 16 PDF metin olarak indekslendi.
- 1 PDF OCR gerektiriyor: `inalcik-quataert` (`no extractable text; OCR needed`).
- `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2` kuruldu ve passage embedding index üretildi.
- `verify_claim` artık BM25 + semantic evidence döndürüyor.

## İçerik Denetimi

- Concepts: 73
- Events: 78
- Cases: 6
- Quizzes: 35
- Modern links: 6
- Source refs: 74
- Pending refs: 0
- Missing source refs: 0
- Concepts without refs: 0
- Advanced layers under 900 chars: 0
- Orphan concept/event refs: 0

## Kaynak Kapsamı

İndekslenen ana kaynaklar: İbn Haldun, Mun, Smith, Hume, Bodin, Hörnigk, Steuart, Koçi Bey, Heckscher, Magnusson, Reinert, Chang, Genç, Pamuk, Beckert.

Kısıt: Naima ve Drelichman/Voth PDF'leri mevcut değil; İnalcık/Quataert PDF'i metin katmanı vermediği için OCR aşamasına bırakıldı.

## Uygulanan Değişiklik

- `content-validation-overrides.js` ile 73 concept için advanced katman genişletildi ve pending source ref'ler doğrulanmış local-PDF ref'leriyle değiştirildi.
- `deep-dive.js` artık ileri seviyede birden fazla doğrulanmış kaynak alıntısı render ediyor; pending placeholder'lar alıntı gibi gösterilmiyor.
- MCP server `semantic_search` tool'u kazandı; `verify_claim` hybrid verdict/confidence/evidence formatına geçti.
- Catalog stable source ID'lere normalize edildi; auto-generated duplicate Mukaddime ID'leri kaldırıldı.

## Kabul Testleri

- Python compile: `server.py`, `http_bridge.py` temiz.
- Catalog JSON parse temiz.
- JS syntax: `content-validation-overrides.js`, `deep-dive.js` temiz.
- Semantic smoke: Smith mercantile-system sorgusu `sentence-transformer` yöntemiyle p.558 sonucunu döndürdü.
- Hybrid smoke: Hume price/specie claim'i `supported` verdict döndürdü.

## Kalan Risk

- `inalcik-quataert` OCR yapılana kadar Halil İnalcık kavramı Genç/Pamuk/Koçi Bey eksenindeki destekleyici kaynaklarla doğrulanıyor.
- Bazı kavramlar doğrudan kendi birincil metniyle değil, mevcut corpus içindeki ikincil literatürle destekleniyor. Bu, eksik PDF kapsamından kaynaklanan bilinçli bir sınırlama.
