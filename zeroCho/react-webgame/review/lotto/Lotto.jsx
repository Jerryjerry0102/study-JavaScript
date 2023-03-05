import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Ball from "./Ball";

function extractNumbers() {
  console.log("extractNumber");
  const candidates = Array(45)
    .fill()
    .map((_, i) => i + 1);
  const shuffle = [];
  while (candidates.length > 0) {
    let randomIndex = Math.floor(Math.random() * candidates.length);
    shuffle.push(candidates.splice(randomIndex, 1)[0]);
  }
  const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  const bonusNumbers = shuffle[7];
  return [winNumbers, bonusNumbers];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => extractNumbers(), []);
  const [numbers, setNumbers] = useState(lottoNumbers);
  const [winNumbers, setWinNumbers] = useState([]);
  const [bonusNumber, setBonusNumber] = useState(null);
  const timeoutIds = useRef([]);

  useEffect(() => {
    runTimeouts();
    return () =>
      timeoutIds.current.forEach((timeoutId) => clearTimeout(timeoutId));
  }, [timeoutIds.current]);

  const runTimeouts = () => {
    console.log("runTimeouts");
    for (let i = 0; i < numbers[0].length; i++) {
      timeoutIds.current[i] = setTimeout(
        () => setWinNumbers((prev) => [...prev, numbers[0][i]]),
        1000 * (i + 1)
      );
    }
    timeoutIds.current[numbers[0].length] = setTimeout(
      () => setBonusNumber(numbers[1]),
      1000 * (numbers[0].length + 1)
    );
  };

  const onClickBtn = useCallback(() => {
    setNumbers(extractNumbers());
    setWinNumbers([]);
    setBonusNumber(null);
    timeoutIds.current = [];
  }, [numbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div>
        {winNumbers.map((winNumber) => (
          <Ball key={winNumber} number={winNumber} />
        ))}
      </div>
      <div>보너스!</div>
      {bonusNumber && <Ball number={bonusNumber} />}
      {bonusNumber && (
        <button id="button" onClick={onClickBtn}>
          한 번 더!
        </button>
      )}
    </>
  );
};

export default Lotto;
