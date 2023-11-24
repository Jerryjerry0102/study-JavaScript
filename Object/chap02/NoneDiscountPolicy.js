import DiscountPolicy from "./DiscountPolicy.js";
import Money from "./Money.js";

class NoneDiscountPolicy extends DiscountPolicy {
  getDiscountAmount() {
    return new Money(0);
  }
}

export default NoneDiscountPolicy;
