import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Loader from "../../Components/Loader/loader";

function Dashboard() {

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
    {
      path: "/logout",
      name: "Cerrar sesion",
    }
  ]
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
        </ul>
      </div>
      <Outlet />
      <Loader />
    </div>
  );
}

export default Dashboard;
