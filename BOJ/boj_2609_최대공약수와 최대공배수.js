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
  const [a, b] = input[0].split(' ').map((el) => +el);
  const gcd = findGCD(a, b);
  const lcm = (a * b) / gcd;
  return gcd + '\n' + lcm;
}

function findGCD(a, b) {
  let gcd = a >= b ? a : b;
  let mod = a < b ? a : b;

  while (mod) {
    [gcd, mod] = [mod, gcd % mod];
  }

  return gcd;
}
