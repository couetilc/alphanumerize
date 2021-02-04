const alphanumerize = require( './index.js');
const assert = require('assert');
const tap = require('tap');

const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';

const base8 = [
  '',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah',
  'ba',
];

const base10 = [
  '',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj',
  'ba',
];

const base26 = [
  '',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak', 'al', 'am', 'an', 'ao', 'ap', 'aq', 'ar', 'as', 'at', 'au', 'av', 'aw', 'ax', 'ay', 'az',
  'ba',
];

function test(series, options) {
  series.forEach((alphanumeral, num) => {
    assert.strictEqual(alphanumerize(num, options), alphanumeral);
  });
}

test(base8, { alphabet: 'abcdefgh' });
test(base10, { alphabet: 'abcdefghij' });
test(base26, { alphabet: 'abcdefghijklmnopqrstuvwxyz' });

// eslint-disable-next-line arrow-parens
tap.test('alphabet of size 8', t => {
  const options = { alphabet: 'abcdefgh' };
  // TODO I don't like how these tests output, check "tap" documentation, or
  // choose a different library for testing
  base8.forEach((alphanumeral, num) => {
    t.equal(
      alphanumerize(num, options),
      alphanumeral,
      `${num} => ${alphanumeral}`,
    );
  });
  t.done();
});
