import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import Ball from "./Ball2";

function getNumbers() {
  console.log("getNumbers");
  const candidates = Array(45)
    .fill()
    .map((_, i) => i + 1);
  const shuffle = [];
  while (candidates.length > 0)
    shuffle.push(
      candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0]
    );
  return [shuffle.slice(0, 6).sort((a, b) => a - b), shuffle[6]];
}

const Lotto = () => {
  //const [numbers, setNumbers] = useState(getNumbers); // lazy initialization
  const savedNumbers = useMemo(() => getNumbers(), []);
  const [numbers, setNumbers] = useState(savedNumbers);
  const [winNumbers, setWinNumbers] = useState([]);
  const [bonusNumber, setBonusNumber] = useState(null);
  const timeoutIds = useRef([]);

  useEffect(() => {
    showBalls();
    return () => timeoutIds.current.forEach((v) => clearTimeout(v));
  }, [timeoutIds.current]);

  const showBalls = () => {
    console.log("showBalls");
    for (let i = 0; i < numbers[0].length; i++)
      timeoutIds.current[i] = setTimeout(
        () => setWinNumbers((prev) => [...prev, numbers[0][i]]),
        1000 * (i + 1)
      );
    timeoutIds.current[numbers[0].length] = setTimeout(
      () => setBonusNumber(numbers[1]),
      1000 * (numbers[0].length + 1)
    );
  };

  const onClickBtn = useCallback(() => {
    console.log("onClickBtn");
    setNumbers(getNumbers());
    setWinNumbers([]);
    setBonusNumber(null);
    timeoutIds.current = [];
  }, [numbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div>
        {winNumbers.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonusNumber && <Ball number={bonusNumber} />}
      {bonusNumber && (
        <button id="button" onClick={onClickBtn}>
          한 번 더
        </button>
      )}
    </>
  );
};

export default Lotto;
