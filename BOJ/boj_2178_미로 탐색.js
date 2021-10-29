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

const splitInputToNumbers = (input) => input.split(' ').map((el) => el);

function solution() {
  const [n, m] = splitInputToNumbers(input.shift());
  const map = input.map((el) => [...el].map((el) => +el));
  const d = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue = [[0, 0]];

  while (queue.length) {
    const [x, y] = queue.shift();
    d.forEach(([dx, dy]) => {
      const [newX, newY] = [x + dx, y + dy];
      if (newX >= n || newX < 0) return;
      if (newY >= m || newY < 0) return;
      if (map[newX][newY] === 1) {
        map[newX][newY] = map[x][y] + 1;
        queue.push([newX, newY]);
      }
    });
  }

  return map[n - 1][m - 1];
}
