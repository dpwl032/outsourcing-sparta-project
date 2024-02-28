import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const isHost = localStorage.getItem('host') === 'host';

  if (!isHost) {
    alert('Host 전용 등록 페이지입니다.');
    return <Navigate to="/" replace />;
  }

  return Component;
};

export default ProtectedRoute;