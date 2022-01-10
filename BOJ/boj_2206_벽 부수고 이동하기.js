const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const result = solution();
  console.log(result);
  process.exit();
});

const splitToNumber = (string) => string.split(' ').map((el) => +el);

function solution() {
  const [n, m] = splitToNumber(input.shift());
  const map = input.map((el) => [...el]);
  const nMap = Array.from(Array(2), () =>
    Array.from(Array(n), () => Array(m).fill(Number.MAX_SAFE_INTEGER))
  );
  const d = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  move();

  const result =
    nMap[0][n - 1][m - 1] > nMap[1][n - 1][m - 1] ? nMap[1][n - 1][m - 1] : nMap[0][n - 1][m - 1];

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;

  function move() {
    const queue = new Queue();
    queue.push([0, 0, 1, false]);
    nMap[0][0][0] = 1;

    while (queue.length) {
      const [x, y, n, breakWall] = queue.pop();

      d.forEach(([dx, dy]) => {
        const [newX, newY] = [x + dx, y + dy];
        const newCell = map?.[newY]?.[newX];
        const newCellN = nMap[breakWall ? 1 : 0]?.[newY]?.[newX];
        const newN = n + 1;
        if (newCell === undefined) return;
        if (newCell === '1' && !breakWall) {
          queue.push([newX, newY, newN, true]);
        } else if (newCell === '0' && newCellN > newN) {
          nMap[breakWall ? 1 : 0][newY][newX] = newN;
          queue.push([newX, newY, newN, breakWall]);
        }
      });
    }
  }
}

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
