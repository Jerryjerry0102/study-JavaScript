function problem4(word) {
  const dictObj = {
    A: "Z",
    B: "Y",
    C: "X",
    D: "W",
    E: "V",
    F: "U",
    G: "T",
    H: "S",
    I: "R",
    J: "Q",
    K: "P",
    L: "O",
    M: "N",
    N: "M",
    O: "L",
    P: "K",
    Q: "J",
    R: "I",
    S: "H",
    T: "G",
    U: "F",
    V: "E",
    W: "D",
    X: "C",
    Y: "B",
    Z: "A",
  };
  let answer = "";
  for (let i = 0; i < word.length; i++) {
    if (word[i] === " ") answer += " ";
    else {
      let oppositeChar = dictObj[word[i].toUpperCase()];
      if (word[i].toUpperCase() === word[i]) answer += oppositeChar;
      else answer += oppositeChar.toLowerCase();
    }
  }
  return answer;
}

module.exports = problem4;
