class Shipment {
  #shippingCompay;
  #trackingNumber;

  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
  get shippingCompany() {
    return this.#shippingCompay;
  }
  set shippingCompany(arg) {
    this.#shippingCompay = arg;
  }
  get trackingNumber() {
    return this.#trackingNumber;
  }
  set trackingNumber(arg) {
    this.#trackingNumber = arg;
  }
}

aShipment.shippingCompany = request.vendor;
