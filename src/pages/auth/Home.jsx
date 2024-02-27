import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div>다들 팀프로젝트 화이팅해봐욤!</div>
      <Link to="/detail">API 테스트</Link>
    </>
  );
}

export default Home;
