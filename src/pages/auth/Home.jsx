import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const json = useSelector((state) => state);
  console.log('json', json);

  return (
    <>
      <div>다들 팀프로젝트 화이팅해봐욤!</div>
    </>
  );
}

export default Home;
