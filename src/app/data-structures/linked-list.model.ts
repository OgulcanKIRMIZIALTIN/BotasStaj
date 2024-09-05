/**
 * Represents a node in the linked list.
 * @template T The type of value stored in the node.
 */
export class ListNode<T> {
  value: T; // Value stored in the node
  next: ListNode<T> | null = null; // Reference to the next node in the list, or null if it is the last node

  /**
   * Creates a new ListNode with the given value.
   * @param value The value to store in the node.
   */
  constructor(value: T) {
    this.value = value;
  }
}

/**
 * Represents a singly linked list.
 * @template T The type of values stored in the list.
 */
export class LinkedList<T> {
  head: ListNode<T> | null = null; // Reference to the first node in the list, or null if the list is empty
  tail: ListNode<T> | null = null; // Reference to the last node in the list, or null if the list is empty

  /**
   * Adds a new value to the end of the list.
   * @param value The value to add to the list.
   */
  add(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      // If the list is empty, the new node becomes both the head and the tail
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, append the new node to the end of the list and update the tail reference
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }

  /**
   * Deletes the first occurrence of a value from the list.
   * @param value The value to delete.
   * @param compareFn A comparison function used to find the value to delete.
   */
  delete(value: T, compareFn: (a: T, b: T) => boolean): void {
    if (!this.head) return; // If the list is empty, do nothing

    // If the value to delete is at the head, update the head reference
    if (compareFn(this.head.value, value)) {
      this.head = this.head.next;
      if (!this.head) this.tail = null; // If the list becomes empty, update the tail reference
      return;
    }

    // Traverse the list to find and delete the node with the matching value
    let current = this.head;
    while (current.next) {
      if (compareFn(current.next.value, value)) {
        current.next = current.next.next;
        if (!current.next) this.tail = current; // Update the tail if necessary
        return;
      }
      current = current.next;
    }
  }

  /**
   * Converts the linked list to an array.
   * @returns An array containing all values from the list.
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  /**
   * Finds the first value in the list that matches the given predicate.
   * @param predicate A function used to test each value.
   * @returns The first value that matches the predicate, or undefined if no match is found.
   */
  find(predicate: (value: T) => boolean): T | undefined {
    let current = this.head;
    while (current) {
      if (predicate(current.value)) return current.value;
      current = current.next;
    }
    return undefined;
  }
}
