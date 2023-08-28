class ExpiryDateCalculator {
  calculateExpiryDate(payData) {
    let addedMonths =
      payData.payAmount === 100000 ? 12 : payData.payAmount / 10000;
    if (payData.firstBillingDate !== null) {
      return this.#expiryDateUsingFirstBillingDate(payData, addedMonths);
    }
    return this.#addMonth(payData.billingDate, addedMonths);
  }

  #expiryDateUsingFirstBillingDate(payData, addedMonths) {
    addedMonths +=
      payData.billingDate.getMonth() - payData.firstBillingDate.getMonth();
    return this.#addMonth(payData.firstBillingDate, addedMonths);
  }

  #addMonth(date, month = 1) {
    let addMonthFirstDate = new Date(
      date.getFullYear(),
      date.getMonth() + month,
      1
    );

    let addMonthLastDate = new Date(
      addMonthFirstDate.getFullYear(),
      addMonthFirstDate.getMonth() + 1,
      0
    );

    let result = addMonthFirstDate;
    if (date.getDate() > addMonthLastDate.getDate()) {
      result.setDate(addMonthLastDate.getDate());
    } else {
      result.setDate(date.getDate());
    }

    return result;
  }
}

module.exports = ExpiryDateCalculator;
