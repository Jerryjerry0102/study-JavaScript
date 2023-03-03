import React, { useRef, useState } from "react";
import useInterval from "./useInterval";

const coords = {
  rock: 0,
  scissor: -142,
  paper: -284,
};
const numbers = {
  rock: -1,
  scissor: 0,
  paper: 1,
};

const RSP = () => {
  const [coord, setCoord] = useState(coords.rock);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const clickable = useRef(true);

  const changeHand = () => {
    if (coord === coords.rock) setCoord(coords.scissor);
    else if (coord === coords.scissor) setCoord(coords.paper);
    else if (coord === coords.paper) setCoord(coords.rock);
  };
  useInterval(changeHand, isRunning);

  const getComputerChoice = () =>
    Object.keys(coords).find((key) => coords[key] === coord);

  const onClick = (e) => {
    if (clickable.current) {
      setIsRunning(false);
      clickable.current = false;
      const myChoice = e.target.id;
      const computerChoice = getComputerChoice();
      const number = numbers[myChoice] - numbers[computerChoice];
      if (number === 0) setMessage("비겼습니다");
      else if ([-1, 2].includes(number)) {
        setMessage("이겼습니다");
        setScore((prev) => prev + 1);
      } else if ([1, -2].includes(number)) {
        setMessage("졌습니다");
        setScore((prev) => prev - 1);
      }
      setTimeout(() => {
        setIsRunning(true);
        clickable.current = true;
      }, 2000);
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
      <div onClick={onClick}>
        <button id="rock">바위</button>
        <button id="scissor">가위</button>
        <button id="paper">보</button>
      </div>
      <div>{message}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSP;
