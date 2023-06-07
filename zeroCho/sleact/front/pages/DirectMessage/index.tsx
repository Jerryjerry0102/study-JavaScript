import React, { FormEvent, useCallback } from 'react';
import gravatar from 'gravatar';
import useSWR from 'swr';
import { useParams } from 'react-router';
import fetcher from '@utils/fetcher';
import { Container, Header } from '@pages/DirectMessage/styels';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IDM } from '@typings/db';
import makeSection from '@utils/makeSection';

const DirectMessage = () => {
  const { workspace, id } = useParams();
  const { data: myData } = useSWR(`/api/users`, fetcher);
  const { data: userData, isLoading } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: chatData, mutate: mutateChat } = useSWR(
    `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,
    fetcher,
  );

  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!chat || !chat.trim()) return;
      axios
        .post(`/api/workspaces/${workspace}/dms/${id}/chats`, { content: chat })
        .then(() => {
          mutateChat();
          setChat('');
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    },
    [chat, id, mutateChat, setChat, workspace],
  );

  // if (!userData || !myData) return null;
  if (isLoading) return <div>로딩중</div>;

  const chatSections = makeSection(chatData ? [...chatData].reverse() : []);

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList chatSections={chatSections} />
      <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} />
    </Container>
  );
};

export default DirectMessage;
