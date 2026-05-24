# iktisat/ — Merkantilizm İnteraktif Öğrenme Sistemi

Merkantilizmi her seviyede (giriş → ileri) ve kaynak-temelli doğrulanabilir biçimde öğrenmek için iki bileşenli bir proje:

- **`merkantilizm/`** — İnteraktif HTML playground (timeline + concept map + quiz + vaka + güncel bağlantı)
- **`kb-mcp/`** — `iktisat-kb` MCP sunucusu; `sources/` altındaki PDF kitapları indeksleyip Claude'un kaynak alıntılarını doğrulamasını sağlar

## Çalışma

Build sistemi yok. Bağımlılık yok (playground tarafı).

```bash
# Playground:
open merkantilizm/index.html

# MCP sunucusu (geliştirme):
cd kb-mcp && python -m src.server
```

## Multi-agent Geliştirme

Bu proje 4 ajanın paralel çalıştığı bir kurulumdur:

| Ajan | Rol | Branch |
|---|---|---|
| Opus 4.7 | Orkestratör + Mimar + Final Review | `opus/work` |
| GPT 5.5 | İçerik genişliği | `gpt/work` |
| GLM 5.1 | Quiz + çok dil + kod review | `glm/work` |
| Deepseek v4 pro | Tüm kod (viz + MCP) | `deepseek/work` |

- **Görev panosu**: [`COORDINATION.md`](COORDINATION.md)
- **Ajan profilleri**: [`AGENTS.md`](AGENTS.md)
- **Mimari kararlar**: [`DECISIONS.md`](DECISIONS.md)
- **Review notları**: [`reviews/`](reviews/)
- **Aktif kilitler**: [`claims/`](claims/)

## Dizin Yapısı

```
iktisat/
├── README.md                 # bu dosya
├── COORDINATION.md           # canlı görev panosu
├── AGENTS.md                 # ajan profilleri
├── DECISIONS.md              # mimari kararlar logu
├── claims/                   # aktif görev kilitleri
├── reviews/                  # cross-review notları
├── merkantilizm/             # Workstream A — playground
│   ├── index.html
│   └── modules/
│       ├── content-data.js
│       ├── timeline.js
│       ├── concept-map.js
│       ├── deep-dive.js
│       ├── quiz.js
│       ├── case-study.js
│       └── modern-links.js
├── kb-mcp/                   # Workstream B — MCP server
│   ├── pyproject.toml
│   ├── src/
│   │   ├── server.py
│   │   ├── indexer.py
│   │   ├── search.py
│   │   └── citation.py
│   └── data/
│       ├── index/
│       └── catalog.json
└── sources/                  # kullanıcının attığı PDF/EPUB kitaplar
    ├── primary/              # birincil kaynaklar (İbn Haldun, Mun, Smith, Hume, ...)
    └── secondary/            # akademik ikincil (Heckscher, Genç, Reinert, ...)
```

## Detaylı Plan

Tam tasarım dokümanı: `~/.claude/plans/merkantilizm-hakkinda-her-seyi-warm-turing.md`
