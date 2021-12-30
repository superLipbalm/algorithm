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
  const result = [];
  const RED = 1;
  const BLACK = -1;
  const NONE = 0;

  while (input.length) {
    const [v, e] = splitToNumber(input.shift());
    const graph = {};
    for (let i = 1; i <= v; i++) {
      graph[i] = [];
    }
    input.splice(0, e).forEach((edge) => {
      const [n1, n2] = splitToNumber(edge);
      graph[n1].push(n2);
      graph[n2].push(n1);
    });
    const colorMap = new Array(v + 1).fill(NONE);
    let isBipartite = true;

    for (let i = 1; i <= v; i++) {
      if (!isBipartite) break;
      if (colorMap[i] !== NONE) continue;
      checkBipartite(i, RED);
    }

    result.push(isBipartite ? 'YES' : 'NO');

    function checkBipartite(start, color) {
      const queue = new Queue();
      queue.push(start);
      colorMap[start] = color;

      while (queue.size) {
        const n1 = queue.pop();
        const color1 = colorMap[n1];

        graph[n1].forEach((n2) => {
          if (colorMap[n2] === NONE) {
            colorMap[n2] = -color1;
            queue.push(n2);
          } else if (color1 === colorMap[n2]) {
            isBipartite = false;
            return;
          }
        });
      }
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
