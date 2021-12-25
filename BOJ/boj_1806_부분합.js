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

  const [n, s] = splitToNumber(input.shift());
  const number = splitToNumber(input.shift());
  let result = Number.MAX_SAFE_INTEGER,
    left = 0,
    right = 0,
    length = 1,
    sum = number[0];

  while (left <= right) {
    if (sum < s) {
      if (right === n - 1) break;
      right++;
      length++;
      sum += number[right];
    } else {
      if (length < result) result = length;
      if (left === n - 1) break;
      if (length === 1) {
        left++;
        right++;
        sum = number[left];
      } else {
        sum -= number[left];
        left++;
        length--;
      }
    }
  }

  console.log(result === Number.MAX_SAFE_INTEGER ? 0 : result);

  process.exit();
})();
