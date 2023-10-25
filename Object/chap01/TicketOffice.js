class TicketOffice {
  #amount = 0;
  #tickets = [];

  constructor(amount, tickets) {
    this.#amount = amount;
    this.#tickets = tickets;
  }

  get tickets() {
    return this.#tickets.shift();
  }

  minusAmount(amount) {
    this.#amount -= amount;
  }

  plusAmount(amount) {
    this.#amount += amount;
  }
}
