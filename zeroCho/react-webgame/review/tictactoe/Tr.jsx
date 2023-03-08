import React, { memo } from "react";
import Td from "./Td";

const Tr = memo(({ rowData }) => {
  console.log("Tr");
  return (
    <tr>
      {rowData.map((v, i) => (
        <Td key={i} cellData={v} />
      ))}
    </tr>
  );
});

export default Tr;
