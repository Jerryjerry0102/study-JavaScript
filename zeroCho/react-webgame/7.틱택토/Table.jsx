import React from "react";
import Tr from "./Tr";

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      {Array(tableData.length)
        .fill()
        .map((_, i) => (
          <Tr rowData={tableData[i]} rowIndex={i} dispatch={dispatch} />
        ))}
    </table>
  );
};

export default Table;
