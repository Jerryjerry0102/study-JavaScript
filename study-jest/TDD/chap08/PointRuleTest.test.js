const Grade = require("./Grade");
const PointRule = require("./PointRule");
const Product = require("./Product");
const Subscription = require("./Subscription");

describe("PointRuleTest", () => {
  test("만료전 GOLD 등급은 130포인트", () => {
    const rule = new PointRule();
    const s = new Subscription(new Date(2019, 4, 5), Grade.GOLD);
    const p = new Product();
    p.defaultPoint = 20;

    const point = rule.calculate(s, p, new Date(2019, 4, 1));

    expect(point).toBe(130);
  });
});
