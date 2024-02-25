import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Home from '../../pages/auth/Home';
import Main from '../../pages/Main';

const NonAuthLayout = () => {
  const isAuthenticated = localStorage.getItem('accessToken') ? true : false;

  if (isAuthenticated) {
    alert('이미 로그인 상태입니다.');
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      <h1>Non Auth Layout</h1>
      <p>로그인이 반드시 안되어있어야 하는 페이지</p>
      <Main />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NonAuthLayout;
