import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

async function readText(path) {
  return readFile(new URL(path, import.meta.url), 'utf8');
}

async function loadAnnotations(initialStorage = {}) {
  const source = await readText('../modules/book/annotations.js');
  const storage = { ...initialStorage };
  const localStorage = {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null;
    },
    setItem(key, value) {
      storage[key] = String(value);
    },
    removeItem(key) {
      delete storage[key];
    },
  };
  const context = {
    window: {},
    document: {
      readyState: 'loading',
      addEventListener() {},
      body: { appendChild() {} },
      createElement() { return { style: {}, classList: { add() {}, remove() {}, toggle() {} } }; },
      getElementById() { return null; },
      querySelector() { return null; },
      querySelectorAll() { return []; },
    },
    location: {
      pathname: '/deger/book.html',
      hash: '#bolum/3',
      href: 'http://localhost:8772/deger/book.html#bolum/3',
    },
    localStorage,
    console: { log() {}, warn() {}, error() {} },
    navigator: { clipboard: null },
    setTimeout,
    clearTimeout,
    Date,
    Math,
    JSON,
  };
  context.window.window = context.window;
  context.window.document = context.document;
  context.window.localStorage = localStorage;
  context.window.location = context.location;

  vm.runInNewContext(source, context, { filename: 'annotations.js' });
  return { annotations: context.window.BookAnnotations, storage };
}

test('annotations use one global storage key across all books', async () => {
  const { annotations } = await loadAnnotations();

  assert.equal(annotations._test.STORAGE_KEY, 'iktisat.annotations.v1');
});

test('import merge keeps newest updatedAt per annotation id', async () => {
  const older = {
    id: 'ann-1',
    updatedAt: '2026-05-01T10:00:00.000Z',
    exact: 'old text',
    note: 'old note',
  };
  const newer = {
    id: 'ann-1',
    updatedAt: '2026-05-02T10:00:00.000Z',
    exact: 'new text',
    note: 'new note',
  };
  const separate = {
    id: 'ann-2',
    updatedAt: '2026-05-01T09:00:00.000Z',
    exact: 'another text',
  };
  const { annotations } = await loadAnnotations();

  const merged = annotations._test.mergeAnnotations([older], [separate, newer]);

  assert.equal(merged.length, 2);
  assert.equal(merged.find((ann) => ann.id === 'ann-1').note, 'new note');
  assert.equal(merged.find((ann) => ann.id === 'ann-2').exact, 'another text');
});

test('quote anchors resolve exact text with prefix and suffix context', async () => {
  const { annotations } = await loadAnnotations();
  const text = 'Alpha beta gamma beta delta';
  const anchor = {
    exact: 'beta',
    prefix: 'Alpha ',
    suffix: ' gamma',
    start: 17,
    end: 21,
  };

  const resolved = annotations._test.resolveTextAnchor(text, anchor);

  assert.equal(resolved.start, 6);
  assert.equal(resolved.end, 10);
});
