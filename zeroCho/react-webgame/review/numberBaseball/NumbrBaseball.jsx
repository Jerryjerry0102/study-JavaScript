import React, { useState } from "react";
import Try from "./Try";

const getRandomNumbers = () => {
  const randomNumbers = [];
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * candidates.length);
    randomNumbers.push(parseInt(candidates.splice(randomIndex, 1)));
  }
  console.log(randomNumbers); // 개발용
  return randomNumbers;
};

const NumberBaseball = () => {
  const [answer, setAnswer] = useState(getRandomNumbers);
  const [value, setValue] = useState("");
  const [tries, setTries] = useState([]);
  const [result, setResult] = useState("");

  const restart = () => {
    setTimeout(() => {
      alert("게임을 다시 시작합니다");
      setAnswer(getRandomNumbers());
      setValue("");
      setResult("");
      setTries([]);
    }, 500);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (value === answer.join("")) {
      setResult("홈런!");
      setTries((prevTries) => {
        return [...prevTries, { value, comment: "홈런!" }];
      });
      restart();
    } else {
      if (tries.length >= 9) {
        setResult("실패!");
        restart();
      } else {
        let strike = 0;
        let ball = 0;
        answer.forEach((v, i) => {
          if (v === +value[i]) strike += 1;
          else if (answer.includes(+value[i])) ball += 1;
        });
        let comment = `${strike} 스트라이크 ${ball} 볼`;
        setTries((prevTries) => {
          return [...prevTries, { value, comment }];
        });
        setValue("");
      }
    }
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div style={{ fontSize: 25, color: "yellowgreen" }}>{result}</div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={value} maxLength="4" />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={i} value={v.value} comment={v.comment} />;
        })}
      </ul>
    </>
  );
};

export default NumberBaseball;
