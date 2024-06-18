import { Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '../../store/useAuthentication'
import React from 'react';

const ProtectedRoute = ({Dashboard}) => {
  const { userID } = useAuthentication();
  return userID ? <Dashboard><Outlet /></Dashboard> : <Navigate to="/login" />;
};

export default ProtectedRoute;