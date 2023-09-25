import assert from "node:assert/strict";

class Person {
  #telephoneNumber;
  constructor() {
    this.#telephoneNumber = new TelephoneNumber();
  }

  get officeAreaCode() {
    return this.#telephoneNumber.areaCode;
  }
  set officeAreaCode(arg) {
    this.#telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
  }
  get officeNumber() {
    return this.#telephoneNumber.number;
  }
  set officeNumber(arg) {
    this.#telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
}

class TelephoneNumber {
  #areaCode;
  #number;
  constructor(areaCode, number) {
    this.#areaCode = areaCode;
    this.#number = number;
  }

  get areaCode() {
    return this.#areaCode;
  }
  get number() {
    return this.#number;
  }

  equals(other) {
    if (!(other instanceof TelephoneNumber)) return false;
    return this.areaCode === other.areaCode && this.number === other.number;
  }
}

assert(
  new TelephoneNumber("312", "555-0142").equals(
    new TelephoneNumber("312", "555-0142")
  )
);
