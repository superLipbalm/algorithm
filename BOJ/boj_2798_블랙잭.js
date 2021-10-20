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
  const [[n, m], cards] = input.map((line) => line.split(' ').map((el) => +el));
  cards.sort((a, b) => a - b);
  let result = 0;

  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      for (let k = j + 1; k < n; k++) {
        const sum = cards[i] + cards[j] + cards[k];
        if (sum <= m && sum > result) result = sum;
      }
    }
  }

  return result;
}
