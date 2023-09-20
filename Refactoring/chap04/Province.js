import Producer from "./Producer.js";

class Province {
  #name;
  #producers;
  #totalProduction;
  #demand;
  #price;
  constructor(doc) {
    this.#name = doc.name;
    this.#producers = [];
    this.#totalProduction = 0;
    this.#demand = doc.demand;
    this.#price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  addProducer(arg) {
    this.#producers.push(arg);
    this.#totalProduction += arg.production;
  }

  get name() {
    return this.#name;
  }
  get producers() {
    return this.#producers.slice();
  }
  get totalProduction() {
    return this.#totalProduction;
  }
  set totalProduction(arg) {
    this.#totalProduction = arg;
  }
  get demand() {
    return this.#demand;
  }
  set demand(arg) {
    this.#demand = parseInt(arg); // 숫자로 파싱해서 저장
  }
  get price() {
    return this.#price;
  }
  set price(arg) {
    return (this.#price = parseInt(arg)); // 숫자로 파싱해서 저장
  }

  get shortfall() {
    return this.#demand - this.#totalProduction;
  }
  get profit() {
    return this.demandValue - this.demandCost;
  }
  get demandValue() {
    return this.satisfiedDemand * this.#price;
  }
  get satisfiedDemand() {
    return Math.min(this.#demand, this.#totalProduction);
  }
  get demandCost() {
    let remainingDemand = this.#demand;
    let result = 0;
    this.#producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }
}

function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: "Byzantium", cost: 10, production: 9 },
      { name: "Attalia", cost: 12, production: 10 },
      { name: "Sinope", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}
