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
  const deque = [];
  const result = [];

  commands.forEach((command) => {
    let output;
    switch (command[0]) {
      case 'push_front':
        deque.unshift(+command[1]);
        break;
      case 'push_back':
        deque.push(+command[1]);
        break;
      case 'pop_front':
        output = deque.length ? deque.shift() : -1;
        break;
      case 'pop_back':
        output = deque.length ? deque.pop() : -1;
        break;
      case 'size':
        output = deque.length;
        break;
      case 'empty':
        output = deque.length ? 0 : 1;
        break;
      case 'front':
        output = deque.length ? deque[0] : -1;
        break;
      case 'back':
        output = deque.length ? deque[deque.length - 1] : -1;
        break;
      default:
    }
    output !== undefined ? result.push(output) : null;
  });

  return result.join('\n');
}
