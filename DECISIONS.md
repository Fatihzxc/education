# Mimari Kararlar Logu (ADR-light)

Append-only. Her karar bir blok. Format:

```
## ADR-### — Başlık
Tarih: YYYY-MM-DD
Karar veren: {ajan}
Statü: aktif | superseded by ADR-### | reddedildi

Bağlam:
…

Karar:
…

Alternatifler:
…

Sonuçlar:
…
```

---

## ADR-001 — Modüler dosya yapısı (`openocd_jtag/` örüntüsü)

Tarih: 2026-05-24
Karar veren: Opus
Statü: aktif

**Bağlam**: Tek dosyalık HTML mı, dizine yayılmış modüller mi? Kullanıcı modüler tercih etti. Repoda zaten benzer örüntü var (`openocd_jtag/index.html + modules/*.js`).

**Karar**: `iktisat/merkantilizm/index.html` + `modules/*.js`; IIFE pattern + `window.X` expose; her modül kendi `<style id="...">` enjekte eder.

**Alternatifler**:
- Tek HTML (playground skill standardı) — reddedildi: ölçek büyük, modüler bakım kolay
- ES module + bundler — reddedildi: build sistemi yok kuralı

**Sonuçlar**:
- Bağımsız modül yüklemesi, paralel ajan çalışması kolaylaşıyor (her ajan ayrı dosya)
- `<script>` sırası önemli: content-data önce, sonra viz modülleri

---

## ADR-002 — Multi-agent koordinasyon: file-based + git

Tarih: 2026-05-24
Karar veren: Opus + Kullanıcı
Statü: aktif

**Bağlam**: 4 farklı LLM ajanı paralel çalışacak. Senkronizasyon nasıl?

**Karar**: Her ajan kendi git worktree'sinde + kendi branch'inde. COORDINATION.md tek doğruluk kaynağı; `claims/*.lock` dosyaları ile basit lock; Opus tek merge yetkilisi.

**Alternatifler**:
- Opus orkestratör + diğerleri MCP üzerinden (tek oturum) — kullanıcı reddetti (paralelizm için CLI tercihi)
- Çekişme bazlı atama (no-orchestrator) — reddedildi (öngörülebilirlik düşük)
- Online task queue (Trello/Jira) — gereksiz karmaşıklık

**Sonuçlar**:
- Her ajan async çalışır; uyku saatleri uyuşmayabilir
- Çatışma çözümü Opus'a düşer (overhead var ama kalite garantisi)
- Git history ajan iş bölümünün kalıcı kaydı

---

## ADR-003 — Workstream B (MCP) stack: Python + pypdf + SQLite FTS5

Tarih: 2026-05-24
Karar veren: Opus + Kullanıcı
Statü: aktif

**Bağlam**: Kaynak doğrulama MCP sunucusu hangi dilde?

**Karar**: Python 3.10+ + `mcp` (Anthropic SDK) + `pypdf` + SQLite FTS5 (stdlib). Embedding opsiyonel (sentence-transformers, sonradan).

**Alternatifler**:
- Node + pdf-parse + lunr.js — reddedildi: vektör arama eklemek zor
- `unstructured` + Chroma — reddedildi: bağımlılık ağır, ilk sürüm için gereksiz

**Sonuçlar**:
- Sıfır harici servis; tamamen lokal
- Türkçe full-text desteği için tokenizer tweak gerekecek (B7)

---

## ADR-004 — İçerik derinliği: 3-katman kümülatif

Tarih: 2026-05-24
Karar veren: Opus
Statü: aktif

**Bağlam**: Her okuyucu seviyesinde içerik istenmesi. Ayrı sayfalar mı, katmanlı mı?

**Karar**: Aynı içerik objesinde `depth: {intro, intermediate, advanced}` üç metin alanı. `<body data-active-depth="N">` ile CSS filtre. **Kümülatif**: İleri (3) seçildiğinde 1+2+3 hepsi görünür; Orta (2) ise 1+2; Giriş (1) sadece 1.

**Alternatifler**:
- Ayrı sayfalar — reddedildi: navigasyon yorucu
- Seçimli (toggle): "Giriş'e geç" — reddedildi: okuyucu motivasyonunu bozar

