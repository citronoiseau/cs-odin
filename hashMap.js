class Node {
  constructor(key = null, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.array = new Array(16).fill(null);
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    if (hashCode < 0 || hashCode >= this.array.length) {
      hashCode = hashCode % this.array.length;
    }

    return hashCode;
  }

  set(key, value) {
    const loadFactor = this.length() / this.array.length;

    if (loadFactor > this.loadFactor) {
      this.resize();
    }

    const index = this.hash(key);
    const newNode = new Node(key, value);

    if (!this.array[index]) {
      this.array[index] = newNode;
    } else {
      let tail = this.array[index];
      while (tail.next !== null) {
        if (tail.key === key) {
          tail.value = value;
          return;
        }
        tail = tail.next;
      }

      tail.next = newNode;
    }
  }
  get(key) {
    const index = this.hash(key);
    let current = this.array[index];
    if (!current) {
      return null;
    }
    while (current !== null) {
      if (current.key === key) {
        return current.value;
      }

      current = current.next;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    let current = this.array[index];
    if (!current) {
      return false;
    }
    while (current !== null) {
      if (current.key === key) {
        return true;
      }

      current = current.next;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    let current = this.array[index];
    if (!current) {
      return null;
    }
    if (current.key === key) {
      this.array[index] = current.next;
      const removedValue = current.value;
      current = null;
      return removedValue;
    }

    let prevNode = current;
    let currentNode = current.next;

    while (currentNode !== null) {
      if (currentNode.key === key) {
        prevNode.next = currentNode.next;
        const removedValue = currentNode.value;
        currentNode = null;
        return removedValue;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    return null;
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.array.length; i++) {
      let current = this.array[i];
      while (current !== null) {
        count++;
        current = current.next;
      }
    }
    return count;
  }

  clear() {
    for (let i = 0; i < this.array.length; i++) {
      this.array[i] = null;
    }
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== null) {
        let current = this.array[i];
        while (current !== null) {
          keys.push(current.key);
          current = current.next;
        }
      }
    }
    return keys;
  }
  values() {
    let values = [];
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== null) {
        let current = this.array[i];
        while (current !== null) {
          values.push(current.value);
          current = current.next;
        }
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== null) {
        let current = this.array[i];
        while (current !== null) {
          entries.push([current.key, current.value]);
          current = current.next;
        }
      }
    }
    return entries;
  }

  resize() {
    const newCapacity = this.array.length * 2;
    const newArray = new Array(newCapacity).fill(null);

    for (let i = 0; i < this.array.length; i++) {
      let current = this.array[i];
      while (current !== null) {
        const newIndex = this.hash(current.key) % newCapacity;
        if (!newArray[newIndex]) {
          newArray[newIndex] = new Node(current.key, current.value);
        } else {
          let newNode = new Node(current.key, current.value);
          let tail = newArray[newIndex];

          while (tail.next !== null) {
            tail = tail.next;
          }

          tail.next = newNode;
        }

        current = current.next;
      }
    }
    this.array = newArray;
  }
}

//tests
const hashMap = new HashMap();
// Test the set method
hashMap.set("key1", "value1");
hashMap.set("key2", "value2");
hashMap.set("key3", "value3");
hashMap.set("key3", "value5");
// Test the get method
console.log(hashMap.get("key1")); // Output: "value1"
console.log(hashMap.get("key2")); // Output: "value2"
console.log(hashMap.get("key4")); // Output: null (key not found)
// Test the has method
console.log(hashMap.has("key1")); // Output: true
console.log(hashMap.has("key4")); // Output: false
// Test the keys method
console.log(hashMap.keys());
// Test the values method
console.log(hashMap.values());
// Test the entries method
console.log(hashMap.entries());
// Test the remove method
console.log(hashMap.remove("key1")); // Output: "value1" (removed value)
console.log(hashMap.remove("key4")); // Output: null (key not found)
// Test the length method
console.log(hashMap.length()); // Output: 2 (number of key-value pairs)
// Test the clear method
hashMap.clear();
console.log(hashMap.length()); // Output: 0 (HashMap is cleared)
// Test the entries method
console.log(hashMap.entries()); // Output: [] (no entries in an empty HashMap)
