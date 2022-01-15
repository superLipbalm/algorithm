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
  const nameToNumber = {};
  const numberToName = [];
  const result = [];

  for (let i = 0; i < n; i++) {
    numberToName.push(input[i]);
    nameToNumber[input[i]] = i + 1;
  }

  for (let i = n; i < n + m; i++) {
    if (+input[i]) result.push(numberToName[input[i] - 1]);
    else result.push(nameToNumber[input[i]]);
  }

  console.log(result.join('\n'));

  process.exit();
})();
