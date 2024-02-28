import { useDispatch } from 'react-redux';
import { logout } from '../redux/modules/authSlice';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from './CustomButton';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    window.location.reload();
  };
  return <CustomButton onClick={handleLogout} text={'로그아웃'} />;
};
