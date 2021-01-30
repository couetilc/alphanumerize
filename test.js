import tap from 'tap';
import alphanumerize from '.';

const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';

function equation(alphabet) {
  const processedAlphabet = alphabet[alphabet.length - 1] + alphabet;
  const eq = [0];
  let value;
  let alpha;

  return {
    getNumber: () => {
      // if cached
      if (value) { return value; }
      // else recompute
      value = 0;
      for (let n = 0; n < eq.length; n += 1) {
        value += (processedAlphabet.length ** n) * eq[n];
      }
      return value;
    },
    getAlpha: () => {
      // if cached
      if (alpha) { return alpha; }
      // else recompute
      alpha = '';
      for (let n = 0; n < eq.length; n += 1) {
        alpha = processedAlphabet[eq[n]] + alpha;
      }
      return alpha;
    },
    next: () => {
      value = undefined; alpha = undefined;
      for (let n = 0; n < eq.length; n += 1) {
        if (eq[n] >= alphabet.length) {
          if (!eq[n + 1]) {
            eq.push(0);
          }
          eq[n + 1] += eq[n] - alphabet.length;
          eq[n] = 1;
        } else {
          eq[n] += 1;
          break;
        }
      }
      return eq;
    },
  };
}

tap.test('alphanumerizes numbers', (t) => {
  const testCases = Object.entries({
    0: '',
    1: 'a',
    2: 'b',
    3: 'c',
    26: 'z',
    27: 'aa',
    28: 'ab',
    52: 'az',
    53: 'ba',
    54: 'bb',
    703: 'aaa',
    731: 'abc',
  });

  testCases.forEach(([input, output]) => {
    const alpha = alphanumerize(Number(input));
    t.equal(
      alpha,
      output,
      `alphanumerize(${input}) should equal ${output}, NOT ${alpha}`,
    );
  });

  t.done();
});

tap.test('alphanumerizes number-like data', (t) => {
  const testCases = [
    [true, 'a'], // 1
    [false, ''], // 0
    [null, ''], // 0
    ['', ''], // 0
    ['1', 'a'], // 1
    [[], ''], // 0
    [[1], 'a'], // 1
    [[[1]], 'a'], // 1
  ];

  testCases.forEach(([input, output]) => {
    let alpha;
    t.doesNotThrow(
      () => { alpha = alphanumerize(input); },
      `should not throw when passed number-like value "${input}"`,
    );
    t.strictEqual(
      alpha,
      output,
      `should alphabetize number-like data ${input}`,
    );
  });

  t.done();
});

tap.test('throws error when alphabetizing a non-number', (t) => {
  const testCases = [
    undefined, // NaN
    Symbol(''), // TypeError
    {}, // NaN
    () => '', // NaN
    [0, 1], // NaN
  ];

  testCases.forEach((value) => {
    t.throws(
      () => alphanumerize(value),
      Error,
      `should throw when passed a ${typeof value}`,
    );
  });

  t.done();
});

tap.test('alphanumerizes many automatically generated numbers', (t) => {
  const eq = equation(englishAlphabet);
  for (let n = 0; n < 100; n += 1) {
    eq.next();
    const alphanumerized = alphanumerize(eq.getNumber());
    console.log('[ %O: %O ] => %O alphanumerized(%O)', eq.getNumber(), eq.getAlpha(), alphanumerized, eq.getNumber());
    // t.equal(
    //   alphanumerized,
    //   eq.getAlpha(),
    //   `failed for alphanumerize(${eq.getNumber()})`,
    // );
  }

  t.done();
});

const base8 = [
  '',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah',
  'ba'
]

const base10 = [
  '',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj',
  'ba'
]

const base26 = [
  '',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak', 'al', 'am', 'an', 'ao', 'ap', 'aq', 'ar', 'as', 'at', 'au', 'av', 'aw', 'ax', 'ay', 'az',
  'ba'
]
