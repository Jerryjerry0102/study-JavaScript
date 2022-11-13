const MissionUtils = require("@woowacourse/mission-utils");
const NumberGenerator = require("./domain/NumberGenerator");

class App {
  play() {
    const numberGenerator = new NumberGenerator();
    const numbers = numberGenerator.createRandomNumbers();
    console.log(numbers);
  }
}

module.exports = App;
