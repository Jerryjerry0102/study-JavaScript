import DiscountPolicy from "./DiscountPolicy.js";

class AmountDiscountPolicy extends DiscountPolicy {
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
