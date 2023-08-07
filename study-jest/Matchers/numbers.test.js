test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThan(3.5);
  expect(value).toBeGreaterThanOrEqual(4);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThan(4.5);
  expect(value).toBeLessThanOrEqual(4);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3); // 반올림 오류(rounding error)로 인한 오류
  expect(value).toBeCloseTo(0.3); // this works
});
