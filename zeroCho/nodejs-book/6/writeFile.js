const fs = require("fs").promises;

// 쓰기와 읽기를 함께 할 수도 있다.
fs.writeFile("./writeme.txt", "글이 입력됩니다. 파일이 생성됩니다.")
  .then(() => {
    return fs.readFile("./writeme.txt");
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });
