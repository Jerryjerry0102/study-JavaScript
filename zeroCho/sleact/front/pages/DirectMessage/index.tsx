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

const DirectMessage = () => {
  const { workspace, id } = useParams();
  const { data: myData } = useSWR(`/api/users`, fetcher);
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  // const { mutate } = useSWR(`/api/workspaces/${workspace}/dms/${id}/chats`, fetcher);

  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (chat?.trim()) {
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, { content: chat })
          .then((res) => {
            console.log(res.data);
            // mutate();
            setChat('');
          })
          .catch((error) => {
            console.dir(error);
          });
      }
    },
    [chat, workspace, id, setChat],
  );

  if (!userData || !myData) return null;

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList />
      <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} />
    </Container>
  );
};

export default DirectMessage;
