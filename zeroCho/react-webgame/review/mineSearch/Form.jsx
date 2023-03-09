import React, { useContext, useState } from "react";
import { TableContext, START_GAME } from "./MineSearch";

const Form = () => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(10);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = (e) => setRow(e.target.value);
  const onChangeCell = (e) => setCell(e.target.value);
  const onChangeMine = (e) => setMine(e.target.value);

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch({ type: START_GAME, row, cell, mine });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <input
        placeholder="row"
        onChange={onChangeRow}
        value={row}
        required
      ></input>
      <input
        placeholder="cell"
        onChange={onChangeCell}
        value={cell}
        required
      ></input>
      <input
        placeholder="mine"
        onChange={onChangeMine}
        value={mine}
        required
      ></input>
      <button>시작</button>
    </form>
  );
};

export default Form;
