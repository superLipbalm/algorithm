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
  const visited = new Array(n + 1).fill(false);
  const queue = new Queue();
  queue.push([n]);

  while (queue.size) {
    const result = queue.pop();
    const n = result.at(-1);

    if (n === 1) {
      console.log(result.length - 1);
      console.log(result.join(' '));
      break;
    }

    if (n % 3 === 0) {
      if (!visited[n / 3]) {
        visited[n / 3] = true;
        queue.push([...result, n / 3]);
      }
    }

    if (n % 2 === 0) {
      if (!visited[n / 2]) {
        visited[n / 2] = true;
        queue.push([...result, n / 2]);
      }
    }

    if (n - 1 > 0) {
      if (!visited[n - 1]) {
        visited[n - 1] = true;
        queue.push([...result, n - 1]);
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
