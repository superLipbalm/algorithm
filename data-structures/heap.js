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

class MaxHeap {
  heap = [];

  insert(n) {
    this.heap.push(n);
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index + 1) / 2) - 1;
      const parentNode = this.heap[parentIndex];

      if (n <= parentNode) break;

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  remove() {
    if (this.length <= 1) return this.heap.pop();
    const max = this.heap[0];
    const n = (this.heap[0] = this.heap.pop());
    let index = 0;

    while (index < this.length) {
      const leftIndex = (index + 1) * 2 - 1;
      if (leftIndex >= this.length) break;
      const leftNode = this.heap[leftIndex];
      const rightIndex = (index + 1) * 2;
      const rightNode = this.heap[rightIndex] ?? 0;
      const [bigNode, bigIndex] =
        leftNode >= rightNode ? [leftNode, leftIndex] : [rightNode, rightIndex];

      if (bigNode <= n) break;

      this.swap(index, bigIndex);
      index = bigIndex;
    }

    return max;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  get length() {
    return this.heap.length;
  }
}
