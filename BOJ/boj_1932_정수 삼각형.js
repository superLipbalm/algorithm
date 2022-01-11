const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const splitToNumber = (input) => input.split(' ').map((el) => +el);

(async function () {
  const input = [];

  for await (const line of rl) {
    input.push(line);
  }
  rl.close();

  const [RED, GREEN, BLUE] = [0, 1, 2];
  const n = +input.shift();
  const costs = input.map((el) => splitToNumber(el));
  const dp = Array.from({ length: n }, (_, idx) => new Array(idx + 1).fill(0));
  dp[0][0] = costs[0][0];

  for (let rowIdx = 1; rowIdx < n; rowIdx++) {
    costs[rowIdx].forEach((cost, colIdx) => {
      if (colIdx === 0) {
        dp[rowIdx][colIdx] = cost + dp[rowIdx - 1][colIdx];
      } else if (colIdx === rowIdx) {
        dp[rowIdx][colIdx] = cost + dp[rowIdx - 1][colIdx - 1];
      } else {
        dp[rowIdx][colIdx] = cost + Math.max(dp[rowIdx - 1][colIdx - 1], dp[rowIdx - 1][colIdx]);
      }
    });
  }

  console.log(Math.max(...dp.at(-1)));

  process.exit();
})();
