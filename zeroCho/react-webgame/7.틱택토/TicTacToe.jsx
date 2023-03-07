import React, { useCallback, useEffect, useReducer } from "react";
import Table from "./Table";

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
  // reducer 안에서 state를 어떻게 바꿀지 적어준다.
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner // 이렇게 하면 안 됨.
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL:
      // 나중에 immer라는 라이브러리로 가독성문제 해결
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    case RESET_GAME:
      return {
        ...state,
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [winner, setWinner] = useState("");
  // const [turn, setTurn] = useState("O");
  // const [tableDat, setTableData] = useState([["", "", ""], ["", "", ""], ["", "", ""],]);
  const { tableData, turn, winner, recentCell } = state;

  const onClickTable = useCallback(() => {
    // dispatch 안에 들어가는 객체를 action 객체라고 부름
    // 그래서 action을 dispatch할 때마다 reducer부분이 실행됨
    dispatch({ type: SET_WINNER, winner: "O" });
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) return;
    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    )
      win = true;
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    )
      win = true;
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    )
      win = true;
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    )
      win = true;
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      // 무승부 검사
      let all = true;
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) all = false;
        });
      });
      if (all) dispatch({ type: RESET_GAME });
      else dispatch({ type: CHANGE_TURN });
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
