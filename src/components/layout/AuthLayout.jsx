import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Main from '../../pages/Main';

const AuthLayout = () => {
  const isAuthenticated = localStorage.getItem('accessToken') ? true : false;

  if (!isAuthenticated) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>Auth Layout</h1>
      <p>반드시 로그인이 되어있어야 하는 페이지입니다.</p>
      <Main />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
