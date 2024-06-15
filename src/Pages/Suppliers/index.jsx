import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const Suppliers = () => {
  const listSuppliers = useStoreGlobal((state) => state.listSuppliers);
  const setSuppliers = useStoreGlobal((state) => state.setSuppliers);
  const setLoader = useStoreGlobal((state) => state.setLoader);

  const nameDB = "suppliers";

  const supplierConnect = collection(db, nameDB);
  const navigate = useNavigate();
  useEffect(() => {
    setLoader(true);
    getListSuppliers();
  }, []);

  async function getListSuppliers() {
    const responseCategory = await getDocs(supplierConnect);
    const listSupplier = responseCategory.docs.map((doc) => ({
      ...doc.data(),
      idDocument: doc.id,
    }));
    setSuppliers(listSupplier);
    console.log("listSupplier:", listSupplier);
    setLoader(false);
  }

  async function deleteSupplier(idDocument) {
    setLoader(true);
    const supplier = doc(db, nameDB, idDocument);
    await deleteDoc(supplier);
    await getListSuppliers();
    window.alert("Proveedoredor eliminado con exito");
    setLoader(false);
  }

  return (
    <div className="suppliers">
      <div className="suppliers__header">
        <h2 className="suppliers__title">Lista de Proveedores</h2>
        <button
          className="suppliers__add-button"
          onClick={() => navigate("/dashboard/supplier-details?mode=create")}
        >
          Agregar
        </button>
      </div>
      <ul className="suppliers__list">
        <li className="suppliers__list-header">
          <span className="suppliers__header-name">Nombre</span>
          <span className="suppliers__header-actions">Acciones</span>
        </li>
        {listSuppliers.map((contact) => (
          <li key={contact.idDocument} className="suppliers__item">
            <span className="suppliers__name">{contact.name}</span>
            <div className="suppliers__buttons">
              <button
                className="suppliers__button suppliers__show"
                onClick={() => {
                  navigate(
                    `/dashboard/supplier-details?mode=show&id=${contact.idDocument}`
                  );
                }}
              >
                Mostrar
              </button>
              <button
                className="suppliers__button suppliers__edit"
                onClick={() =>
                  navigate(`/dashboard/supplier-details?mode=edit&id=${contact.idDocument}`)
                }
              >
                Editar
              </button>
              <button
                onClick={() => deleteSupplier(contact.idDocument)}
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

export default Suppliers;
