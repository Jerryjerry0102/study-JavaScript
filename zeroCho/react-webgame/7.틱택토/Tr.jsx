import React, { memo } from "react";
import { render } from "react-dom";
import Td from "./Td";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log("tr rendered");
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((_, i) => (
          <Td
            key={i}
            cellData={rowData[i]}
            rowIndex={rowIndex}
            cellIndex={i}
            dispatch={dispatch}
          />
        ))}
    </tr>
  );
});

export default Tr;
