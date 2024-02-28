import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { addBusinessInfo } from '../api/crudServiece';
import styled from 'styled-components';
import { Form } from 'react-router-dom';
import { getProfile, getInfo } from '../api/queryFns';
import { Navigate } from 'react-router-dom';
function AddBusinessInfo() {
  const onSuccess = () => {
    queryClient.invalidateQueries('businessInfos');
    alert('등록이 완료되었습니다!');

    setTitle('');
    setTime('');
    setPrice('');
    setAddressLat('');
    setAddressLng('');
    return <Navigate to="/home" replace />;
  };

  const onError = (error) => {
    console.error('데이터 전송 오류:', error);
    alert('등록 중 오류가 발생했습니다.');
  };

  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useQuery('user', getInfo);
  const { data: dbData, isLoading: isDbDataLoading, isError: isDbDataError } = useQuery('userRoles', getProfile);

  const mutation = useMutation(addBusinessInfo, {
    onSuccess,
    onError
  });

  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [addressLat, setAddressLat] = useState('');
  const [addressLng, setAddressLng] = useState('');
  const [youtube, setYoutube] = useState('');
  const queryClient = useQueryClient();

  if (isUserLoading || isDbDataLoading) {
    return <p>...로딩중</p>;
  }

  if (isUserError || isDbDataError) {
    return <p>오류가 발생했습니다. 다시 새로고침 해주세요!</p>;
  }

  const userRole = dbData?.data.find((role) => role.userId === userData?.data?.id);

  if (userRole?.role === 'guest') {
    alert('업체 계정만 이용할 수 있습니다!');
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('로그인 정보를 찾을 수 없습니다.');
      return;
    }

    mutation.mutate({
      createdBy: userId,
      title,
      time,
      price,
      addressLat,
      addressLng,
      youtube
    });
  };

  const Form = styled.form`
    display: block;
    align-items: center;
    justify-content: center;
  `;

  const Input = styled.input`
    border: 1px solid gray;
    width: 100%;
    margin-bottom: 16px;
    padding: 12px 0;
    outline: none;
  `;

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="클래스 제목을 입력해주세요."
      />
      <Input type="date" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <Input
        type="text"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="가격 정보를 입력해주세요."
      />

      {/* test-예지추가 */}

      <Input
        type="text"
        name="address"
        value={addressLat}
        onChange={(e) => setAddressLat(e.target.value)}
        placeholder="업체 주소지 입력해주세요.(lat) 30)"
      />

      <Input
        type="text"
        name="address"
        value={addressLng}
        onChange={(e) => setAddressLng(e.target.value)}
        placeholder="업체 주소지를 입력해주세요.(lng ) 127)"
      />
      <Input
        type="text"
        name="address"
        value={youtube}
        onChange={(e) => setYoutube(e.target.value)}
        placeholder="유튜브 주소를 입력해주세요."
      />
      <button type="submit">등록</button>
    </Form>
  );
}

export default AddBusinessInfo;
