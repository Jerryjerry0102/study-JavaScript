let repositoryData;

export function initailize() {
  repositoryData = {};
  repositoryData.customers = new Map();
}

export function registerCustomer(id) {
  if (!repositoryData.customers.has(id))
    repositoryData.customers.set(id, new Customer(id));
  return findCustomer(id);
}

export function findCustomer(id) {
  return repositoryData.customers.get(id);
}

class Order {
  #number;
  #customer;
  constructor(data) {
    this.#number = data.number;
    this.#customer = registerCustomer(data.customer); // data.customer가 고객 ID임
    // 다른 데이터를 읽어 들인다.
  }

  get customer() {
    return this.#customer;
  }
}

class Customer {
  #id;
  constructor(id) {
    this.#id = id;
  }

  get id() {
    return this.#id;
  }
}

initailize();
new Order({ number: 1, customer: 12 });
console.log(repositoryData);
