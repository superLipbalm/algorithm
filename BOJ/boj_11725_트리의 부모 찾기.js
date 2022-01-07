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
  const parentMap = new Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => new Array());
  const queue = new Queue();
  queue.push(1);

  input.forEach((edge) => {
    const [n1, n2] = splitToNumber(edge);
    graph[n1].push(n2);
    graph[n2].push(n1);
  });

  while (queue.size) {
    const n1 = queue.pop();

    graph[n1].forEach((n2) => {
      if (parentMap[n2] !== 0) return;
      parentMap[n2] = n1;
      queue.push(n2);
    });
  }

  parentMap.splice(0, 2);

  console.log(parentMap.join('\n'));

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
