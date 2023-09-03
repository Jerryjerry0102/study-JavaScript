const PaySync = require("./PaySync");

describe("someTest", () => {
  const paySync = new PaySync();
  paySync.filePath = "./readme.csv";

  paySync.sync();

  // ...결과 검증
  test("", () => {});
});
