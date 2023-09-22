class Reading {
  #customer;
  #quantity;
  #month;
  #year;
  constructor(data) {
    this.#customer = data.customer;
    this.#quantity = data.quantity;
    this.#month = data.month;
    this.#year = data.year;
  }

  get customer() {
    return this.#customer;
  }
  get quantity() {
    return this.#quantity;
  }
  get month() {
    return this.#month;
  }
  get year() {
    return this.#year;
  }

  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
  get taxableCharge() {
    return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
  }
}

const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;
