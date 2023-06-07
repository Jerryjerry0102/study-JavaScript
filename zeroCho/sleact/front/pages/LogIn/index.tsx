import useInput from '@hooks/useInput';
import { Header, Form, Label, Input, Button, LinkContainer, Error } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import React, { FormEvent, useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

const LogIn = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR('/api/users', fetcher, { dedupingInterval: 1000000 });
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  // Error
  const [logInError, setLogInError] = useState('');

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (email && password) {
        axios
          .post('/api/users/login', { email, password })
          .then(() => mutate())
          .catch((err) => setLogInError(err.response.data));
      } else {
        setLogInError('입력사항을 모두 적었는지 확인해주세요');
      }
    },
    [email, mutate, password],
  );

  if (isLoading) return <div>로딩중</div>;

  if (data) return <Navigate to="/workspace/sleact/channel/일반" />;

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>{logInError}</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
