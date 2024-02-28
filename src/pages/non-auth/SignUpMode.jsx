import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SignUpMode = () => {
  return (
    <Container>
      <Link to="/personalSignUp">
        <Personal>개인용</Personal>
      </Link>
      <Link to="/BusinessSignUp">
        <Business>업체용</Business>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  gap: 12rem;
  & a {
    color: black;
    text-decoration: none;
  }
`;

const Personal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid #c4c4c4;
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: #c4c4c4;
    color: white;
  }
`;
const Business = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #c4c4c4;
  align-items: center;
  background-color: white;
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: #c4c4c4;
    color: white;
  }
`;
