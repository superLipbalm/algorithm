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
  const [n, k] = input[0].split(' ').map((el) => +el);
  const numbers = new Array(n).fill(1).map((el, idx) => el + idx);
  const result = [];
  let cnt = 0;

  while (numbers.length) {
    cnt++;
    const number = numbers.shift();
    if (cnt === k) {
      result.push(number);
      cnt = 0;
    } else {
      numbers.push(number);
    }
  }

  return `<${result.join(', ')}>`;
}
