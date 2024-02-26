import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authApi } from '../../api/user';

export const BusinessSignUpPage = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [formState, setFormState] = useState({
    id: '',
    password: '',
    businessname: '',
    businessnumber: ''
  });

  const { id, password, businessname, businessnumber } = formState;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setIsDisabled(value === '' || password === '');
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await authApi.post('/register', {
        id,
        password,
        businessname,
        businessnumber
      });
      if (data.success) {
        alert('회원가입이 완료되었습니다');
        navigate('/signIn');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <Title>업체 회원가입</Title>
        <Input name="id" onChange={onChangeHandler} value={id} placeholder="아이디(이메일)를 입력해 주세요" />
        <Input name="password" onChange={onChangeHandler} value={password} placeholder="비밀번호를 입력해 주세요" />
        <Input
          name="businessname"
          onChange={onChangeHandler}
          value={businessname}
          placeholder="업체 이름을 입력해 주세요"
        />
        <Input
          name="businessnumber"
          onChange={onChangeHandler}
          value={businessnumber}
          placeholder="업체 전화번호를 입력해 주세요"
        />
        <Button disabled={isDisabled}>회원가입</Button>
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
