const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const splitToNumber = (input) => input.split(' ').map((el) => +el);

(async function () {
  const input = [];

  for await (const line of rl) {
    input.push(line);
  }
  rl.close();

  const [n, m] = splitToNumber(input.shift());
  const numbers = splitToNumber(input.shift());
  const queue = Array.from({ length: n }, (_, idx) => idx + 1);
  let result = 0;

  for (let i = 0; i < numbers.length; i++) {
    const target = numbers[i];
    const targetIndex = queue.indexOf(target);
    const forward = Math.abs(queue.length - targetIndex) >= targetIndex + 1;
    while (queue.at(0) !== numbers[i]) {
      if (forward) {
        queue.push(queue.shift());
      } else {
        queue.unshift(queue.pop());
      }
      result += 1;
    }
    queue.shift();
  }

  console.log(result);

  process.exit();
})();
