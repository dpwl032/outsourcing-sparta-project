import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = localStorage.getItem('accessToken') ? true : false;

  if (!isAuthenticated) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/signIn" replace />;
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

export default AuthLayout;
