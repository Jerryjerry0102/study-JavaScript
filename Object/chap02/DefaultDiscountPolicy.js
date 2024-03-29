import DiscountPolicy from "./DiscountPolicy.js";
import Money from "./Money.js";

class DefaultDiscountPolicy extends DiscountPolicy {
  #conditions = [];

  constructor(...conditions) {
    super(...conditions);
    this.#conditions = conditions;
  }

  calculateDiscountAmount(screening) {
    if (
      this.#conditions.some((condition) => condition.isSatisfiedBy(screening))
    ) {
      return this.getDiscountAmount(screening);
    }

    return new Money(0);
  }

  getDiscountAmount() {
    // 서브 클래스에서 오버라이딩
  }
}

export default DefaultDiscountPolicy;
