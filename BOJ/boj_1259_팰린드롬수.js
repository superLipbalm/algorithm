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
  input.pop();
  const result = input
    .map((num) => {
      const reverse = [...num].reverse().join('');
      if (num === reverse) return 'yes';
      else return 'no';
    })
    .join('\n');

  return result;
}
