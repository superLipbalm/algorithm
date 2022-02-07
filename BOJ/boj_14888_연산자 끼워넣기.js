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

  const n = +input[0];
  const numbers = splitToNumber(input[1]);
  const operators = splitToNumber(input[2]);
  const queue = new Queue();
  queue.push({ result: numbers[0], index: 0, operators: [...operators] });
  let max = -Infinity;
  let min = Infinity;

  while (queue.size) {
    const {
      result,
      index,
      operators: [add, sub, mul, div],
    } = queue.pop();

    if (index === numbers.length - 1) {
      max = Math.max(result, max);
      min = Math.min(result, min);
      continue;
    }

    if (add > 0) {
      queue.push({
        result: result + numbers[index + 1],
        index: index + 1,
        operators: [add - 1, sub, mul, div],
      });
    }
    if (sub > 0) {
      queue.push({
        result: result - numbers[index + 1],
        index: index + 1,
        operators: [add, sub - 1, mul, div],
      });
    }
    if (mul > 0) {
      queue.push({
        result: result * numbers[index + 1],
        index: index + 1,
        operators: [add, sub, mul - 1, div],
      });
    }
    if (div > 0) {
      let nextResult;
      if (result < 0 && numbers[index + 1] > 0) {
        nextResult = -Math.floor(-result / numbers[index + 1]);
      } else {
        nextResult = Math.floor(result / numbers[index + 1]);
      }
      queue.push({
        result: nextResult,
        index: index + 1,
        operators: [add, sub, mul, div - 1],
      });
    }
  }

  console.log(max === 0 ? 0 : max);
  console.log(min === 0 ? 0 : min);

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
