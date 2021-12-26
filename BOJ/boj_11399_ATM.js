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

  const n = +input.shift();
  const numbers = splitToNumber(input.shift()).sort((a, b) => a - b);
  let result = 0;

  for (let i = 0, sum = 0; i < n; i++) {
    sum += numbers[i];
    result += sum;
  }

  console.log(result);

  process.exit();
})();
