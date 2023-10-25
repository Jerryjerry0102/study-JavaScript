class TicketSeller {
  #ticketoffice;

  constructor(ticketOffice) {
    this.#ticketoffice = ticketOffice;
  }

  sellTo(audience) {
    this.#ticketoffice.plusAmount(audience.buy(this.#ticketoffice.ticket));
  }
}
