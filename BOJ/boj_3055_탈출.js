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

  const [r, c] = splitToNumber(input.shift());
  let D,
    S,
    water = [];
  const map = input.map((row, rowIndex) => {
    const rowArray = [...row];
    const DIndex = row.indexOf('D');
    const SIndex = row.indexOf('S');
    const waterIndex = row.indexOf('*');

    if (DIndex !== -1) D = [rowIndex, DIndex];
    if (SIndex !== -1) {
      S = [rowIndex, SIndex];
      rowArray[SIndex] = '.';
    }
    if (waterIndex !== -1) water.push([rowIndex, waterIndex]);

    return rowArray;
  });

  const drdc = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let result = 'KAKTUS';

  waterBFS();
  BFS();

  console.log(result);

  process.exit();

  function waterBFS() {
    const waterVisited = Array.from({ length: r }, () => new Array(c).fill(false));
    const queue = new Queue();
    water.forEach((water) => {
      waterVisited[water[0]][water[1]] = true;
      map[water[0]][water[1]] = 0;
      queue.push([...water, 0]);
    });

    while (queue.size) {
      const [rowIndex, columnIndex, count] = queue.pop();

      drdc.forEach(([dr, dc]) => {
        const [newR, newC] = [rowIndex + dr, columnIndex + dc];
        if (waterVisited?.[newR]?.[newC] === undefined) return;
        if (waterVisited[newR][newC] === true) return;
        if (map[newR][newC] === 'D') return;
        if (map[newR][newC] === 'X') return;
        map[newR][newC] = count + 1;
        waterVisited[newR][newC] = true;
        queue.push([newR, newC, count + 1]);
      });
    }
  }

  function BFS() {
    const visited = Array.from({ length: r }, () => new Array(c).fill(false));
    visited[S[0]][S[1]] = true;
    const queue = new Queue();
    queue.push([...S, 0]);

    while (queue.size) {
      const [rowIndex, columnIndex, count] = queue.pop();

      if ([rowIndex, columnIndex].every((el, index) => el === D[index])) {
        result = count;
        break;
      }
      drdc.forEach(([dr, dc]) => {
        const [newR, newC] = [rowIndex + dr, columnIndex + dc];
        if (visited?.[newR]?.[newC] === undefined) return;
        if (visited[newR][newC] === true) return;
        if (map[newR][newC] <= count + 1) return;
        if (map[newR][newC] === 'X') return;
        visited[newR][newC] = true;
        queue.push([newR, newC, count + 1]);
      });
    }
  }
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
