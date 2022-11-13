const MissionUtils = require("@woowacourse/mission-utils");

class NumberGenerator {
  createRandomNumbers = () => {
    /* 잘못된 코드(숫자가 겹칠 수 있다)
    let numbers = new Array();
    for (let i = 0; i < 3; i++) {
      let number = Math.floor(Math.random() * 9) + 1;
      numbers.push(number);
    }
    */

    /* 
    3개의 숫자가 담길 때까지
    만약 이미 존재하는 숫자라면 담지 않는다.
    만약 존재하지 않는 숫자라면 담는다.
    -> 이런 경우에는 for문으로는 해결 x, while 문으로 사용해야 함
    */
    /*
    let numbers = new Array();
    while (numbers.length < 3) {
      let number = Math.floor(Math.random() * 9) + 1;
      //? 이게 더 좋은 건지 아래가 더 좋은 건지 모르겠네
      // if (numbers.includes(number)) {
      //   continue;
      // } else {
      //   numbers.push(number);
      // }
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
    */

    // 그런데 아쉽게도 이번에는 라이브러리를 쓰라고 해서 써보면
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);

    return numbers;
  };
}

module.exports = NumberGenerator;
