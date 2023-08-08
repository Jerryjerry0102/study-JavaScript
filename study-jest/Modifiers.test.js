const fetchData = require("./AsynchronousCode/fetchData");

function bestFlavor() {
  return "grapefruit";
}

// .not
test("the best flavor is grapefruit", () => {
  expect(bestFlavor()).not.toBe("coconut");
});

// .resolves
test("the data is peanut butter", () => {
  return expect(fetchData(true)).resolves.toBe("peanut butter");
});
test("resolves to lemon", () => {
  // make sure to add a return statement
  return expect(Promise.resolve("lemon")).resolves.toBe("lemon");
});
test("resolves to lemon", async () => {
  await expect(Promise.resolve("lemon")).resolves.toBe("lemon");
  await expect(Promise.resolve("lemon")).resolves.not.toBe("octopus");
});

// .rejects
test("the fetch fails with an error", () => {
  return expect(fetchData(false)).rejects.toMatch("error");
});
test("rejects to octopus", () => {
  // make sure to add a return statement
  return expect(Promise.reject(new Error("octopus"))).rejects.toThrow(
    "octopus"
  );
});
test("rejects to octopus", async () => {
  await expect(Promise.reject(new Error("octopus"))).rejects.toThrow("octopus");
});
