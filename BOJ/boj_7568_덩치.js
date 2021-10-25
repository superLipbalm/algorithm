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

const splitInputToNumbers = (input) => input.split(' ').map((el) => +el);

function solution() {
  const n = +input.shift();
  const peoples = input.map((el) => splitInputToNumbers(el));
  const counts = new Array(n).fill(1);

  peoples.forEach(([w1, h1], idx) => {
    peoples.forEach(([w2, h2]) => {
      if (w1 < w2 && h1 < h2) counts[idx]++;
    });
  });

  return counts.join(' ');
}
