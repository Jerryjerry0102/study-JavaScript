const Judgement = require("./Judgement");

class Referee {
  compare = (computer, player) => {
    // 몇 개의 숫자가 같은지 알아낸 뒤
    // 스트라이크 개수를 구해 뺀다.
    // 남은 수는 볼의 개수이다.
    const judgement = new Judgement();
    let correctCount = judgement.correctCount(computer, player);

    let strike = 0;
    for (let index = 0; index < computer.length; index++) {
      if (judgement.hasPlace(computer, index, player[index])) {
        strike++;
      }
    }
    let ball = correctCount - strike;
    if (correctCount === 0) {
      return "낫싱";
    }
    return ball + " 볼 " + strike + " 스트라이크";
  };
}

module.exports = Referee;
