import loadable from '@loadable/component';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

// import LogIn from '@pages/LogIn';
// import SignUp from '@pages/SignUp';
// import Channel from '@pages/Channel';
// import DirectMessage from '@pages/DirectMessage';
// 위 코드를 코드 스플리팅 //
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace/*" element={<Workspace />} />
    </Routes>
  );
};

export default App;
