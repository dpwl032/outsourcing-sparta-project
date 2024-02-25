import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      {/*구분선*/}
      <div>
        <h1>Common Layout</h1>
        <p>로그인 여부와 상관없이 접근 가능한 페이지입니다.</p>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
