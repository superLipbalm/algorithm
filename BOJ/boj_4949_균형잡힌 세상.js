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

const splitInputToNumbers = (input) => input.split(' ').map((el) => BigInt(+el));

function solution() {
  input.pop();
  const sentences = input;
  return sentences.map((sentence) => isBalanced(sentence)).join('\n');
}

function isBalanced(str) {
  const stack = [];
  const brackets = ['(', ')', '[', ']'];

  [...str]
    .filter((char) => brackets.includes(char))
    .forEach((bracket) => {
      if (stack.length && bracket === ')' && stack[stack.length - 1] === '(') stack.pop();
      else if (stack.length && bracket === ']' && stack[stack.length - 1] === '[') stack.pop();
      else stack.push(bracket);
    });

  return stack.length === 0 ? 'yes' : 'no';
}
