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

  test("shortfall", () => {
    const asia = new Province(sampleProvinceData()); // 1. 픽스처 설정
    expect(asia.shortfall).toBe(5); // 2. 검증
  });
});
