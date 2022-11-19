/** Promise 객체 등장(ES6에 추가) 이유
 * 1. callback hell 문제 해결을 위해
 * 2. 비동기 작업 처리에 관한 좀 더 세밀한 처리를 자바스크립트 문법 단에서 해결하기 위해
 *  (1) pending, fulfilled, rejected 상태
 *  (2) 작업 성공 결과 및 작업 실패 정보(이유)
 *  (3) then, catch, finally 메소드 등과 같은 비동기 작업에 관한 보다 정교한 설계
 */

function removeUnnecessaryInfo(users) {
  const processedUserList = users.map((user) => {
    const keys = Object.keys(user);
    const processedUser = {};
    keys.forEach((key) => {
      if (key === "name" || key === "email") {
        processedUser[key] = user[key];
      }
    });
    return processedUser;
  });
  // 프로미스 객체를 직접 생성하는 코드
  const p = new Promise((resolve) => {
    setTimeout(() => {
      resolve(processedUserList);
    }, 1000);
  });
  return p;
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((result) => removeUnnecessaryInfo(result))
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("This job will be done by server soon!");
  });
