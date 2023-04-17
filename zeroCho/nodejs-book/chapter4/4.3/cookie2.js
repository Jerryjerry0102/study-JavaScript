const http = require("http");
const fs = require("fs").promises;
const path = require("path");

// req.headers.cookie하면 문자열이 나오는데
// 문자열은 자바스크립트에서 쓰기 불편
// 아래 함수는 문자열을 객체로 바꿔주는 함수
// ex) "name=jerry" -> { name: 'jerry' }
const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith("/login")) {
      // url 모듈로서 인터넷 주소를 쉽게 조작하도록 도와준다
      const url = new URL(req.url, "http://localhost:8085");
      // searchParams는 쿼리스트링 부분 처리를 도와주는 객체인데
      // 쿼리스트링 부분이 문자열이라 자바스크립트가 다루기 불편한데 이걸 객체로 바꿔주는 객체
      // const { query } = url.parse(req.url);
      // const { name } = qs.decode(query);
      const name = url.searchParams.get("name");
      const expires = new Date();
      // 쿠키 유효 시간을 현재시간 + 5분으로 설정
      expires.setMinutes(expires.getMinutes() + 5);
      // 리다이렉션
      // HttpOnly는 자바스크립트로 쿠키에 접근하지 못하도록(특히 로그인을 위해 사용하는 쿠키에서는 필수!!)
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      });
      res.end();
    }
    // name이라는 쿠키가 있는 경우
    else if (cookies.name) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`${cookies.name}님 안녕하세요`);
    }
    // name이라는 쿠키가 없는 경우
    else {
      try {
        const data = await fs.readFile(path.join(__dirname, "cookie2.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
      }
    }
  })
  .listen(8084, () => {
    console.log("8084번 포트에서 서버 대기 중입니다!");
  });
