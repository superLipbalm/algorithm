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

function solution() {
  input.shift();
  const result = [];
  const queue = new Queue();

  input
    .map((input) => input.split(' '))
    .forEach(([command, value]) => {
      switch (command) {
        case 'push':
          queue.push(value);
          break;
        case 'pop':
          result.push(queue.pop());
          break;
        case 'size':
          result.push(queue.size);
          break;
        case 'empty':
          result.push(queue.isEmpty ? 1 : 0);
          break;
        case 'front':
          result.push(queue.front);
          break;
        case 'back':
          result.push(queue.back);
          break;
      }
    });

  return result.join('\n');
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
