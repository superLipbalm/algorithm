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

const splitInputToNumbers = (input) => input.split(' ').map((el) => +el);

function solution() {
  const n = +input.shift();
  const cells = input.map((el) => splitInputToNumbers(el));
  let wCount = 0;
  let bCount = 0;

  split(cells, n);

  return `${wCount}\n${bCount}`;

  function split(cells, n) {
    if (cells.every((row) => row.every((cell) => cell === 1))) {
      return bCount++;
    } else if (cells.every((row) => row.every((cell) => cell === 0))) {
      return wCount++;
    }

    const half = Math.floor(n / 2);

    split(
      cells.slice(0, half).map((el) => el.slice(0, half)),
      half
    );
    split(
      cells.slice(0, half).map((el) => el.slice(half)),
      half
    );
    split(
      cells.slice(half).map((el) => el.slice(0, half)),
      half
    );
    split(
      cells.slice(half).map((el) => el.slice(half)),
      half
    );
  }
}
