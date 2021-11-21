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
  const n = +input[0];
  const malfunction = input[2]?.split(' ') ?? [];
  const numberButton = [...'0123456789'].filter((number) => !malfunction.includes(number));
  const DEFAULT_CHANNEL = 100;
  let result = Math.abs(n - DEFAULT_CHANNEL);

  const findClosestNum = (numbers) => {
    const pressCount = Math.abs(n - numbers) + numbers.length;
    const isClosest = pressCount < result;

    if (isClosest) result = pressCount;

    if (numbers.length > n.toString().length) return;
    numberButton.forEach((number) => findClosestNum(numbers + number));
  };

  numberButton.forEach((number) => {
    findClosestNum(number);
  });

  return result;
}
