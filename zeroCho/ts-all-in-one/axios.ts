// 요청 보내는 라이브러리
// axios 한 번만 배우면 브라우저와 노드 둘 다 요청 보낼 수 있다.

// npm i axios
// axios는 ts가 붙어있었기 때문에 그냥 axios만 다운 받으면 된다.

// 타입분석을 할 때 마지막 줄에 export default가 있는지 확인해야 한다.
// 우리는 타입분석을 아래에서 위로 해야한다.
// export = 이 있으면 commonjs 모델
// export default axios로 되어있기 때문에 그냥 import 해올 수 있다.
// 만약 commonjs 모델이라면
// import axios = require("axios")
// 이렇게 import 해야한다.
// 하지만 commonjs 모델이더라도 esmoduleInterop을 키면
// import axios from "axios"
// 이렇게 es2015 모듈이랑 똑같이 import 할 수 있다.

// fetch는 저수준
// axios = fetch + 여러 기능(XMLHttpRequest기반)
// 브라우저와 노드 같은 api로 하고 싶을 때 편함

// jsonplaceholder 사이트 추천
// api 요청 보내면 응답 보내줌
// 가짜 api 서버 쓸 때 좋음

// 함수를 객체가 상속 받는 게 가능한가
/* 가능
const a = () => {};
a.create = () => {};
a.isAxiosError = () => {};
a.z = "123";

a();
a.create()
a.isAxiosError(); 
a.z
*/

// Axios는 클래스이면서 함수면서 객체
/* 실제 사용 방법이 3개
new axios();
axios();
axios.get();
*/

import axios from "axios";

(async () => {
  try {
    await axios.get("https://jsonplaceholder.typicode.com/posts/1");
  } catch (error) {}
})();
