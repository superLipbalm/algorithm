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

  const [v, e] = splitToNumber(input.shift());
  const edges = input.map((input) => splitToNumber(input));
  const distMap = Array.from({ length: v }, () => new Array(v).fill(Number.MAX_SAFE_INTEGER));

  edges.forEach(([v1, v2, dist]) => {
    distMap[v1 - 1][v2 - 1] = dist;
  });

  for (let i = 0; i < v; i++) {
    distMap[i][i] = 0;
  }

  for (let by = 0; by < v; by++) {
    for (let from = 0; from < v; from++) {
      for (let to = 0; to < v; to++) {
        const newDist = distMap[from][by] + distMap[by][to];
        if (distMap[from][to] > newDist) distMap[from][to] = newDist;
      }
    }
  }

  let result = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < v; i++) {
    for (let j = 0; j < v; j++) {
      if (i === j) continue;
      const dist = distMap[i][j] + distMap[j][i];
      if (distMap[i][j] !== Number.MAX_SAFE_INTEGER && distMap[j][i] !== Number.MAX_SAFE_INTEGER)
        result = Math.min(result, dist);
    }
  }

  console.log(result === Number.MAX_SAFE_INTEGER ? -1 : result);

  process.exit();
})();
