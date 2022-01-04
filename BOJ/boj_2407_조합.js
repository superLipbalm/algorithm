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

  const [n, m] = splitToNumber(input[0]);
  const dp = { 0: 1n, 1: 1n };

  const result = factorial(BigInt(n)) / (factorial(BigInt(m)) * factorial(BigInt(n - m)));

  console.log(result.toString().replace('n'));

  function factorial(n) {
    if (n in dp) return dp[n];
    const result = n * factorial(n - 1n);
    dp[n] = result;
    return result;
  }
})();
