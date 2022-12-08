const MissionUtils = require("@woowacourse/mission-utils");
const Judgement = require("./domain/Judgement");
const NumberGenerator = require("./domain/NumberGenerator");
const Referee = require("./domain/Referee");

class App {
  play() {
    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");

    const numberGenerator = new NumberGenerator();
    const computer = numberGenerator.createRandomNumbers();
    // console.log(computer);

    const referee = new Referee();
    let result = "";
    while (result !== "0 볼 3 스트라이크") {
      result = referee.compare(computer, this.askNumbers());
      console.log(result);
    }
    console.log("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
  }

  askNumbers() {
    let input = 0;
    MissionUtils.Console.readLine("숫자를 입력해주세요 : ", (answer) => {
      console.log(`숫자를 입력해주세요 : ${answer}`);
      input = answer;
    });
    let player = new Array();
    for (let i = 0; i < input.length; i++) {
      player.push(parseInt(input[i]));
    }
    // console.log(player);
    this.checkNumbers(player);
    return player;
  }

  checkNumbers(player) {
    if (player.length !== 3) {
      throw new Error("세글자가 아닙니다");
    }
    for (let i = 0; i < player.length; i++) {
      if (isNaN(player[i])) {
        throw new Error("숫자가 아닙니다");
      }
      for (let j = 0; j < player.length; j++) {
        if (i == j) {
          continue;
        }
        if (player[i] == player[j]) {
          throw new Error("숫자가 중복됩니다");
        }
      }
    }
  }
}

module.exports = App;
