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
  const dp = Array.from({ length: n }, () => new Array(3).fill(0));
  dp[0][RED] = costs[0][RED];
  dp[0][GREEN] = costs[0][GREEN];
  dp[0][BLUE] = costs[0][BLUE];

  paintCost(n - 1, RED);
  paintCost(n - 1, GREEN);
  paintCost(n - 1, BLUE);

  console.log(Math.min(...dp.at(-1)));

  process.exit();

  function paintCost(index, color) {
    if (dp[index][color] !== 0) return dp[index][color];

    if (color === RED) {
      dp[index][color] =
        Math.min(paintCost(index - 1, GREEN), paintCost(index - 1, BLUE)) + costs[index][color];
    } else if (color === GREEN) {
      dp[index][color] =
        Math.min(paintCost(index - 1, RED), paintCost(index - 1, BLUE)) + costs[index][color];
    } else if (color === BLUE) {
      dp[index][color] =
        Math.min(paintCost(index - 1, RED), paintCost(index - 1, GREEN)) + costs[index][color];
    }

    return dp[index][color];
  }
})();
