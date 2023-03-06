import React, { memo } from "react";

const Ball = memo(({ number }) => {
  let background = "";
  if (number <= 10) background = "tomato";
  else if (number <= 20) background = "gold";
  else if (number <= 30) background = "yellowgreen";
  else if (number <= 40) background = "cornflowerblue";
  else background = "plum";
  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

export default Ball;
