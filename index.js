/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';

function alphanumerize(num, options = {}) {
  const { alphabet = alphanumerize.alphabet } = options;
  // if num is options object, return a function with the alphabet preset
  if (typeof num === 'object' && num !== null) {
    return new Proxy(alphanumerize, {
      get: (...args) => {
        const [, prop] = args;
        if (prop === 'alphabet') {
          return num.alphabet;
        }
        return Reflect.get(...args);
      },
      apply: (target, thisArg, argumentsList) => {
        target.alphabet = num.alphabet;
        return target(...argumentsList);
      },
    });
  }
  // conditions for an empty numeral sequence
  if (typeof num !== 'number' || num === 0) {
    return '';
  }
  let alphanumerals = '';
  // numeral sequences for negative numbers will start with a negative sign
  if (num < 0) {
    num *= -1;
    alphanumerals += '-';
  }
  // determine numeral sequence
  const base = alphabet.length;
  const sequenceLength = Math.ceil(Math.log(1 - num / base + num) / Math.log(base));
  for (let i = sequenceLength; i > 1; i -= 1) {
    const power = base ** (i - 1);
    const digit = Math.ceil(num / power) - 1;
    alphanumerals += alphabet[digit - 1];
    num -= digit * power; // calculate remainder
  }
  alphanumerals += alphabet[num - 1];
  return alphanumerals;
}

alphanumerize.alphabet = englishAlphabet;

module.exports = alphanumerize;
