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

  for (let i = 1; i < n; i++) {
    const sum = i + [...i.toString()].reduce((acc, cur) => +cur + acc, 0);
    if (sum === n) return i;
  }

  return 0;
}
