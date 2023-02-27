import React, { useState, useRef } from "react";
import Try from "./TryHooks";

function getNumbers() {
  // 숫자 네 개를 겹치지 않게 랜덤하게 뽑는 함수
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const randomNumbers = [];
  for (let i = 0; i < 4; i += 1) {
    const randomNumber = candidates.splice(
      Math.floor(Math.random() * candidates.length),
      1
    )[0];
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
}

const NumberBaseball = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers); // lazy init
  const [tries, setTries] = useState([]);
  const numberInput = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    numberInput.current.focus();
    if (value === answer.join("")) {
      setResult("홈런!");
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: "홈런!" }];
      });
      alert("게임을 다시 시작합니다.");
      setValue("");
      setAnswer(getNumbers());
      setTries([]);
    } else {
      // 답 틀렸으면
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10번 이상 틀렸을 때
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}`);
        alert("게임을 다시 시작합니다.");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => {
          return [
            ...prevTries,
            {
              try: value,
              result: `${strike} 스트라이크 ${ball} 볼`,
            },
          ];
        });
        setValue("");
      }
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={numberInput}
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 :`} tryInfo={v} />;
        })}
      </ul>
    </>
  );
};

export default NumberBaseball;
