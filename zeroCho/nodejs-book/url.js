const url = require("url");

// const { URL } = url;
// URL은 노드 내장 객체이기도 해서 require할 필요 없다.
// 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리된다.

const myURL = new URL(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);
console.log("new URL(): ", myURL);
console.log("url.format(): ", url.format(myURL));
