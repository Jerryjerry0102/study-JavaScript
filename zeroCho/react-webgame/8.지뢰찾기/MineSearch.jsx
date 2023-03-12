import React, { useReducer, createContext, useMemo } from "react";
import Table from "./Table";
import Form from "./Form";

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
};

export const TableContext = createContext({
  // 초기값 -> 모양 맞춰주기
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: "",
  halted: true, // 지뢰 클릭시 게임 스탑
};

const plantMine = (row, cell, mine) => {
  console.log("plantMine", row, cell, mine);
  const candidate = Array(row * cell)
    .fill()
    .map((_, i) => i);
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  // 지뢰 심어주기
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;
};

// action.type
export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMAL_CELL = "NORMAL_CELL";

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      };
    }
    case OPEN_CELL: {
      console.log("reducer, OPEN_CELL");
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => (tableData[i] = [...row]));
      const checked = [];
      const checkAround = (row, cell) => {
        // 상하좌우 없는 칸은 안 열기
        if (
          row < 0 ||
          row >= tableData.length ||
          cell < 0 ||
          cell >= tableData[0].length
        )
          return;
        // 닫힌 칸만 열기
        if (
          [
            CODE.OPENED,
            CODE.FLAG,
            CODE.FLAG_MINE,
            CODE.QUESTION,
            CODE.QUESTION_MINE,
          ].includes(tableData[row][cell])
        )
          return;
        // 한 번 연 칸은 무시하기
        if (checked.includes(row + "," + cell)) return;
        else checked.push(row + "," + cell);
        // 주변 지뢰 개수 구하기
        let around = [
          tableData[row - 1]?.[cell - 1],
          tableData[row - 1]?.[cell],
          tableData[row - 1]?.[cell + 1],
          tableData[row][cell - 1],
          tableData[row][cell + 1],
          tableData[row + 1]?.[cell - 1],
          tableData[row + 1]?.[cell],
          tableData[row + 1]?.[cell + 1],
        ];
        const count = around.filter((v) =>
          [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
        ).length;
        // 주변칸 오픈
        if (count === 0) {
          const near = [];
          near.push([row - 1, cell - 1]);
          near.push([row - 1, cell]);
          near.push([row - 1, cell + 1]);
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          near.push([row + 1, cell - 1]);
          near.push([row + 1, cell]);
          near.push([row + 1, cell + 1]);
          near.forEach((n) => {
            if (tableData[n[0]]?.[n[1]] !== CODE.OPENED)
              checkAround(n[0], n[1]);
          });
        }
        tableData[row][cell] = count;
      };
      checkAround(action.row, action.cell);
      return {
        ...state,
        tableData,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE)
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      else tableData[action.row][action.cell] = CODE.FLAG;
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE)
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      else tableData[action.row][action.cell] = CODE.QUESTION;
      return {
        ...state,
        tableData,
      };
    }
    case NORMAL_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE)
        tableData[action.row][action.cell] = CODE.MINE;
      else tableData[action.row][action.cell] = CODE.NORMAL;
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
  const { tableData, halted, timer, result } = state;

  const value = useMemo(
    () => ({ tableData: tableData, halted: halted, dispatch }),
    [tableData, halted]
  );

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;
