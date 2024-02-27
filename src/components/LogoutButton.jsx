import { useDispatch } from 'react-redux';
import { logout } from '../redux/modules/authSlice';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    window.location.reload();
  };
  return <button onClick={handleLogout}>로그아웃</button>;
};
