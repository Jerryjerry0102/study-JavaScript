class Movie {
  #title;
  #runningTime;
  #fee;

  constructor(title, runningTime, fee) {
    this.#title = title;
    this.#runningTime = runningTime;
    this.#fee = fee;
  }

  getFee() {
    return this.#fee;
  }
}

export default Movie;
