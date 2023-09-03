const PointRule = require("./PointRule");
const Times = require("./Times");

class UserPointCalculator {
  #times = new Times(); // 기본 구현을 사용
  #pointRule = new PointRule();
  #subscriptionDao;
  #productDao;

  constructor(subscriptionDao, productDao) {
    this.#subscriptionDao = subscriptionDao;
    this.#productDao = productDao;
  }

  set times(times) {
    this.#times = times;
  }

  set pointRule(pointRule) {
    this.#pointRule = pointRule;
  }

  calculatePoint(u) {
    const s = this.#subscriptionDao.selectByUser(u.id);
    if (s === null) throw new Error("No subscription");
    const p = this.#productDao.selectById(s.productId);
    const now = this.#times.today();

    return this.#pointRule.calculate(s, p, now);
  }
}
