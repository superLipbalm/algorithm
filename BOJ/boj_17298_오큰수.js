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

const splitInputToNumbers = (input) => input.split(' ').map((el, index) => ({ index, value: +el }));

function solution() {
  const numbers = splitInputToNumbers(input[1]);
  const result = new Array(numbers.length).fill(-1);
  const stack = [];
  let index = 0;

  while (index < numbers.length) {
    const number = numbers[index];

    while (stack.length && stack[stack.length - 1].value < number.value) {
      const popNumber = stack.pop();
      result[popNumber.index] = number.value;
    }

    stack.push(number);
    index++;
  }

  return result.join(' ');
}
