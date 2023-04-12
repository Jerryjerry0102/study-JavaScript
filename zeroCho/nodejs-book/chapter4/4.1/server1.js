const http = require("http");

// 서버도 프로그램이기 때문에 노드가 이걸 실행하는 순간
// 서버를 프로세스로 올려줘야 한다.
// 프로세스로 올릴 때는 포트를 하나 잡는다.
// 포트 하나가 하나의 프로그램
const server = http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node!</h1>");
    res.write("<p>Hello server</p>");
    res.end("<p>Hello ZeroCho</p>");
  })
  .listen(8080);

server.on("listening", () => {
  console.log("8080번 포트에서 서버 대기 중입니다.");
});
server.on("error", (error) => {
  console.log(error);
});
