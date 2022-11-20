// function fetchAndPrint2() {
//   console.log(2);
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => {
//       console.log(7);
//       return response.text();
//     })
//     .then((result) => console.log(result));
// }
// fetchAndPrint2()

/**
 * async await은 promise chaining을 좀 더 편하게 나타내기 위한 문법
 * await이라는 키워드는 async 함수 안에서만 사용할 수 있다는 사실이다.
 * await을 만나는 순간 함수 바깥으로 나가서
 * 함수 바깥의 코드를 실행하고 돌아온다.
 */
async function fetchAndPrint() {
  console.log(2);
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  console.log(7);
  const result = await response.text();
  console.log(result);
}

console.log(1);
fetchAndPrint();
console.log(3);
console.log(4);
console.log(5);
console.log(6);

fetchAndPrint();

/**
 * 이전에 프로미스 체이닝에서는 프로미스 객체가 rejected 상태가 될 때를 대비해서
 * catch 메소드를 사용했었다.
 *
 * async/await 구문에서는 try...catch문을 사용하면 된다.
 */

async function fetchAndPrint3() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.comm/users");
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("exit");
  }
}
fetchAndPrint3();

async function showQuiz() {
  try {
    const response = await fetch("https://learn.codeit.kr/api/quiz");
    const test = await response.json();
    const yourAnswer = prompt(test.quiz);
    if (yourAnswer.toLowerCase() === test.answer) {
      alert(`Good Job, ${test.explanation} => Let\'s learn more with Codeit!`);
    } else {
      throw new Error("wrong");
    }
  } catch (error) {
    if (error.message === "wrong") {
      alert("You need to learn JavaScript with Codeit!");
    } else {
      alert("Error");
    }
  } finally {
    window.open("https://codeit.kr", "_blank");
  }
}

showQuiz();

/**
 * async가 붙은 함수는 항상 프로미스 객체를 리턴한다.
 * 그렇기 때문에 다른 async 함수 안에서 await을 붙여서 사용할 수 있다.
 */

/**
 * 점심 메뉴 랜덤 선택기
 * async await
 */
async function pick(menus) {
  console.log("Pick random menu!");
  const p = new Promise((resolve, reject) => {
    if (menus.length === 0) {
      reject(new Error("Need Candidates"));
    } else {
      setTimeout(() => {
        const randomIdx = Math.floor(Math.random() * menus.length);
        const selectedMenu = menus[randomIdx];
        resolve(selectedMenu);
      }, 1000);
    }
  });

  return p;
}

async function getRandomMenu() {
  console.log("---Please wait!---");
  try {
    const response = await fetch("https://learn.codeit.kr/api/menus");
    const menus = await response.json();
    const menu = await pick(menus);
    console.log(`Today's lunch is ${menu.name}~`);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("Random Menu candidates change everyday");
  }
}

getRandomMenu();

/* Promise chaining
function pick(menus) {
  console.log("Pick random menu!");
  const p = new Promise((resolve, reject) => {
    if (menus.length === 0) {
      reject(new Error("Need Candidates"));
    } else {
      setTimeout(() => {
        const randomIdx = Math.floor(Math.random() * menus.length);
        const selectedMenu = menus[randomIdx];
        resolve(selectedMenu);
      }, 1000);
    }
  });
  return p;
}

function getRandomMenu() {
  console.log("---Please wait!---");
  return fetch("https://learn.codeit.kr/api/menus")
    .then((response) => response.text())
    .then((result) => {
      const menus = JSON.parse(result);
      return pick(menus); // ! random pick function
    });
}

getRandomMenu()
  .then((menu) => {
    console.log(`Today's lunch is ${menu.name}~`);
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log("Random Menu candidates change everyday");
  });
*/
