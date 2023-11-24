class Movie {
  #title;
  #runningTime;
  #fee;
  #discountPolicy;

  constructor(title, runningTime, fee, discountPolicy = null) {
    this.#title = title;
    this.#runningTime = runningTime;
    this.#fee = fee;
    this.#discountPolicy = discountPolicy;
  }

  getFee() {
    return this.#fee;
  }

  calculateMovieFee(screening) {
    if (this.#discountPolicy === null) {
      return this.#fee;
    }

    return this.#fee.minus(
      this.#discountPolicy.calculateDiscountAmount(screening)
    );
  }
}

export default Movie;
