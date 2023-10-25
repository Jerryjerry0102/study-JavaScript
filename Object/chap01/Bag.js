class Bag {
  #amount; // 현금
  #invitation; // 초대장
  #ticket; // 티켓
  constructor(amount, invitation = null) {
    this.#amount = amount;
    this.#invitation = invitation;
  }

  hold(ticket) {
    if (this.#hasInvitation()) {
      this.#setTicket(ticket);
      return 0;
    } else {
      this.#setTicket(ticket);
      this.#minusAmount(ticket.fee);
      return ticket.fee;
    }
  }

  // 초대장 보유 여부
  #hasInvitation() {
    return this.#invitation !== null;
  }

  // 티켓 소유 여부
  hasTicket() {
    return this.#ticket !== null;
  }

  // 초대장을 티켓으로 교환
  #setTicket(ticket) {
    this.#ticket = ticket;
  }

  #minusAmount(amount) {
    this.#amount -= amount;
  }

  plusAmount(amount) {
    this.#amount += amount;
  }
}
