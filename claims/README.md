# claims/ — Aktif Görev Kilitleri

Bir ajan bir görev claim ettiğinde bu klasöre lock dosyası bırakır.

## Dosya konvansiyonu

```
claims/{T###}.{agent}.lock
```

Örnek: `claims/T010.deepseek.lock`

## Format

```
task: T010
agent: deepseek
branch: deepseek/work
claimed_at: 2026-05-24T13:00Z
summary: concept-map.js Barnes-Hut force layout impl
```

## Yaşam Döngüsü

1. Ajan görev al → lock dosyası oluştur + COORDINATION.md güncelle (atomik commit)
2. Çalış
3. Görev bitir → lock dosyasını sil + COORDINATION.md "Review'da"ya taşı (atomik commit)
4. Opus merge ettiğinde → görev "Tamamlandı"ya geçer

## Yarış Koşulu

İki ajan aynı görevi claim etmeye kalkışırsa:
- İlk push kazanır (git fast-forward)
- İkinci ajan rebase çatışmasıyla karşılaşır → claim'i geri çek, COORDINATION.md'yi yenile, başka görev al
