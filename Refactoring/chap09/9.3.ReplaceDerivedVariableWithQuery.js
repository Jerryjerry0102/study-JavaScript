class ProductionPlan1 {
  #adjustments = [];

  get production() {
    return this.#adjustments.reduce((sum, a) => sum + a.amount, 0);
  }

  applyAdjustment(anAdjustment) {
    this.#adjustments.push(anAdjustment);
  }
}

class ProductionPlan2 {
  #initialProduction;
  #adjustments;
  constructor(production) {
    this.#initialProduction = production;
    this.#adjustments = [];
  }

  get production() {
    return this.#initialProduction + this.calculatedProductionAccumulator;
  }

  get calculatedProductionAccumulator() {
    return this.#adjustments.reduce((sum, a) => sum + a.amount, 0);
  }

  applyAdjustment(anAdjustment) {
    this.#adjustments.push(anAdjustment);
  }
}
