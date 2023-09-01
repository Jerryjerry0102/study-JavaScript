function drinkAll(callback, flavour) {
  if (flavour !== "octopus") {
    callback(flavour);
  }
}

describe("drinkAll", () => {
  test("drinks something lemon-flavoured", () => {
    const drink = jest.fn();
    drinkAll(drink, "lemon");
    expect(drink).toHaveBeenCalled();
  });

  test("does not drink something octopus-flavoured", () => {
    const drink = jest.fn();
    drinkAll(drink, "octopus");
    expect(drink).not.toHaveBeenCalled();
  });
});

function drinkEach(callback, array) {
  array.forEach((flavor) => callback(flavor));
}

test("drinkEach drinks each drink", () => {
  const drink = jest.fn();
  drinkEach(drink, ["lemon", "octopus"]);
  expect(drink).toHaveBeenCalledTimes(2);
});

let beverages = [];

function register(beverage) {
  beverages.push(beverage);
}

function applyToAll(callback) {
  beverages.forEach((beverage) => callback(beverage));
}

test("registration applies correctly to orange La Croix", () => {
  const beverage = "orange";
  const beverage2 = "melon";
  register(beverage);
  register(beverage2);
  const f = jest.fn();
  applyToAll(f);
  expect(f).toHaveBeenCalledWith("orange");
});

test("applying to all flavors does mango last", () => {
  register("orange");
  register("melon");
  register("mango");
  const f = jest.fn();
  applyToAll(f);
  expect(f).toHaveBeenLastCalledWith("mango");
});

test("drinkEach drinks each drink", () => {
  const drink = jest.fn();
  drinkEach(drink, ["lemon", "octopus", "mango"]);
  expect(drink).toHaveBeenNthCalledWith(1, "lemon");
  expect(drink).toHaveBeenNthCalledWith(2, "octopus");
  expect(drink).toHaveBeenNthCalledWith(3, "mango");
});
