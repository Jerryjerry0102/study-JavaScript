import React, { memo, useContext } from "react";
import { TableContext } from "./MineSearch";
import Td from "./Td";
const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {Array(tableData[0].length)
        .fill()
        .map((_, i) => (
          <Td key={i} rowIndex={rowIndex} cellIndex={i} />
        ))}
    </tr>
  );
});

export default Tr;
