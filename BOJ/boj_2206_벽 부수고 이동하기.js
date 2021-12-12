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
  const [n, m] = splitToNumber(input.shift());
  const map = input.map((el) => [...el]);
  const nMap = Array.from(Array(2), () =>
    Array.from(Array(n), () => Array(m).fill(Number.MAX_SAFE_INTEGER))
  );
  const d = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  move();

  const result =
    nMap[0][n - 1][m - 1] > nMap[1][n - 1][m - 1] ? nMap[1][n - 1][m - 1] : nMap[0][n - 1][m - 1];

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;

  function move() {
    const queue = [[0, 0, 1, false]];
    nMap[0][0][0] = 1;

    while (queue.length) {
      const [x, y, n, breakWall] = queue.shift();

      d.forEach(([dx, dy]) => {
        const [newX, newY] = [x + dx, y + dy];
        const newCell = map?.[newY]?.[newX];
        const newCellN = nMap[breakWall ? 1 : 0]?.[newY]?.[newX];
        const newN = n + 1;
        if (newCell === undefined) return;
        if (newCell === '1' && !breakWall) {
          queue.push([newX, newY, newN, true]);
        } else if (newCell === '0' && newCellN > newN) {
          nMap[breakWall ? 1 : 0][newY][newX] = newN;
          queue.push([newX, newY, newN, breakWall]);
        }
      });
    }
  }
}
