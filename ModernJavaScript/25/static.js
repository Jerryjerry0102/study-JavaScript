class Person {
  static #count = 0;

  static getCount() {
    return this.#count;
  }

  constructor() {
    this.constructor.#incrementCount();
  }

  static #incrementCount() {
    this.#count++;
  }
}

const person1 = new Person();
const person2 = new Person();
const person3 = new Person();

console.log(Person.getCount()); // 2
