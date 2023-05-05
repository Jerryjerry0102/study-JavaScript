import {
  WorkspaceName,
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/Workspace/styles';
import loadable from '@loadable/component';
import fetcher from '@utils/fetcher';
import React, { useCallback } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import axios from 'axios';
import useSWR from 'swr';
import gravatar from 'gravatar';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace = () => {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout')
      .then(() => {
        mutate(false, false); // 기존에 가지고 있던 정보를 넣기 때문에 요청을 안 보내도 됨
      })
      .catch(() => {});
  }, []);

  if (!data) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.nickname} />
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces></Workspaces>
        <Channels>
          <WorkspaceName>test</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel" element={<Channel />} />
            <Route path="/dm" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
