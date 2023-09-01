const app = require("./app");
// 예시들은 진부하지만 math.js의 함수들이 복잡한 계산을 하거나
// 개발자가 피하고 싶은 IO를 만드는 요청이라고 상상하하고 하자.
const math = require("./math");

describe("jest.spyOn으로 Spy 혹은 Mocking 하기", () => {
  test("calls math.add", () => {
    const addMock = jest.spyOn(math, "add");

    // calls the original implementation
    expect(app.doAdd(1, 2)).toEqual(3);

    // and the spy stores the calls to add
    expect(addMock).toHaveBeenCalledWith(1, 2);
    expect(math.add).toHaveBeenCalledWith(1, 2);

    // override the implementation
    addMock.mockImplementation(() => "mock");
    expect(app.doAdd(1, 2)).toEqual("mock");

    // restore the original implementation
    addMock.mockRestore();
    expect(app.doAdd(1, 2)).toEqual(3);
  });
});

// jest.spyOn은 기본적으로 jest.fn의 사용에 대한 Syntatic Sugar라는 것이 키포인트이다.
// 우리는 기존의 구현을 저장하고, Mocking 했다가, 기존 구현을 재할당하는 방식으로 똑같은 목표를 달성할 수 있다.

test("jest.spyOn이 구현된 방식", () => {
  // store the original implementation
  const originalAdd = math.add;

  // mock add with the original implementation
  math.add = jest.fn(originalAdd);

  // spy the calls to add
  expect(app.doAdd(1, 2)).toEqual(3);
  expect(math.add).toHaveBeenCalledWith(1, 2);

  // override the implementation
  math.add.mockImplementation(() => "mock");
  expect(app.doAdd(1, 2)).toEqual("mock");
  expect(math.add).toHaveBeenCalledWith(1, 2);

  // restore the original implementation
  math.add = originalAdd;
  expect(app.doAdd(1, 2)).toEqual(3);
});
