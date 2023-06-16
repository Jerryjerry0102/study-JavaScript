import React, { FC, forwardRef, MutableRefObject, useCallback, useRef } from 'react';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { IChat, IDM } from '@typings/db';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface Props {
  chatSections: { [key: string]: (IChat | IDM)[] };
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>;
  isReachingEnd: boolean;
}

const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, setSize, isReachingEnd }, scrollbarRef) => {
  const onScroll = useCallback(
    (values: { scrollTop: number; scrollHeight: number }) => {
      if (values.scrollTop === 0 && !isReachingEnd) {
        console.log('가장 위');
        // 데이터 추가 로딩
        setSize((prev) => prev + 1).then(() => {
          // 스크롤 위치 유지
          const current = (scrollbarRef as MutableRefObject<Scrollbars>)?.current;
          if (current) {
            current.scrollTop(current.getScrollHeight() - values.scrollHeight);
          }
        });
      }
    },
    [isReachingEnd, scrollbarRef, setSize],
  );

  return (
    <ChatZone>
      <Scrollbars ref={scrollbarRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats?.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
});

export default ChatList;
