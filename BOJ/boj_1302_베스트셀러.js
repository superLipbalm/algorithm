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

  const n = +input.shift();
  const sellCountMap = {};

  input.forEach((book) => {
    if (book in sellCountMap) sellCountMap[book] += 1;
    else sellCountMap[book] = 1;
  });

  const bestsellerCount = Math.max(...Object.values(sellCountMap));
  const result = [];
  Object.entries(sellCountMap).forEach(([book, count]) => {
    if (count === bestsellerCount) result.push(book);
  });
  result.sort();

  console.log(result[0]);

  process.exit();
})();
