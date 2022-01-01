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

  const numbers = splitToNumber(input[1]);

  console.log([...new Set(numbers)].sort((a, b) => a - b).join(' '));

  process.exit();
})();
