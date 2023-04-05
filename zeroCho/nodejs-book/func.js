const { odd, even } = require("./var");

function checkOddOrEven(number) {
  if (number % 2) {
    // 홀수면
    return odd;
  }
  return even;
}

module.exports = checkOddOrEven;
