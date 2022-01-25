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

  const dp = new Array(11).fill(null);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  input.shift();
  input.forEach((number) => {
    console.log(find(+number));
  });

  process.exit();

  function find(number) {
    if (number < 0) return 0;
    if (dp[number] !== null) return dp[number];

    dp[number] = find(number - 1) + find(number - 2) + find(number - 3);

    return dp[number];
  }
})();
