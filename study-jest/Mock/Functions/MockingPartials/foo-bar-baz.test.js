const { foo, bar, baz } = require("./foo-bar-baz");

jest.mock("./foo-bar-baz", () => {
  const originalModule = jest.requireActual("./foo-bar-baz");

  // Mock the default export and named export 'foo'
  return {
    ...originalModule,
    baz: jest.fn(() => "mocked baz"),
    foo: "mocked foo",
  };
});

test("should do a partial mock", () => {
  const bazResult = baz();
  expect(baz).toHaveReturnedWith("mocked baz");
  expect(bazResult).toBe("mocked baz");
  expect(baz).toHaveBeenCalled();

  expect(foo).toBe("mocked foo");
  expect(bar()).toBe("bar");
});
