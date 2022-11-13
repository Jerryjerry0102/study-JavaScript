const MissionUtils = require("@woowacourse/mission-utils");
const Judgement = require("./domain/Judgement");
const NumberGenerator = require("./domain/NumberGenerator");
const Referee = require("./domain/Referee");

class App {
  play() {
    // const numberGenerator = new NumberGenerator();
    // const numbers = numberGenerator.createRandomNumbers();
    // console.log(numbers);

    // const judgement = new Judgement();
    // const count = judgement.correctCount([7, 8, 9], [1, 2, 3]);
    // console.log(count);
    // const place = judgement.hasPlace([7, 8, 9], 0, 7);
    // console.log(place);

    const referee = new Referee();
    const result = referee.compare([3, 1, 2], [1, 2, 3]);
    console.log(result);
  }
}

module.exports = App;
