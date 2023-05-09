import React, { FormEvent, useCallback } from 'react';
import { Container, Header } from '@pages/Channel/styles';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setChat('');
      console.log('submit');
    },
    [setChat],
  );

  return (
    <Container>
      <Header>Channel</Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
