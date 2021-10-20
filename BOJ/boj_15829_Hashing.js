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
  const str = input[1];
  const r = BigInt(31);
  const M = BigInt(1234567891);
  const hash =
    [...str]
      .map((char) => BigInt(char.charCodeAt(0) - 96))
      .reduce((sum, number, i) => sum + number * r ** BigInt(i), BigInt(0)) % M;

  return hash.toString();
}
