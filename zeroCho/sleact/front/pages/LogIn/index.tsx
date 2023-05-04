import useInput from '@hooks/useInput';
import { Header, Form, Label, Input, Button, LinkContainer, Error } from '@pages/SignUp/styles';
import axios from 'axios';
import React, { FormEvent, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
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
          console.log(res);
        })
        .catch((error) => {
          console.log(error.response);
          setlogInError(error.response.data);
          // setLogInError(error.response?.data?.code === 401);
        });
    },
    [email, password],
  );

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
