import assert from "node:assert/strict";

function circum(radius) {
  return circumference(radius);
}

function circumference(radius) {
  return 2 * Math.PI * radius;
}

class Book {
  #reservation = [];

  addReservation(customer, isPriority) {
    assert(isPriority === true || isPriority === false);
    this.#reservation.push(customer);
  }
}

const newEnglanders = someCustomers.filter((c) =>
  inNewEngland(c.address.state)
);

function inNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}
