const fs = require("fs");
const PayInfoDao = require("./PayInfoDao");
const PayInfo = require("./PayInfo");
const path = require("path");

class PaySync {
  #payInfoDao = new PayInfoDao();
  #filePath = "./readme.csv";

  set payInfoDao(payInfoDao) {
    this.#payInfoDao = payInfoDao;
  }

  set filePath(filePath) {
    this.#filePath = filePath;
  }

  sync() {
    const csvPath = path.join(__dirname, this.#filePath);
    const csv = fs.readFileSync(csvPath, "utf-8");
    const payInfos = [];
    const lines = csv.split("\n");
    for (const line of lines) {
      const data = line.split(",");
      const payInfo = new PayInfo(data[0], data[1], parseInt(data[2]));
      payInfos.push(payInfo);
    }
    payInfos.forEach((pi) => this.#payInfoDao.insert(pi));
  }
}

module.exports = PaySync;
