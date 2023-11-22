class TicketSeller {
  #ticketoffice;

  constructor(ticketOffice) {
    this.#ticketoffice = ticketOffice;
  }

  sellTo(audience) {
    this.#ticketoffice.sellTicketTo(audience);
  }
}

export default TicketSeller;
