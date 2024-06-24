import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import useStoreGlobal from "../../store/useStoreGlobal";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const WarehouseForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modeParams = searchParams.get("mode");
  const idParams = searchParams.get("id");

  const listWarehouses = useStoreGlobal((state) => state.listWarehouses);
  const setWarehouses = useStoreGlobal((state) => state.setWarehouses);
  const setLoader = useStoreGlobal((state) => state.setLoader);

  const nameDB = "warehouses";
  const warehouseConnect = collection(db, nameDB);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
  });

  useEffect(() => {
    if (listWarehouses.length === 0) {
      setLoader(true);
      getListWarehouses();
    } else {
      const warehouse = listWarehouses.find((item) => item.idDocument === idParams);
      if (warehouse) {
        setFormData({ ...warehouse });
      }
    }
  }, []);

  async function getListWarehouses() {
    try {
      const response = await getDocs(warehouseConnect);
      const warehouses = response.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setWarehouses(warehouses);
      const warehouse = warehouses.find((item) => item.idDocument === idParams);
      if (warehouse) {
        setFormData({ ...warehouse });
      }
      setLoader(false);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      setLoader(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modeParams === "edit") {
      editWarehouse(idParams);
    }
    if (modeParams === "create") {
      addWarehouse();
    }
  };

  async function editWarehouse(idDocument) {
    try {
      setLoader(true);
      const warehouseRef = doc(db, nameDB, idDocument);
      await updateDoc(warehouseRef, {
        name: formData.name,
        location: formData.location,
        phone: formData.phone,
      });
      setLoader(false);
      window.alert("Almacén editado exitosamente");
    } catch (error) {
      console.error("Error updating warehouse:", error);
      setLoader(false);
    }
  }

  async function addWarehouse() {
    try {
      setLoader(true);
      const temp = await addDoc(warehouseConnect, {
        name: formData.name,
        location: formData.location,
        phone: formData.phone,
      });
      console.log(temp);
      setLoader(false);
      window.alert("Almacén creado exitosamente");
    } catch (error) {
      console.error("Error adding warehouse:", error);
      setLoader(false);
    }
  }

  const handleDelete = async (idDocument) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este almacén?")) {
      try {
        setLoader(true);
        const warehouseRef = doc(db, nameDB, idDocument);
        await deleteDoc(warehouseRef);
        await getListWarehouses();
        window.alert("Almacén eliminado exitosamente");
        setLoader(false);
      } catch (error) {
        console.error("Error deleting warehouse:", error);
        setLoader(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-form__header">
        {modeParams === "create" && (
          <h2 className="contact-form__title">Crear Almacén</h2>
        )}
        {modeParams === "edit" && (
          <h2 className="contact-form__title">Editar Almacén</h2>
        )}
        {modeParams === "show" && (
          <h2 className="contact-form__title">Ver Almacén</h2>
        )}
      </div>
      <div className="contact-form__field">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={modeParams === "show"}
          required
        />
      </div>
      <div className="contact-form__field">
        <label htmlFor="location">Ubicación:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          disabled={modeParams === "show"}
          required
        />
      </div>
      <div className="contact-form__field">
        <label htmlFor="phone">Teléfono:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={modeParams === "show"}
          required
        />
      </div>
      <div className="contact-form__actions">
        <Link to="/dashboard/warehouses">Volver</Link>
        {modeParams !== "show" && (
          <button type="submit" className="contact-form__submit">
            Guardar
          </button>
        )}
        {modeParams === "edit" && (
          <button
            type="button"
            className="contact-form__delete"
            onClick={() => handleDelete(idParams)}
          >
            Eliminar
          </button>
        )}
      </div>
    </form>
  );
};

export default WarehouseForm;