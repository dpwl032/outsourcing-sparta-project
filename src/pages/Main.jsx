import React from 'react';
import styled from 'styled-components';
import user from '../assets/img/user.jpg';
import host from '../assets/img/host.jpg';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <MainWrap>
        {/* 컨텐츠1*/}
        <MainContentsWrap>
          <MainContentsItem>
            <MainContentsItemNav>JOIN</MainContentsItemNav>
            <MainContentsFigure>
              <MainContentsImg src={user} />
            </MainContentsFigure>
            <MainContentsDetail>
              <MainFigcaptionP>봄의 새로운 시작을 응원해요!</MainFigcaptionP>
              <span>
                어떻게 시작해야 할지 모르겠다면 모든 길을 [로고]로 통합니다. 베이킹, 커리어, 등산 어떤 취미든 [로고]와
                함께잖아요.
              </span>
              <Link to="/home">
                <MainUnderLineP>클래스 신청</MainUnderLineP>
              </Link>
            </MainContentsDetail>
          </MainContentsItem>
        </MainContentsWrap>

        {/* 컨텐츠2*/}
        <AnotherMainContentsWrap>
          <MainContentsItem>
            <MainContentsItemNav>HOST</MainContentsItemNav>
            <MainContentsFigure>
              <MainContentsImg src={host} />
            </MainContentsFigure>
            <MainContentsDetail>
              <MainFigcaptionP>작가님의 재능을 나누고싶다면!</MainFigcaptionP>
              <span>
                작가님의 재능을 나누고 함께하는 것, 이 두가지에만 집중하세요. 수강생 모집, 스케쥴 관리, 홍보는
                걱정마세요. [로고]와 함께잖아요.
              </span>
              <Link to="/">
                <MainUnderLineP> 클래스 오픈</MainUnderLineP>
              </Link>
            </MainContentsDetail>
          </MainContentsItem>
        </AnotherMainContentsWrap>
      </MainWrap>
    </>
  );
};

export default Main;

const MainWrap = styled.div`
  display: flex;
`;

const MainContentsWrap = styled.div`
  width: 50%;
  height: 750px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnotherMainContentsWrap = styled.div`
  width: 50%;
  height: 750px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f4f2;
`;

const MainContentsItem = styled.div`
  width: 80%;
  height: 90%;
`;

const MainContentsItemNav = styled.div`
  height: 10%;
  font-weight: bolder;
  font-size: 30px;
`;

const MainContentsFigure = styled.div`
  height: 70%;
  width: 530px;
  overflow: hidden;
  /* align-items: center;
  justify-content: center; */
`;

const MainContentsImg = styled.img`
  width: 530px;
  height: 100%;
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.1);
  }
`;

const MainContentsDetail = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const MainFigcaptionP = styled.p`
  font-weight: bolder;
  font-size: 25px;
`;

const MainUnderLineP = styled.p`
  text-decoration: underline;
`;
