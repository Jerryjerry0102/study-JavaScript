class RecurringSchedule {
  #subject; // 주제
  #dayOfWeek; // 요일
  #from; // 시작 시간
  #duration; // 기간

  constructor(subject, dayOfWeek, from, duration) {
    this.#subject = subject;
    this.#dayOfWeek = dayOfWeek;
    this.#from = from;
    this.#duration = duration;
  }

  getDayOfWeek() {
    return this.#dayOfWeek;
  }

  getFrom() {
    return this.#from;
  }

  getDuration() {
    return this.#duration;
  }
}

export default RecurringSchedule;
