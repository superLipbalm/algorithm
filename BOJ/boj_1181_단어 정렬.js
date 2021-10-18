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
  const result = [...new Set(input.slice(1))]
    .sort()
    .sort((a, b) => a.length - b.length)
    .join('\n');

  return result;
}
