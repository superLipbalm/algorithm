const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const result = solution();
  console.log(result);
  process.exit();
});

function solution() {
  const [a, b, c] = input
    .shift()
    .split(' ')
    .map((el) => BigInt(el));

  return power(a, b).toString().replace('n', '');

  function power(base, exponent) {
    if (exponent === 1n) return base % c;

    const halfExponentPower = power(base, exponent / 2n);

    if (exponent % 2n === 1n) return (((halfExponentPower * halfExponentPower) % c) * base) % c;
    return (halfExponentPower * halfExponentPower) % c;
  }
}
