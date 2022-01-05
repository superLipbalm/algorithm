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
  const visited = new Array(n).fill(false);
  const result = [];

  findSequence([], visited);

  console.log([...new Set(result)].join('\n'));

  process.exit();

  function findSequence(sequence, visited) {
    if (sequence.length === m) return result.push(sequence.join(' '));

    for (let i = 0; i < n; i++) {
      if (visited[i]) continue;
      const newVisited = [...visited];
      newVisited[i] = true;
      findSequence([...sequence, numbers[i]], newVisited);
    }
  }
})();
