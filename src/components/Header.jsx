import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <HeaderWrap>
        <HeaderItem>
          <HeaderLogo>로고</HeaderLogo>
          <HeaderCategory>
            <HeaderCategoryItem>climbing</HeaderCategoryItem>
            <HeaderCategoryItem>Traveling</HeaderCategoryItem>
            <HeaderCategoryItem>Baking</HeaderCategoryItem>
            <HeaderCategoryItem>Beauty</HeaderCategoryItem>
            <HeaderCategoryItem>Career</HeaderCategoryItem>
          </HeaderCategory>
          <Link to="/testmy">
            <SignUp>로그인/회원가입</SignUp>
          </Link>
        </HeaderItem>
      </HeaderWrap>
    </>
  );
};

export default Header;

const HeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  background-color: #ffffff;
  border-bottom: 1px solid #9e9e9e;
`;

const HeaderItem = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 1200px;
`;

const HeaderLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderCategory = styled.ul`
  display: flex;
  width: 600px;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  color: #000;
  font-size: 17px;
`;

const HeaderCategoryItem = styled.li`
  text-transform: uppercase;

  &:after {
    display: block;
    content: '';
    border-bottom: solid 2px #000;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }

  &:hover:after {
    transform: scaleX(1);
  }
  & .fromLeft:after {
    transform-origin: 0% 50%;
  }
`;

const SignUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
