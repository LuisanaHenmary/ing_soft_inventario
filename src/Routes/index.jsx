import { createBrowserRouter, Navigate } from "react-router-dom"
import Layout from "../layout"
import App from "../App"
import Products from "../Pages/Products"

import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Dashboard from "../Pages/Dashboard"

const router = createBrowserRouter([
  { path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="login" replace />},
      { path: 'login', element: <Login />, },
      { path: 'register', element: <Register />, },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          { index: true, element: <Navigate to="child" replace /> },
          { path: 'child', element: <App />, },
        ]
      },
      { path: '/products', element: <Products />, },
    ]
  }
])

export default router