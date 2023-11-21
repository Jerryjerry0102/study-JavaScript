class Bag {
  #amount = 0; // 현금
  #invitation = null; // 초대장
  #ticket = null; // 티켓

  constructor(amount, invitation = null) {
    this.#amount = amount;
    this.#invitation = invitation;
  }

  // 초대장 보유 여부
  hasInvitation() {
    return this.#invitation !== null;
  }

  // 티켓 소유 여부
  hasTicket() {
    return this.#ticket !== null;
  }

  // 초대장을 티켓으로 교환
  setTicket(ticket) {
    this.#ticket = ticket;
  }

  minusAmount(amount) {
    this.#amount -= amount;
  }

  plusAmount(amount) {
    this.#amount += amount;
  }
}

export default Bag;
