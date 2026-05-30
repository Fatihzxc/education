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

  assert.equal(registry.MerkantilizmThemes.length, 8);
  assert.ok(Array.isArray(registry.MerkantilizmPaneShortcuts));
  assert.ok(Array.isArray(registry.MerkantilizmPlannedThemes));
  assert.ok(registry.MerkantilizmPaneShortcuts.length >= 6);
  assert.ok(registry.MerkantilizmPlannedThemes.length >= 5);
  assert.ok(registry.MerkantilizmPlannedThemes.every((theme) => !theme.href));
  assert.ok(registry.MerkantilizmThemes.every((theme) => theme.homeGroup));
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
