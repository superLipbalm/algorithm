// shift, push 등 배열 메소드이용하면 시간초과!

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

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  #size = 0;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }

    this.tail = newNode;
    this.#size++;
  }

  getHead() {
    return this.head.value;
  }

  removeHead() {
    if (this.size === 0) return;
    this.head = this.head.next;
    this.head.prev = null;
    this.#size--;
  }

  get size() {
    return this.#size;
  }
}

function solution() {
  const n = +input[0];
  const cards = new LinkedList();

  for (let i = 1; i <= n; i++) {
    cards.add(i);
  }

  while (cards.size > 1) {
    cards.removeHead();
    cards.add(cards.getHead());
    cards.removeHead();
  }

  return cards.getHead();
}
