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
  const cards = new Map();
  input[1].split(' ').forEach((card) => {
    if (cards.has(card)) cards.set(card, cards.get(card) + 1);
    else cards.set(card, 1);
  });
  return input[3]
    .split(' ')
    .map((num) => cards.get(num) || 0)
    .join(' ');
}
