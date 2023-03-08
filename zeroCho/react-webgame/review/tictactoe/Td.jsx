import React, { memo } from "react";

const Td = memo(({ cellData }) => {
  console.log("Td");
  return <td>{cellData}</td>;
});

export default Td;
