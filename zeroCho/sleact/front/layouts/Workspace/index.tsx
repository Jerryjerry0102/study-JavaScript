import fetcher from '@utils/fetcher';
import React, { FC, ReactNode, useCallback } from 'react';
import { Navigate } from 'react-router';
import axios from 'axios';
import useSWR from 'swr';

interface P {
  children: ReactNode;
}

const Workspace: FC<P> = ({ children }) => {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout')
      .then(() => {
        mutate(false, false); // 기존에 가지고 있던 정보를 넣기 때문에 요청을 안 보내도 됨
      })
      .catch(() => {});
  }, []);

  if (!data) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
