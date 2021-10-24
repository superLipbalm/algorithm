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
