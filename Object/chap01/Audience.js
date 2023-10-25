class Audience {
  #bag;

  constructor(bag) {
    this.#bag = bag;
  }

  get bag() {
    return this.#bag;
  }
}
