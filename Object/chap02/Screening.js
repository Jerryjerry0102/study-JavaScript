import Reservation from "./Reservation.js";
import Time from "./Time.js";

class Screening {
  #movie; // 상영할 영화
  #sequence; // 순번
  #whenScreened; // 상영 시작 시간

  constructor(movie, sequence, whenScreened) {
    this.#movie = movie;
    this.#sequence = sequence;
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
    return this.#movie.calculateMovieFee(this).times(audienceCount);
  }

  getDay() {
    return this.#whenScreened.getDay();
  }

  getStartTime() {
    return new Time(
      this.#whenScreened.getHours(),
      this.#whenScreened.getMinutes()
    );
  }

  isSequence(sequence) {
    return this.#sequence === sequence;
  }

  getMovieFee() {
    return this.#movie.getFee();
  }
}

export default Screening;
