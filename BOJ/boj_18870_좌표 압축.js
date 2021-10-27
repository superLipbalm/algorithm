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
  input.shift();
  const numbers = splitInputToNumbers(input[0]);
  const newCoordMap = new Map();
  [...new Set(numbers)]
    .sort((a, b) => a - b)
    .forEach((number, idx) => {
      newCoordMap.set(number, idx);
    });

  return numbers.map((number) => newCoordMap.get(number)).join(' ');
}
