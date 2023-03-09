import React, { createContext, useMemo, useReducer } from "react";
import Form from "./Form";
import Table from "./Table";

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
  console.log(row, cell, mine);
};

// useReducer
export const START_GAME = "START_GAME";
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
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
