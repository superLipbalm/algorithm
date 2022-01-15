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

  const [n, k] = splitToNumber(input[0]);
  const visited = new Array(100001).fill(false);
  const queue = new Queue();
  queue.push([n, 0]);
  const result = [];

  while (queue.length) {
    const [position, time] = queue.pop();
    visited[position] = true;
    if (result.length && time > result[0][1]) break;
    if (position === k) {
      result.push([position, time]);
      continue;
    }

    if (position - 1 >= 0 && !visited[position - 1]) queue.push([position - 1, time + 1]);
    if (position + 1 <= 100000 && !visited[position + 1]) queue.push([position + 1, time + 1]);
    if (position * 2 <= 100000 && !visited[position * 2]) queue.push([position * 2, time + 1]);
  }

  console.log(result[0][1] + '\n' + result.length);

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
