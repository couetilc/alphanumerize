/* eslint-disable arrow-parens */
const assert = require('assert');
const alphanumerize = require('./index.js');

// TODO test for very big sequences, like bigint size

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

let failed;

function test(name, fn) {
  let error;
  try {
    fn();
  } catch (e) {
    error = e;
  }
  log(`${name}...${error ? '❌' : '✅'}`);
  if (error) {
    log(error);
    failed = true;
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

test('can return a function with preset alphabet', () => {
  const instance = alphanumerize(base8.options);
  assert.strictEqual(instance.alphabet, base8.options.alphabet);
  base8.forEach((alphanumeral, i) => {
    const num = i + 1;
    assert.strictEqual(instance(num), alphanumeral);
  });
});

test('cannot modify preset alphabet', () => {
  // module object
  alphanumerize.alphabet = '123';
  assert.strictEqual(alphanumerize.alphabet, 'abcdefghijklmnopqrstuvwxyz');
  // instance object
  const instance = alphanumerize({ alphabet: 'abc' });
  instance.alphabet = 'xyz';
  assert.strictEqual(instance.alphabet, 'abc');
});

if (failed) {
  process.exit(1);
}
