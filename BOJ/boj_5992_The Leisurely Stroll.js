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
  const paths = input.map((el) => splitToNumber(el)).sort((a, b) => a[0] - b[0]);
  let result = 0;

  findWay(1, 0);

  console.log(result);

  process.exit();

  function findWay(node, dist) {
    if (node === 0) return (result = result > dist ? result : dist);
    const [, d1, d2] = paths[node - 1];
    dist++;
    [d1, d2].forEach((d) => findWay(d, dist));
  }
})();
