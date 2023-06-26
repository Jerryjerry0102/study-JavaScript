import { IChannel } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import useSWR from 'swr';

interface Props {
  channel: IChannel;
}
const EachChannel: FC<Props> = ({ channel }) => {
  const { workspace } = useParams();
  const date = localStorage.getItem(`${workspace}${channel.name}`) || 0;
  const { data: countData, mutate: mutateCount } = useSWR(
    `/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${date}`,
    fetcher,
  );
  const pathname = decodeURI(useLocation().pathname);

  useEffect(() => {
    if (pathname === `/workspace/${workspace}/channel/${channel.name}`) {
      mutateCount(0, { revalidate: false });
    }
  }, [channel.name, pathname, workspace]);

  return (
    <NavLink
      key={channel.id}
      className={({ isActive }) => (isActive ? 'selected' : 'not')}
      to={`/workspace/${workspace}/channel/${channel.name}`}
    >
      <span># {channel.name}</span>
      {countData > 0 && <span className="count">{countData}</span>}
    </NavLink>
  );
};

export default EachChannel;
