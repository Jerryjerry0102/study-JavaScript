/**
 * finally 메소드
 * 만약 어떤 작업이 성공하든 실패하든 상관없이
 * 그러니까 프로미스 객체가 fulfilled 상태가 되든 rejected 상태가 되든 상관없이
 * 항상 실행하고 싶은 콜백이 있을 때 finally 메소드로 등록하면 된다.
 * finally 메소드 안의 콜백은 작업 성공 결과나 작업 실패 정보가 필요하지 않기 때문에
 * 파라미터가 필요하지 않다.
 */
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => {
    console.log(error);
    throw new Error("from catch method");
  })
  .finally(() => console.log("exit"));

// finally는 정상적인 경우든 최악의 경우든 상관없이
// 항상 무조건 실행해야하는 코드가 있을 때 사용한다.
// finally 메소드는 catch 메소드 바로 뒤에 쓴다.

/**
 * finally 메소드를 사용해야 하는 경우
 * isLoading 변수는
 * 현재 사용자의 리퀘스트에 대한 처리가 이루어지고 있고,
 * 로딩 아이콘이 화면에서 나타나있는지 여부를 나타냄
 */
let isLoading = true;

/* ..다른 코드들 */

const url = "https://jsonplaceholder.typicode.com/users";
// const url = 'https://www.google.com';

fetch(url)
  .then((response) => {
    const contentType = response.headers.get("content-type");
    if (contentType.includes("application/json")) {
      return response.json();
    }
    throw new Error("response is not json data");
  })
  .then((result) => {
    // 리스폰스 처리
    console.log(result);
  })
  .catch((error) => {
    // 에러 처리
    console.log(error);
  })
  .finally(() => {
    isLoading = false;
    console.log(isLoading);
  });

/* ..다른 코드들 */
