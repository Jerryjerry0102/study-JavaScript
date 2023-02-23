const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("제로초초");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const wordInput = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("딩동댕");
      setWord(value);
    } else setResult("땡");
    wordInput.current.focus();
    setValue("");
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="word">글자를 입력하세요.</label>
        <input
          id="word"
          ref={wordInput}
          value={value}
          onChange={onChangeInput}
        />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
