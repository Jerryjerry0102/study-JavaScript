class BaseballGame {
  #answer;
  constructor(answer) {
    BaseballGame.validate(answer);
    this.#answer = answer;
  }
  guess(number) {
    const score = new Score();
    if (this.#answer === number) score.strikes = 3;
    return score;
  }
  static validate(answer) {
    for (let i = 0; i < answer.length; i++) {
      const set = new Set(answer);
      if (set.size !== answer.length) throw new Error();
    }
  }
}

class Score {
  #strikes = 0;
  #balls = 0;
  get strikes() {
    return this.#strikes;
  }
  set strikes(number) {
    this.#strikes = number;
  }
  get balls() {
    return this.#balls;
  }
  set balls(number) {
    this.#balls = number;
  }
}

module.exports = BaseballGame;
