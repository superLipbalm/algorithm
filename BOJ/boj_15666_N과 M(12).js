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
  const numbers = splitToNumber(input[1]).sort((a, b) => a - b);
  const result = [];

  findSequence([]);

  console.log([...new Set(result)].join('\n'));

  process.exit();

  function findSequence(sequence, visited) {
    if (sequence.length === m) return result.push(sequence.join(' '));

    for (let i = 0; i < n; i++) {
      if (sequence.at(-1) > numbers[i]) continue;
      findSequence([...sequence, numbers[i]]);
    }
  }
})();
