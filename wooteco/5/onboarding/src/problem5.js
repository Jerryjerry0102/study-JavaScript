function problem5(money) {
  const answer = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const moneyUnit = [50000, 10000, 5000, 1000, 500, 100, 50, 10, 1];
  for (let i = 0; i < moneyUnit.length; i++) {
    if (money === 0) break;
    if (money >= moneyUnit[i]) {
      answer[i] = Math.floor(money / moneyUnit[i]);
      money = money % moneyUnit[i];
    }
  }
  return answer;
}

module.exports = problem5;
