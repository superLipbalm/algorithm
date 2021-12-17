function solution(n, s, a, b, fares) {
  const costs = Array.from(Array(n), (_, i) =>
    Array.from(Array(n), (_, j) => (i === j ? 0 : Infinity))
  );
  fares.forEach(([n1, n2, cost]) => {
    costs[n1 - 1][n2 - 1] = cost;
    costs[n2 - 1][n1 - 1] = cost;
  });

  for (let by = 0; by < n; by++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        costs[from][to] = Math.min(costs[from][to], costs[from][by] + costs[by][to]);
      }
    }
  }

  s--;
  a--;
  b--;
  let result = costs[s][a] + costs[s][b];

  for (let c = 0; c < n; c++) {
    result = Math.min(result, costs[s][c] + costs[c][a] + costs[c][b]);
  }

  return result;
}
