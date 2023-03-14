import { useCallback, useTransition } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [loading, startTransition] = useTransition();

  const onChange = useCallback(() => {
    setName(e.target.value);
    startTransition(() => {
      setResult(e.target.value + "의 결과");
    });
  }, []);

  console.log("render", name);

  return (
    <div className="App">
      {loading ? <div>로딩중...</div> : null}
      <input value={name} onChange={onChange} />
      {name
        ? Array(1000)
            .fill()
            .map((v, i) => <div key={i}>{result}</div>)
        : null}
    </div>
  );
}
