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
  const graph = input.map((row) => splitToNumber(row));

  for (let by = 0; by < n; by++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        const go = graph[from][by] + graph[by][to] > 1;
        if (go) {
          graph[from][to] = 1;
        }
      }
    }
  }

  console.log(graph.map((row) => row.join(' ')).join('\n'));

  process.exit();
})();
