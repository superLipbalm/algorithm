const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const splitToNumber = (input) => input.split(' ').map((el) => +el);

(async function () {
  const input = [];

  for await (const line of rl) {
    input.push(line);
  }
  rl.close();

  const infix = input[0];
  const stack = [];
  const operators = '*+-/';
  const operatorsPriority = { '*': 1, '/': 1, '+': 2, '-': 2 };
  let postfix = '';

  for (let i = 0; i < infix.length; i++) {
    const char = infix[i];
    if (char === '(') {
      stack.push(char);
    } else if (operators.includes(char)) {
      while (
        operators.includes(stack.at(-1)) &&
        operatorsPriority[char] >= operatorsPriority[stack.at(-1)]
      ) {
        postfix += stack.pop();
      }
      stack.push(char);
    } else if (char === ')') {
      while (stack.length && stack.at(-1) !== '(') {
        postfix += stack.pop();
      }
      stack.pop();
    } else {
      postfix += char;
    }
  }

  while (stack.length) {
    postfix += stack.pop();
  }

  console.log(postfix);

  process.exit();
})();
