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

const splitInputToNumbers = (input) => input.split(' ').map((el) => +el);

function solution() {
  const n = +input.splice(0, 2)[0];
  const connections = input.map((el) => splitInputToNumbers(el));
  const visited = new Array(n + 1).fill(false);
  let count = -1;

  scan(1);

  return count;

  function scan(idx) {
    visited[idx] = true;
    count++;

    connections.forEach(([a, b]) => {
      if (a === idx && visited[b] === false) {
        scan(b);
      } else if (b === idx && visited[a] === false) {
        scan(a);
      }
    });
  }
}
