class Customer {
  #name;
  #contract;
  constructor(name, discountRate) {
    this.#name = name;
    this.#contract = new CustomerContract(dateToday());
    this.#discountRate = discountRate;
  }

  get #discountRate() {
    return this.#contract.discountRate;
  }
  set #discountRate(aNumber) {
    this.#contract.discountRate = aNumber;
  }
  becomePreferred() {
    this.#discountRate += 0.03;
    // 다른 멋진 일들
  }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.#discountRate));
  }
}

class CustomerContract {
  #startDate;
  #discountRate;
  constructor(startDate, discountRate) {
    this.#startDate = startDate;
    this.#discountRate = discountRate;
  }

  get discountRate() {
    return this.#discountRate;
  }
  set discountRate(arg) {
    this.#discountRate = arg;
  }
}

new Customer("jerry", 0.03);
