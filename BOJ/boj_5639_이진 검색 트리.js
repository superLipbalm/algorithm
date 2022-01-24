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

  const BST = new BinarySearchTree();

  input.forEach((input) => {
    BST.insert(+input);
  });

  BST.printPostOrder();

  process.exit();
})();

class Node {
  constructor(value) {
    this.value = value;
  }
  left = null;
  right = null;
}

class BinarySearchTree {
  root = null;

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (value <= node.value) {
      if (node.left === null) {
        node.left = new Node(value);
        return;
      }
      return this.insertNode(node.left, value);
    } else {
      if (node.right === null) {
        node.right = new Node(value);
        return;
      }
      return this.insertNode(node.right, value);
    }
  }

  printPostOrder() {
    if (this.root === null) return console.log('');
    this.postOrder(this.root);
  }

  postOrder(node) {
    if (node.left !== null) {
      this.postOrder(node.left);
    }

    if (node.right !== null) {
      this.postOrder(node.right);
    }

    console.log(node.value);
  }
}
