class Audience {
  #bag;

  constructor(bag) {
    this.#bag = bag;
  }

  buy(ticket) {
    if (this.#bag.hasInvitation()) {
      this.#bag.ticket = ticket;
      return 0;
    } else {
      this.#bag.ticket = ticket;
      this.#bag.minusAmount(ticket.fee);
      return ticket.fee;
    }
  }
}
