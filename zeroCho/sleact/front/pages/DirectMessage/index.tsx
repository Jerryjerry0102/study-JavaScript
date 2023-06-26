import React, { DragEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import gravatar from 'gravatar';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { useParams } from 'react-router';
import fetcher from '@utils/fetcher';
import { Container, DragOver, Header } from '@pages/DirectMessage/styels';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { toast } from 'react-toastify';
import makeSection from '@utils/makeSection';
import Scrollbars from 'react-custom-scrollbars-2';
import { IDM } from '@typings/db';
import useSocket from '@hooks/useSocket';

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

  const [socket, disconnect] = useSocket(workspace);

  const [dragOver, setDragOver] = useState(false);

  const onSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!chat || !chat.trim()) return;
      if (!isEmpty) {
        const savedChat = chat;
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
          localStorage.setItem(`${workspace}${id}`, new Date().getTime().toString());
          setChat('');
          scrollbarRef.current?.scrollToBottom();
        });
      }
      axios
        .post(`/api/workspaces/${workspace}/dms/${id}/chats`, { content: chat })
        .then(() => {
          mutateChat();
          scrollbarRef.current?.scrollToBottom();
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    },
    [chat, chatData, id, myData, userData, workspace],
  );

  const onMessage = useCallback(
    (data: IDM) => {
      // id는 상대방 아이디
      if (data.SenderId === Number(id) && myData.id !== Number(id)) {
        mutateChat(
          (prev) => {
            prev?.[0].unshift(data);
            return prev;
          },
          { revalidate: true },
        ).then(() => {
          if (scrollbarRef.current) {
            if (
              scrollbarRef.current.getScrollHeight() <
              scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
            ) {
              scrollbarRef.current?.scrollToBottom();
            }
          }
        });
      }
    },
    [id, mutateChat, myData.id],
  );

  useEffect(() => {
    socket?.on('dm', onMessage);
    return () => {
      socket?.off('dm', onMessage);
    };
  }, [socket, onMessage]);

  // 로딩 시 스크롤바 제일 아래로
  useEffect(() => {
    setTimeout(() => {
      scrollbarRef.current?.scrollToBottom();
    }, 50);
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`${workspace}${id}`, new Date().getTime().toString());
  }, [workspace, id]);

  const onDrop = useCallback(
    (e: DragEvent) => {
      console.log('File(s) dropped');

      // Prevent default behavior (Prevent file from being opened)
      e.preventDefault();

      const formData = new FormData();

      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...(e.dataTransfer.items as unknown as DataTransferItem[])].forEach((item, i) => {
          // If dropped items aren't files, reject them
          if (item.kind === 'file') {
            const file = item.getAsFile();
            if (!file) return;
            console.log(`… item[${i}].name = ${file.name}`);
            formData.append('image', file);
          }
        });
      } else {
        // Use DataTransfer interface to access the file(s)
        [...(e.dataTransfer.files as unknown as File[])].forEach((file, i) => {
          console.log(`… file[${i}].name = ${file.name}`);
          formData.append('image', file);
        });
      }
      axios.post(`/api/workspaces/${workspace}/dms/${id}/images`, formData).then(() => {
        localStorage.setItem(`${workspace}${id}`, new Date().getTime().toString());
        setDragOver(false);
        mutateChat();
      });
    },
    [id, workspace],
  );

  const onDragOver = useCallback((e: DragEvent) => {
    console.log('File(s) in drop zone');
    e.preventDefault();
    setDragOver(true);
  }, []);

  // if (!userData || !myData) return null;
  if (isLoading) return <div>로딩중</div>;

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container onDrop={onDrop} onDragOver={onDragOver}>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList ref={scrollbarRef} chatSections={chatSections} setSize={setSize} isReachingEnd={isReachingEnd} />
      <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} />
      {dragOver && <DragOver>업로드</DragOver>}
    </Container>
  );
};

export default DirectMessage;
