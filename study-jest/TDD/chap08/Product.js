class Product {
  #defaultPoint;

  get defaultPoint() {
    return this.#defaultPoint;
  }
  set defaultPoint(defaultPoint) {
    this.#defaultPoint = defaultPoint;
  }
}

module.exports = Product;
