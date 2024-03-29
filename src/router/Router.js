import { Route, Routes } from 'react-router-dom';
import AddBusinessInfo from '../pages/RegisterBusinessInfo.jsx';
import WriteReview from '../components/WriteReview.jsx';
import DetailInfoPage from '../pages/auth/DetailInfoPage.jsx';
import BusinessList from '../pages/BusinessList.jsx';
import Home from '../pages/auth/Home';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage.jsx';
import Layout from '../components/layout/Layout';
import NonAuthLayout from '../components/layout/NonAuthLayout';
import AuthLayout from '../components/layout/AuthLayout';
import { SignInPage } from '../pages/non-auth/SignInPage';
import { SignUpMode } from '../pages/non-auth/SignUpMode';
import { PersonalSignUpPage } from '../pages/non-auth/PersonalSignUpPage';
import { BusinessSignUpPage } from '../pages/non-auth/BusinessSignUpPage';

const Router = () => {
  return (
    <Routes>
      {/* 로그인 여부 상관없는 라우터 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/List" element={<BusinessList />} />
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
        <Route path="/Details/:id" element={<DetailInfoPage />} />
        <Route path="/class" element={<AddBusinessInfo />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/WritingReview" element={<WriteReview />} />
      </Route>
    </Routes>
  );
};

export default Router;
