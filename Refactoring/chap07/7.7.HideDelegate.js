class Person {
  #name;
  #department;
  constructor(name) {
    this.#name = name;
  }
  get name() {
    return this.#name;
  }
  set department(arg) {
    this.#department = arg;
  }
  get manager() {
    return this.#department.manager;
  }
}

class Department {
  #chargeCode;
  #manager;
  get chargeCode() {
    return this.#chargeCode;
  }
  set chargeCode(arg) {
    this.#chargeCode = arg;
  }
  get manager() {
    return this.#manager;
  }
  set manager(arg) {
    this.#manager = arg;
  }
}

manager = aPerson.manager;
