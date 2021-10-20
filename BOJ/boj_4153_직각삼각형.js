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
  const result = [];

  input.forEach((testcase) => {
    const [a, b, c] = testcase
      .split(' ')
      .map((el) => +el)
      .sort((a, b) => a - b);
    result.push(isRight(a, b, c));
  });

  return result.join('\n');
}

function isRight(a, b, c) {
  return a ** 2 + b ** 2 === c ** 2 ? 'right' : 'wrong';
}
