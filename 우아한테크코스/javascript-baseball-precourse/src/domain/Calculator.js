class Calculator {
  /* public, private 구분위해
  result = 0;
  #result = 0;
  */
  result = 0; // 인스턴스 변수
  /* 
  Class를 인스턴스화해서 쓰는 모든 object에 모두 똑같은 값을 돌려주고 싶을 때
  static이라는 keyword를 쓴다.(프로퍼티와 메소드 둘 다 사용)
  이렇게 되면 object와 관련 없이 Class 자체에 연결되어 있는 것
  */
  static shareResult = 0; // 클래스 변수
  constructor() {}
  add = (number1, number2) => {
    this.result = number1 + number2;
    // result를 add뿐만 아니라 밖에서도 쓸 수 있게 하기 위해서 this.result 해 줌
    // Class 자체에 연결되어 있는 것이기 때문에 this가 아니라 Class이름 자체를 적어줌.
    Calculator.shareResult = this.result;
    return this.result;
  };
}

module.exports = Calculator;
