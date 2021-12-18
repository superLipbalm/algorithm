const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const result = solution();
  console.log(result);
  process.exit();
});

function solution() {
  input.shift();
  const result = [];
  const heap = new MinHeap();

  input.forEach((input) => {
    const n = +input;

    if (n === 0) result.push(heap.length ? heap.remove() : 0);
    else heap.insert(n);
  });

  return result.join('\n');
}

class MinHeap {
  heap = [];

  insert(n) {
    this.heap.push(n);
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index + 1) / 2) - 1;
      const parentNode = this.heap[parentIndex];

      if (n >= parentNode) break;

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
      const [smallNode, smallIndex] =
        leftNode <= rightNode ? [leftNode, leftIndex] : [rightNode, rightIndex];

      if (smallNode >= n) break;

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
