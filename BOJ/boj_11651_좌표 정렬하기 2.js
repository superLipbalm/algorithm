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
  input.shift();
  return input
    .map((el) => el.split(' ').map((el) => +el))
    .sort(([x1, y1], [x2, y2]) => (y1 !== y2 ? y1 - y2 : x1 - x2))
    .map((el) => el.join(' '))
    .join('\n');
}
