/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';

function alphanumerize(defaultOptions, num, options = defaultOptions) {
  // if num is options object, return a function with the alphabet preset
  if (typeof num === 'object' && num !== null) return createInstance(num);
  // conditions for an empty numeral sequence
  if (typeof num !== 'number' || num === 0) return '';
  // numeral sequences for negative numbers will start with a negative sign
  let alphanumerals = '';
  if (num < 0) {
    num *= -1;
    alphanumerals += '-';
  }
  // determine numeral sequence
  const { alphabet } = options;
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

function createInstance(options) {
  if (!options) throw new Error('must pass options argument to createInstance');
  const instance = alphanumerize.bind(null, options);
  Object.defineProperty(instance, 'alphabet', { value: options.alphabet });
  return instance;
}

module.exports = createInstance({ alphabet: englishAlphabet });
