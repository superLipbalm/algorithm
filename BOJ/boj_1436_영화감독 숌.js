const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input.push(+line);
}).on('close', function () {
  const result = solution();
  console.log(result);
  process.exit();
});

function solution() {
  let cnt = input[0];
  let num = 0;
  while (cnt > 0) {
    num += 1;
    if (num.toString().includes('666')) cnt -= 1;
  }

  return num;
}
