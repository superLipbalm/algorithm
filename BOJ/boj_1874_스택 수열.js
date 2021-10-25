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
  const sequence = input.map((el) => +el);
  const stack = [];
  const result = [];
  let num = 1;

  for (let i = 0; i < n; i++) {
    const seq = sequence[i];
    while (num <= seq) {
      stack.push(num++);
      result.push('+');
    }
    if (stack[stack.length - 1] === seq) {
      stack.pop();
      result.push('-');
    }
  }

  return stack.length ? 'NO' : result.join('\n');
}

// function solution() {
//   const n = +input.shift();
//   const sequence = input.map((el) => +el);
//   const stack = [];
//   const result = [];
//   let num = 1;

//   while (true) {
//     if (!sequence.length) break;
//     if (num > n) {
//       if (sequence[0] === stack[stack.length - 1]) {
//         sequence.shift();
//         stack.pop();
//         result.push('-');
//       } else {
//         break;
//       }
//     } else {
//       if (!stack.length || sequence[0] !== stack[stack.length - 1]) {
//         stack.push(num);
//         result.push('+');
//         num++;
//       } else {
//         stack.pop();
//         sequence.shift();
//         result.push('-');
//       }
//     }
//   }

//   return sequence.length ? 'NO' : result.join('\n');
// }
