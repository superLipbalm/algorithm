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
  const queue = [];
  const result = [];

  commands.forEach((command) => {
    let output;
    switch (command[0]) {
      case 'push':
        queue.push(+command[1]);
        break;
      case 'pop':
        output = queue.length ? queue.shift() : -1;
        break;
      case 'size':
        output = queue.length;
        break;
      case 'empty':
        output = queue.length ? 0 : 1;
        break;
      case 'front':
        output = queue.length ? queue[0] : -1;
        break;
      case 'back':
        output = queue.length ? queue[queue.length - 1] : -1;
        break;
      default:
    }
    output !== undefined ? result.push(output) : null;
  });

  return result.join('\n');
}
