const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const splitToNumber = (string) => string.split(' ').map((el) => +el);

(async function () {
  const input = [];

  for await (const line of rl) {
    input.push(line);
  }
  rl.close();

  const [n, m] = splitToNumber(input.shift());
  const box = input.map((el) => splitToNumber(el));
  let day = 0;
  const queue = new Queue();
  const d = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  box.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell === 1) queue.push([x, y]);
    })
  );

  while (queue.size) {
    const [x, y] = queue.pop();
    const cell = box[y][x];
    if (day < cell) day = cell;

    d.forEach(([dx, dy]) => {
      const [newX, newY] = [x + dx, y + dy];
      if (box?.[newY]?.[newX] === undefined || box[newY][newX] === -1 || box[newY][newX] >= 1)
        return;
      box[newY][newX] = cell + 1;
      queue.push([newX, newY]);
    });
  }

  console.log(box.some((row) => row.some((el) => el === 0)) ? -1 : day - 1);

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
