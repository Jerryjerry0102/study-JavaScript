import Reservation from "./Reservation.js";

class Screening {
  #movie; // 상영할 영화
  #sequence; // 순번
  #whenScreened; // 상영 시작 시간

  constructor(movie, sequence, whenScreened) {
    this.#movie = movie;
    this.#sequence = sequence; // 순번
    this.#whenScreened = whenScreened;
  }

  reserve(customer, audienceCount) {
    new Reservation(
      customer,
      this,
      this.#calculateFee(audienceCount),
      audienceCount
    );
  }

  #calculateFee(audienceCount) {
    return this.#movie.getFee().times(audienceCount);
  }

  getStartTime() {
    return this.#whenScreened;
  }

  isSequence(sequence) {
    return this.#sequence === sequence;
  }

  getMovieFee() {
    return this.#movie.getFee();
  }
}

export default Screening;
