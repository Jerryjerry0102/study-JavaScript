import DefaultDiscountPolicy from "./DefaultDiscountPolicy.js";

class AmountDiscountPolicy extends DefaultDiscountPolicy {
  #discountAmount;

  constructor(discountAmount, ...conditions) {
    super(...conditions);
    this.#discountAmount = discountAmount;
  }

  getDiscountAmount() {
    return this.#discountAmount;
  }
}

export default AmountDiscountPolicy;
