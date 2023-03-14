import { useCallback, useDeferredValue, useMemo, useTransition } from "react";

export default function App() {
  // const [name, setName] = useState("");
  // const result = useMemo(() => name + "의 결과", [name]);
  const deferredName = useDeferredValue(name);
  const result = useMemo(() => deferredName + "의 결과", [deferredName]);

  const onChange = useCallback(() => {
    setName(e.target.value);
  }, []);

  console.log("render", deferredName);

  return (
    <div className="App">
      {loading ? <div>로딩중...</div> : null}
      <input value={name} onChange={onChange} />
      {deferredName
        ? Array(1000)
            .fill()
            .map((v, i) => <div key={i}>{result}</div>)
        : null}
    </div>
  );
}
