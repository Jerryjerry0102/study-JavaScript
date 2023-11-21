class TicketSeller {
  #ticketoffice;

  constructor(ticketOffice) {
    this.#ticketoffice = ticketOffice;
  }

  getTicketOffice() {
    return this.#ticketoffice;
  }
}

export default TicketSeller;
