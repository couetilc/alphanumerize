/* eslint-disable no-console */
/* eslint-disable lines-between-class-members */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable max-classes-per-file */
const { performance } = require('perf_hooks');
const alphanumerize = require('./index.js');

// TODO take samples, calculating mean , variance, 90 95 99
// confidence boundaries

// TODO make a writeup about the average and variance calculations?
// - prob need to do an inductive proof

// TODO the first time measurement skews the result, maybe throw it away?
// - effect is 100x greater
// how do other people handle the first measurement skew? is it significant?
// I can ask, how much bigger was the first measurement than the subsequent average?

class Timer {
  constructor() {
    this.value = null;
  }
  start() {
    this.value = performance.now();
  }
  end() {
    this.value = performance.now() - this.value;
  }
  reset() {
    this.value = null;
  }
}

class Stats {
  constructor() {
    this.count = 0;
    this.average = null;
    this.sum_of_squares = 0;
    this.square_of_sums = 0;
    this.sigma = 0;
  }
  add(sample) {
    this.count += 1;
    this.average = this.average * ((this.count - 1) / this.count) + sample / this.count;
    this.sum_of_squares = (this.sum_of_squares * (this.count - 1) + sample ** 2) / this.count;
    this.square_of_sums = (
      Math.sqrt(this.square_of_sums) * ((this.count - 1) / (this.count + 1))
      + Math.sqrt((sample ** 2) / (this.count * (this.count + 1)))
    ) ** 2;
    this.variance = this.sum_of_squares - this.square_of_sums;
    this.sigma = Math.sqrt(this.variance);
    this.std_dev = this.sigma;
  }
}

function benchmark({ name, iterations = 100, fn }) {
  const timer = new Timer();
  const stats = new Stats();

  fn(timer);
  const cold_start = timer.value;
  timer.reset();

  for (let i = 0; i < iterations; i += 1) {
    fn(timer);
    stats.add(timer.value);
    timer.reset();
  }

  const { average, std_dev } = stats;
  const speedup = cold_start / average;

  console.log(
    '%o...bench %o ms ±%o (%o times faster than cold start)',
    name, average, std_dev, speedup
  );

  return [average, std_dev, speedup];
}

benchmark({
  name: 'timer',
  iterations: 5,
  fn: (timer) => {
    timer.start();
    alphanumerize(2);
    timer.end();
  }
});
