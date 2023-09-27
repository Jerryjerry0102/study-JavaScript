// 호출자
if (!aPlan.withinRange(aRoom.daysTempRange))
  alerts.push("방 온도가 지정 범위를 벗어났습니다.");

class HeatingPlan {
  withinRange(aNumberRange) {
    return (
      aNumberRange.low >= this.#temperatureRange.low &&
      aNumberRange.high <= this.#temperatureRange.high
    );
  }
}
