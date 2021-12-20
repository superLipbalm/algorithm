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
  const result = [];
  input.pop();
  const memo = new Map();

  while (input.length) {
    const [a, b, c] = input
      .shift()
      .split(' ')
      .map((el) => +el);

    result.push(`w(${a}, ${b}, ${c}) = ${w(a, b, c)}`);
  }

  return result.join('\n');

  function w(a, b, c) {
    const key = `${a} ${b} ${c}`;
    if (memo.has(key)) return memo.get(key);

    let result;
    if (a <= 0 || b <= 0 || c <= 0) result = 1;
    else if (a > 20 || b > 20 || c > 20) result = w(20, 20, 20);
    else if (a < b && b < c) result = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
    else result = w(a - 1, b, c) + w(a - 1, b - 1, c) + w(a - 1, b, c - 1) - w(a - 1, b - 1, c - 1);

    memo.set(key, result);
    return result;
  }
}
