import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Header } from '@pages/Channel/styles';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import useSWR from 'swr';
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
      if (data.Channel.name === channel && myData.id !== data.UserId) {
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
              console.log('scrollToBottom!', scrollbarRef.current?.getValues());
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
      console.log('채팅방 바뀔 때 한 번만');
      scrollbarRef.current?.scrollToBottom();
    }, 50);
  }, [channel]);

  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal((prev) => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  }, []);

  // if (!userData || !myData) return null;
  if (isLoading) return <div>로딩중</div>;

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container>
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
    </Container>
  );
};

export default Channel;
