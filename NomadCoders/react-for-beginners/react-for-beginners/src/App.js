import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setCounter((prevCounter) => prevCounter + 1);
  const onChange = (event) => setKeyword(event.target.value);
  console.log("i run all the time");
  useEffect(() => {
    console.log("CALL THE API");
  }, []);
  useEffect(() => {
    if (keyword !== "" && keyword.length > 5) {
      console.log("SEARCH FOR", keyword);
    }
  }, [keyword]);
  useEffect(() => {
    if ((keyword !== "") & (counter !== 0))
      console.log("I run when keyword & counter change");
  }, [keyword, counter]);
  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />
      <h1>{counter}</h1>
      <button onClick={onClick} text={"Continue"}>
        click me
      </button>
    </div>
  );
}

export default App;
