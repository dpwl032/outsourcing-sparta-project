import React from 'react';
import styled from 'styled-components';
import { FcLock } from 'react-icons/fc';
import { FcPlanner } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const TestMyPage = () => {
  const [click, setClick] = useState(false);
  const hostAuth = localStorage.getItem('host') ? true : false;

  if (hostAuth) {
    alert('개인 회원 계정만 이용할 수 있습니다!');
    return <Navigate to="/home" replace />;
  }

  const nickname = localStorage.getItem('nickname');
  const userId = localStorage.getItem('userId');
  const name = localStorage.getItem('name');
  const avatar = localStorage.getItem('avatar');

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
                  <MyPageInfoImg>
                    <label>
                      <input type="file" />
                    </label>
                  </MyPageInfoImg>
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
                  <span> 아이디 : {userId} </span>
                  <span>이름 : {name}</span>
                  <span>닉네임 : {click ? { nickname } : <input defaultValue={nickname} />}</span>

                  <button>수정하기</button>
                </div>
              </MyPageUserInfoWrap>
            </MyPageUserInfo>
            {/*구분선*/}
            <MyPageReservationNav>
              {nickname}님의 예약 현황 <FcPlanner />
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
  height: 760px;
  margin: 1rem;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const MyPageUserInfo = styled.div`
  width: 80%;
  height: 200px;
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
