// O(n^2)
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const splitToNumber = (input) => input.split(' ').map((el) => +el);

// (async function () {
//   const input = [];

//   for await (const line of rl) {
//     input.push(line);
//   }
//   rl.close();

//   const n = +input[0];
//   const sequence = splitToNumber(input[1]);
//   const dp = new Array(n).fill(1);
//   dp[0] = 1;

//   for (let i = 1; i < n; i++) {
//     // let j = 0; j < i; j++ 하면 시간초과됨 뭐지?
//     for (let j = i - 1; j >= 0; j--) {
//       if (sequence[i] > sequence[j]) {
//         dp[i] = Math.max(dp[i], dp[j] + 1);
//       }
//     }
//   }

//   console.log(Math.max(...dp));

//   process.exit();
// })();

// lowerBound를 이용해 O(nlogn)
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
  const sequence = splitToNumber(input[1]);
  const L = [];

  sequence.forEach((number) => {
    if (L.length === 0 || L.at(-1) < number) {
      L.push(number);
    } else {
      L[lowerBound(number, L)] = number;
    }
  });

  console.log(L.length);

  process.exit();

  function lowerBound(value, array) {
    let [left, right] = [0, array.length - 1];
    let mid;

    while (left < right) {
      mid = Math.floor((left + right) / 2);
      if (array[mid] < value) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return right;
  }
})();
