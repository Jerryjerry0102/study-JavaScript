class Reservation {
  #customer;
  #screening;
  #fee;
  #audienceCount;

  constructor(customer, screening, fee, audienceCount) {
    console.log(fee.getAmount());
    this.#customer = customer;
    this.#screening = screening;
    this.#fee = fee;
    this.#audienceCount = audienceCount;
  }
}

export default Reservation;
