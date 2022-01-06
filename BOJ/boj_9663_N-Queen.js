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

  const n = +input[0];
  let result = 0;

  find(0, []);

  console.log(result);

  process.exit();

  function find(row, queens) {
    if (row === n) return result++;

    for (let col = 0; col < n; col++) {
      if (
        queens.some(
          ([qRow, qCol]) =>
            qRow === row || qCol === col || Math.abs(qRow - row) - Math.abs(qCol - col) === 0
        )
      )
        continue;
      find(row + 1, [...queens, [row, col]]);
    }
  }
})();
