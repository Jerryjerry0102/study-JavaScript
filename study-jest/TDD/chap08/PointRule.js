const Grade = require("./Grade");

class PointRule {
  calculate(s, p, now) {
    let point = 0;
    if (s.isFinished(now)) {
      point += p.defaultPoint;
    } else {
      point += p.defaultPoint + 10;
    }
    if (s.grade === Grade.GOLD) {
      point += 100;
    }
    return point;
  }
}

module.exports = PointRule;
