class PayData {
  #firstBillingDate;
  #billingDate;
  #payAmount;
  constructor(firstBillingDate = null, billingDate, payAmount) {
    this.#firstBillingDate = firstBillingDate;
    this.#billingDate = billingDate;
    this.#payAmount = payAmount;
  }
  get firstBillingDate() {
    return this.#firstBillingDate;
  }
  get billingDate() {
    return this.#billingDate;
  }
  get payAmount() {
    return this.#payAmount;
  }
}

class PayDataBuilder {
  #firstBillingDate;
  #billingDate;
  #payAmount;
  setFirstBillingDate(firstBillingDate) {
    this.#firstBillingDate = firstBillingDate;
    return this;
  }
  setBillingDate(billingDate) {
    this.#billingDate = billingDate;
    return this;
  }
  setPayAmount(payAmount) {
    this.#payAmount = payAmount;
    return this;
  }
  build() {
    return new PayData(
      this.#firstBillingDate,
      this.#billingDate,
      this.#payAmount
    );
  }
}

module.exports = PayDataBuilder;
