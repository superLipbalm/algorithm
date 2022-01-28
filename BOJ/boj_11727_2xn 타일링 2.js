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

  const n = +input[0];
  const dp = [];
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 3;

  console.log(find(n));

  process.exit();

  function find(n) {
    if (n < 1) return 1;
    if (n in dp) return dp[n];

    dp[n] = (find(n - 2) * 2 + find(n - 1)) % 10007;

    return dp[n];
  }
})();
