class PeriodCondition {
  #dayOfWeek; // 요일
  #startTime; // 시작 시간
  #endTime; // 종료 시간

  constructor(dayOfWeek, startTime, endTime) {
    this.#dayOfWeek = dayOfWeek;
    this.#startTime = startTime;
    this.#endTime = endTime;
  }

  isSatisfiedBy(screening) {
    return (
      screening.getDay() === this.#dayOfWeek &&
      this.#startTime.isFasterThanOrEqualTo(screening.getStartTime()) &&
      !this.#endTime.isFasterThanOrEqualTo(screening.getStartTime())
    );
  }
}

export default PeriodCondition;
