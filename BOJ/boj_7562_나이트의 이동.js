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

  input.shift();

  const result = [];

  while (input.length) {
    const l = +input.shift();
    const [x1, y1] = splitToNumber(input.shift());
    const [x2, y2] = splitToNumber(input.shift());
    const queue = new Queue([[x1, y1, 0]]);
    const visited = Array.from({ length: l }, () => new Array(l).fill(false));
    const d = [
      [-2, 1],
      [-2, -1],
      [-1, 2],
      [-1, -2],
      [1, 2],
      [1, -2],
      [2, 1],
      [2, -1],
    ];
    const isValid = (coord) => coord >= 0 && coord < l;

    while (queue.size) {
      const [x, y, count] = queue.pop();

      if (x === x2 && y == y2) {
        result.push(count);
        break;
      }

      d.forEach(([dx, dy]) => {
        const [newX, newY] = [x + dx, y + dy];
        if (!isValid(newX) || !isValid(newY) || visited[newX][newY]) return;
        visited[newX][newY] = true;
        queue.push([newX, newY, count + 1]);
      });
    }
  }

  console.log(result.join('\n'));

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

  constructor(array) {
    array.forEach((el) => this.push(el));
  }

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
