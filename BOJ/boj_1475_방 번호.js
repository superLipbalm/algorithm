const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async function () {
  const input = [];

  for await (const line of rl) {
    input.push(line);
  }
  rl.close();

  const number = [...input[0]];
  const numCount = new Array(10).fill(0);

  number.forEach((digit) => {
    numCount[digit] += 1;
  });

  const totalSixNine = numCount[6] + numCount[9];
  numCount[6] = Math.ceil(totalSixNine / 2);
  numCount[9] = Math.floor(totalSixNine / 2);

  console.log(Math.max(...numCount));

  process.exit();
})();
