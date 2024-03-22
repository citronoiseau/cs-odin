class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  append(value) {
    if (!this.head) {
      this.head = new Node(value);
    } else {
      let tail = this.getTail();
      tail.next = new Node(value);
    }
  }
  prepend(value) {
    if (!this.head) {
      this.head = new Node(value);
    } else {
      const newNode = new Node(value, this.head);
      this.head = newNode;
    }
  }

  size() {
    let counter = 0;
    let pointer = this.head;
    while (pointer !== null) {
      pointer = pointer.next;
      counter++;
    }
    return counter;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let tail = this.head;
    while (tail.next !== null) {
      tail = tail.next;
    }
    return tail;
  }

  at(index) {
    if (index < 0) {
      throw new Error("Index must be non-negative");
    }
    let counter = 0;
    let pointer = this.head;
    while (pointer !== null && counter < index) {
      pointer = pointer.next;
      counter++;
    }
    if (pointer === null) {
      throw new Error("Index out of range!");
    }
    return pointer;
  }

  pop() {
    if (!this.head) {
      throw new Error("The list is empty!");
    }
    if (this.head.next === null) {
      const popHead = this.head.value;
      this.head = null;
      return popHead;
    }
    let prevNode = this.head;
    let currentNode = this.head.next;
    while (currentNode.next !== null) {
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    const popValue = currentNode.value;
    prevNode.next = null;
    return popValue;
  }

  contains(value) {
    if (!this.head) {
      return false;
    }
    let pointer = this.head;
    while (pointer !== null) {
      if (pointer.value === value) {
        return true;
      }
      pointer = pointer.next;
    }
    return false;
  }

  find(value) {
    if (!this.head) {
      return null;
    }
    let counter = 0;
    let pointer = this.head;
    while (pointer !== null) {
      if (pointer.value === value) {
        return counter;
      }
      counter++;
      pointer = pointer.next;
    }
    return null;
  }

  toString() {
    if (!this.head) {
      return ``;
    }
    let str = ``;
    let pointer = this.head;
    while (pointer !== null) {
      str += `( ${pointer.value} ) -> `;
      pointer = pointer.next;
    }
    str += "null";
    console.log(`Your list: ${str}`);
    return str;
  }

  insertAt(value, index) {
    if (index < 0) {
      throw new Error("Index must be non-negative");
    }
    if (index === 0) {
      this.prepend(value);
      return;
    }
    const checkList = this.size();
    if (index > checkList) {
      this.append(value);
      return;
    }

    let counter = 0;
    let prevNode = this.head;
    let currentNode = this.head.next;

    while (currentNode !== null && counter < index) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      counter++;
    }
    let newNode = new Node(value);
    prevNode.next = newNode;
    newNode.next = currentNode;
  }

  removeAt(index) {
    if (index < 0) {
      throw new Error("Index must be non-negative");
    }

    if (index === 0) {
      if (!this.head) {
        throw new Error("The list is empty!");
      }
      this.head = this.head.next;
      return;
    }
    const checkList = this.size();
    if (index > checkList) {
      this.pop();
      return;
    }

    let counter = 0;
    let prevNode = this.head;
    let currentNode = this.head.next;

    while (currentNode !== null && counter < index) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      counter++;
    }
    let nextNode = currentNode.next;
    prevNode.next = nextNode;
    currentNode = null;
  }
}

//test
// Create a new LinkedList
const list = new LinkedList();

// Test append method
list.append(1);
list.append(2);
list.append(3);
list.toString(); // Output: ( 1 ) -> ( 2 ) -> ( 3 ) -> null

// Test prepend method
list.prepend(0);
list.toString(); // Output: ( 0 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> null

// Test size method
console.log(list.size()); // Output: 4

// Test getHead method
console.log(list.getHead().value); // Output: 0

// Test getTail method
console.log(list.getTail().value); // Output: 3

// Test at method
console.log(list.at(2).value); // Output: 2

// Test pop method
console.log(list.pop()); // Output: 3
list.toString(); // Output: ( 0 ) -> ( 1 ) -> ( 2 ) -> null

// Test contains method
console.log(list.contains(2)); // Output: true
console.log(list.contains(3)); // Output: false

// Test find method
console.log(list.find(1)); // Output: 1

// Test insertAt method
list.insertAt(5, 2);
list.toString(); // Output: ( 0 ) -> ( 1 ) -> ( 5 ) -> ( 2 ) -> null

// Test removeAt method
list.removeAt(2);
list.toString(); // Output: ( 0 ) -> ( 1 ) -> ( 2 ) -> null
