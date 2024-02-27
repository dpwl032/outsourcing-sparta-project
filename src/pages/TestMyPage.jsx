import React from 'react';
import styled from 'styled-components';
import { FcLock } from 'react-icons/fc';
import { FcPlanner } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { editProfile } from '../api/mutationFns';
import { getProfile, getInfo } from '../api/queryFns';

const TestMyPage = () => {
  const { data, isLoading, isError } = useQuery('user', getInfo, {
    onSuccess: (data) => {
      console.log('data1', data);
      setSelectedImg(data?.data?.avatar);
    }
  });
  const { data: dbData } = useQuery('userRoles', getProfile);
  const userRole = dbData?.data.find((role) => role.userId === data?.data?.id);

  const [click, setClick] = useState(false);
  const [editingText, setEditingText] = useState('');
  const [selectedImg, setSelectedImg] = useState(data?.data?.avatar ?? '');
  const [file, setFile] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation(editProfile, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user');
    }
  });

  if (isLoading) {
    return <p>...로딩중</p>;
  }

  if (isError) {
    return <p>오류가 발생했습니다. 다시 새로고침 해주세요!</p>;
  }

  if (userRole.role === 'host') {
    alert('개인 회원 계정만 이용할 수 있습니다!');
    return <Navigate to="/home" replace />;
  }

  // const ImgMB = 1024;
  const previewImg = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile.size > 1024 * 1024) {
      alert('최대 1MB까지 업로드 가능합니다.');
      return;
    }
    setFile(imgFile);
    const imgUrl = URL.createObjectURL(imgFile);
    setSelectedImg(imgUrl);
  };

  const onEditDone = () => {
    // TODO: 프로필 변경 요청
    const formData = new FormData();
    if (editingText) {
      formData.append('nickname', editingText);
    }

    formData.append('avatar', file);

    mutation.mutate(formData);
    setClick(false);
  };

  return (
    <>
      <section>
        <MyPageWrap>
          <MyPageContents>
            {/*구분선*/}
            <MyPageUserInfo>
              <p>
                사용자 정보 <FcLock />
              </p>
              <MyPageUserInfoWrap>
                {/*구분선*/}
                <MyPageInfoImgWrap>
                  <label>
                    <MyPageInfoImg>
                      <img
                        size="large"
                        src={selectedImg}
                        style={{ borderRadius: '100%', height: '100%', width: '170px' }}
                      />
                      <input type="file" onChange={previewImg} accept="image/jpg, image/png" />
                    </MyPageInfoImg>
                  </label>
                </MyPageInfoImgWrap>
                {/*구분선*/}
                <div
                  style={{
                    display: 'flex',
                    border: '1px solid black',
                    flexDirection: 'column',
                    width: '60%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px'
                  }}
                >
                  <span> 아이디 : {userRole.userId} </span>
                  <span>이름 : {userRole.name}</span>
                  <span>
                    닉네임 :{' '}
                    {!click ? (
                      <p>{data.data.nickname}</p>
                    ) : (
                      <input
                        defaultValue={data.data.nickname}
                        onChange={(event) => setEditingText(event.target.value)}
                      />
                    )}
                  </span>

                  {!click ? (
                    <button
                      onClick={() => {
                        setClick(true);
                      }}
                    >
                      수정하기
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setClick(false);
                        }}
                      >
                        취소
                      </button>{' '}
                      <button onClick={onEditDone}>수정완료</button>
                    </>
                  )}
                </div>
              </MyPageUserInfoWrap>
            </MyPageUserInfo>
            {/*구분선*/}
            <MyPageReservationNav>
              {data.data.nickname}님의 예약 현황 <FcPlanner />
            </MyPageReservationNav>
            {/*구분선*/}
            <MyPageReservationInfo>
              <div style={{ width: '50%' }}>03/13 ~ 03/14</div>
              <ScheduledClassName>
                클래스 이름 <FcNext />
              </ScheduledClassName>
            </MyPageReservationInfo>
            {/*구분선*/}
            <MyPageLikedClass>
              <p>
                찜목록 <FcLike />
              </p>
              <ul
                style={{
                  border: '1px solid black',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  margin: '1rem'
                }}
              >
                <li style={{ border: '1px solid black', height: '150px' }}>1</li>
                <li style={{ border: '1px solid black' }}>2</li>
                <li style={{ border: '1px solid black' }}>3</li>
                <li style={{ border: '1px solid black', height: '150px' }}>3</li>
                <li style={{ border: '1px solid black' }}>3</li>
                <li style={{ border: '1px solid black' }}>3</li>
              </ul>
            </MyPageLikedClass>
          </MyPageContents>
        </MyPageWrap>
      </section>
    </>
  );
};

export default TestMyPage;

const MyPageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyPageContents = styled.div`
  border: 1px solid black;
  width: 50%;
  height: 1000px;
  margin: 1rem;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const MyPageUserInfo = styled.div`
  width: 80%;
  height: 250px;
`;

const MyPageUserInfoWrap = styled.div`
  display: flex;
  height: 80%;
  margin-top: 10px;
`;

const MyPageInfoImgWrap = styled.div`
  border: 1px solid black;
  width: 40%;

  display: flex;
  justify-content: center;

  & > label > input {
    display: none;
  }

  & input {
    height: 24px;
    outline: none;
    padding: 6px 12px;
  }
`;

const MyPageInfoImg = styled.div`
  border: 1px solid black;
  border-radius: 100%;
  height: 100%;
  width: 170px;
`;

const MyPageReservationNav = styled.div`
  border: 1px solid black;
  width: 80%;
  height: 30px;
  display: flex;
  align-items: center;
`;

const MyPageReservationInfo = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  width: 80%;
  height: 50px;
  display: flex;
  align-items: center;
`;

const ScheduledClassName = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MyPageLikedClass = styled.div`
  border: 1px solid black;
  width: 80%;
  height: 380px;
`;
