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
  const visited = new Array(n + 1).fill(false);
  const graph = {};

  input.forEach((input) => {
    const [n1, n2] = splitToNumber(input);
    if (n1 in graph) graph[n1].push(n2);
    else graph[n1] = [n2];
    if (n2 in graph) graph[n2].push(n1);
    else graph[n2] = [n1];
  });

  let result = 0;

  for (let i = 1; i <= n; i++) {
    if (visited[i] === true) continue;
    result += 1;
    dfs(i);
  }

  console.log(result);

  process.exit();

  function dfs(node) {
    visited[node] = true;

    if (node in graph) {
      graph[node].forEach((nextNode) => {
        if (visited[nextNode]) return;
        dfs(nextNode);
      });
    }
  }
})();
