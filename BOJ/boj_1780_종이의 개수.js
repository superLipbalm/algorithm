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
  const n = +input.shift();
  const cells = input.map((el) => splitInputToNumbers(el));
  const countMap = new Map([
    [-1, 0],
    [0, 0],
    [1, 0],
  ]);

  split(cells, n);

  return [...countMap.values()].join('\n');

  function split(cells, n) {
    for (let i = -1; i <= 1; i++) {
      if (cells.every((row) => row.every((cell) => cell === i))) {
        return countMap.set(i, countMap.get(i) + 1);
      }
    }

    const a = Math.floor(n / 3);
    const b = Math.floor((n * 2) / 3);
    const points = [[0, a], [a, b], [b]];

    points.forEach((pointX) => {
      points.forEach((pointY) => {
        split(
          cells.slice(...pointX).map((el) => el.slice(...pointY)),
          a
        );
      });
    });
  }
}
