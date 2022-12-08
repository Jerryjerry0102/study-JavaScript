const Referee = require("../src/domain/Referee");

test("3 스트라이크", () => {
  const referee = new Referee();
  const result = referee.compare([1, 2, 3], [1, 2, 3]);
  expect(result).toBe("0 볼 3 스트라이크");
  // toBe, toEqual 이 맞는 거 같음
});

test("낫싱", () => {
  const referee = new Referee();
  const result = referee.compare([1, 2, 3], [4, 5, 6]);
  expect(result).toEqual("낫싱");
});

test("3 볼", () => {
  const referee = new Referee();
  const result = referee.compare([1, 2, 3], [2, 3, 1]);
  expect(result).toEqual("3 볼 0 스트라이크");
});
