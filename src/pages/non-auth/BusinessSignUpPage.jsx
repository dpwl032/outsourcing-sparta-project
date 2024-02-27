import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authApi } from '../../api/user';
import { useMutation, useQueryClient } from 'react-query';
import { addProfile } from '../../api/mutationFns';

export const BusinessSignUpPage = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [formState, setFormState] = useState({
    id: '',
    password: '',
    businessnumber: '',
    businessname: ''
  });
  const [profile, setProfile] = useState({
    name: '',
    role: 'host'
  });
  const { id, password, businessname, businessnumber } = formState;

  //머니풀 url에 들어가지 않는 값  최신화하기
  const queryClient = useQueryClient();
  const mutation = useMutation(addProfile, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('userRoles');
    }
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setIsDisabled(value === '' || password === '');
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await authApi.post('/register', {
        id,
        password,
        nickname: businessnumber
      });

      //머니풀 url에 들어가지 않는 값 추가하기
      mutation.mutate({ userId: id, role: 'host', name: businessname });

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
        <Input
          type="email"
          name="id"
          onChange={onChangeHandler}
          value={id}
          placeholder="아이디(이메일)를 입력해 주세요"
        />
        <Input
          type="password"
          name="password"
          onChange={onChangeHandler}
          value={password}
          placeholder="비밀번호를 입력해 주세요"
        />
        <Input
          type="text"
          name="businessname"
          onChange={onChangeHandler}
          value={businessname}
          placeholder="업체 이름을 입력해 주세요"
        />
        <Input
          type="tel"
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
