import DiscountPolicy from "./DiscountPolicy.js";

class PercentDiscountPolicy extends DiscountPolicy {
  #percent;

  constructor(percent, ...conditions) {
    super(...conditions);
    this.#percent = percent;
  }

  getDiscountAmount(screening) {
    return screening.getMovieFee().times(this.#percent);
  }
}

export default PercentDiscountPolicy;
