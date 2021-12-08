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

function solution() {
  input.shift();
  const map = input.map((row) => [...row]);
  const result = [];

  map.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell !== '1') return;
      result.push(bfs(x, y));
    })
  );

  return [result.length, ...result.sort((a, b) => a - b)].join('\n');

  function bfs(x, y) {
    const stack = [[x, y]];
    const d = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    let count = 1;
    map[y][x] = '0';

    while (stack.length) {
      const [x, y] = stack.pop();

      d.forEach(([dx, dy]) => {
        const [newX, newY] = [dx + x, dy + y];
        const node = map?.[newY]?.[newX];
        if (node !== '1') return;
        map[newY][newX] = '0';
        stack.push([newX, newY]);
        count++;
      });
    }

    return count;
  }
}
