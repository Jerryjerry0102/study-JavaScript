const express = require("express");
const path = require("path");

const app = express();

// 서버에 속성를 심는다고 생각하면 쉬움
// 전역 변수같은 느낌
app.set("port", process.env.PORT || 3000);

// 미들웨어 //
// 주소를 정해줄 수도 있다.
// next()를 해줘야지만 다음 걸로 넘어간다
app.use(
  (req, res, next) => {
    console.log("1 요청에 실행하고 싶어요");
    next();
  }
  // (req, res, next) => {
  //   try {
  //     // console.log(dfdf);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
);

// 라우터들
app.get(
  "/",
  (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"));
    next("route");
  },
  // 아래 코드는 건너뜀
  (req, res) => {
    console.log("실행되나요?");
  }
);
app.get("/", (req, res) => {
  console.log("실행되지롱");
});

app.post("/", (req, res) => {
  res.send("hello express!");
});

app.get("/about", (req, res) => {
  res.send("hello express");
});

app.get("/category/Javascript", (req, res) => {
  res.send("hello Javascript");
});

// 와일드카드, 라우트 매개변수 //
// route parameter -> req.params
// 위에서 아래로 실행되기 때문에 와일드 카드는 보통 항상
// 다른 라우터들보다 아래에 위치해야 한다.
app.get("/category/:name", (req, res) => {
  res.send(`hello ${req.params.name}`);
});

// 애스터리스크, 별표 //
// 모든 get 요청에 대해 어떠한 주소든지 다 처리하겠다는 의미
// 이렇게 범위가 넓은 라우터도 다른 미들웨어들보다 밑에 위치해야 한다.
/** 
app.get("*", (req, res) => {
  res.send("hello everybody");
});
*/

// 404처리 미들웨어
app.use((req, res, next) => {
  res.status(404).send("404지롱");
});

// 에러 처리 미들웨어
// 매개변수 4개를 무조건 다 써야 함
app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send("에러났지롱");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
