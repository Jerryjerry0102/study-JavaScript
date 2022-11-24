// myapp/index.js
const arr = [1, 2, 3];

arr.forEach(console.log);

/**
 * 브라우저에 알림창을 띄우는 alert 함수는
 * 브라우저에서만 동작하는 클라이언트 사이트 Web API다.
 * 즉, alert 함수는 브라우저 환경에서만 유효하다.
 * 즉, alert 함수를 Node.js 환경에서는 알 수 없기 때문에 에러가 발생
 */

arr.forEach(alert);

// 지금은 브라우저 환경과 Node.js 환경 모두에서 실행 가능한 ECMAScript 표준 빌트인 함수와
// 브라우저 환경에서만 실행 가능한 클라이언트 사이트 Web API 구분 어려움
// 지금은 클라이언트 사이트 Web API는 Node.js 환경에서 실행할 수 없다는 것에 주목
