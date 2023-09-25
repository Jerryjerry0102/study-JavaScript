import assert from "node:assert/strict";

class Account {
  #number;
  #type;
  constructor(number, type, interestRate) {
    this.#number = number;
    this.#type = type;
  }

  get interestRate() {
    return this.#type.interestRate;
  }
}

class AccountType {
  #name;
  #interestRate;
  constructor(nameString, interestRate) {
    this.#name = nameString;
    this.#interestRate = interestRate;
  }

  get interestRate() {
    return this.#interestRate;
  }
}
