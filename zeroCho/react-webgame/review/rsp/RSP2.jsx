import React, { useEffect, useRef, useState } from "react";

const COORD = {
  rock: 0,
  scissor: -142,
  paper: -284,
};
const NUMBER = {
  rock: -1,
  scissor: 0,
  paper: 1,
};

const RSP = () => {
  const [coord, setCoord] = useState(COORD.rock);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("원하는 버튼을 누르세요");
  const [isRunning, setIsRunning] = useState(true);
  const savedCallback = useRef(null);

  const changeHand = () => {
    if (coord === COORD.rock) setCoord(COORD.scissor);
    else if (coord === COORD.scissor) setCoord(COORD.paper);
    else if (coord === COORD.paper) setCoord(COORD.rock);
  };
  useEffect(() => (savedCallback.current = changeHand));
  useEffect(() => {
    console.log("isRunning");
    if (isRunning) {
      const timeoutId = setInterval(() => savedCallback.current(), 100);
      return () => clearInterval(timeoutId);
    }
  }, [isRunning]);

  const onClickBtn = (event) => {
    if (isRunning) {
      setIsRunning(false);
      const myChoice = event.target.id;
      const computerChoice = Object.keys(COORD)
        .filter((v) => COORD[v] === coord)
        .toString();
      writeResult(NUMBER[myChoice] - NUMBER[computerChoice]);
      setTimeout(() => setIsRunning(true), 2000);
    }
  };
  const writeResult = (result) => {
    if (result === 0) setMessage("비겼습니다.");
    else if ([-1, 2].includes(result)) {
      setMessage("이겼습니다");
      setScore((prev) => prev + 1);
    } else if ([1, -2].includes(result)) {
      setMessage("졌습니다");
      setScore((prev) => prev - 1);
    }
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${coord}px 0`,
        }}
      ></div>
      <div id="button" onClick={onClickBtn} style={{ display: "inline-block" }}>
        <button id="rock">바위</button>
        <button id="scissor">가위</button>
        <button id="paper">보</button>
      </div>
      <div>
        <div>{message}</div>
        <div>현재 {score}점</div>
      </div>
    </>
  );
};

export default RSP;
