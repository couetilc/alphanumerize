## Motivation

One day I wanted to display a list of items indexed by alphabetical characters,
for a softer look.
Let's use a list of fruit: 1) Apple, 2) Banana, 3) Cucumber, 4) Durian.
I want to change the numbers to letters using the following pattern: a) Apple, b) Banana, c) Cucumber, aa) Durian.

At first, I thought a simple change of base algorithm would work. The numbers
are in positional notation, while the letters are part of a base 3 number
system with numerals [a,b,c]. However, converting the list of numbers to
alphabet-based positional number system converts the sequence 1,2,3,4 to a,b,c,ba. This is
not what I'm looking for, it makes me feel like a part of the sequence was
skipped. That's because representing decimal numbers treats each digit as a
coefficient to a polynomial equation. My alphabetic number system treats digits
as tallies, more like roman numerals than arabic numerals.

Take a look at the following sequences of letters, one where the alphabetic numerals
are used in a positional notation system, and the second as used in a tally system.

| positional | tally |
|------------|-------|
| <img src="https://latex.codecogs.com/svg.latex?\left.\begin{matrix}&space;\left.\begin{matrix}&space;a&space;\\&space;b&space;\\&space;c&space;\end{matrix}\right\}&space;\leq&space;3&space;\\ba&space;\\bb&space;\\bc&space;\\ca&space;\\cb&space;\\cc&space;\end{matrix}\right\}&space;\leq&space;9" title="\left.\begin{matrix} \left.\begin{matrix} a \\ b \\ c \end{matrix}\right\} \leq 3 \\ba \\bb \\bc \\ca \\cb \\cc \end{matrix}\right\} \leq 9" /> | <img src="https://latex.codecogs.com/png.latex?\begin{align*}&space;\left.\begin{matrix}&space;a&space;\\&space;b&space;\\&space;c&space;\end{matrix}\right\}&space;\leq&space;3&space;\\&space;\left.\begin{matrix}&space;aa&space;\\ab&space;\\ac&space;\\ba&space;\\bb&space;\\bc&space;\\ca&space;\\cb&space;\\cc&space;\end{matrix}\right\}&space;\begin{align*}&space;>3&space;\\&space;\leq&space;12&space;\end{align*}&space;\end{align*}" title="\begin{align*} \left.\begin{matrix} a \\ b \\ c \end{matrix}\right\} \leq 3 \\ \left.\begin{matrix} aa \\ab \\ac \\ba \\bb \\bc \\ca \\cb \\cc \end{matrix}\right\} \begin{align*} >3 \\ \leq 9 \end{align*} \end{align*}" /> |

Do you notice the difference? A tally number system will carry along previous values with each additional numeral, where a positional number system will incorporate the previous values.

So let's describe the tally system with some math, and see if we can create an algorithm for constructing a sequence of alphabetic tallies given a number. It turns out it isn't as straightforward as I thought.

First, a few definitions. The alphanumerize function will take a number `n`
and alphabet `A` with length `m`, and return a sequence of digits `d_1...d_S`
of length `S`, the alphabetic representation of `n`. Each digit `d_i` will be
a number in 1-to-1 correspondence with a character in the alphabet, where `i`
is the digit's position in the sequence and `1 <= d_i <= m`.

For example, to represent the number `9` in the alphabet `[a,b,c]`, note that `m = 3` and the map of numbers to characters is `{1:a, 2:b, 3:c}`. So the sequence of digits will be `bc` (or `21`), counting up from our list of tallied numbers from the above table.

Can we turn this into an algorithm?

