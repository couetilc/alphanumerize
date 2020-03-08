import tap from 'tap';
import alphanumerize from '.';

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
