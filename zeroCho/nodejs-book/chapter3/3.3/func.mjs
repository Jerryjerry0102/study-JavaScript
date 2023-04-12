import { odd, even } from "./var.mjs";
// const { odd, even } = require("./var");

function checkOddOrEven(number) {
  if (number % 2) {
    // 홀수면
    return odd;
  }
  return even;
}

/* default export */
export default checkOddOrEven;
// module.exports = checkOddOrEven;
