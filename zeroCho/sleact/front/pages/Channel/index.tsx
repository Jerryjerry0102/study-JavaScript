import React, { DragEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Container, DragOver, Header } from '@pages/Channel/styles';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import useSWR, { mutate } from 'swr';
import useSWRInfinite from 'swr/infinite';
import fetcher from '@utils/fetcher';
import makeSection from '@utils/makeSection';
import useSocket from '@hooks/useSocket';
import Scrollbars from 'react-custom-scrollbars-2';
import { IChannel, IChat, IUser } from '@typings/db';
import axios from 'axios';
import { toast } from 'react-toastify';
import InviteChannelModal from '@components/InviteChannelModal';

const Channel = () => {
  const { workspace, channel } = useParams();
  const { data: myData } = useSWR(`/api/users`, fetcher);
  const { data: channelData } = useSWR<IChannel>(`/api/workspaces/${workspace}/channels/${channel}`, fetcher);
  const { data: channelMembersData, isLoading } = useSWR<IUser[]>(
    `/api/workspaces/${workspace}/channels/${channel}/members`,
    fetcher,
  );
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<IChat[]>(
    (size) => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=${size + 1}`,
    fetcher,
  );
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;

  const [chat, onChangeChat, setChat] = useInput('');
  const scrollbarRef = useRef<Scrollbars>(null);

  const [socket, disconnect] = useSocket(workspace);

  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const onSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!chat || !chat.trim() || !channelData) return;
      if (!isEmpty) {
        const savedChat = chat;
        mutateChat(
          (prev) => {
            prev?.[0].unshift({
              id: (chatData?.[0][0]?.id || 0) + 1,
              content: savedChat,
              UserId: myData.id,
              User: myData,
              ChannelId: channelData.id,
              Channel: channelData,
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
        .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, { content: chat })
        .then(() => {
          localStorage.setItem(`${workspace}${channel}`, new Date().getTime().toString());
          mutateChat();
          scrollbarRef.current?.scrollToBottom();
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    },
    [channel, channelData, chat, chatData, isEmpty, mutateChat, myData, setChat, workspace],
  );

  const onMessage = useCallback(
    (data: IChat) => {
      // id는 상대방 아이디
      if (
        data.Channel.name === channel &&
        (data.content.startsWith('uploads\\') || data.content.startsWith('uploads/') || myData.id !== data.UserId)
      ) {
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
    [channel, mutateChat, myData.id],
  );

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  // 로딩 시 스크롤바 제일 아래로
  useEffect(() => {
    setTimeout(() => {
      scrollbarRef.current?.scrollToBottom();
    }, 50);
  }, [channel]);

  useEffect(() => {
    localStorage.setItem(`${workspace}${channel}`, new Date().getTime().toString());
  }, [workspace, channel]);

  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal((prev) => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  }, []);

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
      axios.post(`/api/workspaces/${workspace}/channels/${channel}/images`, formData).then(() => {
        localStorage.setItem(`${workspace}${channel}`, new Date().getTime().toString());
        setDragOver(false);
        mutateChat();
      });
    },
    [channel, workspace],
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
        <span>#{channel}</span>
        <div className="header-right">
          <span>{channelMembersData?.length}</span>
          <button
            onClick={onClickInviteChannel}
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            data-sk="tooltip_parent"
            type="button"
          >
            <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
          </button>
        </div>
      </Header>
      <ChatList ref={scrollbarRef} chatSections={chatSections} setSize={setSize} isReachingEnd={isReachingEnd} />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
      <InviteChannelModal
        show={showInviteChannelModal}
        setShow={setShowInviteChannelModal}
        onCloseModal={onCloseModal}
      />
      {dragOver && <DragOver>업로드</DragOver>}
    </Container>
  );
};

export default Channel;
