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
  const queue = new Queue();
  queue.push([n, 0]);
  const visited = new Array(100001).fill(false);

  while (queue.size) {
    const [position, time] = queue.pop();
    if (position > 100000 || position < 0 || visited[position]) continue;

    visited[position] = true;

    if (position === k) {
      console.log(time);
      break;
    }

    const newTime = time + 1;

    queue.push([position * 2, newTime]);
    queue.push([position + 1, newTime]);
    queue.push([position - 1, newTime]);
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
