/* eslint-disable no-use-before-define */
const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';

// TODO: negatives? maybe handle in different ways? like negative sign indicator OR two's complement

function alphanumerize(num, options = {}) {
  const { alphabet = englishAlphabet } = options;
  if (!num || typeof num !== 'number' || num <= 0) return '';
  const invLog = 1 / Math.log(alphabet.length);
  const seqLength = sequenceLength(num, alphabet.length, invLog);
  const seq = sequenceDigits(num, alphabet.length, seqLength);
  console.log('seq %o', seq);
  let alphanumerals = '';
  for (let i = seq.length - 1; i >= 0; i -= 1) {
    alphanumerals += alphabet[seq[i] - 1];
  }
  return alphanumerals;
  // TODO what if num is object? then assume is options object, and return a
  // function that accepts n and returns the character sequence
}

// alphanumerize function = a(...) => d_i for i <- S, where S = |A| for an alphabet A
//  - where n is a number, O is the options object,
//  - returns a sequence of digits corresponding do the number n represented by the
//    given alphabet
//   a(n) =>
//      m = englishAlphabet.length
//      inv_log_m = 1 / log(m)
//      f(n, m, l(n, m, inv_log_m))
//   a(n, options) =>
//      m = options.alphabet.length
//      inv_log_m = 1 / log(m)
//      f(n, m, l(n, m, inv_log_m))
//   a(options) =>
//      m = options.alphabet.length || englishAlphabet.length
//      inv_log_m = 1 / log(m) // TODO check if this actually improves speed vs above a(...)
//      _(n) => f(n, m, l(n, m, inv_log_m))

// TODO can I turn the for loop the other direction, and not need a length
// parameter?
function sequenceDigits(number, base, length) {
  const seq = [];
  let remainder = number;
  for (let i = length; i > 1; i -= 1) {
    const j = i - 1;
    seq[j] = Math.ceil((remainder) / (base ** j)) - 1;
    // TODO can put a if (j === 0) continue to skip array access and exponentiation?
    // eslint-disable-next-line operator-assignment
    remainder -= seq[j] * (base ** j);
  }
  seq[0] = remainder;
  return seq;
// sequence digits function = f(...) => d_i for i <- L
//    f(n, m, L) =>
//      seq[L] = floor(n/(m^(L-1));
//      r = n - seq[L] * m^(L-1)
//      for i in [L-1..2]:
//        seq[i] = floor(r/(m^(i-1))
  //      r -= seq[i] * m^(i-1)
  //    seq[1] = r
//      seq
}

function sequenceLength(number, base, baseInverseLog = 1 / Math.log(base)) {
  return Math.ceil(Math.log(1 - number / base + number) * baseInverseLog);
// sequence length function = l(...) => L
//    l(n, m) =>
//      inv_log_m = 1 / log(m)
//      ceiling(log(1-n/m+n)*inv_log_m)
//    l(n, m, inv_log_m) =>
//      ceiling(log(1-n/m+n)*inv_log_m)
}

// 0: a   - - 0
// 1: b   - - 1
// 2: c   - - 2
// 3: aa  - 0 0
// 4: ab  - 0 1
// 5: ac  - 0 2
//
// 0: ''  - - 0
// 1: a   - - 1
// 2: b   - - 2
// 3: c   - 0 0
// 4: aa  - 0 1
// 5: ab  - 0 2
// 6: ac  - 1 0
// 4: ba  - 1 1
// 5: bb  - 1 2
// 6: bc  - 2 0
// 4: ca  - 2 1
// 5: cb  - 2 2
// 6: cc  0 0 0
// 6:aaa  0 0 1
// 6:aaa  0 0 2
// 6:aaa  1 1 0
//
// Maybe try: -where d <- [0,1,2,3],  )
// num = d2 * 4^2 + d1 * 4^1 + d0 * 4^0
//  '' = ---
//  a = --0
//  b = --1
//  c = --2


// digit = [0,25]
// 0 ('a'): 0 + 0 * 26 + 0 * 26 ** 2 + 0 * 26 ** 3
// 1 ('b'): 1 + 0 * 26 + 0 * 26 ** 2 + 0 * 26 ** 3
// 2: 2 + 0 * 26 + 0 * 26 ** 2 + 0 * 26 ** 3
// 25: 25 + 0 * 26 + 0 * 26 ** 2 + 0 * 26 ** 3

// 32 base 10
//    / 10 = 3
//  2
//    / 10 = 0
// end = al[3]al[0] + al[2] => bj + b => cb

// 32 base 8
//    / 8 = 4
//  0
//    / 8 = 0
// end = 40 => ch

// 32 base 3
//    / 3 = 10
// 2
//    / 3 = 0
// end = alphabet[1]0 + alphabet[2]

module.exports = alphanumerize;
