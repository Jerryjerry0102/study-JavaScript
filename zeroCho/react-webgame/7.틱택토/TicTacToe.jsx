import React, { useCallback, useReducer } from "react";
import Table from "./Table";

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

const SET_WINNER = "SET_WINNER";

const reducer = (state, action) => {
  // reducer 안에서 state를 어떻게 바꿀지 적어준다.
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner // 이렇게 하면 안 됨.
      return {
        ...state,
        winner: action.winner,
      };
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [winner, setWinner] = useState("");
  // const [turn, setTurn] = useState("O");
  // const [tableDat, setTableData] = useState([["", "", ""], ["", "", ""], ["", "", ""],]);

  const onClickTable = useCallback(() => {
    // dispatch 안에 들어가는 객체를 action 객체라고 부름
    // 그래서 action을 dispatch할 때마다 reducer부분이 실행됨
    dispatch({ type: SET_WINNER, winner: "O" });
  }, []);

  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData} />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
