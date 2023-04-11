const fs = require("fs");
const readStream = fs.createReadStream("./readme3.txt", {
  highWaterMark: 16,
});
const datas = [];
readStream.on("data", (chunk) => {
  datas.push(chunk);
  console.log("data:", chunk, chunk.length);
});
readStream.on("end", () => {
  console.log("end:", Buffer.concat(datas).toString());
});
readStream.on("error", (err) => {
  console.log("error:", err);
});
// 콘솔에 찍어보면 chunk가 한 번에 다 나온다.
// 그래서 readFile과 createReadStream이랑 다른 점이 없어 보인다.
// 그 이유는 createReadStream이 한 번에 읽는 버퍼의 크기가 64키로바이트
// 그런데 현재 우리 데이터의 크기는 162바이트이기 때문에 의미가 없는 것
// createReadStream의 두 번째 인자에 {highWaterMark: 16}를 넣어주고 다시 콘솔을 돌려보면
// 유의미한 결과를 얻을 수 있다.
