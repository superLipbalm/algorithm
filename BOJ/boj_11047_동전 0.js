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
  const coins = input;
  let result = 0;

  for (let i = n - 1, sum = 0; i >= 0; i--) {
    const coin = +coins[i];
    while (k - sum >= coin) {
      sum += coin;
      result += 1;
    }
    if (k === sum) {
      console.log(result);
      break;
    }
  }

  process.exit();
})();
