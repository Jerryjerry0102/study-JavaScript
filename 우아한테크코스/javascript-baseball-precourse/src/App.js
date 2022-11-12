const MissionUtils = require("@woowacourse/mission-utils");
/*
jest에서는 
import, export (x)
require, module exports = Calculator (o)
*/
const Calculator = require("./domain/Calculator");

class App {
  play() {
    // new라는 keyword를 통해서 복사본이 만들어지고 이 복사본을 instance라고 부른다.
    const calculator = new Calculator();
    console.log(calculator.add(1, 3));
    console.log(calculator.shareResult); // undefined

    const calculator2 = new Calculator();
    console.log(calculator2.add(2000, 22));
    console.log(calculator2.shareResult); // undefined

    console.log(calculator.result); // 4 -> 얘는 인스턴스화 될 때 복사됨
    console.log(Calculator.shareResult); // 2022 -> Class에서 바로 접근해야 함
  }
}

module.exports = App;
