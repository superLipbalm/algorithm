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
  const numbers = input[1].split(' ').map((el) => +el);
  const primes = new Array(1001).fill(true);
  primes[0] = false;
  primes[1] = false;

  for (let i = 2; i * i <= 1000; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= 1000; j += i) {
        primes[j] = false;
      }
    }
  }

  return numbers.filter((number) => primes[number]).length;
}
