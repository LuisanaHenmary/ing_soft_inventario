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
import Warehouses from '../Pages/Warehouses';
import WarehousesForm from '../Pages/Warehouses/edit';
import Brand from '../Pages/Brands/index';
import BrandForm from '../Pages/Brands/edit';
import Category from '../Pages/Category/index';
import CategoryForm from '../Pages/Category/edit';

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
      { path: 'warehouses', element: <Warehouses /> },
      { path: 'warehouse-details', element: <WarehousesForm /> },
      { path: 'brand', element: <Brand /> },
      { path: 'brand-details', element: <BrandForm /> },
      { path: 'category', element: <Category /> },
      { path: 'category-details', element: <CategoryForm /> },
    ]
  }
]);

export default router;
