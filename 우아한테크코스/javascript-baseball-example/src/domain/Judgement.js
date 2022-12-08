class Judgement {
  correctCount = (computer, player) => {
    let result = 0;
    for (let i = 0; i < player.length; i++) {
      let playerNumber = player[i];
      if (computer.includes(playerNumber)) {
        result++; // result = result + 1;
      }
    }
    return result;
  };

  hasPlace = (computer, placeIndex, number) => {
    return computer[placeIndex] === number;
    /* 위랑 똑같은 코드
    if (computer[placeIndex] === number) {
      return true;
    }
    return false;
    */
  };
}

module.exports = Judgement;
