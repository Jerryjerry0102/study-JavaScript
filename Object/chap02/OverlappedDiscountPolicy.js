import DiscountPolicy from "./DiscountPolicy.js";
import Money from "./Money.js";

class OverlappedDiscountPolicy extends DiscountPolicy {
  #discountPolicies = [];

  constructor(...discountPolicies) {
    super();
    this.#discountPolicies = discountPolicies;
  }

  calculateDiscountAmount(screening) {
    let result = new Money(0);
    this.#discountPolicies.forEach((discountPolicy) => {
      result = result.plus(discountPolicy.calculateDiscountAmount(screening));
    });
    return result;
  }
}

export default OverlappedDiscountPolicy;
