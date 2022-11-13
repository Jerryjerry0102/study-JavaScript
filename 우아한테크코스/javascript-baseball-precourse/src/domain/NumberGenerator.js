class NumberGenerator {
  createRandomNumbers = () => {
    /*
    let numbers = new Array();
    for (let i = 0; i < 3; i++) {
      let number = Math.floor(Math.random() * 9) + 1;
      numbers.push(number);
    }
    return numbers;
    */
    /* 
    3개의 숫자가 담길 때까지
    만약 이미 존재하는 숫자라면 담지 않는다.
    만약 존재하지 않는 숫자라면 담는다.
    -> 이런 경우에는 for문으로는 해결 x, while 문으로 사용해야 함
    */
    let numbers = new Array();
    while (numbers.length < 3) {
      let number = Math.floor(Math.random() * 9) + 1;
      if (numbers.includes(number)) {
        continue;
      } else {
        numbers.push(number);
      }
    }
    return numbers;
  };
}

module.exports = NumberGenerator;
