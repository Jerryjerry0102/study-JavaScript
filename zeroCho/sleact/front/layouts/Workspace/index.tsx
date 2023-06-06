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
  ProfileMenu,
  LogOutButton,
  WorkspaceButton,
  AddButton,
  WorkspaceMenu,
} from '@layouts/Workspace/styles';
import loadable from '@loadable/component';
import fetcher from '@utils/fetcher';
import React, { KeyboardEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import gravatar from 'gravatar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from '@components/Menu';
import { IChannel, IUser } from '@typings/db';
import CreateWorkspaceModal from '@components/CreateWorkspaceModal';
import ChannelList from '@components/ChannelList';
import DMList from '@components/DMList';
import useSocket from '@hooks/useSocket';
import CreateChannelModal from '@components/CreateChannelModal';
import InviteWorkspaceModal from '@components/InviteWorkspaceModal';
import InviteChannelModal from '@components/InviteChannelModal';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace = () => {
  const { workspace } = useParams();
  const { data: userData, mutate } = useSWR<IUser | false>('/api/users', fetcher);
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);

  const [socket, disconnect] = useSocket(workspace);
  useEffect(() => {
    if (socket && userData && channelData) {
      socket.emit('login', { id: userData.id, channels: channelData.map((v) => v.id) });
    }
  }, [socket, userData, channelData]);

  useEffect(() => {
    // 워크스페이스가 바뀌면 기존 워크스페이스를 정리해줘야 함
    return () => {
      disconnect();
    };
  }, [workspace, disconnect]);

  const onLogOut = useCallback(() => {
    axios
      .post('/api/users/logout')
      .then(() => mutate(false, { revalidate: false }))
      .catch(() => {});
  }, [mutate]);

  const onClickProfileImg = useCallback(() => setShowUserMenu((prev) => !prev), []);
  const onClickAddWorkspaceBtn = useCallback(() => setShowCreateWorkspaceModal((prev) => !prev), []);
  const onClickWorkspaceName = useCallback(() => setShowWorkspaceMenu((prev) => !prev), []);
  const onClickAddChannelBtn = useCallback(() => setShowCreateChannelModal((prev) => !prev), []);
  const onClickInviteWorkspaceBtn = useCallback(() => setShowInviteWorkspaceModal((prev) => !prev), []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
    setShowInviteChannelModal(false);
  }, []);

  if (!userData) return <Navigate to="/login" />;

  return (
    <div>
      <Header>
        <span>{userData.nickname}</span>
        <RightMenu>
          <ProfileImg
            src={gravatar.url(userData.email, { s: '50', d: 'retro' })}
            alt={userData.nickname}
            onClick={onClickProfileImg}
          />
          <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseMenu={onClickProfileImg}>
            <ProfileMenu>
              <img src={gravatar.url(userData.email, { s: '50', d: 'retro' })} alt={userData.nickname} />
              <div>
                <span id="profile-name">{userData.nickname}</span>
                <span id="profile-active">Active</span>
              </div>
            </ProfileMenu>
            <LogOutButton onClick={onLogOut}>로그아웃</LogOutButton>
          </Menu>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {userData.Workspaces.map((ws) => {
            return (
              <Link key={ws.name} to={`/workspace/${ws.name}/channel/일반`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickAddWorkspaceBtn}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={onClickWorkspaceName}>{workspace}</WorkspaceName>
          <MenuScroll>
            <Menu style={{ top: 95, left: 80 }} show={showWorkspaceMenu} onCloseMenu={onClickWorkspaceName}>
              <WorkspaceMenu>
                <h2>{workspace}</h2>
                <button onClick={onClickInviteWorkspaceBtn}>워크스페이스에 사용자 초대</button>
                <button onClick={onClickAddChannelBtn}>채널 만들기</button>
                <button onClick={onLogOut}>로그아웃</button>
              </WorkspaceMenu>
            </Menu>
            <ChannelList />
            <DMList />
          </MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel/:channel" element={<Channel />}></Route>
            <Route path="/dm/:id" element={<DirectMessage />}></Route>
          </Routes>
        </Chats>
      </WorkspaceWrapper>
      <CreateWorkspaceModal
        show={showCreateWorkspaceModal}
        setShow={setShowCreateWorkspaceModal}
        onCloseModal={onCloseModal}
      />
      <CreateChannelModal
        show={showCreateChannelModal}
        setShow={setShowCreateChannelModal}
        onCloseModal={onCloseModal}
      />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        setShow={setShowInviteWorkspaceModal}
        onCloseModal={onCloseModal}
      />
      {/* <InviteChannelModal
        show={showInviteChannelModal}
        setShow={setShowInviteChannelModal}
        onCloseModal={onCloseModal}
      /> */}
      <ToastContainer />
    </div>
  );
};

export default Workspace;
