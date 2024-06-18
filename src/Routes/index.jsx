import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from '../Components/ProtectedRoute';
import PublicRoute from '../Components/PublicRoute';

import App from '../App';
import Products from '../Pages/Products';

import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Dashboard from '../Pages/Dashboard';
import Suppliers from '../Pages/Suppliers';
import SupplierForm from '../Pages/Suppliers/edit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { index: true, element: <Navigate to="register" replace /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute Dashboard={Dashboard} />,
    children: [
      { index: true, element: <Navigate to="child" replace /> },
      { path: 'child', element: <App /> },
      { path: 'products', element: <Products /> },
      { path: 'suppliers', element: <Suppliers /> },
      { path: 'supplier-details', element: <SupplierForm /> },
    ]
  }
]);

export default router;
