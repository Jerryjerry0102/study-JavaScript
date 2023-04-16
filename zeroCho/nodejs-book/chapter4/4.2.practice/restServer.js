const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const users = {};

http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET") {
        console.log("method: GET");
        if (req.url === "/") {
          console.log("/");
          const data = await fs.readFile(
            path.join(__dirname, "restFront.html")
          );
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/about") {
          console.log("url: /about");
          const data = await fs.readFile(path.join(__dirname, "about.html"));
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/users") {
          console.log("url: /users");
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          return res.end(JSON.stringify(users));
        }
        try {
          console.log(req.url);
          const data = await fs.readFile(path.join(__dirname, req.url));
          return res.end(data);
        } catch (err) {
          console.log(err);
        }
      } else if (req.method === "POST") {
        console.log("method: POST 요청");
        if (req.url === "/user") {
          console.log("url: /user");
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("POST 본문(body):", body);
            const { name } = JSON.parse(body);
            const key = Date.now();
            users[key] = name;
            res.writeHead(201, { "Content-Type": "text/plain, charset=utf-8" });
            res.end("등록 성공");
          });
        }
      } else if (req.method === "PUT") {
        console.log("method: PUT 요청");
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("PUT 본문(body):", body);
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end(JSON.stringify(users));
          });
        }
      } else if (req.method === "DELETE") {
        console.log("method: DELETE 요청");
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          delete users[key];
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        }
      }
      res.writeHead(404);
      return res.end("NOT FOUND");
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utr-8" });
      res.end(err.message);
    }
  })
  .listen(8083, () => {
    console.log("8083번 포트에서 서버 대기 중");
  });
