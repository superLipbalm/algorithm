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

  let count = 0;
  const treeMap = {};

  input.forEach((tree) => {
    count++;
    if (tree in treeMap) treeMap[tree]++;
    else treeMap[tree] = 1;
  });

  const result = Object.keys(treeMap)
    .sort()
    .map((key) => `${key} ${((treeMap[key] * 100) / count).toFixed(4)}`);

  console.log(result.join('\n'));

  process.exit();
})();
