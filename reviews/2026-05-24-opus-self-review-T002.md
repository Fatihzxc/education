# Self-Review — T002 (concepts-osmanli.json) — Opus

**Tarih**: 2026-05-24T11:30Z
**Author**: Opus
**Reviewer**: Opus (self) + GLM (pending)
**Verdict**: approved-as-draft-v1 (GLM cross-review pending)
**Branch**: opus/work @ (post-T002 commit)

## Kapsam

İlk içerik fragmanı: 16 concept entry.

- **9 düşünür**: İbn Haldun, Lütfi Paşa, Koçi Bey, Kâtip Çelebi, Naima, Defterdar Sarı Mehmed Paşa, Mehmet Genç, Halil İnalcık, Şevket Pamuk
- **7 Osmanlı kavramı**: İaşecilik, Fiskalizm, Gelenekçilik, Kapitülasyonlar, İhtisab-Narh, Men-i İhracat, İltizam-Malikâne, Tımar (8 oldu, son anda eklendi)

Her concept için 3 depth katmanı + 1 tetikleyici-soru + related + sourceRefs + events.

## Self-Findings

- **[PRAISE]** İbn Haldun ↔ Naima ↔ Genç düşünce hattı çapraz referanslarla net kurulmuş. Concept map'te bu üçlü merkez bir küme oluşturmalı.
- **[PRAISE]** Mehmet Genç'in iaşecilik/fiskalizm/gelenekçilik üçlüsü hem ayrı concept'ler hem Genç'in kendi entry'sinde özetlenmiş — okuyucuya iki erişim yolu.
- **[NIT]** Bazı entry'lerde "ileri" katman 5 paragraf, bazıları 3 — kabul edilebilir ama R002'de tutarlılık denetiminde standartlaştırılmalı.
- **[QUESTION → GLM]** İbn Haldun'un "ilk iktisatçı" konumlandırması Reinert'in iddiası; ama bu Schumpeter'in 1954'teki sessizliğine bir tepki olarak okunmalı mı? Tarih yazımı tartışması için GLM'den ikinci görüş istiyorum.
- **[BLOCKER YOK]** Tüm sourceRefs MCP bekliyor (`[MCP-pending]`) — R003'te toplu doğrulama.
- **[FOLLOWUP → GPT T008]** EVENTS'te şu olaylar T002'den referans alıyor: e-1377-mukaddime, e-1631-kocibey-risale, e-1653-dustur, e-1536-kapitulasyon, e-1838-balta-limani, e-1989-genc-tez. GPT bunları yazdığında ID'ler eşleşmeli.
- **[FOLLOWUP → GPT T003/T011]** Bu fragmandan dışarı atıflar: thomas-mun, charles-davenant, william-petty, adam-smith. GPT bu ID'leri kullanmalı.

## Cross-Cultural Review Notları (GLM için)

GLM lütfen şu noktalara odaklan:
1. İbn Haldun'un *Mukaddime*'deki iktisat sezgilerinin "Smith'in 400 yıl öncüsü" formülasyonu (entry: ibn-haldun, advanced katmanı) — bu yaygın bir popülerleştirme; akademik gerçeklik ne kadar abartısız?
2. Genç'in "iaşecilik" kavramı için verilen "Avrupa'nın simetrik karşıtı" ifadesi (entry: mehmet-genc, intermediate) — bu pedagojik basitleştirme mi, abartı mı?
3. Naima'nın 5-evre teorisinin formülasyonu (entry: naima, intermediate) — orijinal kaynak doğrulaması yapılabilir mi? Türkçe ya da Arapça birincil kaynaktan.
4. Kapitülasyon analizinin "300 yıl sonra çöküşün araçları" formülasyonu (entry: kapitulasyonlar, tetikleyici-soru) — duygusal/popülist mi, akademik mi?

## Genel Değerlendirme

Bu fragman projenin entelektüel omurgasıdır. Diğer fragmanlar (T003-T011) buna referansla yazılacak. Bu yüzden burada özen yüksek olmalı.

İçeriğin yaklaşık kelime sayısı: ~7,500 Türkçe (Türkçe açıklayıcı yoğunlukla).

## Sonraki Adım

- **Opus**: T005 (CASES) başlat — özellikle "Osmanlı iaşeciliği" ve "İbn Haldun Mukaddime ekonomisi" vakaları bu fragmanın anlatısal versiyonu olacak
- **GLM**: T002 cross-review (yukarıdaki 4 nokta)
- **Opus**: T015 (çift dil sözlük) GLM tarafından başlatıldığında bu fragmandaki teknik terimler (asabiyye, ihtisab, narh, malikâne, tımar, vb.) eklenmeli
- **Opus**: opus/work → main merge (orchestrator yetkisi)
