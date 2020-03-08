import tap from 'tap';
import alphanumerize from '.';

tap.test('alphabetizes numbers', async (t) => {
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
    const alphabetized = alphanumerize(input);
    t.equal(
      alphabetized,
      output,
      `alphanumerize(${input}) should equal ${output}, NOT ${alphabetized}`,
    );
  });
});
