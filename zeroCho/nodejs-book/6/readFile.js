// 방법 1
// const fs = require("fs");
// const util = require("util");

// 방법 2
const fs = require("fs").promises;

// 노드에서는 콜백이 항상 (error, data) => {} 순으로 간다
// fs.readFile("./readme.txt", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
//   // Buffer는 컴퓨터가 다루는 0101010 이런 데이터
//   console.log(data.toString());
// });

// 프로미스를 지원하게 하고 싶을 때
// 방법1 -> util.promisify()
// const readFilePromise = util.promisify(fs.readFile);
// readFilePromise("./readme.txt")
//   .then((data) => {
//     console.log(data);
//     console.log(data.toString());
//   })
//   .catch((err) => {
//     throw err;
//   });

// 방법2(더 좋음) -> fs에서는 더 좋은 방법 제공
// async await도 사용 가능
fs.readFile("./readme.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });
