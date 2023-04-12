const fs = require("fs");

fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("1번", data.toString());
});
fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("2번", data.toString());
});
fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("3번", data.toString());
});
fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("4번", data.toString());
});
// 랜덤으로 나옴. 순서 보장이 안 됨
