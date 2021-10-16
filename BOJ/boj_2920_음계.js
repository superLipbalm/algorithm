const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input = line.split(' ').map((el) => parseInt(el));
}).on('close', function () {
  const asc = [...input].sort((a, b) => a - b).join('');
  const desc = [...input].sort((a, b) => b - a).join('');
  input = input.join('');

  if (input === asc) console.log('ascending');
  else if (input === desc) console.log('descending');
  else console.log('mixed');
  process.exit();
});
