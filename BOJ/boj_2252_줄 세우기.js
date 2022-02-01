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

  const [n, m] = splitToNumber(input.shift());
  const graph = Object.fromEntries(Array.from({ length: n }, (_, idx) => [idx + 1, []]));
  const edgeCounts = new Array(n + 1).fill(0);
  const result = [];

  input.forEach((input) => {
    const [a, b] = splitToNumber(input);
    graph[a].push(b);
    edgeCounts[b]++;
  });

  const queue = new Queue();

  for (let i = 1; i <= n; i++) {
    if (edgeCounts[i] === 0) queue.push(i);
  }

  for (let i = 0; i < n; i++) {
    const node = queue.pop();
    result.push(node);

    for (const nextNode of graph[node]) {
      edgeCounts[nextNode]--;
      if (edgeCounts[nextNode] === 0) queue.push(nextNode);
    }
  }

  console.log(result.join(' '));

  process.exit();
})();

class Node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class Queue {
  fore = null;
  rear = null;
  length = 0;

  push(value) {
    if (this.isEmpty) {
      this.fore = this.rear = new Node(value);
    } else {
      const newNode = new Node(value);
      this.rear.nextNode = newNode;
      this.rear = newNode;
    }
    this.length++;
  }

  pop() {
    if (this.isEmpty) return -1;
    const value = this.fore.value;
    this.fore = this.fore.nextNode;
    this.length--;
    return value;
  }

  get size() {
    return this.length;
  }

  get isEmpty() {
    return this.length === 0;
  }

  get front() {
    if (this.isEmpty) return -1;
    return this.fore.value;
  }

  get back() {
    if (this.isEmpty) return -1;
    return this.rear.value;
  }
}
