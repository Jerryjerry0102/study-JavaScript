import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { CollapseButton } from '@components/DMList/styles';
import useSocket from '@hooks/useSocket';
import EachDM from '@components/EachDM';

const DMList = () => {
  const { workspace } = useParams();
  const { data: memberData } = useSWR<IUser[]>(`/api/workspaces/${workspace}/members`, fetcher);

  const [socket] = useSocket(workspace);

  const [dmCollapse, setDmCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);

  const onClickDmCollapse = useCallback(() => {
    setDmCollapse((prev) => !prev);
  }, []);

  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });
    return () => {
      socket?.off('onlineList');
    };
  }, [socket]);

  return (
    <>
      <h2>
        <CollapseButton collapse={dmCollapse} onClick={onClickDmCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Direct Messages</span>
      </h2>
      <div>
        {!dmCollapse &&
          memberData?.map((member) => {
            const isOnline = onlineList.includes(member.id);
            return <EachDM key={member.id} member={member} isOnline={isOnline} />;
          })}
      </div>
    </>
  );
};
export default DMList;
