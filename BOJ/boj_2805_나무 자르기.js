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

const splitInputToNumbers = (input) => input.split(' ').map((el) => BigInt(+el));

function solution() {
  const [n, m] = splitInputToNumbers(input[0]);
  const trees = splitInputToNumbers(input[1]);
  let [left, right] = [1n, 2000000000n];
  let h = 0n;

  while (left <= right) {
    const mid = (left + right) / 2n;
    const sum = trees.reduce((acc, cur) => {
      const wood = cur - mid;
      if (wood > 0n) return acc + wood;
      else return acc;
    }, 0n);
    if (sum >= m) {
      h = mid;
      left = mid + 1n;
    } else right = mid - 1n;
  }

  return h.toString();
}
// BigInt 그대로 출력하면 뒤에 n 붙음 주의!
