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
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 5rem;
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
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: white;
  }
`;
const Business = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: white;
  }
`;
