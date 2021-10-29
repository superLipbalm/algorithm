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
  input.shift();
  const people = input;
  const peopleMap = new Map();
  const result = [];
  let count = 0;

  people.forEach((person) => {
    if (peopleMap.has(person)) {
      count++;
      result.push(person);
    } else {
      peopleMap.set(person, true);
    }
  });

  result.sort();

  return [count, ...result].join('\n');
}
