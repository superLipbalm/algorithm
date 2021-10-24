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
  const [n, ...numbers] = input.map((el) => +el);
  const numCount = new Map();
  let [max, min, sum] = [-4000, 4000, 0];

  numbers.sort((a, b) => a - b);
  numbers.forEach((number) => {
    sum += number;
    if (number > max) max = number;
    if (number < min) min = number;
    if (numCount.has(number)) numCount.set(number, numCount.get(number) + 1);
    else numCount.set(number, 1);
  });

  const countMax = Math.max(...numCount.values());
  const modeArray = [...numCount.entries()].filter(([num, count]) => count === countMax);
  const mean = Math.round(sum / n);
  const median = numbers[Math.floor(n / 2)];
  let mode;
  if (modeArray.length === 1) mode = modeArray[0][0];
  else mode = modeArray.map(([num, count]) => num)[1];
  const range = Math.abs(max - min);

  return [mean, median, mode, range].join('\n');
}
