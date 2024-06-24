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

const Warehouses = () => {
  const listWarehouses = useStoreGlobal((state) => state.listWarehouses);
  const setWarehouses = useStoreGlobal((state) => state.setWarehouses);
  const setLoader = useStoreGlobal((state) => state.setLoader);

  const nameDB = "warehouses";
  const warehouseCollection = collection(db, nameDB);
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await getDocs(warehouseCollection);
      const warehouseList = response.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setWarehouses(warehouseList);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    } finally {
      setLoader(false);
    }
  };

  const deleteWarehouse = async (idDocument) => {
    setLoader(true);
    try {
      const warehouseDoc = doc(db, nameDB, idDocument);
      await deleteDoc(warehouseDoc);
      fetchWarehouses();
      window.alert("Almacén eliminado con éxito");
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="warehouses">
      <div className="warehouses__header">
        <h2 className="warehouses__title">Lista de Almacenes</h2>
        <button
          className="warehouses__add-button"
          onClick={() => navigate("/dashboard/warehouse-details?mode=create")}
        >
          Agregar
        </button>
      </div>
      <ul className="warehouses__list">
        <li className="warehouses__list-header">
          <span className="warehouses__header-name">Nombre</span>
          <span className="warehouses__header-location">Ubicación</span>
          <span className="warehouses__header-phone">Teléfono</span>
          <span className="warehouses__header-actions">Acciones</span>
        </li>
        {listWarehouses.map((warehouse) => (
          <li key={warehouse.idDocument} className="warehouses__item">
            <span className="warehouses__name">{warehouse.name}</span>
            <span className="warehouses__location">{warehouse.location}</span>
            <span className="warehouses__phone">{warehouse.phone}</span>
            <div className="warehouses__buttons">
              <button
                className="warehouses__button warehouses__show"
                onClick={() => {
                  navigate(
                    `/dashboard/warehouse-details?mode=show&id=${warehouse.idDocument}`
                  );
                }}
              >
                Mostrar
              </button>
              <button
                className="warehouses__button warehouses__edit"
                onClick={() =>
                  navigate(`/dashboard/warehouse-details?mode=edit&id=${warehouse.idDocument}`)
                }
              >
                Editar
              </button>
              <button
                onClick={() => deleteWarehouses(warehouse.idDocument)}
                className="warehouses__button warehouses__delete"
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

export default Warehouses;