function solution(n, edge) {
  const nodeDepths = Array.from(Array(n + 1), () => 0);
  nodeDepths[1] = 1;
  const queue = [[1, 1]];

  while (queue.length) {
    const [node, depth] = queue.shift();
    const newDepth = depth + 1;

    edge.forEach(([a, b]) => {
      if (a === node && nodeDepths[b] === 0) {
        nodeDepths[b] = newDepth;
        queue.push([b, newDepth]);
      } else if (b === node && nodeDepths[a] === 0) {
        nodeDepths[a] = newDepth;
        queue.push([a, newDepth]);
      }
    });
  }

  const max = Math.max(...nodeDepths);

  return nodeDepths.filter((depth) => depth === max).length;
}
