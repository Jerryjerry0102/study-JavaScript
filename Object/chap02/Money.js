class Money {
  #amount;

  constructor(amount) {
    this.#amount = amount;
  }

  getAmount() {
    return this.#amount;
  }

  plus(amount) {
    return new Money(this.#amount + amount.getAmount());
  }

  minus(amount) {
    return new Money(this.#amount - amount.getAmount());
  }

  times(percent) {
    return new Money(this.#amount * percent);
  }

  isLessThan(other) {
    return this.#amount < other.getAmount();
  }

  isGreaterThanOrEqual(other) {
    return this.#amount > other.getAmount();
  }
}

export default Money;
