const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input = line.split(' ').map((el) => parseInt(el));
}).on('close', function () {
  const num = input.reduce((acc, cur) => acc + cur ** 2, 0) % 10;
  console.log(num);
  process.exit();
});
