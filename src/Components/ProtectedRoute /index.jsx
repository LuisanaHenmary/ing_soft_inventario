import { Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '../../store/useAuthentication'

const ProtectedRoute = ({Dashboard}) => {
  const { userID } = useAuthentication();
  return userID ? <Dashboard><Outlet /></Dashboard> : <Navigate to="/login" />;
};

export default ProtectedRoute;