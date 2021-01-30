/* eslint-disable no-console */
const Benchmark = require('benchmark');
const alphanumerize = require('.');

const reportOne = (bench, log = console.log) => {
  log(`========================================================
  Run "${bench.name}"
--------------------------------------------------------
    number of function calls: ${'TODO'}
  average run time (seconds): ${bench.stats.mean}
standard deviation (seconds): ${bench.stats.deviation}
   margin of error (seconds): ${bench.stats.moe}
relative margin of error (%): ${bench.stats.rme}
           number of samples: ${bench.stats.sample.length} (${bench.times.elapsed}s elapsed)
`);
};

const report = (benches, log = console.log) => benches.forEach((bench) => {
  log(`========================================================
  Run "${bench.name}"
--------------------------------------------------------
    number of function calls: ${'TODO'}
  average run time (seconds): ${bench.stats.mean}
standard deviation (seconds): ${bench.stats.deviation}
   margin of error (seconds): ${bench.stats.moe}
relative margin of error (%): ${bench.stats.rme}
           number of samples: ${bench.stats.sample.length} (${bench.times.elapsed}s elapsed)
`);
});

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


const benchmark = new Benchmark(
  'alphanumerize(100000)',
  () => {
    const eq = equation(englishAlphabet);
    for (let i = 0; i < Number.MAX_SAFE_INTEGER; i += 1) {
      eq.next();
      alphanumerize(eq.getNumber());
    }
    console.log('alpha %O', eq.getAlpha());
  },
  {
    // onComplete function is passed an object "Event" which has a "target"
    // property referring to the benchmark instance.
    onComplete: ({ target: bench }) => reportOne(bench),
  },
);

benchmark.run();

















// const e = equation(englishAlphabet);
// for (let x = 0; x < 53; x += 1) {
//   console.log('%O = %O (%O)', e.next(), e.getNumber(), e.getAlpha());
// }

// const eq = equation(englishAlphabet);

// const b = new Benchmark(
//   'linearTest',
//   () => alphanumerize(eq.getNumber()),
//   {
//     setup: function () { console.log('setup'); },
//     fn: function () { console.log('testsetesteseest'); },
//     onCycle: function () { eq.next(); },
//     teardown: function () { console.log('test case %O (%O)', eq.getNumber(), eq.getAlpha()); },
//     onComplete: function () { report(Array.isArray(b) ? b : [b]); },
//   },
// );

// const b = new benchmark.Suite();

// b
//   .add('linearTest', () => alphanumerize(eq.getNumber()))
//   .on('cycle', () => eq.next())
//   .teardown(() => console.log('val %O (%O)', eq.getNumber(), eq.getAlpha()))
//   .on('complete', () => report(b))
//   .run()
//   ;


// b.run();

// const b = new benchmark.Suite();

// b
//   .add('alphanumerize(1)', fn)
//   .add('alphanumerize(100)', () => alphanumerize(100))
//   .add('alphanumerize(10000)', () => alphanumerize(10000))
//   .add('alphanumerize(1000000)', () => alphanumerize(1000000))
//   .add('alphanumerize(100000000)', () => alphanumerize(100000000))
//   .add('alphanumerize(10000000000)', () => alphanumerize(10000000000))
//   .add('alphanumerize(1000000000000)', () => alphanumerize(1000000000000))
//   .on('complete', () => report(b))
//   .run();
