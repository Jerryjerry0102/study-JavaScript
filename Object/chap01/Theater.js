class Theater {
  #ticketSeller;

  constructor(ticketSeller) {
    this.#ticketSeller = ticketSeller;
  }

  // 관람객 맞이하기
  enter(audience) {
    this.#ticketSeller.sellTo(audience);
  }
}
