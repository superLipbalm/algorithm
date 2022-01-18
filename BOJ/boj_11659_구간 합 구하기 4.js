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

  const [n, m] = splitToNumber(input.shift());
  const numbers = splitToNumber(input.shift());
  const sum = Array.from({ length: n + 1 }, (_, idx) => (idx === 0 ? 0 : numbers[idx - 1]));
  const result = [];

  for (let i = 1; i <= n; i++) {
    sum[i] = sum[i - 1] + numbers[i - 1];
  }

  input.forEach((input) => {
    const [i, j] = splitToNumber(input);
    result.push(sum[j] - sum[i - 1]);
  });

  console.log(result.join('\n'));

  process.exit();
})();
