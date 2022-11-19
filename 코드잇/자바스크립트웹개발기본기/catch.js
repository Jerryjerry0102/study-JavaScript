/**
 * 프로미스 객체가 rejected 상태가 될 때 실행하고 싶은 콜백은
 * then 메소드의 두 번째 파라미터로 넣으면 된다.
 * 그런데 다른 방법도 있다. catch 메소드 사용!
 */

// 이건 then 메소드의 두 번째 파라미터를 사용한 방법
fetch("https://jsonplaceholder.typicode.com/users")
  .then(
    (response) => response.text(),
    (error) => console.log(error)
  )
  .then((result) => console.log(result));

// 이건 catch 메소드를 사용한 방법
// 사실 이 catch 메소드는 then 메소드를 변형한 것에 불과하다.
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.text())
  .catch((error) => console.log(error)) // 아래와 동일한 의미
  // .then(undefined, (error) => { console.log(error); })
  .then((result) => console.log(result));

// catch메소드는 마지막에 쓴다.
// 그러면 fetch메소드의 작업이 실패해서 발생한 에러든
// 인위적으로 발생시킨 에러든 상관없이 모두 대응할 수 있다.
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
    throw new Error("test");
  })
  .catch((error) => console.log(error));
// .catch((error) => console.log(`${error.name}: ${error.message}`));

/*
이 부분을 함수로 만들던지 할 것. 아마 실전에서는
 .catch((error) => { 
    if(error.message === 'A'){

    }else if(error.message === 'B'){

    }else if(error.message === 'C'){

    }else{

    }
  });
 */
/*
이번 실습에서는 에러 객체를 만들기 위해서 단순히 new Error를 했지만,
나만의 에러 객체(Custom Error)를 만드는 방법을 알게 되면
 .catch((error) => { 
    if(error instanceof TypeError){

    }else if(error instanceof CustomErrorType_A){

    }else if(error instanceof CustomErrorType_B){

    }else{

    }
  });
  이런 식으로 파라미터로 넘어온 에러 객체에 instanceof라는 연산자를 붙여서
  어느 타입의 에러 객체인지를 알 수 있다.
 */

/*
만약 중간에 에러가 발생해도 catch 메소드가 그 대안을 뒤로 넘겨줄 수 있으면 
catch 메소드를 중간에 써도 되는데요. 
catch 메소드를 Promise Chain의 마지막에 늘 써줘야 하는 것은 맞지만, 
작업을 살릴 방법이 있다면 Promise Chain 중간에 catch 메소드를 써도 된다는 사실, 잘 기억해두세요.
*/
fetch("https://friendbook.com/my/newsfeeds")
  .then((response) => response.json()) // -- A
  .then((result) => {
    // -- B
    const feeds = result;
    // 피드 데이터 가공...
    return processedFeeds;
  })
  .catch((error) => {
    // -- C
    // 미리 저장해둔 일반 뉴스를 보여주기
    const storedGeneralNews = getStoredGeneralNews();
    return storedGeneralNews;
  })
  .then((result) => {
    /* 화면에 표시 */
  }) // -- D
  .catch((error) => {
    /* 에러 로깅 */
  }); // -- E

// 성공 -> A, B, D
// 실패 -> C, E
