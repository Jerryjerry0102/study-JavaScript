import React, { useContext } from "react";
import { TableContext } from "./MineSearch";
import Tr from "./Tr";

const Table = () => {
  const { tableData, dispatch } = useContext(TableContext);

  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((_, i) => (
            <Tr key={i} rowIndex={i} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
