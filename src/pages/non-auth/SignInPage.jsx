import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../../redux/modules/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/user';
import { jsonDb } from '../../api/user';

export const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [personalSignInMode, setPersonalSignInMode] = useState(true);
  const [formState, setFormState] = useState({
    id: '',
    password: '',
    name: '',
    nickname: '',
    role: ''
  });

  const { id, password } = formState;
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setIsDisabled(value === '' || password === '');
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

        console.log('회원', data);

        const { jsonData } = await jsonDb.get('/userRoles');
        console.log('그외', jsonData);

        const { accessToken, userId, nickname } = data;
        if (data.success) {
          dispatch(login({ accessToken, userId, nickname, jsonData }));
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
        console.log('업체', data);
        const { accessToken, userId, nickname } = data;
        if (data.success) {
          dispatch(login({ accessToken, userId, nickname }));
          alert('업체 로그인 성공');
          navigate('/home');
        }
      } catch (err) {
        console.log('에러', err);
        alert(err.response.data.message);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <Title>{personalSignInMode ? '로그인' : '업체 로그인'}</Title>
        <Input onChange={onChangeHandler} name="id" value={id} placeholder="아이디(이메일)를 입력해 주세요" />
        <Input onChange={onChangeHandler} name="password" value={password} placeholder="비밀번호를 입력해 주세요" />
        {/* <Button disabled={isDisabled}>로그인</Button> */}
        <Button>로그인</Button>
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
  background-color: lightgray;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  background-color: white;
  width: 500px;
  border-radius: 12px;
  padding: 12px;
  font-size: 16px;
`;
const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 24px;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  width: 100%;
  display: block;
  margin-bottom: 16px;
  padding: 12px 0;
  outline: none;
`;
const Toggle = styled.div`
  display: flex;
`;

const ToggleText = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 24px;
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
  width: 100%;
  color: white;
  font-size: 16px;
  padding: 12px 18px;
  border-radius: 5px;
  cursor: pointer;
  &[disabled] {
    background-color: gray;
    cursor: default;
  }
`;
