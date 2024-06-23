import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../../store/useAuthentication";
import Loader from "../../Components/Loader/loader";
import './index.css';
import { useEffect } from "react"
import useStoreGlobal from "../../store/useStoreGlobal";
import { db } from "../../firebase";
import {
  collection,
  getDocs
} from "firebase/firestore";

function Dashboard() {
  const logout = useAuthentication((state) => state.logout);
  const navigate = useNavigate();

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
      path: "/brand",
      name: "Marca",
    },
    {
      path: "/category",
      name: "Categoria",
    },
    {
      path: "/logout",
      name: "Cerrar sesion",
    },
    {
      path: "/movements",
      name: "Movimientos",
    }
  ]
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }


  const setSuppliers = useStoreGlobal((state) => state.setSuppliers);
  const setWarehouses = useStoreGlobal((state) => state.setWarehouses);
  const setMovements = useStoreGlobal((state) => state.setMovements);
  const setProducts = useStoreGlobal((state) => state.setProducts);
  const setPresentations = useStoreGlobal((state) => state.setPresentations);
  const setBrands = useStoreGlobal((state) => state.setBrands);
  const setCategories = useStoreGlobal((state) => state.setCategories);
  const setLoader = useStoreGlobal((state) => state.setLoader);


  const supplierConnect = collection(db, "suppliers");
  const warehouseCollection = collection(db, "warehouses");
  const movementConnect = collection(db, "movements");
  const categoryConnect = collection(db, 'categories')
  const presentationConnect = collection(db, 'presentations')
  const brandConnect = collection(db, 'brands')
  const productsConnect = collection(db, "products");

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

      const responseMovement = await getDocs(movementConnect)
      const listMovements = responseMovement.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setMovements(listMovements)

      const responseProduct = await getDocs(productsConnect)
      const listProducts = responseProduct.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setProducts(listProducts)

      const responseCategory = await getDocs(categoryConnect)
      const listCategories = responseCategory.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setCategories(listCategories)

      const responsePresentation = await getDocs(presentationConnect)
      const listPresentations = responsePresentation.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setPresentations(listPresentations)

      const responseBrand = await getDocs(brandConnect)
      const listBrands = responseBrand.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setBrands(listBrands)

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
