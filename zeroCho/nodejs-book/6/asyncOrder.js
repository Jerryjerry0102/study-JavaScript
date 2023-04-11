const fs = require("fs");

fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("1번", data.toString());
  fs.readFile("./readme.txt", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("2번", data.toString());
    fs.readFile("./readme.txt", (err, data) => {
      if (err) {
        throw err;
      }
      console.log("3번", data.toString());
      fs.readFile("./readme.txt", (err, data) => {
        if (err) {
          throw err;
        }
        console.log("4번", data.toString());
      });
    });
  });
});

// 순서가 보장됨
// 근데 이게 무슨 동기랑 뭐가 다르죠?
// asyncOder라는 파일 자체를 여러번 실행하는 경우 다 백그라운드로 넘어가기 때문에 의미 있음

// + 콜백지옥!
