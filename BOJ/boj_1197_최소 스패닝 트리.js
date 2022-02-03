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
  const cycles = {};
  const cycleTable = Array.from({ length: v + 1 }, (_, idx) => idx);
  const costs = input.map((input) => splitToNumber(input)).sort((a, b) => a[2] - b[2]);
  let edgeCount = 0;
  let result = 0;

  for (const [a, b, cost] of costs) {
    const [aCycle, bCycle] = [cycleTable[a], cycleTable[b]];
    if (aCycle !== bCycle) {
      if (!(aCycle in cycles)) cycles[aCycle] = [a];
      if (!(bCycle in cycles)) {
        cycles[aCycle] = [...cycles[aCycle], b];
        cycleTable[b] = aCycle;
      } else {
        cycles[aCycle] = [...cycles[aCycle], ...cycles[bCycle]];
        cycles[bCycle].forEach((node) => (cycleTable[node] = aCycle));
        delete cycles[b];
      }
      edgeCount += 1;
      result += cost;
    }
    if (edgeCount === v - 1) break;
  }

  console.log(result);

  process.exit();
})();
