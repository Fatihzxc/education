import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

async function readText(path) {
  return readFile(new URL(path, import.meta.url), 'utf8');
}

async function loadRegistry() {
  const source = await readText('../modules/theme-registry.js');
  const context = {
    window: {},
    console: { log() {} },
  };
  vm.runInNewContext(source, context, { filename: 'theme-registry.js' });
  return context.window;
}

test('registry separates readable books, pane shortcuts, and planned themes', async () => {
  const registry = await loadRegistry();

  assert.equal(registry.MerkantilizmThemes.length, 9);
  assert.ok(Array.isArray(registry.MerkantilizmPaneShortcuts));
  assert.ok(Array.isArray(registry.MerkantilizmPlannedThemes));
  assert.ok(registry.MerkantilizmPaneShortcuts.length >= 6);
  assert.ok(registry.MerkantilizmPlannedThemes.length >= 4);
  assert.ok(registry.MerkantilizmPlannedThemes.every((theme) => !theme.href));
  assert.ok(registry.MerkantilizmThemes.every((theme) => theme.homeGroup));
});

test('fizyokrasi and klasik iktisat are completed main books', async () => {
  const registry = await loadRegistry();
  const bySlug = Object.fromEntries(
    registry.MerkantilizmThemes.map((theme) => [theme.slug, theme])
  );

  assert.equal(bySlug.fizyokrasi.status, 'completed');
  assert.equal(bySlug.fizyokrasi.homeGroup, 'main');
  assert.equal(bySlug['klasik-iktisat'].status, 'completed');
  assert.equal(bySlug['klasik-iktisat'].homeGroup, 'main');
});

test('homepage is a reading desk, not the full catalog', async () => {
  const html = await readText('../index.html');

  assert.match(html, /id="startGrid"/);
  assert.match(html, /id="mainBooksGrid"/);
  assert.match(html, /id="continuingGrid"/);
  assert.match(html, /id="plannedThemesStrip"/);
  assert.doesNotMatch(html, /id="themeGrid"/);
});

test('library page exposes status filters and avoids broken planned book links', async () => {
  const html = await readText('../library.html');

  assert.match(html, /data-filter="all"/);
  assert.match(html, /data-filter="completed"/);
  assert.match(html, /data-filter="draft"/);
  assert.match(html, /data-filter="planned"/);
  assert.match(html, /id="libraryGrid"/);
  assert.match(html, /MerkantilizmPlannedThemes/);
});

test('book reader bypasses stale chapter cache during local authoring', async () => {
  const source = await readText('../modules/book/reader.js');

  assert.match(source, /fetch\(INDEX_URL,\s*\{\s*cache:\s*'no-store'\s*\}\)/);
  assert.match(source, /fetch\('chapters\/'\s*\+\s*chapter\.slug\s*\+\s*'\.md',\s*\{\s*cache:\s*'no-store'/);
});

test('book subpages expose a top main-menu link', async () => {
  const rootBookPages = [
    '../merkantilizm/book.html',
    '../fizyokrasi/book.html',
    '../klasik-iktisat/book.html',
    '../deger/book.html',
    '../mulkiyet/book.html',
    '../egemenlik/book.html',
    '../iktisat-haritasi/book.html',
    '../tarih-atlasi/book.html',
    '../para-borc-finans/book.html'
  ];
  const paneBookPages = [
    '../tarih-atlasi/panes/merkantilizm/book.html',
    '../tarih-atlasi/panes/fizyokrasi/book.html',
    '../tarih-atlasi/panes/klasik/book.html',
    '../tarih-atlasi/panes/marx/book.html',
    '../tarih-atlasi/panes/marjinalizm/book.html',
    '../tarih-atlasi/panes/keynes/book.html'
  ];

  for (const path of rootBookPages) {
    const html = await readText(path);
    assert.match(html, /<a class="main-menu-link" href="\.\.\/">Ana menü<\/a>/, `${path} lacks root main-menu link`);
  }

  for (const path of paneBookPages) {
    const html = await readText(path);
    assert.match(html, /<a class="main-menu-link" href="\.\.\/\.\.\/\.\.\/">Ana menü<\/a>/, `${path} lacks pane main-menu link`);
  }
});

test('para borc finans is a completed main book, not a planned placeholder', async () => {
  const registry = await loadRegistry();
  const bySlug = Object.fromEntries(
    registry.MerkantilizmThemes.map((theme) => [theme.slug, theme])
  );
  const manifest = JSON.parse(await readText('../para-borc-finans/chapters/_index.json'));

  assert.equal(bySlug['para-borc-finans'].title, 'Para, Borç ve Finans');
  assert.equal(bySlug['para-borc-finans'].status, 'completed');
  assert.equal(bySlug['para-borc-finans'].homeGroup, 'main');
  assert.equal(manifest.chapters.length, 12);
  assert.ok(manifest.chapters.every((chapter) => chapter.status === 'completed'));
  assert.ok(
    registry.MerkantilizmPlannedThemes.every((theme) => theme.slug !== 'para-borc-finans')
  );
});

test('para borc finans chapters follow philosophical reasoning and wisdom structure', async () => {
  const manifest = JSON.parse(await readText('../para-borc-finans/chapters/_index.json'));
  const required = [
    'Temel varsayım',
    'Akıl yürütme',
    'Bölümün argümanı',
    'Kök sebep ve karşı okuma',
    'İleri düzey okuma',
    'Yanlış sezgi',
    'Tarihsel sahne',
    'Bilgelik sorusu',
    'Bugüne bakan sonuç'
  ];

  for (const chapter of manifest.chapters) {
    const markdown = await readText(`../para-borc-finans/chapters/${chapter.slug}.md`);
    const wordCount = (markdown.match(/[\p{L}\p{N}]+/gu) || []).length;

    assert.ok(wordCount >= 1000, `${chapter.slug} is too thin for wisdom-depth reading`);
    assert.doesNotMatch(markdown, /\b(TODO|TBD)\b/, `${chapter.slug} still has placeholder text`);
    for (const heading of required) {
      assert.match(markdown, new RegExp(`## ${heading}`), `${chapter.slug} lacks ${heading}`);
    }
  }
});
