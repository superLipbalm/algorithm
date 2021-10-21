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
  const numbers = input.map((el) => +el);
  const result = [];

  numbers.forEach((number) => {
    if (number === 0) result.pop();
    else result.push(number);
  });

  return result.reduce((acc, cur) => acc + cur, 0);
}
