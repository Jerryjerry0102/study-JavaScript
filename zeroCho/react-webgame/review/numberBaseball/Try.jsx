import React, { memo } from "react";

const Try = memo(({ value, comment }) => {
  return (
    <li>
      <div>{value}</div>
      <div>{comment}</div>
    </li>
  );
});
Try.displayName = "Try";

export default Try;
