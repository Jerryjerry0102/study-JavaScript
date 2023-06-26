import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import useSWR from 'swr';

interface Props {
  member: IUser;
  isOnline: boolean;
}
const EachDM: FC<Props> = ({ member, isOnline }) => {
  const { workspace } = useParams();
  const { data: userData } = useSWR<IUser>('/api/users', fetcher);
  const date = localStorage.getItem(`${workspace}${member.id}`) || 0;
  const { data: countData, mutate: mutateCount } = useSWR(
    `/api/workspaces/${workspace}/dms/${member.id}/unreads?after=${date}`,
    fetcher,
  );
  const pathname = decodeURI(useLocation().pathname);

  useEffect(() => {
    if (pathname === `/workspace/${workspace}/dm/${member.id}`) {
      mutateCount(0, { revalidate: false });
    }
  }, [member.id, pathname, workspace]);

  return (
    <NavLink
      key={member.id}
      className={({ isActive }) => (isActive ? 'selected' : 'not')}
      to={`/workspace/${workspace}/dm/${member.id}`}
    >
      <i
        className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence ${
          isOnline ? 'c-presence--active c-icon--presence-online' : 'c-icon--presence-offline'
        }`}
        aria-hidden="true"
        data-qa="presence_indicator"
        data-qa-presence-self="false"
        data-qa-presence-active="false"
        data-qa-presence-dnd="false"
      />
      <span>{member.nickname}</span>
      {member.id === userData?.id && <span>&nbsp;(나)</span>}
      {countData > 0 && <span className="count">{countData}</span>}
    </NavLink>
  );
};

export default EachDM;
