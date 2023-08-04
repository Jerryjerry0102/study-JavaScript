function problem1(pobi, crong) {
  function validatePage(pages) {
    if (pages[1] - pages[0] !== 1) return false;
  }
  function getAddedNum(num) {
    let addedNum = 0;
    for (let i = 0; i < num.length; i++) {
      addedNum += +num[i];
    }
    return addedNum;
  }
  function getMultipliedNum(num) {
    let multipliedNum = 1;
    for (let i = 0; i < num.length; i++) {
      multipliedNum *= +num[i];
    }
    return multipliedNum;
  }
  function compareNum(num1, num2) {
    return num1 > num2 ? num1 : num2;
  }
  function getScore(pages) {
    let leftStr = String(pages[0]);
    let rightStr = String(pages[1]);
    const leftScore = compareNum(
      getAddedNum(leftStr),
      getMultipliedNum(leftStr)
    );
    const rightScore = compareNum(
      getAddedNum(rightStr),
      getMultipliedNum(rightStr)
    );
    const score = compareNum(leftScore, rightScore);
    return score;
  }

  if (validatePage(pobi) === false) return -1;
  if (validatePage(crong) === false) return -1;

  const pobiScore = getScore(pobi);
  const crongScore = getScore(crong);

  let answer;
  if (pobiScore > crongScore) answer = 1;
  else if (pobiScore < crongScore) answer = 2;
  else answer = 0;
  return answer;
}

module.exports = problem1;
