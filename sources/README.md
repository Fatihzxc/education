# sources/ — Birincil ve İkincil Kaynaklar

Kullanıcı bu klasöre yasal olarak edindiği PDF/EPUB kaynak kitaplarını yerleştirir. `iktisat-kb` MCP sunucusu (`../kb-mcp/`) bunları indeksler.

## Yapı

```
sources/
├── primary/      # Birincil kaynaklar (tarihi metinler — yazar = orijinal)
└── secondary/    # Akademik ikincil literatür
```

## Hedef Liste (kullanıcı sağlayacak)

### primary/
- `ibn-haldun-mukaddime-uludag-part1.pdf` — İbn Haldun, *Mukaddime — 1. Cilt* (Süleyman Uludağ çev., Dergâh Yayınları)
- `ibn-haldun-mukaddime-uludag-part2.pdf` — İbn Haldun, *Mukaddime — 2. Cilt* (Süleyman Uludağ çev., Dergâh Yayınları)
- `aquinas-summa-theologica.pdf` — Thomas Aquinas, *Summa Theologica* (1274; adil fiyat, faiz bölümleri)
- `mun-englands-treasure.pdf` — Thomas Mun, *England's Treasure by Forraign Trade* (1664)
- `smith-wealth-of-nations.pdf` — Adam Smith, *The Wealth of Nations* (1776)
- `hume-political-discourses.pdf` — David Hume, *Political Discourses* (1752)
- `bodin-reponse-malestroit.pdf` — Jean Bodin, *Réponse à Malestroit* (1568)
- `hornigk-osterreich.pdf` — Philipp von Hörnigk, *Österreich über alles* (1684)
- `steuart-principles.pdf` — James Steuart, *Principles of Political Oeconomy* (1767)
- `serra-breve-trattato.pdf` — Antonio Serra, *Breve trattato* (1613) **[PDF gerekli]**
- `petty-political-arithmetick.pdf` — William Petty, *Political Arithmetick* (1690) **[PDF gerekli]**
- `mandeville-fable-bees.pdf` — Bernard Mandeville, *Fable of the Bees* (1714) **[PDF gerekli]**
- `cantillon-essai-commerce.pdf` — Richard Cantillon, *Essai sur la Nature du Commerce* (1755) **[PDF gerekli]**
- `quesnay-tableau.pdf` — François Quesnay, *Tableau Économique* (1758) **[PDF gerekli]**
- `montesquieu-esprit-lois.pdf` — Montesquieu, *De l'esprit des lois* (1748, Commerce bölümleri) **[PDF gerekli]**
- `kocibey-risalesi.pdf` — Koçi Bey Risalesi
- `katip-celebi-dusturul-amel.pdf` — Katip Çelebi, *Düsturü'l-Amel* (1653) **[PDF gerekli]**
- `sarimehmed-nesayih.pdf` — Defterdar Sarı Mehmed Paşa, *Nesayihü'l-Vüzera* (1714) **[PDF gerekli]**
- `naima-tarihi.pdf` — Naima, *Târîh-i Naîma* (seçilmiş kısımlar) **[PDF gerekli]**

### secondary/
- `heckscher-mercantilism.pdf` — Eli Heckscher, *Mercantilism* (1935)
- `magnusson-shaping.pdf` — Lars Magnusson, *Mercantilism: The Shaping of an Economic Language* (1994)
- `reinert-how-rich.pdf` — Erik Reinert, *How Rich Countries Got Rich…* (2007)
- `chang-kicking-away.pdf` — Ha-Joon Chang, *Kicking Away the Ladder* (2002)
- `genc-devlet-ekonomi.pdf` — Mehmet Genç, *Osmanlı İmparatorluğu'nda Devlet ve Ekonomi*
- `pamuk-paranin-tarihi.pdf` — Şevket Pamuk, *Osmanlı'da Paranın Tarihi*
- `inalcik-quataert.pdf` — İnalcık & Quataert, *An Economic and Social History of the Ottoman Empire*
- `beckert-empire-cotton.pdf` — Sven Beckert, *Empire of Cotton* (2014)
- `schumpeter-history-analysis.pdf` — Joseph Schumpeter, *History of Economic Analysis* (1954) **[PDF gerekli]**
- `hont-jealousy-trade.pdf` — Istvan Hont, *Jealousy of Trade* (2005) **[PDF gerekli]**
- `hirschman-passions-interests.pdf` — Albert Hirschman, *The Passions and the Interests* (1977) **[PDF gerekli]**
- `polanyi-great-transformation.pdf` — Karl Polanyi, *The Great Transformation* (1944) **[PDF gerekli]**
- `drelichman-voth.pdf` — Drelichman & Voth, *Lending to the Borrower from Hell* (2014) **[PDF gerekli]**

## Konvansiyon

- **Dosya adı**: `{yazar-slug}-{eser-slug}[-{çevirmen-slug}].{ext}`
- **Slug**: lowercase ASCII, `-` ayırıcı, kısaltma OK
- **PDF tercih edilen**: metin katmanlı (taranmış değil). Tesseract OCR ileride opsiyonel
- **Lisans**: kişisel araştırma için; sunucu lokal kalır, harici servise gönderilmez

## Reindex

Yeni dosya eklendiğinde:
```
# Claude'a:
"reindex_sources MCP tool'unu çağır"

# Veya CLI:
cd ../kb-mcp && python -m src.indexer
```
