import { Navigate, Route, Routes } from 'react-router-dom';
import { SignInPage } from '../pages/signInPage/SignInPage';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import { SignUpMode } from '../pages/signUpPage/SignUpMode';
import { PersonalSignUpPage } from '../pages/signUpPage/PersonalSignUpPage';
import { BusinessSignUpPage } from '../pages/signUpPage/BusinessSignUpPage';

const Router = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <Routes>
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
    </Routes>
  );
};

export default Router;
