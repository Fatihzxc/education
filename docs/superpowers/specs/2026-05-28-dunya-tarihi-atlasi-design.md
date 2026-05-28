# Dünya Tarihi Atlası — Tasarım Belgesi

Tarih: 2026-05-28
Statü: pilot scaffold
Tür: yeni tema / üst-harita

## 1. Amaç

Kullanıcının hedefi: tarihi tek tek olaylar olarak değil, bölgeler arasında karşılaştırmalı bir bütün olarak görmek; her bölgeyi ekonomik, siyasal, askerî, felsefi/düşünsel, dinî, teknolojik, ekolojik ve toplumsal merceklerle okuyabilmek. Yeni eklenen arayüz fikri: her büyük ekol veya dönem bir **pane**, her pane içindeki bakış açıları ise **perspektif kartları** olur. Kartlardan biri özellikle "kamunun gözü"ne ayrılır: roman, gazete, broşür, seyahatname, anı, tiyatro ve popüler metinler.

Bu tema mevcut kitapların yerine geçmez. Onların üstünde çalışan bir yön bulma katmanıdır:

- `egemenlik` derin devlet/siyasal meşruiyet okuması sağlar.
- `mulkiyet` mülkiyet ve hukuk-ekonomi ilişkisini açar.
- `deger`, `klasik-iktisat`, `merkantilizm`, `fizyokrasi`, `iktisat-haritasi` ekonomik düşünce derinleşmesini verir.
- `tarih-atlasi` bütün bunları dünya tarihinin dönem ve bölge akışına bağlar.

## 2. Merkez yöntem

Temel birim olay değil, matristir:

```text
dönem x bölge x mercek
```

Her bölüm bir dönemdir. Bölüm içinde bölgeler karşılaştırılır. Her bölge mümkün oldukça aynı merceklerle okunur:

1. Ekonomi
2. Siyaset/devlet
3. Askerî kapasite
4. Düşünce/felsefe/bilgi
5. Din/meşruiyet
6. Teknoloji/enerji/iletişim
7. Ekoloji/demografi/hastalık
8. Toplum/sınıf/cinsiyet/gündelik hayat
9. Kamunun gözü / romanlar / popüler metinler

## 3. Pane ve perspektif kartları

İlk uygulama: `tarih-atlasi/appendix/panes.html`.
İlk tam kalite pane mini kitapları:

- `tarih-atlasi/panes/merkantilizm/book.html`
- `tarih-atlasi/panes/fizyokrasi/book.html`
- `tarih-atlasi/panes/klasik/book.html`
- `tarih-atlasi/panes/marx/book.html`

Pane örnekleri:

- Merkantilizm
- Fizyokrasi
- Klasik İktisat
- Marx ve Artı-Değer
- Marjinalizm ve Neoklasik
- Keynesçilik ve Monetarizm

Her pane şu kartları taşır:

- Ekonomi
- Siyaset ve devlet
- Askerî ve mali güç
- Düşünce ve felsefe
- Toplum ve gündelik hayat
- Kamunun gözü, romanlar, gazeteler

Kartlar iki seviyeli çalışır:

- Pane panosunda kısa, hızlı okunur bir özet verir.
- Tam kaliteye çıkarılan pane'lerde her kart aynı pane'in mini kitabındaki bir bölüme bağlanır.

Tam kaliteye çıkarılan pane'ler için seçilen bölüm eşlemesi:

1. Pane özeti
2. Ekonomi
3. Devlet ve siyaset
4. Askerî ve mali güç
5. Düşünce ve felsefe
6. Toplum ve gündelik hayat
7. Kamunun gözü

Bu model zamanla genişletilebilir: bölgesel paneller (Osmanlı, Çin, Avrupa, Hint Okyanusu, Afrika, Amerika) ve dönem panelleri (1450-1650, 1815-1914, 1945-1991) aynı kart düzeniyle okunabilir.

## 4. Editöryal kurallar

- Avrupa merkezli tek çizgi anlatıdan kaçın.
- Bugünkü devlet sınırlarını geçmişe taşımadan yaz.
- Her dönemde bütün dünyayı eşit uzunlukta anlatma zorunluluğu yok; ağırlık merkezlerini açıkça gerekçelendir.
- Fikirleri yalnızca çıkarın maskesi gibi yazma; ama fikirleri kurum, sınıf, devlet ve ekonomi bağlamından koparma.
- Her bölümde en az bir karşılaştırma tablosu kullan.
- Her pane'de "kamunun gözü" kartı aç: roman/gazete/popüler kültür dönemi nasıl hissettirdi?
- Modern dönemlerde "son durum" iddiası varsa güncel kaynak kontrolü yap.
- Kardeş kitaplara bağlantı ver; derin tartışmayı tekrar etme.

## 5. Bölüm yapısı

1. Nasıl okumalı: bölge, dönem, mercek
2. Antik çekirdekler: nehir havzaları ve erken devletler
3. Klasik Avrasya: imparatorluk, şehir ve felsefe
4. Dinler ve ticaret ağları: 600-1000
5. Ortaçağ bölgeleri: 1000-1450
6. Okyanus ve barut çağları: 1450-1650
7. Mali-askerî devlet ve devrimler: 1650-1815
8. Sanayi, ulus ve imparatorluk: 1815-1914
9. Dünya savaşları ve ideolojiler: 1914-1945
10. Soğuk Savaş ve kalkınma: 1945-1991
11. Küreselleşme ve çok kutupluluk: 1991-2020'ler
12. Sentez: okuma yolları ve karşılaştırma tabloları

## 6. Başarı ölçütü

- Landing sayfasında `Dünya Tarihi Atlası` kartı görünür.
- `tarih-atlasi/book.html#bolum/1` pilot bölümünü render eder.
- Diğer 11 bölüm pending stub olarak görünür.
- `tarih-atlasi/appendix/panes.html` pane/kart modelini ilk kullanılabilir prototip olarak gösterir.
- `tarih-atlasi/panes/merkantilizm/book.html`, `tarih-atlasi/panes/fizyokrasi/book.html`, `tarih-atlasi/panes/klasik/book.html` ve `tarih-atlasi/panes/marx/book.html` ilk tam kalite mini kitaplar olarak çalışır.
- Merkantilizm, Fizyokrasi, Klasik İktisat ve Marx kartları mini kitaplarda doğru bölümlere bağlanır.
- Bölüm 1, kullanıcının büyük amacını uygulanabilir bir okuma yöntemine çevirir.
- Sonraki yazım turları her bölümde aynı mercek düzenini korur.
