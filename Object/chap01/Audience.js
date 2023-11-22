class Audience {
  #bag;

  constructor(bag) {
    this.#bag = bag;
  }

  buy(ticket) {
    if (this.#bag.hasInvitation()) {
      this.#bag.setTicket(ticket);
      return 0;
    } else {
      this.#bag.minusAmount(ticket.getFee());
      this.#bag.setTicket(ticket);
      return ticket.getFee();
    }
  }
}

export default Audience;
