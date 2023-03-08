import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") return;
    setToDos((prevToDos) => {
      return [toDo, ...prevToDos];
    });
    setToDo("");
  };
  return (
    <>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Wirte your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      {toDos.map((v, i) => {
        return <li key={i}>{v}</li>;
      })}
    </>
  );
}

export default App;
