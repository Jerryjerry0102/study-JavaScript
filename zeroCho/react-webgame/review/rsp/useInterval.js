import { useRef, useEffect } from "react";

const useInterval = (changeHand, isRunning) => {
  const updateFn = useRef(null);

  useEffect(() => (updateFn.current = changeHand));
  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => updateFn.current(), 100);
      return () => clearInterval(id);
    }
  }, [isRunning]);
};

export default useInterval;
