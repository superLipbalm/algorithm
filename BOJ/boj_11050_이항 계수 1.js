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
  const [n, k] = input[0].split(' ').map((el) => +el);
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function factorial(n) {
  if (n < 2) return 1;

  return n * factorial(n - 1);
}
