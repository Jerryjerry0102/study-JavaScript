import React, { useState, useRef, useEffect } from "react";

const rspCoords = {
  rock: "0",
  scissor: "-142",
  paper: "-284",
};
const scores = {
  rock: 0,
  scissor: 1,
  paper: -1,
};

const computerChoice = (imgCoord) => {
  return Object.keys(rspCoords).find((key) => rspCoords[key] === imgCoord);
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const [score, setScore] = useState(0);
  const interval = useRef(null);
  const clickable = useRef(true);

  useEffect(() => {
    console.log("componentDidMount");

    return () => {
      // return 부분이 componentWillUnmount 역할
      console.log("componentWillUnmount");
    };
  }, []); // 빈배열일 경우 componentDidMount 역할

  useEffect(() => {
    console.log("componentDidUpdate");
    interval.current = setInterval(changeHand, 1000);
    return () => {
      console.log("getSnapshotBeforeUpdate");
      clearInterval(interval.current);
    };
  }, [imgCoord]); // [] 안에 들어있는 데이터(imgCoord)가 바뀔 때마다 실행하는 역할

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      console.log("rock");
      setImgCoord(rspCoords.scissor);
    } else if (imgCoord === rspCoords.scissor) {
      console.log("scissor");
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };

  const onClickBtn = (choice) => () => {
    if (clickable.current) {
      clearInterval(interval.current);
      clickable.current = false;
      const myScore = scores[choice];
      const computerScore = scores[computerChoice(imgCoord)];
      const diff = myScore - computerScore;
      if (diff === 0) {
        setResult("비겼습니다.");
      } else if ([-1, 2].includes(diff)) {
        setResult("이겼습니다.");
        setScore((prev) => prev + 1);
      } else {
        setResult("졌습니다.");
        setScore((prev) => prev - 1);
      }
      setTimeout(() => {
        clickable.current = true;
        interval.current = setInterval(changeHand, 100);
      }, 2000);
    }
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord}px 0`,
        }}
      ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("rock")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("scissor")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("paper")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSP;
