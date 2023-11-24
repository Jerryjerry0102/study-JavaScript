class Time {
  #time;

  constructor(hours, minutes) {
    this.#time = { hours, minutes };
  }

  getHours() {
    return this.#time.hours;
  }

  getMinutes() {
    return this.#time.minutes;
  }

  isFasterThanOrEqualTo(other) {
    return (
      this.#time.hours < other.getHours() ||
      (this.#time.hours === other.getHours() &&
        this.#time.minutes <= other.getMinutes())
    );
  }
}

export default Time;
