// function solution(n, costs) {
//   let total = 0;
//   const bridges = [];
//   const cycleTable = Array.from(Array(n), (v, i) => i);

//   costs.sort((a, b) => a[2] - b[2]);

//   for (const [a, b, cost] of costs) {
//     const [aCycle, bCycle] = [cycleTable[a], cycleTable[b]];
//     if (aCycle !== bCycle) {
//       while (true) {
//         const cycleIdx = cycleTable.indexOf(bCycle);
//         if (cycleIdx === -1) break;
//         cycleTable[cycleIdx] = aCycle;
//       }
//       total += cost;
//     }
//     if (bridges.length === n - 1) break;
//   }

//   return total;
// }

function solution(n, costs) {
  let total = 0;
  const bridges = [];
  const cycles = {};
  const cycleTable = Array.from(Array(n), (v, i) => i);

  costs.sort((a, b) => a[2] - b[2]);

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

      total += cost;
    }
    if (bridges.length === n - 1) break;
  }

  return total;
}
