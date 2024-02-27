import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authApi } from '../../api/user';
import { useMutation, useQueryClient } from 'react-query';
import { addProfile } from '../../api/mutationFns';

export const PersonalSignUpPage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    id: '',
    password: '',
    nickname: '',
    name: ''
  });
  const isDisabled =
    formState.id === '' || formState.password === '' || formState.nickname === '' || formState.name === '';

  const [profile, setProfile] = useState({
    name: '',
    role: 'guest'
  });

  const { id, password, name, nickname } = formState;

  const queryClient = useQueryClient();
  const mutation = useMutation(addProfile, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('userRoles');
    }
  });

  console.log('guest', mutation);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await authApi.post('/register', {
        id,
        password,
        nickname,
        name
      });

      mutation.mutate({ userId: id, role: 'guest', name });

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
        <Title>회원가입</Title>
        <Input
          type="email"
          name="id"
          onChange={onChangeHandler}
          value={id}
          maxLength={30}
          placeholder="아이디(이메일)를 입력해 주세요"
        />
        <Input
          type="password"
          name="password"
          onChange={onChangeHandler}
          value={password}
          min={4}
          maxLength={15}
          placeholder="비밀번호를 입력해 주세요(4~15글자)"
        />
        <Input type="text" name="name" onChange={onChangeHandler} value={name} placeholder="이름을 입력해 주세요" />
        <Input
          type="text"
          name="nickname"
          onChange={onChangeHandler}
          value={nickname}
          min={1}
          maxLength={10}
          placeholder="닉네임을 입력해 주세요(1~10글자)"
        />
        <Button disabled={isDisabled}>회원가입</Button>
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
  margin-bottom: 3rem;
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

const Button = styled.button`
  background-color: black;
  width: 80%;
  color: white;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 12px 18px;
  border: 0px;
  border-radius: 3px;
  cursor: pointer;
  &[disabled] {
    background-color: #c4c4c4;
    cursor: default;
  }
`;
