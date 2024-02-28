import React, { useState } from 'react';
import useInput from '../hooks/useInput';
import { addBusinessInfo } from '../api/mutationFns';
import { getProfile, getInfo } from '../api/queryFns';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RegisterBusinessInfo = () => {
  /** Queries */
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useQuery('user', getInfo);
  const { data: dbData, isLoading: isDbDataLoading, isError: isDbDataError } = useQuery('userRoles', getProfile);

  /** Mutations */
  const mutation = useMutation(addBusinessInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('businessInfo');
    }
  });

  /** states */
  const [title, onChangeClassTitleHandler] = useInput();
  const [contents, onChangeClassContentHandler] = useInput();
  const [contentsImg, setContentsImg] = useState(null);
  const [price, onChangeClassPriceHandler] = useInput();
  const [time, onChangeClassDateHandler] = useInput();
  const [addressLat, onLatMapHandler] = useInput();
  const [addressLng, onLngMapHandler] = useInput();
  const [addressName, onAddressName] = useInput();
  const [youtubeId, onYoutubeIdHandler] = useInput();
  const [file, setFile] = useState(null);

  if (isUserLoading || isDbDataLoading) {
    return <p>...로딩중</p>;
  }

  if (isUserError || isDbDataError) {
    return <p>오류가 발생했습니다. 다시 새로고침 해주세요!</p>;
  }

  const userRole = dbData?.data.find((role) => role.userId === userData?.data?.id);

  if (userRole.role === 'guest') {
    alert('업체 계정만 이용할 수 있습니다!');
    return <Navigate to="/home" replace />;
  }

  const onChangeClassImgHandler = (e) => {
    const imgFile = e.target.files[0];
    console.log(imgFile);
    if (imgFile.size > 1024 * 1024) {
      alert('최대 1MB까지 업로드 가능합니다.');
      return;
    }
    setFile(imgFile);
    const imgUrl = URL.createObjectURL(imgFile);
    setContentsImg(imgUrl);
  };
  const onClassSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!title || !contents || !contentsImg || !price || !time || !addressLng || !addressLat || !addressName) {
      alert('빈 곳없이 작성해주세요!');
      return;
    }

    formData.append('title', title);
    formData.append('contents', contents);
    formData.append('contentsImg', contentsImg);
    formData.append(' price', price);
    formData.append(' time', time);
    formData.append('  addressLng', addressLng);
    formData.append('addressLat', addressLat);
    formData.append('addressName', addressName);
    formData.append('youtubeId', youtubeId);
    mutation.mutate(formData);
    // mutation.mutate({
    //   title,
    //   contentsImg,
    //   contents,
    //   price,
    //   time,
    //   addressLng,
    //   addressLat,
    //   addressName,
    //   youtubeId
    // });

    alert('클래스 등록이 완료됐습니다');
    navigate('/home');
  };
  return (
    <div>
      <p>클래스 만들기</p>
      <ClassForm onSubmit={onClassSubmitHandler}>
        제목 : <ClassInput type="text" value={title} onChange={onChangeClassTitleHandler} />
        <br />
        내용 : <ClassInput type="text" value={contents} onChange={onChangeClassContentHandler} />
        <br />
        대표사진 :<ClassInput type="file" onChange={onChangeClassImgHandler} />
        <br />
        금액 : <ClassInput type="text" value={price} onChange={onChangeClassPriceHandler} />
        <br />
        스케줄 :<ClassInput type="date" value={time} onChange={onChangeClassDateHandler} />
        <br />
        주소1 :<ClassInput type="text" value={addressLat} onChange={onLatMapHandler} placeholder="35" />
        <br />
        주소2 :<ClassInput type="text" value={addressLng} onChange={onLngMapHandler} placeholder="120" />
        <br />
        주소이름 : <ClassInput type="text" value={addressName} onChange={onAddressName} />
        <br />
        유튜브 id : <ClassInput type="text" value={youtubeId} onChange={onYoutubeIdHandler} />
        <ClassButton>등록</ClassButton>
        <br />
      </ClassForm>
    </div>
  );
};

export default RegisterBusinessInfo;

const ClassForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5rem 0 5rem;
`;

const ClassInput = styled.input`
  border: 1px solid gray;
  width: 40%;
  margin-bottom: 16px;
  padding: 12px 0;
  outline: none;
`;

const ClassButton = styled.button`
  background-color: black;
  width: 30%;
  color: white;
  font-size: 16px;
  padding: 12px 18px;
  border-radius: 5px;
  cursor: pointer;
`;
