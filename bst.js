const mergeSort = require("./mergeSort");

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  buildTree(array) {
    this.root = this.buildTreeRecursive(array, 0, array.length - 1);
  }

  buildTreeRecursive(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let node = new Node(array[mid]);
    node.left = this.buildTreeRecursive(array, start, mid - 1);
    node.right = this.buildTreeRecursive(array, mid + 1, end);
    return node;
  }

  insert(value) {
    this.root = this.insertRecursive(this.root, value);
  }

  insertRecursive(node, value) {
    if (!node) {
      return new Node(value);
    }

    if (value < node.value) {
      node.left = this.insertRecursive(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertRecursive(node.right, value);
    }
    return node;
  }

  deleteItem(value) {
    this.root = this.deleteItemRecursive(this.root, value);
  }

  deleteItemRecursive(node, value) {
    if (!node) {
      return node;
    }

    if (node.value > value) {
      node.left = this.deleteItemRecursive(node.left, value);
      return node;
    } else if (node.value < value) {
      node.right = this.deleteItemRecursive(node.right, value);
      return node;
    }

    if (!node.left) {
      let temp = node.right;
      node = null;
      return temp;
    } else if (!node.right) {
      let temp = node.left;
      node = null;
      return temp;
    } else {
      let succParent = node;
      let succ = node.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }
      node.value = succ.value;
      if (succParent !== node) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }
      return node;
    }
  }

  find(value) {
    return this.findRecursive(this.root, value);
  }

  findRecursive(root, value) {
    if (!root) {
      return null;
    }
    if (value < root.value) {
      return this.findRecursive(root.left, value);
    } else if (value > root.value) {
      return this.findRecursive(root.right, value);
    } else {
      return root;
    }
  }

  levelOrder(root = this.root, queue = [], values = []) {
    if (!root) {
      return [];
    }
    queue.push(root);

    while (queue.length) {
      let currentNode = queue.shift();
      values.push(currentNode.value);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    return values;
  }
  //left, root, right
  inOrder(root = this.root, values = []) {
    if (!root) {
      return;
    }
    this.inOrder(root.left, values);
    values.push(root.value);
    this.inOrder(root.right, values);
    return values;
  }

  //root, left, right
  preOrder(root = this.root, values = []) {
    if (!root) {
      return;
    }
    values.push(root.value);
    this.preOrder(root.left, values);
    this.preOrder(root.right, values);
    return values;
  }

  //left, right, root
  postOrder(root = this.root, values = []) {
    if (!root) {
      return;
    }
    this.preOrder(root.left, values);
    this.preOrder(root.right, values);
    values.push(root.value);
    return values;
  }

  height(root = this.root) {
    if (!root) {
      return 0;
    }

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }

  depth(node, root = this.root, depth = 0) {
    if (!root || !node) {
      return depth;
    }
    if (node.value === root.value) {
      return depth;
    }
    if (node.value < root.value) {
      return this.depth(node, root.left, (depth += 1));
    } else {
      return this.depth(node, root.right, (depth += 1));
    }
  }

  isBalanced(root = this.root) {
    if (!root) {
      return true;
    }

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    const difference = Math.abs(leftHeight - rightHeight);
    if (difference < 1) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    const preparedArr = this.inOrder();
    const sortedArray = prepareSortedArray(preparedArr);
    this.buildTree(sortedArray);
  }
}

const dataArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function prepareSortedArray(array) {
  const sortedArr = mergeSort(array);
  const clearArr = Array.from(new Set(sortedArr));
  return clearArr;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

//driver
function generateRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function generateRandomArray(length) {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    randomArray.push(generateRandomNumber());
  }
  return randomArray;
}
const randomArray = generateRandomArray(40);
console.log(randomArray);

const newTree = new Tree();
newTree.buildTree(randomArray);
console.log(newTree.isBalanced());

console.log(newTree.preOrder());
console.log(newTree.postOrder());
console.log(newTree.inOrder());

const undalancedArray = generateRandomArray(120);
function unbalanceTree(array) {
  array.forEach((number) => newTree.insert(number));
}
unbalanceTree(undalancedArray);
console.log(newTree.isBalanced());
newTree.rebalance();
console.log(newTree.isBalanced());

console.log(newTree.preOrder());
console.log(newTree.postOrder());
console.log(newTree.inOrder());
