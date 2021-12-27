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
  const result = [];

  findSequence([]);

  console.log(result.join('\n'));

  process.exit();

  function findSequence(sequence) {
    const length = sequence.length;
    if (length === m) return result.push(sequence.join(' '));

    for (let i = 1; i <= n; i++) {
      if (sequence.includes(i) || sequence?.[length - 1] > i) continue;
      findSequence([...sequence, i]);
    }
  }
})();
