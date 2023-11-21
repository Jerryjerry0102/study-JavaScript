class Ticket {
  #fee;

  constructor(fee) {
    this.#fee = fee;
  }

  getFee() {
    return this.#fee;
  }
}

export default Ticket;
