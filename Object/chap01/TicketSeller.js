class TicketSeller {
  #ticketoffice;

  constructor(ticketOffice) {
    this.#ticketoffice = ticketOffice;
  }

  sellTo(audience) {
    if (audience.bag.hasInviation()) {
      const ticket = this.#ticketoffice.ticket;
      audience.bag.ticket = ticket;
    } else {
      const ticket = this.#ticketOffice.ticket;
      audience.bag.minusAmount(ticket.fee);
      this.#ticketOffice.plusAmount(ticket.fee);
      audience.bag.ticket = ticket;
    }
  }
}
