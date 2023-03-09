import React, { createContext, useMemo, useReducer } from "react";
import Form from "./Form";
import Table from "./Table";

// 상수
export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 open
};

// context API
export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

// useReducer
const initialState = {
  tableData: [],
};

const plantMine = (row, cell, mine) => {
  console.log("plantMine");
  console.log(row, cell, mine);
  const candidates = Array(row * cell)
    .fill()
    .map((_, i) => i);
  const mines = [];
  for (let i = 0; i < mine; i++) {
    mines.push(
      candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0]
    );
  }
  return mines;
};

const makeTable = (row, cell, mine) => {
  console.log("makeTable");
  const tableData = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
    tableData.push(rowData);
  }
  const mines = plantMine(row, cell, mine);
  mines.forEach((mine) => {
    const rowIndex = Math.floor(mine / row);
    const cellIndex = mine % cell;
    tableData[rowIndex][cellIndex] = CODE.MINE;
  });
  return tableData;
};

// useReducer
export const START_GAME = "START_GAME";
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: makeTable(action.row, action.cell, action.mine),
      };
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({ tableData: state.tableData, dispatch }),
    [state.tableData]
  );

  return (
    // context API
    <TableContext.Provider value={value}>
      <Form />
      <div id="timer"></div>
      <Table />
      <div id="result"></div>
    </TableContext.Provider>
  );
};

export default MineSearch;
