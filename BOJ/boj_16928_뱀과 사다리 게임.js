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
  const edges = input.map((input) => splitToNumber(input));
  const graph = {};
  edges.forEach(([from, to]) => {
    if (from in graph) graph[from].push(to);
    else graph[from] = [to];
  });
  const queue = new Queue();
  const visited = new Array(101).fill(false);
  queue.push([1, 0]);

  while (queue.size) {
    const [position, count] = queue.pop();

    if (position === 100) {
      console.log(count);
      break;
    }

    for (let i = 1; i <= 6; i++) {
      const nextPosition = position + i;
      if (visited[nextPosition]) continue;
      if (nextPosition > 100) continue;
      visited[nextPosition] = true;
      if (nextPosition in graph) {
        graph[nextPosition].forEach((to) => {
          if (visited[to]) return;
          visited[to] = true;
          queue.push([to, count + 1]);
        });
      } else {
        queue.push([nextPosition, count + 1]);
      }
    }
  }

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
