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
import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import gravatar from 'gravatar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from '@components/Menu';
import { IChannel, IUser } from '@typings/db';
import CreateChannelModal from '@components/CreateChannelModal';
import InviteWorkspaceModal from '@components/InviteWorkspaceModal';
import InviteChannelModal from '@components/InviteChannelModal';
import CreateWorkspaceModal from '@components/CreateWorkspaceModal';
import ChannelList from '@components/ChannelList';
import DMList from '@components/DMList';
import useSocket from '@hooks/useSocket';
import { channel } from 'diagnostics_channel';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);

  const { workspace } = useParams();

  const { data: userData, mutate } = useSWR<IUser | false>('/api/users', fetcher);
  const { data: channelData, mutate: mutateChannel } = useSWR<IChannel[]>(
    // 조건부 요청(내가 로그인한 상태일 때만 요청 보내도록 설정한 것)
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );
  const { data: memberData, mutate: mutateWorkspaceMember } = useSWR(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const [socket, disconnect] = useSocket(workspace);

  useEffect(() => {
    if (channelData && userData && socket) {
      console.log(socket);
      socket.emit('login', { id: userData.id, channels: channelData.map((v) => v.id) });
    }
  }, [channelData, socket, userData]);
  useEffect(() => {
    // 워크스페이스가 바뀌면 기존 워크스페이스를 정리해줘야 함
    return () => {
      disconnect();
    };
  }, [workspace, disconnect]);

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout')
      .then(() => {
        mutate(false, false); // 기존에 가지고 있던 정보를 넣기 때문에 요청을 안 보내도 됨
      })
      .catch(() => {});
  }, [mutate]);

  // 토글 함수
  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
    setShowInviteChannelModal(false);
  }, []);

  const toggleWorkspaceMenu = useCallback(() => {
    setShowWorkspaceMenu((prev) => !prev);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal((prev) => !prev);
  }, []);

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.nickname} />
          </span>
          <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseMenu={onClickUserProfile}>
            <ProfileMenu>
              <img src={gravatar.url(userData.email, { s: '36px', d: 'retro' })} alt={userData.nickname} />
              <div>
                <span id="profile-name">{userData.nickname}</span>
                <span id="profile-active">Active</span>
              </div>
            </ProfileMenu>
            <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
          </Menu>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {userData.Workspaces?.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${ws.name}/channel/일반`}>
                <WorkspaceButton>{ws.name[0].toUpperCase()}</WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceMenu}>{workspace}</WorkspaceName>
          <MenuScroll>
            <Menu show={showWorkspaceMenu} onCloseMenu={toggleWorkspaceMenu} style={{ top: 95, left: 80 }}>
              <WorkspaceMenu>
                <h2>Sleact</h2>
                <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceMenu>
            </Menu>
            <ChannelList />
            <DMList />
          </MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel/:channel" element={<Channel />} />
            <Route path="/dm/:id" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
      <CreateWorkspaceModal
        show={showCreateWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
        mutate={mutate}
      />
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
        mutate={mutateChannel}
      />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
        mutate={mutateWorkspaceMember}
      />
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
      <ToastContainer />
    </div>
  );
};

export default Workspace;
