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
  const result = [];

  while (input.length) {
    const n = +input.shift();
    const clothes = input.splice(0, n).map((el) => el.split(' '));
    const clothesMap = new Map();

    clothes.forEach(([, type]) => {
      if (clothesMap.has(type)) clothesMap.set(type, clothesMap.get(type) + 1);
      else clothesMap.set(type, 1);
    });

    result.push([...clothesMap.values()].reduce((acc, cur) => acc * (cur + 1), 1) - 1);
  }

  return result.join('\n');
}
