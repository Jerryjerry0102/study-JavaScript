import { useState, useLayoutEffect, useEffect } from "react";

const App = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("제로초");
  });

  console.log("render", name);

  return (
    <>
      <div>안녕하세요. {name}입니다.</div>
      <div>안녕하세요. {name}입니다.</div>
      <div>안녕하세요. {name}입니다.</div>
      <div>안녕하세요. {name}입니다.</div>
      <div>안녕하세요. {name}입니다.</div>
    </>
  );
};
