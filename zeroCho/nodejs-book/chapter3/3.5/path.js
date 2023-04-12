const path = require("path");

console.log(path.join(__dirname, "var.js"));
// /github/study-JavaScript/zeroCho/nodejs-book/var.js

console.log(path.join(__dirname, "..", "/var.js"));
// /github/study-JavaScript/zeroCho/var.js
// join은 절대경로를 무시함

console.log(path.resolve(__dirname, "..", "/var.js"));
// /var.js
// resolve는 절대경로가 있으면 무조건 절대경로로 감
