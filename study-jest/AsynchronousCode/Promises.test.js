const fetchData = require("./fetchData");

test("the data is peanut butter", () => {
  return fetchData(true).then((data) => {
    expect(data).toBe("peanut butter");
  });
});

test("the fetch fails with an error", () => {
  expect.assertions(1);
  return fetchData(false).catch((e) => expect(e).toMatch("error"));
});
