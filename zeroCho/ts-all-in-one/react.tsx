import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  FunctionComponent,
  FC,
  FormEvent,
  MouseEvent,
  ChangeEvent,
} from "react";

// 리액트에서 컴포넌트는 사실 엄청 간단한 함수이다.
// (prop) => JSX

const WordRelay: FC = () => {
  const [word, setWord] = useState("제로초초");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);
  const mutaRef = useRef(0);

  useEffect(() => {
    console.log("useEffect");
    mutaRef.current += 1;
  }, []);

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {}, []);

  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult("딩동댕");
        setWord(value);
        setValue("");
      } else {
        setResult("땡");
        setValue("");
        if (input) {
          input.focus();
        }
      }
    },
    [word, value]
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
