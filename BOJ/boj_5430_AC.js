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
  const result = [];

  while (input.length) {
    const commands = [...input.shift()];
    input.shift();
    const arr =
      input[0] === '[]'
        ? input.shift() && []
        : input
            .shift()
            .replace(/[\[\]]/g, '')
            .split(',');
    let reverse = false;
    let error = false;

    for (const command of commands) {
      if (command === 'R') {
        reverse = !reverse;
      } else if (command === 'D') {
        if (arr.length === 0) {
          error = true;
          break;
        }

        if (reverse) arr.pop();
        else arr.shift();
      }
    }

    if (!error && reverse) arr.reverse();

    result.push(error ? 'error' : '[' + arr.join(',') + ']');
  }

  return result.join('\n');
}
