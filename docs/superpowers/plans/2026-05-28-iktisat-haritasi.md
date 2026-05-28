# İktisat Düşüncesinin Haritası — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax. NOTE: project owner prefers **direct hand-editing over agent fan-out** for chapter prose — default to inline execution.

**Goal:** Kütüphaneye yedinci tema olarak, merkantilizmden monetarizme iktisadi düşünceyi tek bir soy ağacı + "analitik ilerleme vs sınıf-meşrulaştırması" merkez tezi altında bağlayan 8 bölümlük sentez/üst-kitabı eklemek.

**Architecture:** Mevcut tema mimarisini birebir izler — `iktisat-haritasi/book.html` (shell) + `chapters/_index.json` (manifest) + `chapters/NN-*.md` (markdown bölümler) + `modules/theme-registry.js`'e bir kayıt. Genealoji haritası Bölüm 1'e gömülü, `book.css` değişkenleriyle koyu/açık moda uyumlu, `.eco-map` scope'lu inline HTML/CSS. Dipnotlar `^[N]` (gövde) / `[^N]:` (Kaynakça) konvansiyonu.

**Tech Stack:** Statik dosyalar; marked.js (markdown→HTML), reader.js (footnote engine + hash router), book.css (tema değişkenleri). Build yok. Doğrulama: Python footnote-integrity betiği.

---

## File Structure

| Dosya | Sorumluluk | Create/Modify |
|---|---|---|
| `modules/theme-registry.js` | Landing + palette tema listesi | Modify (7. kayıt ekle) |
| `iktisat-haritasi/book.html` | Kitap shell'i | Create (merkantilizm'den kopya + düzelt) |
| `iktisat-haritasi/chapters/_index.json` | 8 bölüm manifesti | Create |
| `iktisat-haritasi/chapters/01-…` … `08-…md` | 8 bölüm içeriği | Create (her biri ayrı task) |

