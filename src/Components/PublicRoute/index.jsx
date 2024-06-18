import { Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '../../store/useAuthentication'

const PublicRoute = () => {
  const { userID } = useAuthentication();

  return userID ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;