Working backwards from our previous example, we find the number 9 can be
decomposed into `9 = 2/3 * 3^2 + 3/3 * 3^1 = 2 * 3 + 3 * 1`. Here we have the first hint at how to
describe the number using letters. `3` is `m`, or the size of the alphabet.
`2` is the letter `b` from our correspondence, and `3` is also the letter
`c`. Let's replace some values: `9 = 2 * 3^1 + 3 * 3^0 = A[b] * m^1 + A[c] *
m^0`. Notice the pattern yet? Let's put this in a more generalized form using
the definitions above:

<img src="https://latex.codecogs.com/png.latex?n&space;=&space;\sum_{1\leq&space;i\leq&space;S}&space;\frac{d_i}{m}&space;m^i&space;=&space;\sum_{1\leq&space;i\leq&space;S}&space;d_i&space;m^{i-1}" title="n = \sum_{1\leq i\leq S} \frac{d_i}{m} m^i = \sum_{1\leq i\leq S} d_i m^{i-1}" />

Hey look, a sum of a geometric progression! That might be useful :) I'm trying to generate the character sequence for a number `n` and it would be nice to know how long the sequence describing it is, so let's solve for `S`.

We know that the number `n` will have a sequence of length `S`. Thinking
about it, that means `n` will be less than or equal to the maximum value that
can be represented by a sequence of length `S`, and greater than the maximum
value that can be represented by a sequence of length `S - 1`. The max value
for a digit `d_i` is `m`, remember? Therefore in math speak, the bounds for
`n` once we substitute the `d_i` above for `m` will look like:

<img src="https://latex.codecogs.com/png.latex?\sum_{1\leq&space;i\leq&space;S-1}&space;m^{i}&space;<&space;n&space;\leq&space;\sum_{1\leq&space;i\leq&space;S}&space;m^{i}" title="\sum_{1\leq i\leq S-1} m^{i} < n \leq \sum_{1\leq i\leq S} m^{i}" />

Can we use this relation to find the length `S` of the sequence? Yes! Remember that the sum of a geometric progression is described by a simple equation (thanks Knuth!):

<img src="https://latex.codecogs.com/png.latex?\sum_{1&space;\leq&space;i&space;\leq&space;S-1}&space;ax^i&space;=&space;a(\frac{1&space;-&space;x^{n&plus;1}}{1-x})" title="\sum_{0 \leq j \leq n} ax^i = a(\frac{1 - x^{n+1}}{1-x})" />

Therefore, if we take `j = i - 1` we rewrite the inequality to

<img src="https://latex.codecogs.com/png.latex?\begin{align*}&space;\sum_{0&space;\leq&space;j&space;\leq&space;S-2}&space;m^{j&space;&plus;&space;1}&space;&<&space;n&space;\leq&space;\sum_{0&space;\leq&space;j&space;\leq&space;S-1}&space;m^{j&plus;1}&space;\\&space;\sum_{0&space;\leq&space;j&space;\leq&space;S-2}&space;m(m^{j})&space;&<&space;n&space;\leq&space;\sum_{0&space;\leq&space;j&space;\leq&space;S-1}&space;m(m^{j})&space;\\&space;\end{align*}" title="\begin{align*} \sum_{0 \leq j \leq S-2} m^{j + 1} &< n \leq \sum_{0 \leq j \leq S-1} m^{j+1} \\ \sum_{0 \leq j \leq S-2} m(m^{j}) &< n \leq \sum_{0 \leq j \leq S-1} m(m^{j}) \\ \end{align*}" />

and applying the rule about sums of geometric progressions we find that

<img src="https://latex.codecogs.com/png.latex?\begin{align*}&space;m(\frac{1-m^{S-1}}{1-m})&space;&<&space;n&space;\leq&space;m(\frac{1-m^{S}}{1-m})&space;\end{align*}" title="\begin{align*} m(\frac{1-m^{S-1}}{1-m}) &< n \leq m(\frac{1-m^{S}}{1-m}) \end{align*}" />

Nice! We're now at a place with no summation, so we will try to solve for `S` given `n` and `m`.

<img src="https://latex.codecogs.com/png.latex?\begin{align*}&space;n&space;&&space;\leq&space;m(\frac{1-m^{S}}{1-m})&space;&&space;n&space;&&space;>&space;m(\frac{1-m^{S-1}}{1-m})\\&space;\frac{n}{m}(1-m)&space;&&space;\geq&space;1-m^{S}&space;&&space;\frac{n}{m}(1-m)&space;&&space;<1-m^{S-1}&space;\\&space;m^{S}&space;&&space;\geq&space;1&space;-&space;\frac{n}{m}(1-m)&space;&&space;m^{S-1}&space;&&space;<&space;1&space;-&space;\frac{n}{m}(1-m)&space;\\&space;S&space;*&space;log_m(m)&space;&&space;\geq&space;log_m(1&space;-&space;\frac{n}{m}&space;&plus;&space;n)&space;&&space;(S-1)&space;*&space;log_m(m)&space;&&space;<&space;log_m(1&space;-&space;\frac{n}{m}&space;&plus;&space;n)&space;\\&space;S&space;&&space;\geq&space;\frac{log(1&space;-&space;\frac{n}{m}&space;&plus;&space;n)}{log(m)}&space;&&space;S&space;&&space;<&space;\frac{log(1&space;-&space;\frac{n}{m}&space;&plus;&space;n)}{log(m)}&space;&plus;&space;1&space;\end{align*}" title="\begin{align*} n & \leq m(\frac{1-m^{S}}{1-m}) & n & > m(\frac{1-m^{S-1}}{1-m})\\ \frac{n}{m}(1-m) & \geq 1-m^{S} & \frac{n}{m}(1-m) & <1-m^{S-1} \\ m^{S} & \geq 1 - \frac{n}{m}(1-m) & m^{S-1} & < 1 - \frac{n}{m}(1-m) \\ S * log_m(m) & \geq log_m(1 - \frac{n}{m} + n) & (S-1) * log_m(m) & < log_m(1 - \frac{n}{m} + n) \\ S & \geq \frac{log(1 - \frac{n}{m} + n)}{log(m)} & S & < \frac{log(1 - \frac{n}{m} + n)}{log(m)} + 1 \end{align*}" />

Our work gives us a new inequality relation for `S`

<img src="https://latex.codecogs.com/png.latex?\begin{align*}&space;\frac{log(1&space;-&space;\frac{n}{m}&space;&plus;&space;n)}{log(m)}&space;\leq&space;S&space;<&space;\frac{log(1&space;-&space;\frac{n}{m}&space;&plus;&space;n)}{log(m)}&space;&plus;&space;1&space;\end{align*}" title="\begin{align*} \frac{log(1 - \frac{n}{m} + n)}{log(m)} \leq S < \frac{log(1 - \frac{n}{m} + n)}{log(m)} + 1 \end{align*}" />

The difference between the left and right sides of the inequality is exactly 1. Because `S` is an integer, that means there is only one possible value for `S` in the boundary described by the inequality. Because `S` is greater or equal to the lower bound, that means the first integer encountered when counting up from the lower bound will be `S`! The function that gives you the closest integer greater or equal to the input is the ceiling function. So our final equation for `S` is

<img src="https://latex.codecogs.com/png.latex?\begin{align*}&space;S&space;=&space;ceiling(\frac{log(1&space;-&space;\frac{n}{m}&space;&plus;&space;n)}{log(m)})&space;\end{align*}" title="\begin{align*} S = ceiling(\frac{log(1 - \frac{n}{m} + n)}{log(m)}) \end{align*}" />

Yay! Now we have a simple function for finding `S`. Now let's figure out how to produce the digits `d_i` of the sequence for the number `n`.

## Finding the digit sequence


