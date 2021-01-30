# Alphanumerize

Convert numbers to a alphabetical format.

For example (default behavior):

| Number | Alphanumerized |
| ------ | -------------- |
| 0 | '' |
| 1 | 'a' |
| 2 | 'b' |
| ... | ... |
| 26 | 'z' |
| 27 | 'aa' |
| 28 | 'ab' |

## TODO

1. benchmarking
  - node
  - browser
  - regression test benchmarks through git commit history to create a graph
1. githooks
  - npm prepare githooks
  - lint checks
  - test check
  - append benchmark to the end of commit messages
1. more features
  - negative numbers , 'z', 'y', ... , 'zz', 'zy', ...
  - custom alphabet
  - capitalize, lowercase (invert case when both are true, do nothing when both are false)
