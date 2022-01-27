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
  const nodeMap = {};

  input.forEach((input) => {
    const [root, left, right] = input.split(' ');
    if (!(root in nodeMap)) nodeMap[root] = new Node(root);
    if (left !== '.') {
      if (!(left in nodeMap)) nodeMap[left] = new Node(left);
      nodeMap[root].left = nodeMap[left];
    }

    if (right !== '.') {
      if (!(right in nodeMap)) nodeMap[right] = new Node(right);
      nodeMap[root].right = nodeMap[right];
    }
  });

  console.log(preorder(nodeMap['A'], []).join(''));
  console.log(inorder(nodeMap['A'], []).join(''));
  console.log(postorder(nodeMap['A'], []).join(''));

  process.exit();

  function preorder(node, result) {
    result = [...result, node.name];
    if (node.left !== null) result = preorder(node.left, [...result]);
    if (node.right !== null) result = preorder(node.right, [...result]);

    return result;
  }

  function inorder(node, result) {
    if (node.left !== null) result = inorder(node.left, [...result]);
    result = [...result, node.name];
    if (node.right !== null) result = inorder(node.right, [...result]);

    return result;
  }

  function postorder(node, result) {
    if (node.left !== null) result = postorder(node.left, [...result]);
    if (node.right !== null) result = postorder(node.right, [...result]);
    result = [...result, node.name];

    return result;
  }
})();

class Node {
  left = null;
  right = null;
  constructor(name) {
    this.name = name;
  }
}
