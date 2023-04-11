const fs = require("fs");

let data = fs.readFileSync("./readme.txt");
console.log("1번", data.toString());
data = fs.readFileSync("./readme.txt");
console.log("2번", data.toString());
data = fs.readFileSync("./readme.txt");
console.log("3번", data.toString());
data = fs.readFileSync("./readme.txt");
console.log("4번", data.toString());
// 순서대로 나옴
// 하지만 동시에 돌릴 수 없어서 매우 비효율적
