class Theater {
  #ticketSeller;

  constructor(ticketSeller) {
    this.#ticketSeller = ticketSeller;
  }

  // 관람객 맞이하기
  enter(audience) {
    if (audience.bag.hasInviation()) {
      const ticket = this.#ticketSeller.ticketOffice.ticket;
      audience.bag.ticket = ticket;
    } else {
      const ticket = this.#ticketSeller.ticketOffice.ticket;
      audience.bag.minusAmount(ticket.fee);
      this.#ticketSeller.ticketOffice.plusAmount(ticket.fee);
      audience.bag.ticket = ticket;
    }
  }
}
