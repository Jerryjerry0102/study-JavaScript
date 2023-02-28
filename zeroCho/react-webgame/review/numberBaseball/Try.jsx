import React from "react";

const Try = ({ value, comment }) => {
  return (
    <li>
      <div>{value}</div>
      <div>{comment}</div>
    </li>
  );
};

export default Try;
