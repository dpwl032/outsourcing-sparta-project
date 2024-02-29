import React from 'react';
import styled from 'styled-components';
import { FcLock } from 'react-icons/fc';
import { FcPlanner } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';

import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { editProfile } from '../api/mutationFns';
import { getProfile, getInfo, getReviews } from '../api/queryFns';
import basicAvatar from '../assets/img/user.png';
import { CustomButton } from '../components/CustomButton';

const MyPage = () => {
  const queryClient = useQueryClient();

  /** Queries */
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError
  } = useQuery('user', getInfo, {
    onSuccess: (data) => {
      setSelectedImg(data?.data?.avatar ?? basicAvatar);
    }
  });
  const { data: dbData, isLoading: isDbDataLoading, isError: isDbDataError } = useQuery('userRoles', getProfile);

  const nowUser = localStorage.getItem('userId');
  const { data: rvData } = useQuery('reviews', getReviews);
  const findData = rvData?.data.filter((item) => item.createdBy === nowUser);

  /** Mutations */
  const mutation = useMutation(editProfile, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user');
    },
    onError: () => {
      alert('처리 중 오류가 발생했습니다.');
    }
  });

  /** states */
  const [click, setClick] = useState(false);
  const [editingText, setEditingText] = useState('');
  const [selectedImg, setSelectedImg] = useState(userData?.data?.avatar ?? '');
  const [file, setFile] = useState(null);

  if (isUserLoading || isDbDataLoading) {
    return <p>...로딩중</p>;
  }

  if (isUserError || isDbDataError) {
    return <p>오류가 발생했습니다. 다시 새로고침 해주세요!</p>;
  }

  const userRole = dbData?.data.find((role) => role.userId === userData?.data?.id);

  if (userRole.role === 'host') {
    alert('호스트 계정은 접근 권한이 없습니다.');
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
    localStorage.setItem('avatar', imgUrl);
  };

  const onEditDone = () => {
    //  프로필 변경 요청
    const formData = new FormData();

    // if (editingText === userData.data.nickname || !setSelectedImg) {
    //   alert('마저 수정해주세요!');
    //   return;
    // }

    if (editingText) {
      formData.append('nickname', editingText);
    }

    formData.append('avatar', file);

    mutation.mutate(formData);
    setClick(false);
    localStorage.setItem('nickname', editingText);

    alert('변경완료!');
  };

  return (
    <>
      <section>
        <MyPageWrap>
          <MyPageContents>
            {/*구분선*/}
            <MyPageUserInfo>
              <p style={{ fontSize: '25px', display: 'flex', justifyContent: 'center' }}>
                MY
                <FcLock /> <p></p>
              </p>
              <MyPageUserInfoWrap>
                {/*구분선*/}
                <MyPageInfoImgWrap>
                  <label>
                    <MyPageInfoImg>
                      <img
                        size="large"
                        src={selectedImg}
                        style={{ borderRadius: '100%', height: '100%', width: '200px' }}
                      />
                      <input type="file" onChange={previewImg} accept="image/jpg, image/png" />
                    </MyPageInfoImg>
                  </label>
                </MyPageInfoImgWrap>
                {/*구분선*/}
                <div
                  style={{
                    display: 'flex',

                    flexDirection: 'column',
                    width: '60%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '20%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ color: 'gray' }}> [{userRole.role} 계정입니다]</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '20%',
                      display: 'flex',

                      alignItems: 'center'
                    }}
                  >
                    <div
                      style={{
                        width: '60px',
                        border: '1px solid #6b16ee',
                        backgroundColor: ' #6b16ee',
                        height: '24px',
                        textAlign: 'center',
                        borderRadius: '20px',
                        marginLeft: '30px',
                        marginRight: '30px',
                        color: 'white'
                      }}
                    >
                      ID
                    </div>
                    <span> {userRole.userId} </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '20%',
                      display: 'flex',

                      alignItems: 'center'
                    }}
                  >
                    <div
                      style={{
                        width: '60px',
                        border: '1px solid #6b16ee',
                        backgroundColor: ' #6b16ee',
                        height: '24px',
                        textAlign: 'center',
                        borderRadius: '20px',
                        marginLeft: '30px',
                        marginRight: '30px',

                        color: 'white'
                      }}
                    >
                      이름
                    </div>
                    <span> {userRole.name}</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '20%',
                      display: 'flex',
                      display: 'flex',

                      alignItems: 'center'
                    }}
                  >
                    <div
                      style={{
                        width: '60px',
                        border: '1px solid #6b16ee',
                        backgroundColor: ' #6b16ee',
                        height: '24px',
                        textAlign: 'center',
                        borderRadius: '20px',
                        marginLeft: '30px',
                        marginRight: '30px',

                        color: 'white'
                      }}
                    >
                      닉네임
                    </div>

                    {!click ? (
                      <p>{userData.data.nickname}</p>
                    ) : (
                      <input
                        style={{ height: '27px' }}
                        defaultValue={userData.data.nickname}
                        onChange={(event) => setEditingText(event.target.value)}
                      />
                    )}
                  </div>
                  <div style={{ gap: '10px', display: 'flex', marginLeft: '80px' }}>
                    {' '}
                    {!click ? (
                      <CustomButton
                        text="수정하기"
                        onClick={() => {
                          setClick(true);
                        }}
                      />
                    ) : (
                      <>
                        <CustomButton
                          text="취소"
                          onClick={() => {
                            setClick(false);
                          }}
                        />

                        <CustomButton text="수정완료" onClick={onEditDone} />
                      </>
                    )}
                  </div>
                </div>
              </MyPageUserInfoWrap>
            </MyPageUserInfo>
            {/*구분선*/}
            <MyPageReservationNav>
              {userRole.name}님의 예약 현황 <FcPlanner />
            </MyPageReservationNav>
            {/*구분선*/}
            <MyPageReservationInfo>
              <div style={{ width: '50%' }}>
                <p style={{ marginLeft: '20px', fontWeight: 'bolder' }}>현재 신청한 목록이 없습니다!</p>
              </div>
              <ScheduledClassName>
                클래스 이름 <FcNext />
              </ScheduledClassName>
            </MyPageReservationInfo>
            {/*구분선*/}
            <MyPageLikedClass>
              <p>리뷰 목록</p>
              <ul
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  margin: '1rem'
                }}
              >
                {findData.map((item) => (
                  <>
                    <li style={{ border: '1px solid black', height: '150px', borderRadius: '10px' }}>
                      <p>리뷰내용 : {item.content}</p>
                    </li>
                  </>
                ))}
              </ul>
            </MyPageLikedClass>
          </MyPageContents>
        </MyPageWrap>
      </section>
    </>
  );
};

export default MyPage;

const MyPageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyPageContents = styled.div`
  border: 2px solid black;
  border-radius: 15px;
  width: 50%;
  height: 850px;
  margin: 1rem;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #f6f6f6;
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
  width: 40%;

  display: flex;
  justify-content: center;
`;

const MyPageInfoImg = styled.div`
  border: 2px solid gray;
  border-radius: 100%;
  height: 100%;
  width: 200px;
  & > input {
    display: none;
  }

  & input {
    height: 24px;
    outline: none;
    padding: 6px 12px;
  }
`;

const MyPageReservationNav = styled.div`
  width: 80%;
  height: 30px;
  display: flex;
  align-items: center;
  font-weight: bolder;
`;

const MyPageReservationInfo = styled.div`
  border: 2px solid #424242;
  border-radius: 20px;
  width: 80%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: white;
`;

const ScheduledClassName = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #cec9c9;
`;

const MyPageLikedClass = styled.div`
  font-weight: bolder;
  width: 80%;
  height: 380px;
`;
