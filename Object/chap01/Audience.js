class Audience {
  #bag;

  constructor(bag) {
    this.#bag = bag;
  }

  buy(ticket) {
    return this.#bag.hold(ticket);
  }
}
