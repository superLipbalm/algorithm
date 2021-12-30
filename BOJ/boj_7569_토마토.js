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

  const [n, m, h] = splitToNumber(input.shift());
  const box = input.map((el) => splitToNumber(el));
  let day = 0;
  const queue = new Queue();
  const d = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  box.forEach((row, rowIndex) =>
    row.forEach((cell, x) => {
      const y = rowIndex % m;
      const z = Math.floor(rowIndex / m);
      if (cell === 1) queue.push([x, y, z]);
    })
  );

  while (queue.size) {
    const [x, y, z] = queue.pop();
    const cell = box[y + z * m][x];
    if (day < cell) day = cell;

    d.forEach(([dx, dy, dz]) => {
      const [newX, newY, newZ] = [x + dx, y + dy, z + dz];
      if (newX < 0 || newX >= n) return;
      if (newY < 0 || newY >= m) return;
      if (newZ < 0 || newZ >= h) return;
      const rowIndex = newY + newZ * m;
      if (box[rowIndex][newX] === -1 || box[rowIndex][newX] >= 1) return;
      box[rowIndex][newX] = cell + 1;
      queue.push([newX, newY, newZ]);
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
