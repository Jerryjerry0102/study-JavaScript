const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");

// dotenv는 최대한 위에서 불러오는 게 좋음
dotenv = config();

const app = express();

app.set("port", process.env.PORT || 3000);

/** morgan */
// 클라이언트에서 어떤 요청이 왔는지 어떤 응답을 보냈는지 서버에 기록 됨
app.use(morgan("dev")); // 개발시
// app.use(morgan("combined")); // 배포시 // ip, browser, 시간까지 자세하게 나옴

/** express 제공 미들웨어 */
/***  express.static() */
// css, js, html, img, png 등 정적 파일 보내주는 부분이 static
// app.use("요청 경로", express.static("실제 경로"));
// ex)
// 요청 경로: localhost:3000/zerocho.html, 실제 경로: 6.2/public-3030/zerocho.html
// 요청 경로: localhost:3000/hello.css, 실제 경로: 6.2/public-3030/hello.html
// + public으로만 폴더 이름을 짓는 것 보다 public-3030으로 이름을 짓는 게 좋음
// static은 정적파일을 찾고 나서는 next가 작동하지 않는다.(일반적인 미들웨어는 next가 알아서 작동됨)
app.use("/", express.static(path.join(__dirname, "public-3030")));
// 아래 두 코드를 해 놓으면 req.on('data', (data) => {}) 이런 거 할 필요 없이
// 알아서 data가 파싱돼서 req.body.name 이렇게 사용할 수 있다.
/*** express.json() */
// json 데이터 파싱
app.use(express.json());
/*** express.urlencoded() */
// form 데이터 파싱,
// extended: true는 querystring을 어떻게 처리할 거냐(true 추천)
app.use(express.urlencoded({ extended: true }));

/** cookie-parser */
// get 요청이 오면 uri 변수들이 파싱되어 req.cookies 객체에 저장된다.
app.use(cookieParser(process.env.COOKIE_SECRET));

/** express-session */
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "connect.sid",
  })
);

// 요청마다 개인의 저장공간을 만들어 줌
// app.get("/", (req, res, next) => {
//   req.session.id = "hello";
// });

app.get("/", (req, res) => {
  /// 쿠키 읽기
  if (req.signedCookies.name) {
    console.log("req.signedCookies: ", req.signedCookies.name); // {mycookie: 'test'}
  } else {
    /// 클라이언트에 저장된 쿠키가 없다면
    // 쿠키 쓰기
    // req.signedCookies; // 서명
    // res.writeHead(200, { "Set-Cookie": "mycookie=test" });
    res.cookie("name", encodeURIComponent(req.query.name), {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      secure: true,
      signed: true,
      path: "/",
    });
  }
  // res.clearCookie("name", encodeURIComponent(req.query.name), {
  //   httpOnly: true,
  //   secure: true,
  //   signed: true,
  //   path: "/",
  // });
  res.sendFile(path.join(__dirname, "cookie.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
