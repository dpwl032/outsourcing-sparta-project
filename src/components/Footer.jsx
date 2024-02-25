import React from 'react';
import styled from 'styled-components';
const Footer = () => {
  return (
    <>
      <FooterWrap>
        <FooterInsideLogo>
          <p>로고</p>
        </FooterInsideLogo>
        <FooterItem>
          <FooterList>
            <li>CONTACT</li>
            <li>NOTICE</li>
            <li>운영관리방침</li>
            <li>개인정보처리방침</li>
            <li>PARTNER SUPPORT</li>
          </FooterList>
        </FooterItem>
        <CopyRight>
          <p>COPYRIGHT 2024 (C) BY SPARTA 13 TEAM. OUTSOURCING TEAM PROJECT</p>
        </CopyRight>
      </FooterWrap>
    </>
  );
};

export default Footer;

const FooterWrap = styled.div`
  background-color: #fbfbfb;
`;

const FooterInsideLogo = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CopyRight = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;
  border-top: 1px solid #9e9e9e;
`;

const FooterItem = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: cente;
`;

const FooterList = styled.ul`
  display: flex;
  width: 1000px;
  justify-content: space-around;
`;
