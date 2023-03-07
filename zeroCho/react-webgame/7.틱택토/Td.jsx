import React, { memo, useCallback, useEffect, useRef } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ cellData, rowIndex, cellIndex, dispatch }) => {
  console.log("td rendered");

  const onClickTd = useCallback(() => {
    if (cellData) return;
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
