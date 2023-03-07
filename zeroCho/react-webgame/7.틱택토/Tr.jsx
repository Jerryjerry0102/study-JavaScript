import React from "react";
import Td from "./Td";

const Tr = ({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((_, i) => (
          <Td
            cellData={rowData[i]}
            rowIndex={rowIndex}
            cellIndex={i}
            dispatch={dispatch}
          />
        ))}
    </tr>
  );
};

export default Tr;
