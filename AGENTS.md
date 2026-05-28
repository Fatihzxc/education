# Ajan Profilleri & Yetenek Matrisi

Bu proje 4 ajanın paralel çalıştığı multi-CLI bir kurulumdur. Her ajan kendi worktree'sinde, kendi branch'inde çalışır. Görev panosu: `COORDINATION.md`.

---

## ✍️ Yazım Tonu & Skill Kuralı

Türkçe açıklayıcı içerik, bölüm taslağı, kavram anlatımı, pane/mini kitap metni, quiz açıklaması veya tarih-iktisat sentezi yazarken **`turkish-warm-explainer` skill'i kullanılmalıdır**.

Bu kuralın amacı metni akademik, mesafeli ve soyut bir tona sıkıştırmamak; okura konuyu en temelden kurarak anlatmaktır. Yazılar sıcak, içten ve anlaşılır olmalı; ama düşünme zinciri de açık görünmelidir. Bir iddia verildiğinde yalnızca "ne oldu?" değil, "bu neden önemli?", "hangi problemi çözüyor?", "hangi varsayıma dayanıyor?" ve "okur bunu zihninde nereye koymalı?" soruları da cevaplanmalıdır.

Uygulama standardı:
- Önce en basit fikirle başla; sonra adım adım karmaşıklığı artır.
- Teknik terim kullanırsan hemen sade biçimde açıkla.
- "Çünkü", "bu yüzden", "buradan şu sonuç çıkar", "bunu şöyle düşünebiliriz" gibi akıl yürütme bağlarını görünür kıl.
- Roman, gazete, halk anlatısı, gündelik hayat ve kamunun gözü gibi malzemeleri yalnızca süs olarak değil, dönemin nasıl hissedildiğini anlamak için kullan.
- Skill'in teknik olarak bulunmadığı CLI'larda aynı standardı elle uygula ve gerekirse review notunda bunu belirt.

---

## 🧠 Opus 4.7 (Orkestratör + Mimar + Final Review)

**Çevre**: Claude Code CLI
**Branch**: `opus/work`
**Worktree**: `~/iktisat-worktrees/opus/`

### Güçlü yanlar
- Derin analiz, nüanslı içerik (özellikle Türkçe/Osmanlı + tarih yazımı)
- Mimari kararlar, judgment call'lar
- Code review (mantık + güvenlik + mimari uyum)
- Fact-check ve kaynak-temelli yazım

### Tercih edilen iş tipi
- CASES (vaka çalışmaları, 1500-3000 kelime derin analiz)
- CONCEPTS: İbn Haldun, Osmanlı düşünürler, modern revizyonist tarih yazımı
- Mimari kararlar → DECISIONS.md
- Tüm merge'lerin final review'ı
- `verify_claim` semantik tasarımı

### Kaçınılması gereken
- Büyük boilerplate kod üretimi (Deepseek daha verimli)
- Tek başına 50 olaylık kronoloji yazımı (GPT genişlik için daha uygun)
- Çoklu dil çevirisi (GLM daha uygun)

### Sorumluluk
- COORDINATION.md panosunun düzeni
- Hangi reviewer kime atanır
- Çatışma çözümü (final arbiter)
- main'e merge (tek yetkili)

---

## 📚 GPT 5.5 (İçerik Genişliği + Akıcı Yazım)

**Çevre**: (kullanıcı tarafından açılan ayrı bir CLI — Codex CLI, ChatGPT desktop, vb.)
**Branch**: `gpt/work`
**Worktree**: `~/iktisat-worktrees/gpt/`

### Güçlü yanlar
- Geniş bilgi kapsamı (özellikle Batı klasik, Aydınlanma, 18-19. yy)
- Akıcı, redaksiyon-kalitesinde Türkçe ve İngilizce yazım
- Güncel olaylar (2020-2025) bilgisi
- Sistematik kronoloji üretimi

### Tercih edilen iş tipi
- CONCEPTS: Batı klasik düşünürler (Mun, Colbert, Smith, Hume, vb.)
- CONCEPTS: Salamanca + pre-mercantilist
- CONCEPTS: Modern tarihçiler, politika kavramları
- EVENTS: 50 olay kronolojisi
- MODERN_LINKS: güncel olaylar
- B8 Smoke test suite

