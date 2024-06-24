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

const BrandForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modeParams = searchParams.get("mode");
  const idParams = searchParams.get("id");

  const listBrands = useStoreGlobal((state) => state.listCategories);
  const setBrands = useStoreGlobal((state) => state.setCategories);
  const setLoader = useStoreGlobal((state) => state.setLoader);

  const nameDB = "categories";
  const supplierConnect = collection(db, nameDB);

  const [formData, setFormData] = useState({
    description: "",
    id: "",
    name: "",
  });

  useEffect(() => {
    if (listBrands.length === 0) {
      setLoader(true);
      getListBrands();
    } else {
      setFormData({
        ...listBrands.filter((item) => item.idDocument === idParams)[0],
      });
    }
  }, []);

  async function getListBrands() {
    const responseCategory = await getDocs(supplierConnect);
    const listBrand = responseCategory.docs.map((doc) => ({
      ...doc.data(),
      idDocument: doc.id,
    }));
    setBrands(listBrand);
    const brand = listBrand.filter((item) => item.idDocument === idParams);
    console.log("brands:", brand);
    setFormData({ ...brand[0] });
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
      editCategory(idParams);
    }
    if (modeParams === "create") {
      addCategory();
    }
  };

  async function editCategory(idDocument) {
    setLoader(true);
    const brand = doc(db, nameDB, idDocument);
    console.log('brand:', brand)
    await updateDoc(brand, {
      name: formData.name,
      description: formData.description,
    });
    setLoader(false);
    window.alert("Categoria editado con exito");
  }

  async function addCategory() {
    setLoader(true);
    const temp = await addDoc(supplierConnect, {
      ...formData,
      id: `${Date.now()}`,
    });
    console.log(temp);
    setLoader(false);
    window.alert("Categoria creado con exito");
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-form__header">
        {modeParams === "create" && (
          <h2 className="contact-form__title">Crear Categorias</h2>
        )}
        {modeParams === "edit" && (
          <h2 className="contact-form__title">Editar Categorias</h2>
        )}
        {modeParams === "show" && (
          <h2 className="contact-form__title">Ver Categoria</h2>
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
        <label htmlFor="description">Descripcion:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={modeParams === "show"}
          required
        />
      </div>
      <div className="contact-form__actions">
        <Link to="/dashboard/category">Volver</Link>
        {modeParams !== "show" && (
          <button type="submit" className="contact-form__submit">
            Guardar
          </button>
        )}
      </div>
    </form>
  );
};

export default BrandForm;
