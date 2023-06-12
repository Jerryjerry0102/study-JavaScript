import React, { FormEvent, useCallback, useEffect, useRef } from 'react';
import gravatar from 'gravatar';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { useParams } from 'react-router';
import fetcher from '@utils/fetcher';
import { Container, Header } from '@pages/DirectMessage/styels';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { toast } from 'react-toastify';
import makeSection from '@utils/makeSection';
import Scrollbars from 'react-custom-scrollbars-2';
import { IDM } from '@typings/db';

const DirectMessage = () => {
  const { workspace, id } = useParams();
  const { data: myData } = useSWR(`/api/users`, fetcher);
  const { data: userData, isLoading } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite((size) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${size + 1}`, fetcher);
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;

  const [chat, onChangeChat, setChat] = useInput('');
  const scrollbarRef = useRef<Scrollbars>(null);

  const onSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!chat || !chat.trim()) return;
      if (!isEmpty) {
        const savedChat = chat;
        console.log(chatData?.[0]);
        mutateChat(
          (prev) => {
            prev?.[0].unshift({
              id: (chatData?.[0][0]?.id || 0) + 1,
              content: savedChat,
              SenderId: myData.id,
              Sender: myData,
              ReceiverId: userData.id,
              Receiver: userData,
              createdAt: new Date(),
            });
            return prev;
          },
          { revalidate: false },
        ).then(() => {
          setChat('');
          scrollbarRef.current?.scrollToBottom();
        });
      }
      axios
        .post(`/api/workspaces/${workspace}/dms/${id}/chats`, { content: chat })
        .then(() => {
          mutateChat();
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    },
    [chat, chatData, id, myData, userData, workspace],
  );

  // 로딩 시 스크롤바 제일 아래로
  useEffect(() => {
    if (!isEmpty) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  // if (!userData || !myData) return null;
  if (isLoading) return <div>로딩중</div>;

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList ref={scrollbarRef} chatSections={chatSections} setSize={setSize} isReachingEnd={isReachingEnd} />
      <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} />
    </Container>
  );
};

export default DirectMessage;
