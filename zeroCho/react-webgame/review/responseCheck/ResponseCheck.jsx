import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [state, setState] = useState("ready");
  const [results, setResults] = useState([]);
  const timeoutId = useRef(null);
  const startTime = useRef(null);

  const onClickScreen = () => {
    if (state === "ready") {
      setState("set");
      setMessage("초록색이 되면 클릭하세요.");
      timeoutId.current = setTimeout(() => {
        setState("go");
        setMessage("지금 클릭하세요.");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 2000) + 1000);
    } else if (state === "set") {
      clearTimeout(timeoutId.current);
      setState("ready");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
    } else if (state === "go") {
      setState("ready");
      setMessage("클릭해서 시작하세요.");
      const endTime = new Date();
      setResults((prevResults) => {
        return [...prevResults, endTime - startTime.current];
      });
    }
  };

  const getAverageTime = () => {
    if (results.length === 0) return;
    return results.reduce((acc, cur) => acc + cur) / results.length;
  };

  const onClickReset = () => {
    setResults([]);
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      <div id="result">평균 시간: {getAverageTime() | 0}ms</div>
      <button onClick={onClickReset}>리셋</button>
    </>
  );
};

export default ResponseCheck;
