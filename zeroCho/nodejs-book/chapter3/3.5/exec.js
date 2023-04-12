// child_process는 노드 프로세스가 아닌 다른 프로세스를 하나 더 띠운다.
const exec = require("child_process").exec;

// exec을 하면 터미널을 하나 띠워서 dir이라는 명령어를 치는 거랑 비슷하다.
// var process = exec("dir");
// 위 코드로 하든 아래 코드로 하든 다 안 되는데 어쩔 수 없지
// 중요한 부분 아닌데 너무 시간 끌지 말자
var process = exec("cmd /c chcp 65001>nul && dir");

// 거기에 나오는 데이터들을 콘솔로 출력할 수 있게 해주는 코드
process.stdout.on("data", function (data) {
  console.log(data.toString());
});

// 만약 에러가 나오면 그것도 콘솔에 출력할 수 있게 해주는 노드
process.stderr.on("data", function (data) {
  console.error(data.toString());
});
