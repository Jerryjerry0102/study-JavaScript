import React, { FormEvent, useCallback } from 'react';
import { Container, Header } from '@pages/Channel/styles';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import { useParams } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import makeSection from '@utils/makeSection';

const Channel = () => {
  const { workspace, id } = useParams();
  const { data: myData } = useSWR(`/api/users`, fetcher);
  const { data: chatData, mutate: mutateChat } = useSWR(
    `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,
    fetcher,
  );

  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setChat('');
    },
    [setChat],
  );

  const chatSections = makeSection(chatData ? [...chatData].reverse() : []);

  return (
    <Container>
      <Header>채널!</Header>
      <ChatList chatSections={chatSections} />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
