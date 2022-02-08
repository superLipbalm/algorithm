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

  const [n, k] = splitToNumber(input.shift());
  const dp = Array.from({ length: k + 1 }, () => new Array(n + 1).fill(0));
  const items = input.map((el) => splitToNumber(el));

  for (let index = 1; index <= n; index++) {
    for (let maxWeight = 1; maxWeight <= k; maxWeight++) {
      const [itemWeight, itemValue] = items[index - 1];
      if (itemWeight <= maxWeight) {
        dp[maxWeight][index] = Math.max(
          dp[maxWeight][index - 1],
          itemValue + dp[maxWeight - itemWeight][index - 1]
        );
      } else {
        dp[maxWeight][index] = dp[maxWeight][index - 1];
      }
    }
  }

  console.log(dp[k][n]);

  process.exit();
})();
