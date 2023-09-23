class TelephoneNumber {
  #areaCode;
  #number;

  get aeaCode() {
    return this.#areaCode;
  }
  set aeaCode(arg) {
    this.#areaCode = arg;
  }
  get number() {
    return this.#number;
  }
  set number(arg) {
    this.#number = arg;
  }
  toString() {
    return `(${this.#areaCode}) ${this.#number}`;
  }
}

class Person {
  #name;
  #telephoneNumber;
  constructor() {
    this.#telephoneNumber = new TelephoneNumber();
  }

  get name() {
    return this.#name;
  }
  set name(arg) {
    this.#name = arg;
  }
  get telephoneNumber() {
    return this.#telephoneNumber.toString();
  }
  get officeAreaCode() {
    return this.#telephoneNumber.aeaCode;
  }
  set officeAreaCode(arg) {
    this.#telephoneNumber.aeaCode = arg;
  }
  get officeNumber() {
    return this.#telephoneNumber.number;
  }
  set officeNumber(arg) {
    this.#telephoneNumber.number = arg;
  }
}
