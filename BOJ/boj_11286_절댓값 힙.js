const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async function () {
  const input = [];

  for await (const line of rl) {
    input.push(line);
  }
  rl.close();

  const n = +input.shift();
  const heap = new AbsoluteMinHeap();
  const result = [];

  input.forEach((input) => {
    const number = +input;
    if (number === 0) result.push(heap.remove() ?? 0);
    else heap.insert(number);
  });

  console.log(result.join('\n'));

  process.exit();
})();

class AbsoluteMinHeap {
  heap = [];

  insert(n) {
    this.heap.push(n);
    let index = this.heap.length - 1;
    const absoluteN = Math.abs(n);

    while (index > 0) {
      const parentIndex = Math.floor((index + 1) / 2) - 1;
      const parentNode = this.heap[parentIndex];

      if (absoluteN > Math.abs(parentNode)) break;
      if (absoluteN === Math.abs(parentNode) && n >= parentNode) break;

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  remove() {
    if (this.length <= 1) return this.heap.pop();
    const min = this.heap[0];
    const n = (this.heap[0] = this.heap.pop());
    const absoluteN = Math.abs(n);
    let index = 0;

    while (index < this.length) {
      const leftIndex = (index + 1) * 2 - 1;
      if (leftIndex >= this.length) break;
      const leftNode = this.heap[leftIndex];
      const rightIndex = (index + 1) * 2;
      const rightNode = this.heap[rightIndex] ?? Number.MAX_SAFE_INTEGER;
      const [smallNode, smallIndex] = this.getSmall([leftNode, leftIndex], [rightNode, rightIndex]);

      if (Math.abs(smallNode) > absoluteN) break;
      if (Math.abs(smallNode) === absoluteN && smallNode >= n) break;

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

  getSmall([nodeA, indexA], [nodeB, indexB]) {
    const [absoluteA, absoluteB] = [Math.abs(nodeA), Math.abs(nodeB)];
    if (absoluteA < absoluteB) return [nodeA, indexA];
    else if (absoluteA === absoluteB && nodeA <= nodeB) return [nodeA, indexA];
    else return [nodeB, indexB];
  }
}
