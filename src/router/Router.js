import { Route, Routes } from 'react-router-dom';
import Home from '../pages/auth/Home';
import Main from '../pages/Main';
import Detail from '../pages/auth/Detail';
import MyPage from '../pages/auth/MyPage';
import Layout from '../components/layout/Layout';
import NonAuthLayout from '../components/layout/NonAuthLayout';
import AuthLayout from '../components/layout/AuthLayout';
import TestMyPage from '../pages/TestMyPage';
import { SignInPage } from '../pages/non-auth/SignInPage';
import { SignUpMode } from '../pages/non-auth/SignUpMode';
import { PersonalSignUpPage } from '../pages/non-auth/PersonalSignUpPage';
import { BusinessSignUpPage } from '../pages/non-auth/BusinessSignUpPage';
import ClassOpen from '../pages/auth/ClassOpen';

const Router = () => {
  return (
    <Routes>
      {/* 로그인 여부 상관없는 라우터 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
      </Route>
      {/* 로그인 상태가 반드시 아니어야 하는 라우터 */}
      <Route element={<NonAuthLayout />}>
        <Route path="/signUpMode" element={<SignUpMode />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/personalSignUp" element={<PersonalSignUpPage />} />
        <Route path="/BusinessSignUp" element={<BusinessSignUpPage />} />
      </Route>
      {/* 로그인이 필요한 라우터 */}
      <Route element={<AuthLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/class" element={<ClassOpen />} />
        <Route path="/my" element={<MyPage />} />
        {/*테스트 페이지 */}
        <Route path="/testmy" element={<TestMyPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
