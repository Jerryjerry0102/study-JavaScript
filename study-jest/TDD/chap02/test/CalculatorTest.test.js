const Calculator = require("../main/Calculator");

describe("CalculatorTest", () => {
  test("plus", () => {
    const result = Calculator.plus(1, 2);
    expect(result).toBe(3);
    expect(Calculator.plus(4, 1)).toBe(5);
  });
});
