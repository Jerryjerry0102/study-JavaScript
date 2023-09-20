const Province = require("./Province.js");

describe("province", () => {
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

  let asia;
  beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });
  test("shortfall", () => {
    expect(asia.shortfall).toBe(5);
  });
  test("profit", () => {
    expect(asia.profit).toBe(230);
  });
});
