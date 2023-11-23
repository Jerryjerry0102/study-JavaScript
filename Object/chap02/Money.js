class Money {
  #amount;

  constructor(amount) {
    this.#amount = amount;
  }

  plus(amount) {
    return new Money(this.#amount + amount);
  }

  minus(amount) {
    return new Money(this.#amount - amount);
  }

  times(percent) {
    return new Money(this.#amount * percent);
  }

  isLessThan(other) {
    return this.#amount < other;
  }

  isGreaterThanOrEqual(other) {
    return this.#amount > other;
  }
}

export default Money;
