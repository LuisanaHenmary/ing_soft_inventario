import React, { useEffect, useState } from "react";
import useStoreGlobal from "../../store/useStoreGlobal";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const listCategories = useStoreGlobal((state) => state.listCategories);
  const setCategories = useStoreGlobal((state) => state.setCategories);
  const setLoader = useStoreGlobal((state) => state.setLoader);

  const nameDB = "categories";

  const BrandConnect = collection(db, nameDB);
  const navigate = useNavigate();
  useEffect(() => {
    setLoader(true);
    getListCategories();
  }, []);

  async function getListCategories() {
    const responseCategory = await getDocs(BrandConnect);
    const listSupplier = responseCategory.docs.map((doc) => ({
      ...doc.data(),
      idDocument: doc.id,
    }));
    setCategories(listSupplier);
    console.log("Categories:", listSupplier);
    setLoader(false);
  }

  async function deleteCategories(idDocument) {
    setLoader(true);
    const categories = doc(db, nameDB, idDocument);
    await deleteDoc(categories);
    await getListCategories();
    window.alert("Categoria eliminada con exito");
    setLoader(false);
  }

  return (
    <div className="suppliers">
      <div className="suppliers__header">
        <h2 className="suppliers__title">Lista de Categorias</h2>
        <button
          className="suppliers__add-button"
          onClick={() => navigate("/dashboard/category-details?mode=create")}
        >
          Agregar
        </button>
      </div>
      <ul className="suppliers__list">
        <li className="suppliers__list-header">
          <span className="suppliers__header-name">Nombre</span>
          <span className="suppliers__header-actions">Acciones</span>
        </li>
        {listCategories.map((contact) => (
          <li key={contact.idDocument} className="suppliers__item">
            <span className="suppliers__name">{contact.name}</span>
            <div className="suppliers__buttons">
              <button
                className="suppliers__button suppliers__show"
                onClick={() => {
                  navigate(
                    `/dashboard/category-details?mode=show&id=${contact.idDocument}`
                  );
                }}
              >
                Mostrar
              </button>
              <button
                className="suppliers__button suppliers__edit"
                onClick={() =>
                  navigate(`/dashboard/category-details?mode=edit&id=${contact.idDocument}`)
                }
              >
                Editar
              </button>
              <button
                onClick={() => deleteCategories(contact.idDocument)}
                className="suppliers__button suppliers__delete"
              >
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