**Sonuçlar**:
- İçerik yazımı 3× yük; ama tek bir kaynak data'da kalır
- Yazarlar her concept için 3 metin yazmalı; tutarlılık denetimi gerekli (R002)

---

## ADR-006 — Unified content fragment pattern (R004)

Tarih: 2026-05-24
Karar veren: Opus (paralel ajan çıktılarının uyumlulaştırılması zorunluluğu)
Statü: aktif

**Bağlam**: Workstream A başladığında 4 farklı ajan 4 farklı veri sunum modeli üretti:
1. **Opus T002**: JSON dosyası (`concepts-osmanli.json`)
2. **GPT T003**: `content-data.js` içinde inline diziler + `window.MerkantilizmData` + `mergeUniqueById`
3. **GLM T013/T015**: Bağımsız JSON dosyaları (`quizzes-data.json`, `terminology-dict.json`)
4. **Deepseek T001**: Boş scaffold `window.CONTENT = { ... }`

Bu uyumsuzluk runtime'da hiçbiri diğerini görmüyor; ayrıca tarayıcı `file://` üzerinden JSON fetch edemiyor (CORS).

**Karar**: Tek pattern: **self-registering JS fragments → registry**.

```
// Her fragment dosyası (content-fragments/{ad}.js):
(function() {
  'use strict';
  const F = window.MerkantilizmFragments = window.MerkantilizmFragments || {
    concepts: [], events: [], cases: [], quizzes: [],
    modernLinks: [], sources: [], terminology: [], conceptGroups: {}
  };
  const _items = [ ... fragment data ... ];
  Array.prototype.push.apply(F.{bucket}, _items);
})();

// content-data.js (registry, fragments'tan sonra yüklenir):
const F = window.MerkantilizmFragments || {};
const CONCEPTS = F.concepts || [];
// ...
window.CONTENT = { CONCEPTS, EVENTS, ..., utils };
```

**Yükleme sırası (index.html'de)**:
1. `<script src="modules/content-fragments/*.js">` (her fragment self-register eder)
2. `<script src="modules/content-data.js">` (registry build)
3. `<script src="modules/{viz}.js">` (CONTENT'i kullanır)

**Alternatifler**:
- Tarayıcıda dinamik JSON fetch — reddedildi: file:// CORS engeli, no-build kuralı
- ES module + `import` — reddedildi: no-build kuralı, tüm modüller IIFE
- Tek dev dosya (`content-data.js`) — reddedildi: paralel ajan çalışması bozulur
- GPT'nin `window.MerkantilizmData` + `mergeUniqueById` — reddedildi: tek registry tercih edilir, mutator API karışıklığı yaratır

**Sonuçlar**:
- Tüm mevcut fragmanlar (T002, T003, T013, T015) bu pattern'a refactor edildi (R004 görevi)
- Yeni içerik fragmanları (T004, T005, T006, T007, T008, T011, T017) DOĞRUDAN bu pattern'ı izleyecek
- `content-fragments/README.md` referansla güncellendi
- `content-data.js` artık orphan cross-ref validation yapıyor (dev modunda console.warn)

**Migration notları**:
- GPT'nin `window.MerkantilizmData` API'si artık geçersiz — yok edildi
- JSON dosyaları (`*.json`) silindi; karşılığında `*.js` fragmanlar
- `mergeUniqueById` semantiği `Array.prototype.push.apply` ile basitleştirildi (ID-bazlı dedup defensif olarak GPT fragmanında korunmuş)

---

## ADR-005 — Coğrafi kapsam: Batı Avrupa + Osmanlı (Çin/Asya hariç)

Tarih: 2026-05-24
Karar veren: Kullanıcı
Statü: aktif

**Bağlam**: Küresel kapsam dağılır, sadece Batı yetmez.

**Karar**: İngiltere, Fransa, İspanya, Hollanda, Portekiz, İtalyan kent devletleri, Avusturya + Osmanlı. Çin/Japonya/Hindistan EVENTS bağlamında değil, sadece Hindistan Calico Acts bağlamında.

**Sonuçlar**:
- Mehmet Genç'in iaşecilik tezi merkezi rol oynar
- İbn Haldun → Naima → Osmanlı düşünce hattı belirgin
- Sömürge bağlamı (Hindistan, Amerika) Avrupa perspektifinden işlenir
