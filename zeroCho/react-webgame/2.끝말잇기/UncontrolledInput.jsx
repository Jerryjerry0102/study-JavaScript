const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("제로초");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const wordInput = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    // console.log(e.target.children.word.value);
    // console.log(e.target[0].value);
    if (word[word.length - 1] === e.target.children.word.value[0]) {
      setResult("딩동댕");
      setWord(e.target.children.word.value);
    } else setResult("땡");
    wordInput.current.focus();
    e.target.children.word.value = "";
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="word">글자를 입력하세요.</label>
        <input id="word" ref={wordInput} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
