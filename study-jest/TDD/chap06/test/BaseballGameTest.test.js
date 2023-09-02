const BaseballGame = require("../main/BaseballGame");

describe("BaseballGameTest", () => {
  test("정답 숫자를 설정할 때 동일한 숫자가 존재하면 에러 발생", () => {
    expect(() => new BaseballGame("110")).toThrow();
    expect(() => BaseballGame.validate("133")).toThrow();
  });
});
