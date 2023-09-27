import assert from "node:assert/strict";

class Customer {
  #discountRate;

  get discountRate() {
    return this.#discountRate;
  }

  set discountRate(aNumber) {
    assert(null === aNumber || aNumber >= 0);
    this.#discountRate = aNumber;
  }

  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else return aNumber - this.discountRate * aNumber;
  }
}
