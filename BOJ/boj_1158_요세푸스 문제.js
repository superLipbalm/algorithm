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

  const [n, k] = splitToNumber(input[0]);
  const queue = Array.from({ length: n }, (_, idx) => idx + 1);
  const result = [];

  while (queue.length) {
    for (let i = 0; i < k - 1; i++) {
      queue.push(queue.shift());
    }

    result.push(queue.shift());
  }

  console.log(`<${result.join(', ')}>`);

  process.exit();
})();
