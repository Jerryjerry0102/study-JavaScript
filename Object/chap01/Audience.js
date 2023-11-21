class Audience {
  #bag;

  constructor(bag) {
    this.#bag = bag;
  }

  getBag() {
    return this.#bag;
  }
}

export default Audience;
