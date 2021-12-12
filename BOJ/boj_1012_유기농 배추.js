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
  const result = [];
  input.shift();
  while (input.length) {
    const [m, n, k] = splitToNumber(input.shift());
    const map = Array.from(Array(n), () => Array(m).fill(0));
    const coords = input.splice(0, k).map((el) => splitToNumber(el));
    coords.forEach(([x, y]) => (map[y][x] = 1));
    let count = 0;

    map.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell) {
          count++;
          move(map, x, y);
        }
      })
    );

    result.push(count);
  }

  return result.join('\n');
}

function move(map, x, y) {
  const d = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = [[x, y]];
  map[y][x] = 0;

  while (queue.length) {
    const [x, y] = queue.shift();

    d.forEach(([dx, dy]) => {
      const [newX, newY] = [x + dx, y + dy];
      const newCell = map?.[newY]?.[newX];
      if (newCell) {
        queue.push([newX, newY]);
        map[newY][newX] = 0;
      }
    });
  }
}
