/* eslint-disable arrow-parens */
const assert = require('assert');
const alphanumerize = require('./index.js');

// TODO test for 0 returns ''
// TODO test for non-numbers returns ''
// TODO test for negative numbers
// TODO test for num=options returns alphanumerize function
// TODO test for very big sequences, like bigint size
// TODO test that exposes alphabet currently used by function

const base8 = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah',
  'ba',
];
base8.options = { alphabet: 'abcdefgh' };

const base10 = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj',
  'ba',
];
base10.options = { alphabet: 'abcdefghij' };

const base26 = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak', 'al', 'am', 'an', 'ao', 'ap', 'aq', 'ar', 'as', 'at', 'au', 'av', 'aw', 'ax', 'ay', 'az',
  'ba',
];

// eslint-disable-next-line no-console
const log = (...arg) => console.log(...arg);

function test(name, fn) {
  let failed = false;
  let error;
  try {
    fn();
  } catch (e) {
    failed = true;
    error = e;
  }
  log(`${name}...${failed ? '❌' : '✅'}`);
  if (failed) {
    log(error);
  }
}

test('base 8 english alphabet', () => {
  base8.forEach((alphanumeral, i) => {
    const num = i + 1;
    assert.strictEqual(alphanumerize(num, base8.options), alphanumeral);
  });
});

test('base 10 english alphabet', () => {
  base10.forEach((alphanumeral, i) => {
    const num = i + 1;
    assert.strictEqual(alphanumerize(num, base10.options), alphanumeral);
  });
});

test('base 26 english alphabet', () => {
  base26.forEach((alphanumeral, i) => {
    const num = i + 1;
    assert.strictEqual(alphanumerize(num, base26.options), alphanumeral);
  });
});

test('defaults to the english alphabet', () => {
  base26.forEach((alphanumeral, i) => {
    const num = i + 1;
    assert.strictEqual(alphanumerize(num), alphanumeral);
  });
});

test('the number zero', () => {
  assert.strictEqual(alphanumerize(0), '');
});

test('not a numeral sequence', () => {
  [true, false, 'abc', Symbol(0), null, undefined, () => null]
    .forEach(emptyCase => {
      assert.strictEqual(alphanumerize(emptyCase), '',
        `failed on input ${JSON.stringify(emptyCase)}`);
    });
});

test('negative numbers', () => {
  base26.forEach((alphanumeral, i) => {
    const num = -1 * (i + 1);
    assert.strictEqual(alphanumerize(num), `-${alphanumeral}`);
  });
});

test('exposes the current alphabet', () => {
  const a = alphanumerize({ alphabet: 'abc' });
  assert.strictEqual(a.alphabet, 'abc');
  assert.strictEqual(alphanumerize({ alphabet: 'xyz' }).alphabet, 'xyz');
  assert.strictEqual(a.alphabet, 'abc');
  assert.strictEqual(alphanumerize.alphabet, 'abcdefghijklmnopqrstuvwxyz');
});

test('returns a function with preset alphabet', () => {
  const alpha = alphanumerize(base8.options);
  assert.strictEqual(alpha.alphabet, base8.options.alphabet);
  base8.forEach((alphanumeral, i) => {
    const num = i + 1;
    assert.strictEqual(alpha(num), alphanumeral);
  });
});
