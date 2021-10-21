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
  return input.map((PS) => (isVPS(PS) ? 'YES' : 'NO')).join('\n');
}

function isVPS(PS) {
  const stack = [];
  [...PS].forEach((char) => {
    if (stack.length === 0 || char === '(') {
      stack.push(char);
    } else if (stack[stack.length - 1] === '(') {
      stack.pop();
    } else {
      stack.push(char);
    }
  });
  return !stack.length;
}
