import Time from "./Time.js";

class Event {
  #subject; // 주제
  #from; // 시작 일시
  #duration; // 소요 시간

  constructor(subject, from, duration) {
    this.#subject = subject;
    this.#from = from;
    this.#duration = duration;
  }

  isSatisfied(schedule) {
    if (
      this.#from.getDay() !== schedule.getDayOfWeek() ||
      !this.#getTime().equals(schedule.getFrom())
    ) {
      return false;
    }

    return true;
  }

  reschedule(schedule) {
    this.#from.setDate(this.#from.getDate() + this.#daysDistance(schedule));
    this.#from.setHours(schedule.getFrom().getHours());
    this.#from.setMinutes(schedule.getFrom().getMinutes());
    this.#duration = schedule.getDuration();
  }

  #daysDistance(schedule) {
    return schedule.getDayOfWeek() - this.#from.getDay();
  }

  #getTime() {
    return new Time(this.#from.getHours(), this.#from.getMinutes());
  }
}

export default Event;
