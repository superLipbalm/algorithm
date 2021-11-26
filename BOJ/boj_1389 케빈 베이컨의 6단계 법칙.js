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

const inputSplitToNumber = (input) => input.split(' ').map((el) => +el);

function solution() {
  const [n, m] = inputSplitToNumber(input.shift());
  const routes = input.map((el) => inputSplitToNumber(el));

  const getKevinBaconNum = (start) => {
    const queue = [start];
    const NOT_VISITED = -1;
    const visited = new Array(n + 1).fill(NOT_VISITED);
    visited[start] = 0;

    while (queue.length) {
      const node = queue.shift();
      const level = visited[node] + 1;

      routes.forEach(([a, b]) => {
        if (a === node && visited[b] === NOT_VISITED) {
          visited[b] = level;
          queue.push(b);
        } else if (b === node && visited[a] === NOT_VISITED) {
          visited[a] = level;
          queue.push(a);
        }
      });
    }

    return visited.reduce((acc, cur) => acc + cur, 1);
  };

  const kevinBaconNums = new Array(n).fill(1).map((_, index) => getKevinBaconNum(index + _));
  const min = Math.min(...kevinBaconNums);

  return kevinBaconNums.findIndex((el) => el === min) + 1;
}
