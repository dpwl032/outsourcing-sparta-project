import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getClass } from '../../api/queryFns';

function Home() {
  const { isLoading, isError, data } = useQuery('class', getClass);

  if (isLoading) {
    return <p>...로딩중</p>;
  }

  if (isError) {
    return <p>오류가 발생했습니다. 다시 새로고침 해주세요!</p>;
  }

  return (
    <>
      <div> 사진 라이브러리</div>

      <p>주간 best 랭킹</p>

      {data?.data?.map((item) => (
        <div key={item.id}>
          <br />
          <Link to={`/detail/${item.id}`}>
            <p>{item.classMap}</p>
            <p>{item.classImg}</p>
            <p>{item.classTitle}</p>
            <p>{item.classPrice}</p>
            <br />
          </Link>
        </div>
      ))}
    </>
  );
}

export default Home;
