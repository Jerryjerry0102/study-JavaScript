class TicketSeller {
  #ticketoffice;

  constructor(ticketOffice) {
    this.#ticketoffice = ticketOffice;
  }

  get ticketOffice() {
    return this.#ticketoffice;
  }
}
