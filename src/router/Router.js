import { Route, Routes } from 'react-router-dom';
import Home from '../pages/auth/Home';
import Main from '../pages/Main';
import Login from '../pages/non-auth/Login';
import Detail from '../pages/auth/Detail';
import MyPage from '../pages/auth/MyPage';
import Join from '../pages/non-auth/Join';
import Layout from '../components/layout/Layout';
import NonAuthLayout from '../components/layout/NonAuthLayout';
import AuthLayout from '../components/layout/AuthLayout';
import TestMyPage from '../pages/TestMyPage';

const Router = () => {
  return (
    <Routes>
      {/* 로그인 여부 상관없는 라우터 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/testmy" element={<TestMyPage />} />
      </Route>
      {/* 로그인 상태가 반드시 아니어야 하는 라우터 */}
      <Route element={<NonAuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Route>
      {/* 로그인이 필요한 라우터 */}
      <Route element={<AuthLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/my" element={<MyPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
