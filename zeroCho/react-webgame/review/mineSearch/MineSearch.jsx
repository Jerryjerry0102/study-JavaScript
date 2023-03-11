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
  halted: true,
});

// useReducer
const initialState = {
  tableData: [],
  halted: true,
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
  console.log(tableData);
  return tableData;
};

// useReducer
export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const OPEN_MINE = "OPEN_MINE";
export const RIGHT_CLICK = "RIGHT_CLICK";

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        tableData: makeTable(action.row, action.cell, action.mine),
        halted: false,
      };
    }
    case OPEN_CELL: {
      console.log("reducer", "open_cell");
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      // 주변 지뢰 개수 표시하기
      const aroundDatas = [
        tableData[action.row - 1]?.[action.cell - 1],
        tableData[action.row - 1]?.[action.cell],
        tableData[action.row - 1]?.[action.cell + 1],
        tableData[action.row]?.[action.cell - 1],
        tableData[action.row]?.[action.cell + 1],
        tableData[action.row + 1]?.[action.cell - 1],
        tableData[action.row + 1]?.[action.cell],
        tableData[action.row + 1]?.[action.cell + 1],
      ];
      let count = 0;
      aroundDatas.forEach((data) => {
        if ([CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(data))
          count += 1;
      });
      tableData[action.row][action.cell] = count;
      console.log(count);
      return {
        ...state,
        tableData,
      };
    }
    case OPEN_MINE: {
      console.log("reducer", "click_mine");
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case RIGHT_CLICK: {
      console.log("right_click");
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      switch (tableData[action.row][action.cell]) {
        case CODE.NORMAL:
          tableData[action.row][action.cell] = CODE.FLAG;
          break;
        case CODE.FLAG:
          tableData[action.row][action.cell] = CODE.QUESTION;
          break;
        case CODE.QUESTION:
          tableData[action.row][action.cell] = CODE.NORMAL;
          break;
        case CODE.MINE:
          tableData[action.row][action.cell] = CODE.FLAG_MINE;
          break;
        case CODE.FLAG_MINE:
          tableData[action.row][action.cell] = CODE.QUESTION_MINE;
          break;
        case CODE.QUESTION_MINE:
          tableData[action.row][action.cell] = CODE.MINE;
          break;
        default:
          break;
      }
      return {
        ...state,
        tableData,
      };
    }
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({ tableData: state.tableData, dispatch, halted: state.halted }),
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
