import { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/user';
import { useQuery } from 'react-query';
import { getProfile } from '../../api/queryFns';

export const SignInPage = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [personalSignInMode, setPersonalSignInMode] = useState(true);
  const [formState, setFormState] = useState({
    id: '',
    password: ''
  });

  const { data: dbData, isLoading, isError } = useQuery('userRoles', getProfile);

  if (isLoading) {
    return <p>...로딩중</p>;
  }

  if (isError) {
    return <p>오류가 발생했습니다. 다시 새로고침 해주세요!</p>;
  }

  const { id, password } = formState;
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setIsDisabled((formState.id === '' || value === '') && (formState.password === '' || value === ''));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (personalSignInMode) {
      //일반 로그인 처리
      try {
        const { data } = await authApi.post('/login', {
          id,
          password
        });

        const { accessToken, avatar, nickname, userId } = data;
        const result = dbData.data.find((item) => item.userId === userId);

        if (result.role === 'host') {
          alert('게스트 계정으로만 로그인이 가능합니다.');
          return;
        }

        if (data.success) {
          // dispatch(login({ accessToken, userId, userPw, userName, userEmail, userNickname, userAvatar }));
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('avatar', avatar);
          localStorage.setItem('nickname', nickname);
          localStorage.setItem('userId', userId);
          localStorage.setItem('name', result.name);
          localStorage.setItem('guest', result.role);

          alert('로그인 성공');
          navigate('/home');
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    } else {
      //업체 로그인 처리
      try {
        const { data } = await authApi.post('/login', {
          id,
          password
        });
        const { accessToken, nickname, userId } = data;
        const result = dbData.data.find((item) => item.userId === userId);

        if (result.role === 'guest') {
          alert('호스트 계정으로만 로그인이 가능합니다.');
          return;
        }

        if (data.success) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('nickname', nickname);
          localStorage.setItem('userId', userId);
          localStorage.setItem('name', result.name);
          localStorage.setItem('host', result.role);
          alert('업체 로그인 성공');
          navigate('/home');
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <Title>{personalSignInMode ? '로그인' : '업체 로그인'}</Title>
        <Input
          onChange={onChangeHandler}
          type="email"
          name="id"
          value={id}
          placeholder="아이디(이메일)를 입력해 주세요"
        />
        <Input
          onChange={onChangeHandler}
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호를 입력해 주세요"
        />
        <Button disabled={isDisabled}>로그인</Button>
        <Toggle>
          <ToggleText>
            <span onClick={() => setPersonalSignInMode((prev) => !prev)}>
              {personalSignInMode ? '업체 로그인' : '로그인'}
            </span>
          </ToggleText>
          <ToggleText>
            <Link to="/signUpMode">회원가입</Link>
          </ToggleText>
        </Toggle>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 30rem;
  height: 27rem;
  border: 1px solid #c4c4c4;
  padding: 1.5rem 0;
  font-size: 0.9rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 4rem;
`;
const Input = styled.input`
  border: none;
  border-bottom: 2px solid #c4c4c4;
  width: 80%;
  display: block;
  margin-bottom: 1rem;
  padding: 1rem 0;
  outline: none;
`;
const Toggle = styled.div`
  display: flex;
  gap: 10rem;
`;

const ToggleText = styled.div`
  text-align: center;
  width: 6rem;
  margin-top: 4rem;
  & span {
    color: lightgray;
    user-select: none;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
  & a {
    color: lightgray;
    text-decoration: none;
    &:hover {
      color: black;
    }
  }
`;

const Button = styled.button`
  background-color: black;
  width: 80%;
  color: white;
  font-size: 1rem;
  margin-top: 4rem;
  padding: 12px 18px;
  border: 0px;
  border-radius: 3px;
  cursor: pointer;
  &[disabled] {
    background-color: #c4c4c4;
    cursor: default;
  }
`;
