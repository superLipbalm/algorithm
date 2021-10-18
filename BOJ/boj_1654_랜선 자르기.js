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
  const [k, n] = input[0].split(' ').map((el) => +el);
  const cables = input.slice(1).map((el) => +el);
  let max = 0;
  let left = 0;
  let right = 2 ** 31 - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let num = 0;

    for (let i = 0; i < k; i++) {
      num += Math.floor(cables[i] / mid);
    }

    if (num >= n) {
      left = mid + 1;
      if (mid > max) max = mid;
    } else {
      right = mid - 1;
    }
  }

  return max;
}
