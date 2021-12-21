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
  const n = +input[0];
  const numbers = input[1].split(' ').map((el) => +el);
  let max = numbers[0];

  for (let i = 1, sum = numbers[0]; i < n; i++) {
    sum = Math.max(sum + numbers[i], numbers[i]);
    max = Math.max(sum, max);
  }

  return max;
}
