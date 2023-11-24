import Money from "./Money.js";

class NoneDiscountPolicy {
  calculateDiscountAmount() {
    return new Money(0);
  }
}

export default NoneDiscountPolicy;
