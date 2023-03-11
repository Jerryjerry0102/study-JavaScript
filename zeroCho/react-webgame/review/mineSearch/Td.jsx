import React, { useContext } from "react";
import {
  OPEN_MINE,
  CODE,
  OPEN_CELL,
  RIGHT_CLICK,
  TableContext,
} from "./MineSearch";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return { background: "#4444" };
    case CODE.OPENED:
      return { background: "white" };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return { background: "salmon" };
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return { background: "skyblue" };
    default:
      return { background: "white" };
  }
};
const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "X";
    case CODE.CLICKED_MINE:
      return "💣";
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return "!";
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return "?";
    default:
      break;
  }
};

const Td = ({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = () => {
    if (halted) return;
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.QUESTION:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.FLAG_MINE:
        break;
      case CODE.NORMAL:
        return dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
      case CODE.MINE:
        return dispatch({ type: OPEN_MINE, row: rowIndex, cell: cellIndex });
      default:
        break;
    }
  };

  const onRightClickTd = (e) => {
    e.preventDefault();
    if (halted) return;
    dispatch({ type: RIGHT_CLICK, row: rowIndex, cell: cellIndex });
  };

  return (
    <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  );
};

export default Td;
