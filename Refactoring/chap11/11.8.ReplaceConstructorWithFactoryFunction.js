class Employee {
  #name;
  #typeCode;
  constructor(name, typeCode) {
    this.#name = name;
    this.#typeCode = typeCode;
  }

  get name() {
    return this.#name;
  }
  get type() {
    return Employee.legalTypeCodes[this.#typeCode];
  }
  static get legalTypeCodes() {
    return { E: "Engineer", M: "Manager", S: "Salesperson" };
  }
}

// 최상위...
function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}
function createEngineer(name) {
  return new Employee(name, "E");
}

// 호출자...
candidate = createEmployee(document.name, document.empType);

const leadEngineer = createEngineer(document.leadEngineer);
