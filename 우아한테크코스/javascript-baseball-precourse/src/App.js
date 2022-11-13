const MissionUtils = require("@woowacourse/mission-utils");
const Judgement = require("./domain/Judgement");
const NumberGenerator = require("./domain/NumberGenerator");

class App {
  play() {
    // const numberGenerator = new NumberGenerator();
    // const numbers = numberGenerator.createRandomNumbers();
    // console.log(numbers);

    const judgement = new Judgement();
    const count = judgement.correctCount([7, 8, 9], [1, 2, 3]);
    console.log(count);
  }
}

module.exports = App;
