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
  const m = +input.shift();
  const edges = input.map((input) => splitToNumber(input));
  const costMap = Array.from({ length: n }, () => new Array(n).fill(Infinity));

  edges.forEach(([n1, n2, cost]) => {
    const currentCost = costMap[n1 - 1][n2 - 1];
    if (currentCost > cost) costMap[n1 - 1][n2 - 1] = cost;
  });

  for (let i = 0; i < n; i++) {
    costMap[i][i] = 0;
  }

  for (let by = 0; by < n; by++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        if (costMap[from][by] === Infinity || costMap[by][to] === Infinity) continue;
        const newCost = costMap[from][by] + costMap[by][to];
        if (costMap[from][to] > newCost) costMap[from][to] = newCost;
      }
    }
  }

  console.log(
    costMap.map((row) => row.map((el) => (el === Infinity ? 0 : el)).join(' ')).join('\n')
  );

  process.exit();
})();
