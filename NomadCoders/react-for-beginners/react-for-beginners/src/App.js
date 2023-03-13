import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  // Switch가 하는 일은 Route를 찾는 건데 Route는 URL을 의미한다.
  //                 한 번에 하나의 Route만 렌더링 하기 위해서
  // Route 안에 컴포넌트를 넣어주기만 하면 된다.
  // 그럼 Router가 해당 경로일 대 그 컴포넌트를 보여준다.
  // Link는 브라우저 새로고침 없이도 유저를 다른 페이지로 이동시켜주는 컴포넌트
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id/">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
