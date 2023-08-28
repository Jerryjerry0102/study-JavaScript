const ExpiryDateCalculator = require("../main/ExpiryDateCalculator");
const PayDataBuilder = require("../main/PayData");

describe("ExpiryDateCalculatorTest", () => {
  test("만원 납부하면 한달 뒤가 만료일이 됨", () => {
    assertExpiryDate(
      new PayDataBuilder()
        .setBillingDate(new Date(2019, 2, 1))
        .setPayAmount(10000)
        .build(),
      new Date(2019, 3, 1)
    );
    assertExpiryDate(
      new PayDataBuilder()
        .setBillingDate(new Date(2019, 4, 5))
        .setPayAmount(10000)
        .build(),
      new Date(2019, 5, 5)
    );
  });

  test("납부일과 한달 뒤 일자가 같지 않음", () => {
    assertExpiryDate(
      new PayDataBuilder()
        .setBillingDate(new Date(2019, 0, 31))
        .setPayAmount(10000)
        .build(),
      new Date(2019, 1, 28)
    );
    assertExpiryDate(
      new PayDataBuilder()
        .setBillingDate(new Date(2019, 4, 31))
        .setPayAmount(10000)
        .build(),
      new Date(2019, 5, 30)
    );
    assertExpiryDate(
      new PayDataBuilder()
        .setBillingDate(new Date(2020, 0, 31))
        .setPayAmount(10000)
        .build(),
      new Date(2020, 1, 29)
    );
  });

  test("첫 납부일과 만료일 일자가 다를 때 만 원 납부하면 첫 납부일을 기준으로 다음 만료일 정함", () => {
    assertExpiryDate(
      new PayDataBuilder()
        .setFirstBillingDate(new Date(2019, 0, 31))
        .setBillingDate(new Date(2019, 1, 28))
        .setPayAmount(10000)
        .build(),
      new Date(2019, 2, 31)
    );
    assertExpiryDate(
      new PayDataBuilder()
        .setFirstBillingDate(new Date(2019, 0, 30))
        .setBillingDate(new Date(2019, 1, 28))
        .setPayAmount(10000)
        .build(),
      new Date(2019, 2, 30)
    );
    assertExpiryDate(
      new PayDataBuilder()
        .setFirstBillingDate(new Date(2019, 4, 31))
        .setBillingDate(new Date(2019, 5, 30))
        .setPayAmount(10000)
        .build(),
      new Date(2019, 6, 31)
    );
  });

  test("이 만원 이상 납부하면 비례해서 만료일 계산", () => {
    assertExpiryDate(
      new PayDataBuilder()
        .setBillingDate(new Date(2019, 2, 1))
        .setPayAmount(20000)
        .build(),
      new Date(2019, 4, 1)
    );
    assertExpiryDate(
      new PayDataBuilder()
        .setBillingDate(new Date(2019, 2, 1))
        .setPayAmount(30000)
        .build(),
      new Date(2019, 5, 1)
    );
  });

  test("첫 납부일과 만료일 일자가 다를 때 이만원 이상 납부", () => {
    assertExpiryDate(
      new PayDataBuilder()
        .setFirstBillingDate(new Date(2019, 0, 31))
        .setBillingDate(new Date(2019, 1, 28))
        .setPayAmount(20000)
        .build(),
      new Date(2019, 3, 30)
    );
    assertExpiryDate(
      new PayDataBuilder()
        .setFirstBillingDate(new Date(2019, 2, 31))
        .setBillingDate(new Date(2019, 3, 30))
        .setPayAmount(30000)
        .build(),
      new Date(2019, 6, 31)
    );
  });

  test("십만원을 납부하면 서비스 1년 제공", () => {
    assertExpiryDate(
      new PayDataBuilder()
        .setBillingDate(new Date(2019, 0, 28))
        .setPayAmount(100000)
        .build(),
      new Date(2020, 0, 28)
    );
  });

  const assertExpiryDate = (payData, expectedExpiryDate) => {
    const cal = new ExpiryDateCalculator();
    const expiryDate = cal.calculateExpiryDate(payData).toLocaleDateString();
    expect(expiryDate).toBe(expectedExpiryDate.toLocaleDateString());
  };
});
