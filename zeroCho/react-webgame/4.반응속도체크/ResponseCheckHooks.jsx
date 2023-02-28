import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("ready");
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();

  const onClickScreen = () => {
    if (state === "ready") {
      setState("set");
      setMessage("초록색이 되면 클릭하세요.");
      timeout.current = setTimeout(() => {
        setState("go");
        setMessage("지금 클릭하세요.");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 랜덤
    } else if (state === "set") {
      clearTimeout(timeout.current);
      setState("ready");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
    } else if (state === "go") {
      const endTime = new Date();
      setState("ready");
      setMessage("클릭해서 시작하세요.");
      setResult((prevResult) => [...prevResult, endTime - startTime.current]);
    }
  };
  const onReset = () => {
    setResult([]);
  };
  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
