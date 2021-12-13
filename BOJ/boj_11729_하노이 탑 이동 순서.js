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
  const n = +input.shift();
  const result = [];

  hanoi(n, 1, 2, 3);

  return [result.length, ...result].join('\n');

  function hanoi(n, from, by, to) {
    if (n === 1) result.push([from, to].join(' '));
    else {
      hanoi(n - 1, from, to, by);
      result.push([from, to].join(' '));
      hanoi(n - 1, by, from, to);
    }
  }
}
