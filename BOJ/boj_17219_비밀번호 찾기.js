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
  const [n, m] = input.shift().split(' ');
  const passwordMap = new Map(input.splice(0, n).map((el) => el.split(' ')));

  return input.reduce((result, addr) => result + passwordMap.get(addr) + '\n', '');
}
