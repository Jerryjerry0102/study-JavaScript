const fs = require("fs").promises;

/** async - await */
async function main() {
  let data = await fs.readFile("./readme.txt");
  console.log("1번", data.toString());
  data = await fs.readFile("./readme.txt");
  console.log("2번", data.toString());
  data = await fs.readFile("./readme.txt");
  console.log("3번", data.toString());
  data = await fs.readFile("./readme.txt");
  console.log("4번", data.toString());
}
main();

/** promise then catch */
// fs.readFile("./readme.txt")
//   .then((data) => {
//     console.log("1번", data.toString());
//     return fs.readFile("./readme.txt");
//   })
//   .then((data) => {
//     console.log("2번", data.toString());
//     return fs.readFile("./readme.txt");
//   })
//   .then((data) => {
//     console.log("3번", data.toString());
//     return fs.readFile("./readme.txt");
//   })
//   .then((data) => {
//     console.log("4번", data.toString());
//   })
//   .catch((err) => {
//     throw err;
//   });

// 콜백헬 해결
// 순서 보장
