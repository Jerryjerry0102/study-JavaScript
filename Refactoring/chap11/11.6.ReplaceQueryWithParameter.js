class HeatingPlan {
  #max;
  #min;

  targetTemperature(selectedTemperature) {
    if (selectedTemperature > this.#max) return this.#max;
    else if (selectedTemperature < this.#min) return this.#min;
    else return selectedTemperature;
  }
}

// 호출자
if (
  thePlan.targetTemperature(thermostat.selectedTemperature) >
  thermostat.currentTemperature
)
  setToHeat();
else if (
  thePlan.targetTemperature(thermostat.selectedTemperature) <
  thermostat.currentTemperature
)
  setToCool();
else setOff();
