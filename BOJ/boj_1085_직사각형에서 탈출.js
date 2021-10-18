const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input.push(...line.split(' ').map((el) => +el));
}).on('close', function () {
  const result = solution();
  console.log(result);
  process.exit();
});

function solution() {
  const [x, y, w, h] = input;

  return Math.min(x, y, w - x, h - y);
}
