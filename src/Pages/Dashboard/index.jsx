import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../../store/useAuthentication";
import Loader from "../../Components/Loader/loader";
import './index.css';

function Dashboard() {
  const logout = useAuthentication((state) => state.logout);
  const navigate = useNavigate();

  const rutes = [
    {
      path: "/dashboard",
      name: "Dashboard",
    },
    {
      path: "/products",
      name: "Productos",
    },
    {
      path: "/suppliers",
      name: "Proveedores",
    },
    {
      path: "/warehouses",
      name: "Almacenes",
    },
  ]

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar__logo">Dashboard</div>
        <ul className="sidebar__menu">
          {rutes.map((route) => (
            <li className="sidebar__menu-item" key={route.path}>
              <Link to={`/dashboard${route.path}`}>{route.name}</Link>
            </li>
          ))}
          <button className="sidebar__menu-item_button" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </div>
      <Outlet />
      <Loader />
    </div>
  );
}

export default Dashboard;
