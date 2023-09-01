const app = require("./app");
// 예시들은 진부하지만 math.js의 함수들이 복잡한 계산을 하거나
// 개발자가 피하고 싶은 IO를 만드는 요청이라고 상상하하고 하자.
const math = require("./math");

describe(" jest.fn으로 Mocking 하기", () => {
  math.add = jest.fn();
  math.subtract = jest.fn();

  test("calls math.add", () => {
    app.doAdd(1, 2);
    expect(app.doAdd(1, 2)).toBeUndefined();
    expect(math.add).toHaveBeenCalledWith(1, 2);
  });

  test("calls math.subtract", () => {
    app.doSubtract(1, 2);
    expect(math.subtract).toHaveBeenCalledWith(1, 2);
  });
});

// 이렇게 Mocking하는 방식은 몇 가지 이유로 덜 쓰인다.
// 1. jest.mock은 자동적으로 모듈의 모든 함수를 Mocking 해준다.
// 2. jest.spyOn도 마찬가지로 모든 함수를 Mocking 해주면서 원래의 함수를 다시 복원할 수도 있다.
