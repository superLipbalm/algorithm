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
  const m = +input.shift();
  const graph = {};
  const [from, to] = splitToNumber(input.at(-1));
  const costs = new Array(n + 1).fill(Infinity);

  for (let i = 0; i < m; i++) {
    const [from, to, cost] = splitToNumber(input[i]);
    if (from in graph) graph[from].push([to, cost]);
    else graph[from] = [[to, cost]];
  }

  dijkstra(from);

  console.log(costs[to]);

  process.exit();

  function dijkstra(start) {
    costs[start] = 0;
    const heap = new Heap((a, b) => a[1] > b[1]);
    heap.insert([start, 0]);

    while (heap.length) {
      const [current, currentCost] = heap.remove();
      if (costs[current] < currentCost) continue;
      graph[current]?.forEach(([next, nextCost]) => {
        const newCost = currentCost + nextCost;
        if (newCost < costs[next]) {
          costs[next] = newCost;
          heap.insert([next, newCost]);
        }
      });
    }
  }
})();

class Heap {
  constructor(compareFunction) {
    this.compare = compareFunction;
  }

  heap = [];

  insert(n) {
    this.heap.push(n);
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index + 1) / 2) - 1;
      const parentNode = this.heap[parentIndex];

      if (!this.compare(n, parentNode)) break;

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  remove() {
    if (this.length <= 1) return this.heap.pop();
    const min = this.heap[0];
    const n = (this.heap[0] = this.heap.pop());
    let index = 0;

    while (index < this.length) {
      const leftIndex = (index + 1) * 2 - 1;
      if (leftIndex >= this.length) break;
      const leftNode = this.heap[leftIndex];
      const rightIndex = (index + 1) * 2;
      const rightNode = this.heap[rightIndex] ?? Number.MAX_SAFE_INTEGER;
      const [smallNode, smallIndex] = !this.compare(rightNode, leftNode)
        ? [leftNode, leftIndex]
        : [rightNode, rightIndex];

      if (!this.compare(smallNode, n)) break;

      this.swap(index, smallIndex);
      index = smallIndex;
    }

    return min;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  get length() {
    return this.heap.length;
  }
}
