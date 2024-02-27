import React from 'react';
import { Link } from 'react-router-dom';
import BusinessList from '../BusinessList'

function Home() {
  return (
    <>
      <div>다들 팀프로젝트 화이팅해봐욤!</div>
      <BusinessList />
      <Link to="/detail">API 테스트</Link>
    </>
  );
}

export default Home;
