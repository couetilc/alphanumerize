/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';

// TODO what if num is object? then assume is options object, and return a
// function that accepts n and returns the character sequence

function alphanumerize(num, options = {}) {
  const { alphabet = englishAlphabet } = options;
  if (!num || typeof num !== 'number' || num === 0) return '';
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

module.exports = alphanumerize;
