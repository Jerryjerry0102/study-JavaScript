class TicketOffice {
  #amount = 0; // 판매 금액
  #tickets = []; // 판매하거나 교환해 줄 티켓의 목록

  constructor(amount, tickets) {
    this.#amount = amount;
    this.#tickets = tickets;
  }

  getTicket() {
    return this.#tickets.shift();
  }

  minusAmount(amount) {
    this.#amount -= amount;
  }

  plusAmount(amount) {
    this.#amount += amount;
  }
}

export default TicketOffice;
