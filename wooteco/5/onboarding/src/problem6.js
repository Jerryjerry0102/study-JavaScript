function problem6(forms) {
  const set = new Set();
  function compareNickname(nickname1, nickname2) {
    for (let i = 0; i < nickname1.length - 1; i++) {
      for (let j = 0; j < nickname2.length - 1; j++) {
        if (
          nickname1[i] === nickname2[j] &&
          nickname1[i + 1] === nickname2[j + 1]
        )
          return true;
      }
    }
    return false;
  }
  for (let i = 0; i < forms.length; i++) {
    for (let j = 0; j < forms.length; j++) {
      if (i === j) break;
      if (compareNickname(forms[i][1], forms[j][1])) {
        set.add(forms[i][0]);
        set.add(forms[j][0]);
      }
    }
  }
  let answer = [...set];
  answer.sort();
  return answer;
}

module.exports = problem6;
