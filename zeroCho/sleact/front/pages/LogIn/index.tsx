import useInput from '@hooks/useInput';
import { Header, Form, Label, Input, Button, LinkContainer, Error } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import React, { FormEvent, useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

const Login = () => {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 1000000, // 캐시 유지시간
  }); // 연결관계가 중요
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  // 에러 정의
  const [logInError, setlogInError] = useState(''); // 서버에서 오는 에러

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setlogInError('');
      axios
        .post('http://localhost:3095/api/users/login', { email, password })
        .then((res) => {
          // 기존에 가지고 있던 정보를 넣기 때문에 요청을 안 보내도 됨.
          // 근데 여기 부분은 죽어라 해도 안 됨.
          mutate(res.data, false);
        })
        .catch((error) => {
          console.log(error.response);
          setlogInError(error.response.data);
          // setLogInError(error.response?.data?.code === 401);
        });
    },
    [email, password],
  );

  if (data === undefined) {
    return <div>로딩중...</div>; // 여기에 로딩 중 화면 꾸미면 됨
  }

  if (data) {
    return <Navigate to="/workspace/channel" />;
  }

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

export default Login;
