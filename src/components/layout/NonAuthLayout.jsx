import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const NonAuthLayout = () => {
  const isAuthenticated = localStorage.getItem('accessToken') ? true : false;

  if (isAuthenticated) {
    alert('이미 로그인 상태입니다.');
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default NonAuthLayout;
