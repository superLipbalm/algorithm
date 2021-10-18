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
  const a = input[1]
    .split(' ')
    .map((el) => +el)
    .sort((a, b) => a - b);
  const nums = input[3].split(' ').map((el) => +el);
  const result = [];

  nums.forEach((num) => {
    let left = 0;
    let right = n;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (a[mid] === num) {
        result.push(1);
        return;
      } else if (a[mid] < num) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    result.push(0);
  });

  return result.join('\n');
}
