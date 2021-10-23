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
  const [m, n] = input[0].split(' ').map((el) => +el);
  const primes = eratos(n);
  const result = [];
  for (let i = m; i <= n; i++) {
    if (primes[i]) result.push(i);
  }
  return result.join('\n');
}

function eratos(n) {
  const primes = new Array(n + 1).fill(true);
  primes[0] = false;
  primes[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }

  return primes;
}
