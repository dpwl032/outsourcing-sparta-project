<<<<<<< HEAD
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
=======
import { Navigate, Route, Routes } from 'react-router-dom';
import { SignInPage } from '../pages/signInPage/SignInPage';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import { SignUpMode } from '../pages/signUpPage/SignUpMode';
import { PersonalSignUpPage } from '../pages/signUpPage/PersonalSignUpPage';
import { BusinessSignUpPage } from '../pages/signUpPage/BusinessSignUpPage';
>>>>>>> 6325d9c7d6c5423fd0d95f7215b288726a1d4f34

const Router = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <Routes>
<<<<<<< HEAD
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
=======
      {isLogin ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUpMode" element={<SignUpMode />} />
          <Route path="/personalSignUp" element={<PersonalSignUpPage />} />
          <Route path="/BusinessSignUp" element={<BusinessSignUpPage />} />
          <Route path="*" element={<Navigate replace to="/signIn" />} />
        </>
      )}
>>>>>>> 6325d9c7d6c5423fd0d95f7215b288726a1d4f34
    </Routes>
  );
};

export default Router;
