const app = require("./app");
// 예시들은 진부하지만 math.js의 함수들이 복잡한 계산을 하거나
// 개발자가 피하고 싶은 IO를 만드는 요청이라고 상상하하고 하자.
const math = require("./math");

// Set all module functions to jest.fn
jest.mock("./math.js");

describe("jest.mock으로 Mocking 하기", () => {
  test("calls math.add", () => {
    app.doAdd(1, 2);
    expect(app.doAdd(1, 2)).toBeUndefined();
    expect(math.add).toHaveBeenCalledWith(1, 2);
  });

  test("calls math.subtract", () => {
    app.doSubtract(1, 2);
    expect(math.subtract).toHaveBeenCalledWith(1, 2);
  });

  test("calls math.divide", () => {
    app.doDivide(1, 2);
    expect(math.divide).toHaveBeenCalledWith(1, 2);
  });
});

// 이것은 가장 쉽고 일반적인 Mocking 방법이다.(Jest의 automock: true 설정 방식이기도 하다)
// 이 전략의 유일한 단점은 모듈의 원래 구현에 접근하기 어렵다는 것이다. 이런 경우를 대비해 spyOn이 있다.
