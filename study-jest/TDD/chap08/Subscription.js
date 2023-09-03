class Subscription {
  #expiryDate;

  constructor(expiryDate, grade) {
    this.#expiryDate = expiryDate;
    this.grade = grade;
  }

  isFinished(now) {
    if (this.#expiryDate < now) {
      return true;
    }
    return false;
  }
}

module.exports = Subscription;
