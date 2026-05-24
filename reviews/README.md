# reviews/ — Cross-Agent Review Notları

Her görev en az bir review'dan geçer (bkz: `AGENTS.md` cross-review matrisi).

## Dosya konvansiyonu

```
reviews/YYYY-MM-DD-{reviewer}-reviews-{T###}.md
```

Örnek: `reviews/2026-05-24-opus-reviews-T010.md`

## Format

```markdown
# Review — T010 (concept-map.js) — Opus → Deepseek

**Tarih**: 2026-05-24T14:00Z
**Reviewer**: Opus
**Yazar**: Deepseek
**Verdict**: changes-requested | approved | blocked
**Branch**: deepseek/work @ {commit-sha}

## Findings

- **[BLOCKER]** Force simülasyonu 60fps altına düşüyor n>40 node'da → QuadTree (Barnes-Hut) gerekli
- **[NIT]** Naming: `nodePos` → `nodePosition` (kod tarzı)
- **[QUESTION]** Sürükleme sırasında ilgili node'ları neden parlatmıyoruz? Kullanıcı deneyimi için iyi olabilir
- **[PRAISE]** Edge tipi renk paleti çok temiz; legend okunaklı

## Genel Değerlendirme

…1-2 paragraf…

## Sonraki Adım

deepseek: Barnes-Hut entegrasyonu + naming fix → re-review için `Review'da` listesinde kalsın
```

## Açık Sorular Kanalı

Belirsizlik varsa `reviews/QUESTIONS.md` aç, Opus günlük topla.
