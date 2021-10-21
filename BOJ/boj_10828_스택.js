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
  const commands = input.map((el) => el.split(' '));
  const stack = [];
  const result = [];

  commands.forEach((command) => {
    let output;
    switch (command[0]) {
      case 'push':
        stack.push(+command[1]);
        break;
      case 'pop':
        output = stack.length ? stack.pop() : -1;
        break;
      case 'size':
        output = stack.length;
        break;
      case 'empty':
        output = stack.length ? 0 : 1;
        break;
      case 'top':
        output = stack.length ? stack[stack.length - 1] : -1;
        break;
      default:
    }
    output !== undefined ? result.push(output) : null;
  });

  return result.join('\n');
}
