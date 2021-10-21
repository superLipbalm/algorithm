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
  input.shift();
  const members = input
    .map((el) => el.split(' '))
    .map((el, idx) => ({
      age: +el[0],
      name: el[1],
      idx,
    }))
    .sort((a, b) => {
      const { age: age1, idx: idx1 } = a;
      const { age: age2, idx: idx2 } = b;
      if (age1 === age2) return idx1 - idx2;
      else return age1 - age2;
    })
    .map(({ age, name }) => age + ' ' + name);

  return members.join('\n');
}
