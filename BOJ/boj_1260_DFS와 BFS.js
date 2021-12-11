const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const result = solution();
  console.log(result);
  process.exit();
});

const splitToNumber = (string) => string.split(' ').map((el) => +el);

function solution() {
  const [n, m, v] = splitToNumber(input.shift());
  const edges = input
    .flatMap((el) => {
      const edge = splitToNumber(el);

      return [[...edge], [...edge.reverse()]];
    })
    .sort((a, b) => {
      if (a[0] === b[0]) return a[1] - b[1];
      return a[0] - b[0];
    });
  const result = [];
  const visited = new Array(n + 1).fill(false);

  result.push(dfs([...visited], edges, v).join(' '));
  result.push(bfs([...visited], edges, v).join(' '));

  return result.join('\n');
}

function dfs(visited, edges, node) {
  const result = [node];
  visited[node] = true;

  edges.forEach((edge) => {
    const [nodeA, nodeB] = edge;

    if (nodeA === node && !visited[nodeB]) result.push(...dfs(visited, edges, nodeB));
  });

  return result;
}

function bfs(visited, edges, start) {
  const queue = [start];
  visited[start] = true;
  const result = [start];

  while (queue.length) {
    const node = queue.shift();

    edges.forEach((edge) => {
      const [nodeA, nodeB] = edge;

      if (nodeA === node && !visited[nodeB]) {
        queue.push(nodeB);
        result.push(nodeB);
        visited[nodeB] = true;
      }
    });
  }

  return result;
}
