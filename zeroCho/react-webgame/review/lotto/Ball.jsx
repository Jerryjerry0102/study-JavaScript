import React, { memo } from "react";

const Ball = memo(({ number }) => {
  let backgroundColor = "";
  if (number <= 10) backgroundColor = "tomato";
  else if (number <= 20) backgroundColor = "gold";
  else if (number <= 30) backgroundColor = "yellowgreen";
  else if (number <= 40) backgroundColor = "cornflowerblue";
  else backgroundColor = "mediumpurple";
  return (
    <div className="ball" style={{ backgroundColor }}>
      {number}
    </div>
  );
});
Ball.displayName = "Ball";

export default Ball;
