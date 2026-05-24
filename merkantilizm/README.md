# Merkantilizm — Bir Tarih ve Düşünce Okuması

16-18. yüzyıl iktisat düşüncesinin Osmanlı ve Batı perspektifinden uzun-form, birincil kaynaklarla doğrulanmış Türkçe okuması.

## Nasıl okurum

En basit yol: `book.html` dosyasını tarayıcıda doğrudan açın.

Markdown bölümleri `fetch` ile yüklendiği için yerel bir HTTP sunucusu daha sağlıklıdır:

```bash
python3 -m http.server 8772
# tarayıcıda aç:
open http://localhost:8772/book.html
```

Kısayollar:

- **⌘K / Ctrl+K** — komut paleti (bölüm, terim, kavram, olay araması).
- **☰** (mobil) — sol kenar çubuğu / İçindekiler.
- **☀ / 🌙** — aydınlık / karanlık tema (tercih `localStorage`'da saklanır).

`index.html` yalnızca `book.html`'e yönlendiren ince bir köprüdür.

## Dizin yapısı

```
merkantilizm/
├── book.html               # Birincil giriş — uzun-form okuma uygulaması
├── index.html              # book.html'e yönlendirme
├── appendix/
│   └── playground.html     # Eski etkileşimli arayüz (timeline, kavram haritası, kuiz)
├── chapters/
│   ├── _index.json         # 12-bölüm manifesto (status: pending | draft | done)
│   └── 01-..-12-*.md       # Markdown bölümler
├── modules/
│   ├── book/               # Yeni okuma modülleri (reader, toc, progress)
│   ├── content-fragments/  # İçerik veri kümeleri (kavram, alıntı, terim, kuiz, olay)
│   ├── content-data.js     # İçerik kaydı (registry)
│   ├── terminology.js      # Bölüm metinlerinde terim altı çizme
│   ├── bookmarks.js        # Ziyaret edilen bölümleri izleme
│   ├── command-palette.js  # ⌘K hızlı arama
│   └── deep-dive.js, timeline.js, concept-map.js   # Playground modülleri
├── styles/
│   └── book.css            # Serif tipografi, TOC, dipnot, print stylesheet
└── vendor/
    └── marked.min.js       # Markdown ayrıştırıcı (CDN değil, yerel)
```

Bilgi tabanı (PDF dizinleyici Python MCP sunucusu) projenin **dışında**, `../kb-mcp/` altındadır.

## Bölümler

| # | Başlık | Durum |
|---|---|---|
| 1 | Niye "merkantilizm"? | ✓ draft |
| 2 | Para nedir, neye yarar? | ✓ draft |
| 3 | Erken modern devletin doğuşu | ✓ draft |
| 4 | Thomas Mun ve İngiliz okulu | ✓ draft |
| 5 | Colbert ve Fransız devletçiliği | ✓ draft |
| 6 | Cameralism ve Orta Avrupa | ✓ draft |
| 7 | İaşecilik, fiskalizm, gelenekçilik | ✓ draft |
| 8 | İbn Haldun — dışarıdan bir bakış | ✓ draft |
| 9 | Hume, Smith ve klasik eleştiri | ✓ draft |
| 10 | Sömürge ve şiddet | ✓ draft |
| 11 | 20. yüzyıl yeniden okumaları | ✓ draft |
| 12 | Bugün ne kaldı? | … pending |

Güncel durum her zaman `chapters/_index.json` içinde tutulur; tablo manifestoyu yansıtır.

## Eski playground

`appendix/playground.html`, projenin ilk fazında inşa edilen tek-sayfalık etkileşimli arayüzdür. Zaman çizelgesi, kavram haritası, kuiz, terim sözlüğü (78 terim), modern bağlantılar ve kaynakça sekmelerini barındırır. Tamamen çalışır durumdadır; kitabın sol kenar çubuğundaki "Ekler" bölümünden veya doğrudan URL üzerinden ulaşılabilir.

## MCP entegrasyonu

Projenin yanında, `../kb-mcp/` altında bağımsız bir bilgi tabanı bulunur: birincil kaynak PDF'lerini (Heckscher, Magnusson, Mun, Smith, Hume, İbn Haldun, Genç, Pamuk vb.) indeksleyen Python tabanlı bir MCP sunucusu. Kitap bölümlerindeki **her birincil-kaynak alıntısı** bu bilgi tabanına karşı doğrulanmış pasajlardan derlenmiştir; başka bir deyişle yapay-zekâ uydurması alıntı yer almaz, her aktarımın sayfa-numaralı bir izi vardır.

## Geliştirme notları

- **Bölüm yazımı**: `chapters/NN-slug.md` dosyasını düzenle ve sayfayı yeniden yükle. `reader.js` içindeki manifesto önbelleği bir sonraki gezintide statüyü tazeler.
- **Alıntı madenciliği** (J1 çıktısı): `cd ../kb-mcp && .venv/bin/python -m scripts.mine_quotes` — kavram → alıntı tablosunu yeniden üretir.
- **MCP HTTP köprüsü**: yoğun eşzamanlı kullanımda SQLite kilitlerinde takılabilir. Yeniden başlat: `cd ../kb-mcp && .venv/bin/python -m src.http_bridge`.
- **Bağımlılık yok**: build sistemi, paket yöneticisi, derleme adımı yoktur. Tarayıcı + statik sunucu yeterlidir.
- **Yazdırma**: `book.html` üzerinde `Cmd/Ctrl+P` — TOC, başlık, gezinti ve ek bilgiler gizlenir; dipnotlar metin içinde açılır; bloklar sayfa kenarında bölünmez (`styles/book.css` `@media print` bloğu).

## Yapım fazlarının kısa özeti

Proje dört fazda inşa edildi. **Faz 1**, çok-ajanlı bir kurulumda zaman çizelgesi, kavram haritası, kuiz ve sözlüğün temellerinin atıldığı tek-sayfalık playground'u üretti. **Faz 2** (I1-I7), bu arayüzün cilalandığı dönem oldu: erişilebilirlik, tema, sözlük genişletme, kaynakça düzenleme. **Faz 3** (J1-J7), birincil kaynaklara karşı içerik doğrulama, alıntı madenciliği ve içerik düzeltmelerini kapsadı; kitap-mod öncesi son gözden geçirme. **Faz 4** (bugün), oyun alanı modundan kitap moduna geçişi getirdi: markdown tabanlı uzun-form bölümler, yeni `book.html`, TOC kenar çubuğu, yazdırma stil sayfası; playground'un ise tamamı `appendix/` altında muhafaza edildi.

---

İçerik ve metin telifi: Fatih Öner. Birincil kaynaklardan yapılan alıntılar kamu malıdır veya eğitim amaçlı dürüst kullanım (fair use) kapsamındadır.
