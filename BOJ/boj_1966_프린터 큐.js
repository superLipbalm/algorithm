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
  let result = [];
  const t = +input.shift();

  for (let i = 0; i < t; i++) {
    const [n, m] = input
      .shift()
      .split(' ')
      .map((el) => +el);
    const docs = input
      .shift()
      .split(' ')
      .map((priority, idx) => ({ idx, priority: +priority }));
    let cnt = 0;

    while (true) {
      const firstDoc = docs.shift();
      if (docs.every((doc) => doc.priority <= firstDoc.priority)) {
        cnt += 1;
        if (firstDoc.idx === m) {
          result.push(cnt);
          break;
        }
      } else {
        docs.push(firstDoc);
      }
    }
  }

  return result.join('\n');
}
