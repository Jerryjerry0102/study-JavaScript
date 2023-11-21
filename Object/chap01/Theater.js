class Theater {
  #ticketSeller;

  constructor(ticketSeller) {
    this.#ticketSeller = ticketSeller;
  }

  // 관람객 맞이하기
  enter(audience) {
    if (audience.getBag().hasInvitation()) {
      const ticket = this.#ticketSeller.getTicketOffice().getTicket();
      audience.getBag().setTicket(ticket);
    } else {
      const ticket = this.#ticketSeller.getTicketOffice().getTicket();
      audience.getBag().minusAmount(ticket.getFee());
      this.#ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
      audience.getBag().setTicket(ticket);
    }
  }
}

export default Theater;
