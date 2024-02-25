import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <>
      <HeaderWrap>
        <HeaderItem>
          <Logo>로고</Logo>
          <Category>
            <CategoryItem>climbing</CategoryItem>
            <CategoryItem>Traveling</CategoryItem>
            <CategoryItem>Baking</CategoryItem>
            <CategoryItem>Beauty</CategoryItem>
            <CategoryItem>Career</CategoryItem>
          </Category>
          <SignUp>로그인/회원가입</SignUp>
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

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Category = styled.ul`
  display: flex;
  width: 600px;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  color: #000;
  font-size: 17px;
`;

const CategoryItem = styled.li`
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
