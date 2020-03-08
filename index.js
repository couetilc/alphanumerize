const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';

function alphanumerize(numeral) {
  const num = Number(numeral);
  if (typeof num !== 'number' || Number.isNaN(num)) {
    throw new Error();
  }
  let prevRemainder;
  const processedAlphabet = englishAlphabet[englishAlphabet.length - 1] + englishAlphabet;
  let alphabetized = '';
  let dividend = numeral;
  const divisor = englishAlphabet.length; // base of target number system
  for (let n = 0; dividend > 0; n += 1) {
    const remainder = dividend % divisor;
    const quotient = Math.floor(dividend / divisor);
    if (quotient === 0) {
      if (prevRemainder === 0) {
        // no more letters are needed
        const offset = remainder - 1;
        if (offset === 0) {
          return alphabetized;
        }
        return processedAlphabet[offset] + alphabetized;
      }
    }
    alphabetized = processedAlphabet[remainder] + alphabetized;
    dividend = quotient;
    prevRemainder = remainder;
  }
  return alphabetized;
}

export default alphanumerize;
