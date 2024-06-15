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
// import { TextField, Button } from '@mui/material';

const SupplierForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modeParams = searchParams.get("mode");
  const idParams = searchParams.get("id");

  const listSuppliers = useStoreGlobal((state) => state.listSuppliers);
  const setSuppliers = useStoreGlobal((state) => state.setSuppliers);
  const setLoader = useStoreGlobal((state) => state.setLoader);

  const nameDB = "suppliers";
  const supplierConnect = collection(db, nameDB);

  const [formData, setFormData] = useState({
    address: "",
    email: "",
    id: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (listSuppliers.length === 0) {
      setLoader(true);
      getListSuppliers();
    }else{
      setFormData({ ...listSuppliers.filter((item) => item.idDocument === idParams)[0] });
    }
  }, []);

  async function getListSuppliers() {
    const responseCategory = await getDocs(supplierConnect);
    const listSupplier = responseCategory.docs.map((doc) => ({
      ...doc.data(),
      idDocument: doc.id,
    }));
    setSuppliers(listSupplier);
    const supplier = listSupplier.filter(
      (item) => item.idDocument === idParams
    );
    console.log("supplier:", supplier);
    setFormData({ ...supplier[0] });
    setLoader(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form:", formData);
    if (modeParams === "edit") {
      editSupplier(idParams);
    }
    if (modeParams === "create") {
      addSupplier();
    }
  };

  async function editSupplier(idDocument) {
    setLoader(true);
    const supplier = doc(db, nameDB, idDocument);
    await updateDoc(supplier, {
      address: formData.address,
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
    });
    setLoader(false);
    window.alert("Proveedoredor editado con exito");
  }

  async function addSupplier() {
    setLoader(true);
    const temp = await addDoc(supplierConnect, {
      ...formData,
      id: `${Date.now()}`,
    });
    console.log(temp);
    setLoader(false);
    window.alert("Proveedoredor creado con exito");
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-form__header">
        {modeParams === "create" && (
          <h2 className="contact-form__title">Crear Proveedores</h2>
        )}
        {modeParams === "edit" && (
          <h2 className="contact-form__title">Editar Proveedores</h2>
        )}
        {modeParams === "show" && (
          <h2 className="contact-form__title">Ver Proveedor</h2>
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
        <label htmlFor="address">Direccion:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={modeParams === "show"}
          required
        />
      </div>
      <div className="contact-form__field">
        <label htmlFor="phone">Telefono:</label>
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
      <div className="contact-form__field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={modeParams === "show"}
          required
        />
      </div>
      <div className="contact-form__actions">
        <Link to="/dashboard/suppliers">Volver</Link>
        {modeParams !== "show" && (
          <button type="submit" className="contact-form__submit">
            Guardar
          </button>
        )}
      </div>
    </form>
  );
};

export default SupplierForm;
