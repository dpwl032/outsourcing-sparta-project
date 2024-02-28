import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { addBusinessInfo } from '../api/crudServiece';
import styled from 'styled-components';
import { Form } from 'react-router-dom';
import { getProfile, getInfo } from '../api/queryFns';
import { Navigate } from 'react-router-dom';
function AddBusinessInfo() {
  console.log('test');

  // const onSuccess = () => {
  //   queryClient.invalidateQueries('businessInfos');
  //   alert('등록이 완료되었습니다!');

  //   setTitle('');
  //   setTime('');
  //   setPrice('');
  //   setAddressLat('');
  //   setAddressLng('');
  //   setContents('');
  //   setYoutube('');
  //   return <Navigate to="/home" replace />;
  // };

  // const onError = (error) => {
  //   console.error('데이터 전송 오류:', error);
  //   alert('등록 중 오류가 발생했습니다.');
  // };

  const [preview, setPreview] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [addressLat, setAddressLat] = useState('');
  const [addressLng, setAddressLng] = useState('');
  const [youtube, setYoutube] = useState('');
  const queryClient = useQueryClient();

  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useQuery('user', getInfo);
  const { data: dbData, isLoading: isDbDataLoading, isError: isDbDataError } = useQuery('userRoles', getProfile);

  // const mutation = useMutation(addBusinessInfo, {
  //   onSuccess,
  //   onError
  // });

  const mutation = useMutation(addBusinessInfo);

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

    console.log(preview);

    mutation.mutate({
      createdBy: userId,
      title,
      time,
      contents,
      price,
      addressLat,
      addressLng,
      youtube,
      selectedImg
    });
  };

  const previewImg = (e) => {
    const imgFile = e.target.files[0];
    setPreview(imgFile);
    const imgUrl = URL.createObjectURL(imgFile);
    setSelectedImg(imgUrl);

    console.log('aaaa', imgFile);
  };

  const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5rem 0 5rem;
  `;

  const Input = styled.input`
    border: 1px solid gray;
    width: 30%;
    margin-bottom: 16px;
    padding: 12px 0;
    outline: none;
  `;

  const Button = styled.button`
    background-color: black;
    width: 30%;
    color: white;
    font-size: 16px;
    padding: 12px 18px;
    border-radius: 5px;
    cursor: pointer;
  `;

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="클래스 제목을 입력해주세요."
      />
      <Input type="date" name="time" value={time} onChange={(e) => setTime(e.target.value)} />

      <Input
        type="text"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        placeholder="클래스 내용을 입력해주세요."
      />
      <Input
        type="file"
        name="preview"
        value={preview}
        onChange={previewImg}
        accept="image/*"
        placeholder="클래스 사진을 입력해주세요."
      />

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
      <Button type="submit">등록</Button>
    </Form>
  );
}

export default AddBusinessInfo;
