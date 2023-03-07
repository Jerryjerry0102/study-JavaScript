import React, { memo } from "react";
import Tr from "./Tr";

const Table = memo(({ tableData, dispatch }) => {
  console.log("table rendered");
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((_, i) => (
            <Tr
              key={i}
              rowData={tableData[i]}
              rowIndex={i}
              dispatch={dispatch}
            />
          ))}
      </tbody>
    </table>
  );
});

export default Table;
