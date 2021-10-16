const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input.push(line.split(' '));
}).on('close', function () {
  const BStart = new Array(8)
    .fill(null)
    .map((_, idx) => (idx % 2 === 0 ? 'BWBWBWBW' : 'WBWBWBWB'))
    .join('');
  const WStart = new Array(8)
    .fill(null)
    .map((_, idx) => (idx % 2 !== 0 ? 'BWBWBWBW' : 'WBWBWBWB'))
    .join('');
  const h = +input[0][0];
  const w = +input[0][1];
  const board = input.slice(1).flat();
  let num = 64;

  for (let y = 0; y <= h - 8; y++) {
    for (let x = 0; x <= w - 8; x++) {
      const chessBoard = board
        .slice(y, y + 8)
        .map((row) => row.slice(x, x + 8))
        .join('');
      const BNum = [...BStart].reduce(
        (acc, cur, idx) => (cur === chessBoard[idx] ? acc : acc + 1),
        0
      );
      const WNum = [...WStart].reduce(
        (acc, cur, idx) => (cur === chessBoard[idx] ? acc : acc + 1),
        0
      );
      const chageNum = BNum > WNum ? WNum : BNum;

      if (chageNum < num) num = chageNum;
    }
  }

  console.log(num);
  process.exit();
});