**Doğrulama betiği (her bölüm task'ında kullanılır)** — `/tmp/ih_check.py` olarak yaz (repoya commit edilmez):

```python
import re, glob, sys
CITE=re.compile(r'\^\[(\d+)\]|\[\^(\d+)\]')
ok=True
for f in sorted(glob.glob(sys.argv[1] if len(sys.argv)>1 else '*.md')):
    raw=open(f,encoding='utf-8').read()
    m=re.search(r'^##\s*Kaynak[çc]a\s*$',raw,flags=re.M)
    if not m: print(f"{f}: NO Kaynakça"); ok=False; continue
    body,tail=raw[:m.start()],raw[m.end():]
    caret=re.findall(r'\^\[(\d+)\]',body); brkt=re.findall(r'(?<!\^)\[\^(\d+)\]',body)
    dcorr=[int(n) for n in re.findall(r'^\[\^(\d+)\]:',tail,flags=re.M)]
    dbrok=re.findall(r'^\^\[(\d+)\]\s',tail,flags=re.M)
    order=[]
    for cm in CITE.finditer(body):
        n=int(cm.group(1) or cm.group(2))
        if n not in order: order.append(n)
    p=[]
    if dbrok: p.append(f"BROKEN-defs={dbrok}")
    if brkt: p.append(f"WRONG-intext={sorted(set(brkt),key=int)}")
    if set(order)-set(dcorr): p.append(f"MISSING={sorted(set(order)-set(dcorr))}")
    if set(dcorr)-set(order): p.append(f"ORPHAN={sorted(set(dcorr)-set(order))}")
    if order!=sorted(order): p.append(f"NOT-ASC={order}")
    if p: ok=False
    print(f"{f}: defs={len(dcorr)} markers={len(caret)} {'OK' if not p else 'FAIL: '+' | '.join(p)}")
print("ALL CLEAN" if ok else "*** PROBLEMS ***")
```

**Bölüm yazım kuralı (her ekol bölümünde tekrarlanan iskelet):** ① analitik atılım → ② sınıf/çıkar katmanı → ③ ayrılamazlık → ④ kardeş-kitap çapraz-bağı → ⑤ bugün canlı versiyonu. Dipnotlar: gövde `^[N]`, Kaynakça `[^N]:`, artan sırada. Bölüm uzunluğu ~1.800–2.800 kelime. LaTeX YOK.

---

## Task 0: Scaffold (registry + shell + manifest)

**Files:**
- Modify: `modules/theme-registry.js` (diziye 7. nesne)
- Create: `iktisat-haritasi/book.html`
- Create: `iktisat-haritasi/chapters/_index.json`

- [ ] **Step 1: theme-registry.js'e kayıt ekle**

`window.MerkantilizmThemes` dizisinin sonuna (egemenlik kaydından sonra) ekle:

```javascript
    {
      slug: 'iktisat-haritasi',
      title: 'İktisat Düşüncesinin Haritası',
      subtitle: 'Merkantilizmden monetarizme',
      description: 'Bir soy ağacı ve tek bir mercek: her teorik geçiş hem analitik ilerleme hem sınıf-meşrulaştırması. Merkantilizm, fizyokrasi, klasik, Marx, marjinalizm, neoklasik, Keynes, monetarizm — sentez ve eleştiri.',
      chapterCount: 8,
      status: 'draft',
      primaryAuthors: ['Quesnay', 'Smith', 'Ricardo', 'Marx', 'Jevons', 'Menger', 'Walras', 'Marshall', 'Keynes', 'Friedman', 'Hayek'],
    },
```

- [ ] **Step 2: book.html'i merkantilizm'den kopyala ve düzelt**

`merkantilizm/book.html`'i `iktisat-haritasi/book.html` olarak kopyala. Şu 4 yeri değiştir:
1. `<title>` → `İktisat Düşüncesinin Haritası — Merkantilizmden monetarizme`
2. `<meta name="description">` → kısa bir özet (registry description'a yakın)
3. Header `<h1><a href="#bolum/1">…</a></h1>` → `İktisat Haritası`
4. TOC "Diğer Tema'lar" link listesi: kendi temasını çıkar, eksik temaları (klasik-iktisat zaten var mı kontrol et) tamamla; `../iktisat-haritasi/...` linki ekleme (kendisi).

Geri kalan her şey (modül yolları `../modules/...`, script sırası, tema/menü inline JS) **aynen** kalır.

- [ ] **Step 3: _index.json yaz**

`iktisat-haritasi/chapters/_index.json`:

```json
{
  "title": "İktisat Düşüncesinin Haritası",
  "subtitle": "Merkantilizmden monetarizme — analitik ilerleme mi, sınıf-meşrulaştırması mı?",
  "chapters": [
    { "num": 1, "slug": "01-nasil-okumali-harita", "title": "Nasıl okumalı: harita, iki katman, anti-Whig", "subtitle": "Genealoji haritası, iki-katman tezi, Whig tuzağı", "estWords": 2600, "status": "draft" },
    { "num": 2, "slug": "02-ilk-kopus-merkantilizm-fizyokrasi", "title": "İlk kopuş: maden stoğundan produit net'e", "subtitle": "Merkantilizm → Fizyokrasi; analitik çürütme + sınıf çıkarı", "estWords": 2200, "status": "draft" },
    { "num": 3, "slug": "03-klasik-sentez-smith-emek-deger", "title": "Klasik sentez: Smith ve emek-değer", "subtitle": "İki darlığı aşmak; Corn Laws ve sanayi burjuvazisi", "estWords": 2400, "status": "draft" },
    { "num": 4, "slug": "04-catallanma-marx-arti-deger", "title": "Çatallanma I — Marx: emek-değerin radikalleşmesi", "subtitle": "Değer emekten geliyorsa kârı kim yaratıyor? Artı-değer, sömürü", "estWords": 2400, "status": "draft" },
    { "num": 5, "slug": "05-catallanma-marjinalist-devrim", "title": "Çatallanma II — Marjinalist Devrim (1871)", "subtitle": "Marjinal fayda; dürüst atılım mı, ideolojik manevra mı?", "estWords": 2600, "status": "draft" },
    { "num": 6, "slug": "06-marshall-neoklasik-terim-tuzagi", "title": "Marshall ve neoklasik: bir terim tuzağı", "subtitle": "Arz-talep sentezi; neoklasik iktisat ≠ neoklasik sentez", "estWords": 2200, "status": "draft" },
    { "num": 7, "slug": "07-keynes-monetarizm", "title": "Keynes → Monetarizm: Buhran, müdahale, karşı-devrim", "subtitle": "Say Yasası'nın çöküşü, toplam talep, stagflasyon, Friedman/Hayek", "estWords": 2600, "status": "draft" },
    { "num": 8, "slug": "08-kapanis-hicbir-ekol-olmez", "title": "Kapanış: hiçbir ekol ölmez — mercek kendine döner", "subtitle": "Bugünkü canlı versiyonlar; yanlılık merceği okurun çağına", "estWords": 2200, "status": "draft" }
  ]
}
```

- [ ] **Step 4: Doğrula — landing + boş kitap açılıyor mu**

Run: `python3 serve.py` (arka planda) → tarayıcıda `http://localhost:8772/` → 7. kart görünür → karta tıkla → `iktisat-haritasi/book.html#bolum/1` "pending/henüz yazılmadı" stub'ı veya yüklenme gösterir (bölümler henüz yok; manifest okunur). Hata yoksa OK.
Alternatif statik kontrol: `python3 -c "import json;json.load(open('iktisat-haritasi/chapters/_index.json',encoding='utf-8'))"` → hata yok.

- [ ] **Step 5: Commit**

```bash
git add modules/theme-registry.js iktisat-haritasi/book.html iktisat-haritasi/chapters/_index.json
git commit -m "feat(iktisat-haritasi): tema iskeleti — registry, shell, manifest"
```

---

## Task 1: Bölüm 1 — Nasıl okumalı + genealoji haritası

**Files:** Create `iktisat-haritasi/chapters/01-nasil-okumali-harita.md`

- [ ] **Step 1: Bölüm 1'i yaz**

H2 bölümleri ve içerikleri:
- **1.1 Bir zincir mi, bir aile albümü mü?** — kitabın amacı: ekolleri tek tek değil, *aralarındaki geçişler* olarak okumak. Kardeş temalar kazıyı yaptı; bu kitap sentezi yapar.
- **1.2 İki katman: analitik ilerleme ve sınıf-meşrulaştırması** — merkez tez. İdeoloji ≠ yalan (bir teori doğru *ve* belirli bir sınıfın çıkarına denk düşmüş olabilir). Örnek önizleme: fizyokrat tek vergi.
- **1.3 Harita** — *genealoji diyagramı buraya gömülür* (Step 2). Diyagramın altında renk lejantı + okuma notu.
- **1.4 Renklerin mantığı** — teal = emek-değer ailesi (Klasik, Marx); mor = marjinalist/denge soyu (Marjinalizm, Neoklasik, Monetarizm); kök = Merkantilizm/Fizyokrasi; ayrı ton = Keynes. Renk *aile* anlatır, *değer yargısı* değil.
- **1.5 Anti-Whig uyarısı** — "galip gelen doğruydu" okuması yanlılıktır; hiçbir ekol tam ölmez.
- **1.6 Bu kitabı nasıl kullanmalı** — her bölüm bir düğüm; derini kardeş kitaba devreder; sonunda mercek okurun çağına döner.

Dipnotlar (örnek kaynaklar — gövdede `^[N]`, Kaynakça `[^N]:`): Schumpeter *History of Economic Analysis* (1954); Blaug *Economic Theory in Retrospect* (1962); Whig tarihçiliği için Herbert Butterfield *The Whig Interpretation of History* (1931); ideoloji-bilim ilişkisi için referans (ör. kardeş kitap fizyokrasi/06'daki Marx-ideoloji okuması). ~3-5 dipnot yeterli.

- [ ] **Step 2: Haritayı göm (1.3 içine)**

1.3 bölümünün içine bu inline HTML bloğunu koy (marked.js ham HTML'i geçirir):

```html
<style>
.eco-map{--ek:var(--accent,#3aa);--teal:#1f8a8a;--mor:#7a5cc0;--kok:#8a7a5c;--keynes:#3a6ea5;
  font-family:var(--font-sans,sans-serif);margin:24px 0;}
.eco-map .row{display:flex;justify-content:center;gap:16px;align-items:stretch;flex-wrap:wrap;}
.eco-map .node{border:2px solid var(--border,#444);border-radius:8px;padding:10px 14px;
  min-width:150px;text-align:center;background:var(--bg-secondary,#1a1a1a);color:var(--text-primary,#eee);}
.eco-map .node b{display:block;font-size:1.02em;}
.eco-map .node small{color:var(--text-muted,#999);}
.eco-map .teal{border-color:var(--teal);} .eco-map .mor{border-color:var(--mor);}
.eco-map .kok{border-color:var(--kok);} .eco-map .keynes{border-color:var(--keynes);}
.eco-map .arrow{text-align:center;color:var(--text-muted,#999);font-size:1.3em;margin:4px 0;}
.eco-map .legend{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-top:16px;font-size:.85em;}
.eco-map .legend span{display:inline-flex;align-items:center;gap:6px;}
.eco-map .sw{width:14px;height:14px;border-radius:3px;display:inline-block;border:2px solid;}
</style>
<div class="eco-map">
  <div class="row"><div class="node kok"><b>Merkantilizm</b><small>zenginlik = maden</small></div></div>
  <div class="arrow">↓</div>
  <div class="row"><div class="node kok"><b>Fizyokrasi</b><small>produit net · toprak</small></div></div>
  <div class="arrow">↓</div>
  <div class="row"><div class="node teal"><b>Klasik İktisat</b><small>emek-değer · işbölümü</small></div></div>
  <div class="arrow">↓ çatallanma ⑂</div>
  <div class="row">
    <div class="node teal"><b>Marx</b><small>artı-değer · sömürü</small></div>
    <div class="node mor"><b>Marjinalist Devrim (1871)</b><small>marjinal fayda</small></div>
  </div>
  <div class="arrow">↓</div>
  <div class="row"><div class="node mor"><b>Neoklasik (Marshall)</b><small>arz-talep sentezi</small></div></div>
  <div class="arrow">↓</div>
  <div class="row"><div class="node keynes"><b>Keynes</b><small>toplam talep · devlet</small></div></div>
  <div class="arrow">↓</div>
  <div class="row"><div class="node mor"><b>Monetarizm</b><small>Friedman/Hayek · denge dönüşü</small></div></div>
  <div class="legend">
    <span><i class="sw" style="border-color:var(--teal)"></i> emek-değer ailesi</span>
    <span><i class="sw" style="border-color:var(--mor)"></i> marjinalist / denge soyu</span>
    <span><i class="sw" style="border-color:var(--kok)"></i> pre-klasik kök</span>
    <span><i class="sw" style="border-color:var(--keynes)"></i> talep / müdahale</span>
  </div>
</div>
```

- [ ] **Step 3: Doğrula (footnote integrity + render)**

Run: `cd iktisat-haritasi/chapters && python3 /tmp/ih_check.py 01-nasil-okumali-harita.md`
Expected: `... OK` ve `ALL CLEAN`.
Render: `book.html#bolum/1` → harita koyu modda renkli kutularla görünür; tema değiştir (☀/🌙) → renkler okunur kalır; dipnota tıkla → açılır.

- [ ] **Step 4: Commit**

```bash
git add iktisat-haritasi/chapters/01-nasil-okumali-harita.md
git commit -m "feat(iktisat-haritasi): Bölüm 1 — harita + iki-katman yöntemi"
```

---

## Tasks 2–8: Ekol/düğüm bölümleri

Her biri aynı kalıbı izler: **(a)** ~1.800–2.800 kelime markdown yaz, beş-adımlı iskeletle (① analitik atılım ② sınıf katmanı ③ ayrılamazlık ④ kardeş-kitap çapraz-bağ ⑤ bugün); **(b)** `python3 /tmp/ih_check.py <dosya>` → OK; **(c)** render-check `#bolum/N`; **(d)** commit `feat(iktisat-haritasi): Bölüm N — <konu>`.

### Task 2: Bölüm 2 — İlk kopuş (Merkantilizm → Fizyokrasi)
**File:** `02-ilk-kopus-merkantilizm-fizyokrasi.md`
H2'ler: 2.1 Merkantilizm tek ekol değildi (Mun, Colbert — broşür+politika; zenginlik=maden, ihracat fazlası, korumacılık). 2.2 Fizyokratik çürütme (Quesnay: zenginlik=*produit net*, yalnızca toprak üretken). 2.3 Sınıf katmanı (tezin Fransız toprak sahibi sınıfının çıkarına denk düşmesi; *impôt unique* toprağa). 2.4 Ayrılamazlık (gerçek analitik ilerleme + sınıf meşrulaştırması iç içe). 2.5 Bugün (rant/tek-vergi yankısı; ekolojik iktisat). Çapraz-bağ: `merkantilizm/`, `fizyokrasi/06`, `fizyokrasi/12`. Dipnot kaynakları: Magnusson *Mercantilism* (1994); Quesnay *Tableau* (1758); Meek *Economics of Physiocracy* (1962).

### Task 3: Bölüm 3 — Klasik sentez (Smith, emek-değer)
**File:** `03-klasik-sentez-smith-emek-deger.md`
H2'ler: 3.1 Smith iki darlığı aşar (maden + yalnızca-tarım). 3.2 Değer=emek+işbölümü, görünmez el. 3.3 Sınıf katmanı (Corn Laws; yükselen sanayi/ticaret burjuvazisinin serbest-ticaret talebi). 3.4 Ayrılamazlık. 3.5 Emek-değerin bıraktığı açık (bir sonraki bölüme köprü: "kârı kim yaratıyor?"). 3.6 Bugün (serbest ticaret söyleminin hegemon-yanlılığı, List). Çapraz-bağ: `klasik-iktisat/02`, `klasik-iktisat/08`, `deger/05`. Kaynaklar: Smith *WoN* (1776); Ricardo *Principles* (1817); Blaug.

### Task 4: Bölüm 4 — Marx (artı-değer)
**File:** `04-catallanma-marx-arti-deger.md`
H2'ler: 4.1 Klasik mantığın bombası ("değer emekten geliyorsa kârı kim yaratıyor?"). 4.2 Artı-değer ve sömürü. 4.3 Marx klasiğin *radikalleşmesi*dir (kopuş değil, içeriden sürdürme). 4.4 Sınıf katmanı (sanayi proletaryasının teorik kendine-gelişi). 4.5 teal aile: Klasik+Marx neden aynı renk. 4.6 Bugün (canlı Marx'çı iktisat). Çapraz-bağ: `deger/07`, `mulkiyet/08`, `klasik-iktisat/11`. Kaynaklar: Marx *Kapital* I (1867); *Theorien über den Mehrwert* (1862-63).

### Task 5: Bölüm 5 — Marjinalist Devrim (1871) — kitabın sivri ucu
**File:** `05-catallanma-marjinalist-devrim.md`
H2'ler: 5.1 1871 eşzamanlılığı (Jevons/Menger/Walras). 5.2 Değer=öznel marjinal fayda (nesnelden öznele kopuş). 5.3 **Sivri soru:** dürüst analitik atılım mı, emek-değeri (ve Marx kapısını) kapatan ideolojik manevra mı? 5.4 Tarihçilerin tartışması; cevap: belirli oranda ikisi birden. 5.5 mor soy neden ayrı renk. 5.6 Bugün (mikroiktisadın çekirdeği). Çapraz-bağ: `deger/08`, `deger/09`. Kaynaklar: Jevons (1871), Menger (1871), Walras (1874); yanlılık tartışması için ikincil kaynak (ör. Dobb *Theories of Value and Distribution*).

### Task 6: Bölüm 6 — Marshall/neoklasik + terim tuzağı
**File:** `06-marshall-neoklasik-terim-tuzagi.md`
H2'ler: 6.1 Marshall 1890: arz (maliyet, klasik miras) + talep (marjinal fayda, yeni miras) tek makasta. 6.2 **Terim tuzağı:** "neoklasik iktisat" (Marshall) ≠ "neoklasik sentez" (savaş sonrası Samuelson, Keynes+neoklasik). 6.3 Sınıf/kurum katmanı (denge dilinin depolitizasyonu). 6.4 Ayrılamazlık. 6.5 Bugün (ders kitabı standardı). Çapraz-bağ: `deger/10` (Marshall sentezi), `klasik-iktisat/11`. Kaynaklar: Marshall *Principles of Economics* (1890); Samuelson *Economics* (1948).

### Task 7: Bölüm 7 — Keynes → Monetarizm
**File:** `07-keynes-monetarizm.md`
H2'ler: 7.1 Büyük Buhran Say Yasası'nı + "piyasa kendini dengeler"i çökertir. 7.2 Keynes (1936): toplam talep yetersizliği, devlet müdahalesi. 7.3 1970'ler stagflasyonu Keynesçi konsensüsü kırar. 7.4 Friedman/Hayek karşı-devrim; monetarizm = denge/marjinalist geleneğe dönüş (mor). 7.5 Sınıf/politika katmanı (refah-devleti koalisyonu vs sermaye serbestleşmesi). 7.6 Bugün (kriz sonrası canlı Keynes-monetarizm salınımı). Çapraz-bağ: `klasik-iktisat/05` (Say, klasik makro), `klasik-iktisat/12`. Kaynaklar: Keynes *General Theory* (1936); Friedman "Quantity Theory… Restatement" (1956); Hayek.

### Task 8: Bölüm 8 — Kapanış
**File:** `08-kapanis-hicbir-ekol-olmez.md`
H2'ler: 8.1 Hiçbir ekol tam ölmez (Marx, Keynes, marjinalizm — bugünkü versiyonlar). 8.2 Anti-Whig sentez (galip≠doğru; zincir değil ağaç). 8.3 Mercek kendine döner: bugünün teorileri de konumlanmış — okurun refleksi. 8.4 Üç soru (yazar hangi koalisyonu konuşuyor / hangi veri eksik / kahramanlar sonra ne kurdu). Çapraz-bağ: tüm kardeş kitapların 12. bölümleri. Kaynaklar: tekrar Blaug/Schumpeter; bir-iki güncel sentez.

---

## Task 9: Final doğrulama

**Files:** none (verify only)

- [ ] **Step 1: Tüm bölümlerin bütünlük testi**

Run: `cd iktisat-haritasi/chapters && python3 /tmp/ih_check.py '*.md'`
Expected: 8 satır hepsi `OK`, son satır `ALL CLEAN`.

- [ ] **Step 2: Manifest ↔ dosya tutarlılığı + kelime sayısı**

Run: `cd iktisat-haritasi/chapters && for f in *.md; do echo "$f: $(wc -w < "$f")w"; done` → her bölüm ~1.800–2.800; 8 dosya `_index.json`'daki 8 slug ile birebir.

- [ ] **Step 3: Render-check (canlı)**

`python3 serve.py` → `http://localhost:8772/iktisat-haritasi/book.html` → TOC 8 bölüm; Bölüm 1 haritası koyu+açık modda doğru; rastgele 2 bölümde dipnot tıklanır; kardeş-kitap linkleri çalışır; Cmd+K teması bulur.

- [ ] **Step 4: Final commit (gerekirse)**

```bash
git add -A iktisat-haritasi/
git commit -m "feat(iktisat-haritasi): 8 bölüm tamam — final doğrulama"
```

---

## Self-Review notu

- **Spec coverage:** Spec §1–8'in tamamı task'lara eşlendi (registry+shell+manifest→T0; harita+yöntem→T1; 6 düğüm→T2-7; kapanış→T8; başarı ölçütü→T9).
- **Placeholder:** Yok; harita HTML/CSS ve registry/manifest içerikleri tam verildi. Bölüm prozası kasıtlı olarak iskelet+kaynak düzeyinde (proza = teslimatın kendisi, planın değil).
- **Tutarlılık:** slug'lar `_index.json` ↔ task dosya adları ↔ bölüm tablosu birebir; renk sınıfları (teal/mor/kok/keynes) harita + lejant + bölüm renkleri arasında tutarlı.
