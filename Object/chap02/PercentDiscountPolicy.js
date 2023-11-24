import DefaultDiscountPolicy from "./DefaultDiscountPolicy.js";

class PercentDiscountPolicy extends DefaultDiscountPolicy {
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
