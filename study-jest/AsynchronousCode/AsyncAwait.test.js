const fetchData = require("./fetchData");

test("the data is peanut butter", async () => {
  const data = await fetchData(true);
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchData(false);
  } catch (e) {
    expect(e).toMatch("error");
  }
});

test("the data is peanut butter", async () => {
  await expect(fetchData(true)).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  await expect(fetchData(false)).rejects.toMatch("error");
});
