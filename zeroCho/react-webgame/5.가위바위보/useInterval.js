import { useRef, useEffect } from "react";

/**
 * const [isRunning, setRunning] = useState(true)
 * useInterval(()=>{
 *  console.log("hello");
 * }, isRunning ? 1000 : null)
 * // 장점 delay를 null로 만들면 멈춤
 */

function useInterval(callback, isRunning) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (isRunning) {
      let id = setInterval(tick, 100);
      return () => clearInterval(id);
    }
  }, [isRunning]);

  return callback;
}

export default useInterval;
