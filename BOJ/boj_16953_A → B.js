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

  const [a, b] = splitToNumber(input[0]);
  const queue = new Queue();
  queue.push([a, 0]);
  let result = -1;

  while (queue.size) {
    const [number, level] = queue.pop();
    if (number === b) {
      result = level + 1;
      break;
    }
    const nextNumbers = [number * 2, number * 10 + 1];
    const nextLevel = level + 1;
    nextNumbers.forEach((number) => {
      if (number > b) return;
      queue.push([number, nextLevel]);
    });
  }

  console.log(result);

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
