class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    // 투자 등급
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > vr + chr * 2) return "A";
    else return "B";
  }

  get voyageRisk() {
    // 항해 경로 위험요소
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (["중국", "동인도"].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  get captainHistoryRisk() {
    // 선장의 항해 이력 위험요소
    let result = 1;
    if (this.voyage.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    return Math.max(result, 0);
  }

  get voyageProfitFactor() {
    // 수익 요인
    let result = 2;
    if (this.voyage.zone === "중국") result += 1;
    if (this.voyage.zone === "동인도") result += 1;
    result += this.historyLengthFator;
    result += this.voyageLengthFactor;
    return result;
  }

  get voyageLengthFactor() {
    return this.voyage.length > 14 ? -1 : 0;
  }

  get historyLengthFator() {
    return this.history.length > 8 ? 1 : 0;
  }
}

class ExperienceChinaRating extends Rating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  get voyageProfitFactor() {
    return super.voyageProfitFactor + 3;
  }

  get voyageLengthFactor() {
    let result = 0;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }

  get historyLengthFator() {
    return this.history.length > 10 ? 1 : 0;
  }
}

function rating(voyage, history) {
  return createRating(voyage, history).value;
}

function createRating(voyage, history) {
  if (voyage.zone === "중국" && history.some((v) => "중국" === v.zone)) {
    return new ExperienceChinaRating(voyage, history);
  } else {
    return new Rating(voyage, history);
  }
}

const voyage = { zone: "서인도", length: 10 };
const history = [
  { zone: "동인도", length: 5 },
  { zone: "서인도", length: 15 },
  { zone: "중국", length: -2 },
  { zone: "서아프리카", length: 7 },
];

const myRating = rating(voyage, history);
console.log(myRating);