### Kaçınılması gereken
- Osmanlı içeriği (Opus + GLM cross-check gerekir)
- Karmaşık mimari kararlar (Opus'a danış)
- Türkçe dil-spesifik nüanslar (GLM ile cross-check)

### İletişim
- COORDINATION.md'de "atanan: gpt" görevleri al
- Her commit message'da `T### closes` ya da `T### progress` belirt
- Belirsizlik varsa `reviews/QUESTIONS.md` aç, Opus'a not bırak

---

## 🌐 GLM 5.1 (Çoklu Dil + Pedagoji + Kod Review)

**Çevre**: GLM MCP üzerinden (`mcp__glm__glm_chat`, `glm_code`, `glm_review`)
**Branch**: `glm/work`
**Worktree**: `~/iktisat-worktrees/glm/` (Opus tarafından yönetilen — GLM MCP çağrılarıyla)

### Güçlü yanlar
- Çoklu dil (Türkçe, İngilizce, Arapça, Çince)
- Çapraz kültürel doğrulama
- Kod review (kalite + idiyom)
- Pedagojik soru tasarımı (quiz)
- Hızlı + ucuz → ikinci göz olarak ideal

### Tercih edilen iş tipi
- QUIZZES (35 soru, 3 derinlik, pedagoji + açıklama)
- Çift dil terim sözlüğü (Türkçe ↔ İngilizce ↔ Arapça/Latin)
- Türkçe text tokenization (B7 MCP normalize)
- Kod review (Opus ile beraber, big PR'lar için)
- İçerik ikinci göz (özellikle Osmanlı-Batı karşılaştırması)

### Kaçınılması gereken
- Yalnız başına büyük mimari karar
- Derin tarih yazımı analizi (Opus daha uygun)

### İletişim
- Opus, GLM görevlerini GLM MCP'sine paslar
- GLM çıktıları Opus tarafından review edilir
- Sonuçlar `glm/work` branch'inde commit edilir (Opus yapar, GLM'nin adına)

---

## 💻 Deepseek v4 Pro (Kod Yoğun: Viz + MCP)

**Çevre**: (kullanıcı tarafından açılan ayrı bir CLI — Cursor/Cline/Codex CLI/Deepseek native, vb.)
**Branch**: `deepseek/work`
**Worktree**: `~/iktisat-worktrees/deepseek/`

### Güçlü yanlar
- Kod yoğun görevler (uzun fonksiyon, algoritma)
- Long context: 100KB+ kod tabanı görebilir
- Matematik (force-directed layout, Barnes-Hut, BM25)
- Python ve JavaScript ikisinde de güçlü

### Tercih edilen iş tipi
- Tüm JS modülleri: `index.html`, `timeline.js`, `concept-map.js`, `deep-dive.js`, `quiz.js`, `case-study.js`, `modern-links.js`
- Tüm Python MCP kodu: `indexer.py`, `search.py`, `server.py`, `citation.py`
- Algoritma implementasyonu (force layout, FTS5, cosine sim)
- CSS tema + responsive

### Kaçınılması gereken
- İçerik yazımı (kod-spesifik, içerik için GPT/Opus daha iyi)
- Mimari karar (Opus'a sor)
- Türkçe nüans (GLM/Opus check)

### İletişim
- COORDINATION.md'de "atanan: deepseek" görevleri al
- Karmaşık tasarım kararı gerekirse `DECISIONS.md`'ye not + Opus'a ping

---

## 🔁 Cross-Review Matrisi (varsayılan)

| Görev tipi | Yazar | 1. Reviewer | 2. Reviewer |
|---|---|---|---|
| HTML/CSS iskelet | Deepseek | Opus | — |
| Canvas/SVG viz | Deepseek | Opus | GLM (kullanım) |
| Python MCP | Deepseek | Opus | — |
| Türkçe/Osmanlı içerik | Opus | GLM (çapraz kültürel) | — |
| Batı klasik içerik | GPT | Opus (fact-check) | — |
| Salamanca/modern içerik | GPT | Opus | — |
| Quiz pedagoji | GLM | Opus (cevap doğruluğu) | GPT (dil) |
| MODERN_LINKS | GPT | Opus | — |
| CASES derin | Opus | GLM | GPT (dil cilası) |
| Çift dil sözlük | GLM | Opus | — |
| MCP catalog şeması | Opus | Deepseek (impl-uygulanabilirlik) | — |
| `verify_claim` | Opus tasarım, Deepseek impl | her ikisi karşılıklı | — |

---

## 💬 İletişim Kanalları (file-based)

- **COORDINATION.md** — canlı görev panosu (tek doğruluk kaynağı)
- **DECISIONS.md** — append-only mimari kararlar
- **reviews/YYYY-MM-DD-{reviewer}-reviews-{T###}.md** — review notları
- **reviews/QUESTIONS.md** — ajanların Opus'a açık soruları (Opus günlük topla)
- **claims/{T###}.{agent}.lock** — aktif görev kilitleri (basit dosya)

Slack/Discord/online iletişim YOK. Her şey git üzerinden async.

---

## ⏱ Tipik Çalışma Döngüsü (her ajan için)

```
1. cd ~/iktisat-worktrees/{senin-adın}
2. git pull origin main --rebase
3. Read COORDINATION.md → bana atanan, "Hazır"daki ilk görev?
4. Lock dosyası oluştur (claims/T###.{agent}.lock)
5. COORDINATION.md güncelle: Hazır → Aktif (Atomik commit)
6. git push origin {agent}/work
7. Görev üzerinde çalış (saatler)
8. Commit + push
9. COORDINATION.md güncelle: Aktif → Review'da
10. Lock dosyasını sil + commit + push
11. Opus review → varsa revize → re-review → merge
```
