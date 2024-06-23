import { useEffect } from "react"
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Loader from "../../Components/Loader/loader";
import useStoreGlobal from "../../store/useStoreGlobal";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

function Dashboard() {

  const rutes = [
    {
      path: "/",
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
      path: "/movements",
      name: "Movimientos",
    },
    {
      path: "/logout",
      name: "Cerrar sesion",
    }
  ]


  const setSuppliers = useStoreGlobal((state) => state.setSuppliers);
  const setWarehouses = useStoreGlobal((state) => state.setWarehouses);
  const setProducts = useStoreGlobal((state) => state.setProducts);
  const setMovements = useStoreGlobal((state) => state.setMovements);
  const setLoader = useStoreGlobal((state) => state.setLoader);


  const supplierConnect = collection(db, "suppliers");
  const warehouseCollection = collection(db, "warehouses");
  const productsConnect = collection(db, "products");
  const movementConnect = collection(db, "movements");

  const getAllList = async () => {
    try {
      const response1 = await getDocs(warehouseCollection);
      const warehouseList = response1.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setWarehouses(warehouseList);

      const response2 = await getDocs(supplierConnect);
      const listSupplier = response2.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setSuppliers(listSupplier);

      const responseProduct = await getDocs(productsConnect)
      const listProduct = responseProduct.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setProducts(listProduct)

      const responseMovement = await getDocs(movementConnect)
      const listMovements = responseMovement.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setMovements(listMovements)

    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoader(false);
    }

  }

  useEffect(() => {
    setLoader(true);
    getAllList()

  }, [])

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
