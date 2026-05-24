# content-fragments/

Bu klasör tüm içerik görevlerinin (T002-T011, T013, T015, T017) **self-registering JS fragmanlarını** içerir. Her ajan kendi içerik görevini ayrı bir fragman dosyasına yazar; runtime'da `content-data.js` registry'si tüm fragmanları toplayıp `window.CONTENT` üzerinden açar.

**Pattern detayı**: `DECISIONS.md` → ADR-006

## Niye fragmanlar?

Paralel ajan çalışması için. Eğer 4 ajan aynı anda `content-data.js` üzerinde çalışsaydı her commit merge çatışması yaratırdı. Fragman yapısı dosya-bazlı izolasyon sağlar — her fragmanın sahibi tektir.

## Şema (ADR-006)

Her fragman **self-registering JS dosyasıdır** (JSON değil — `file://` CORS engeli + no-build kuralı nedenleriyle).

```js
// content-fragments/{ad}.js
// Header: fragment adı, açıklama, author, task ID
(function() {
  'use strict';
  const F = window.MerkantilizmFragments = window.MerkantilizmFragments || {
    concepts: [], events: [], cases: [], quizzes: [],
    modernLinks: [], sources: [], terminology: [], conceptGroups: {}
  };

  const _items = [
    { id: 'foo', label: '...', /* ... */ },
    // ...
  ];

  Array.prototype.push.apply(F.concepts, _items);
  console.log('[fragment:{ad}] registered concepts:', _items.length);
})();
```

**Bucket isimleri** (`F.{bucket}`):

| Bucket | Tip | İçerik |
|---|---|---|
| `concepts` | Array | Kavramlar ve düşünürler (T002, T003, T004, T006, T007, T011) |
| `events` | Array | Kronolojik olaylar (T008) |
| `cases` | Array | Derin vaka çalışmaları (T005) |
| `quizzes` | Array | Quiz soruları (T013) |
| `modernLinks` | Array | Güncel olay kartları (T017) |
| `sources` | Array | Kaynakça (kendiliğinden, fragman içinde) |
| `terminology` | Array | Çift dil sözlük (T015) |
| `conceptGroups` | Object | Fragman-bazlı kavram grupları (id → {label, conceptIds, task, ...}) |

## Yükleme Sırası

`index.html`'de:

1. **Fragments** (her biri self-register eder, sırasız):
   ```html
   <script src="modules/content-fragments/concepts-osmanli.js"></script>
   <script src="modules/content-fragments/concepts-bati-klasik.js"></script>
   <!-- ... yenileri buraya alfabetik ekle -->
   ```
2. **Registry** (`content-data.js` — fragmanları toplar, `window.CONTENT` build eder):
   ```html
   <script src="modules/content-data.js"></script>
   ```
3. **Viz/UI modülleri** (`window.CONTENT`'i kullanır):
   ```html
   <script src="modules/timeline.js"></script>
   <!-- ... -->
   ```

## ID Konvansiyonu

- Concepts: `{thinker-name-kebab}` (örn. `ibn-haldun`, `thomas-mun`, `mehmet-genc`) veya `{concept-kebab}` (örn. `iasecilik`, `bullionism`)
- Events: `evt-{yıl}-{kısa-slug}` (örn. `evt-1377-mukaddime`, `evt-1651-navigation-act`) — GPT T003 prefix'i benimsendi
- Cases: `c-{kısa-slug}` (örn. `c-navigation-acts`, `c-osmanli-iasecilik`)
- Sources: `{type}-{yazar-slug}-{eser-slug}` (örn. `primary-mun-treasure`, `secondary-genc-devlet`)

## Cross-Reference

Fragmanlar birbirlerine atıfta bulunabilir (`related`, `sourceRefs`, `events`). **Önemli**: Atıf yapılan ID henüz başka fragmanda tanımlanmamışsa bile yazın — `content-data.js` orphan ID'leri dev modunda `console.warn` ile rapor eder. Sonraki fragmanlar geldiğinde otomatik bağlanır.

## sourceRefs ve MCP

Tüm `sourceRefs` alanlarında ilk versiyonda `page: 0` ve `quote: "[MCP-pending]"` (veya GPT'nin `mcpStatus: 'pending_mcp_excerpt'`) kullanın. Workstream B (`kb-mcp`) tamamlandığında R003 görevi tüm sourceRefs'leri MCP'den doğrulayıp sayfa+alıntı dolduracak.

## Mevcut Durum

| Fragman | Görev | Sahip | Durum |
|---|---|---|---|
| `concepts-osmanli.js` | T002 | opus | ✅ merged (16 entry, R004 ile JS pattern'a çevrildi) |
| `concepts-bati-klasik.js` | T003 | gpt | ✅ merged (R004 ile fragment pattern'a refactor) |
| `concepts-rest.js` | T004/T006/T007/T011 | opus | ✅ merged (solo tamamlandı) |
| `events-cases-modern.js` | T005/T008/T017 | opus | ✅ merged (events, cases, modern links) |
| `satellite-concepts.js` | R005 | opus | ✅ merged (orphan ref kapatma) |
| `content-validation-overrides.js` | R006 | codex/main | ✅ 73 advanced katman + MCP kaynak ref doğrulama |
| `terminology-dict.js` | T015 | glm | ✅ merged (70 terim, R004 ile JS) |
| `quizzes-data.js` | T013 | glm | ✅ merged (35 soru, R004 ile JS) |

## Yeni Fragman Eklerken Checklist

1. `content-fragments/{ad}.js` dosyası oluştur, yukarıdaki şemayı izle
2. `index.html`'de Step 1 bloğuna `<script>` tag'i ekle (alfabetik sıra)
3. Cross-ref ID'lerini dokümante et (özellikle olası orphan'lar)
4. Browser konsolunda `console.log('[fragment:{ad}] registered ...')` görünmeli
5. `window.CONTENT.CONCEPTS.length` (vb.) artmalı
6. Orphan cross-ref varsa `console.warn` görünmeli — bu OK ama not al
