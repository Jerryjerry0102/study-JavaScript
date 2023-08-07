test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test("undefined", () => {
  const u = undefined;
  expect(u).not.toBeNull();
  expect(u).not.toBeDefined();
  expect(u).toBeUndefined();
  expect(u).not.toBeTruthy();
  expect(u).toBeFalsy();
});
