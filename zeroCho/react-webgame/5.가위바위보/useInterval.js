import { useRef, useEffect } from "react";

/**
 * const [isRunning, setRunning] = useState(true)
 * useInterval(()=>{
 *  console.log("hello");
 * }, isRunning ? 1000 : null)
 * // 장점 delay를 null로 만들면 멈춤
 */

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return callback;
}

export default useInterval;
