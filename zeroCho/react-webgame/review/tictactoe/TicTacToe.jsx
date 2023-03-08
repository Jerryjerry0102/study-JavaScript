import React, { useReducer, useEffect } from "react";
import Tr from "./Tr";

const initialState = {
  message: "",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  turn: "O",
  recentCell: [-1, -1],
};

export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const WRITE_MESSAGE = "WRITE_MESSAGE";
export const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
  switch (action.type) {
    case CLICK_CELL:
      const { row, cell } = action;
      const tableData = [...state.tableData];
      tableData[row] = [...tableData[row]];
      tableData[row][cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [row, cell],
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    case WRITE_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    case RESET_GAME:
      return {
        ...state,
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        turn: "O",
        recentCell: [-1, -1],
      };
    default:
      break;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { message, tableData, turn, recentCell } = state;

  useEffect(() => {
    if (checkWin()) {
      writeMessage(turn + "님이 승리하셨습니다.");
      dispatch({ type: RESET_GAME });
    } else {
      if (checkDraw()) {
        writeMessage("무승부입니다.");
        dispatch({ type: RESET_GAME });
      } else dispatch({ type: CHANGE_TURN });
    }
  }, [recentCell]);

  const onClickTd = (e) => {
    if (!e.target.matches("td")) return; // td 태그를 클릭한 게 맞는지 확인
    if (e.target.innerText) return; // 재클릭 방지
    const row = e.target.parentNode.rowIndex;
    const cell = e.target.cellIndex;
    dispatch({ type: CLICK_CELL, row, cell });
  };

  const writeMessage = (message) => {
    console.log("writeMessage");
    dispatch({ type: WRITE_MESSAGE, message });
  };

  const checkDraw = () => {
    console.log("checkDraw");
    return tableData.flat().every((v) => v);
  };

  const checkWin = () => {
    console.log("checkWin");
    const [row, cell] = recentCell;
    if (row < 0 || cell < 0) return;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    )
      return true;
    else if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    )
      return true;
    else if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    )
      return true;
    else if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    )
      return true;
    else return false;
  };

  return (
    <>
      <table>
        <tbody onClick={onClickTd}>
          {tableData.map((v, i) => (
            <Tr key={i} rowData={v} />
          ))}
        </tbody>
      </table>
      <div>{message}</div>
    </>
  );
};

export default TicTacToe;
