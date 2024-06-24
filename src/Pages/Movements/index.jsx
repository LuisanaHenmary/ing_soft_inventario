import { useState, useEffect } from "react";
import { Box, Alert, Typography } from "@mui/material";
import RegisterMovement from "../../Components/RegisterMovement";
import ButtonAdd from "../../Components/ButtonAdd";
import useStoreGlobal from "../../store/useStoreGlobal";
import { useAuthentication } from "../../store/useAuthentication";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import TableMovements from "../../Components/TableMovements";

const Movements = () => {
  const movementConnet = collection(db, "movements");
  const setMovements = useStoreGlobal((state) => state.setMovements);

  const [add, setAdd] = useState(false);
  const { userID } = useAuthentication();
  const listSuppliers = useStoreGlobal((state) => state.listSuppliers);
  const setSuppliers = useStoreGlobal((state) => state.setSuppliers);
  const listWarehouses = useStoreGlobal((state) => state.listWarehouses);
  const setWarehouses = useStoreGlobal((state) => state.setWarehouses);
  const listProducts = useStoreGlobal((state) => state.listProducts);
  const setProducts = useStoreGlobal((state) => state.setProducts);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const setLoader = useStoreGlobal((state) => state.setLoader);
  const warehouseCollection = collection(db, "warehouses");
  const supplierConnect = collection(db, "suppliers");
  const productsConnect = collection(db, "products");

  useEffect(() => {
    const warehouse = async () => {
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
    const suppliers = async () => {
      const responseCategory = await getDocs(supplierConnect);
      const listSupplier = responseCategory.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setSuppliers(listSupplier);
      console.log("listSupplier:", listSupplier);
      setLoader(false);
    };

    const products = async () => {
      const responseCategory = await getDocs(productsConnect);
      const products = responseCategory.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setProducts(products);
      setLoader(false);
    };

    listSuppliers.length == 0 && warehouse();
    listWarehouses.length == 0 && suppliers();
    listProducts.length == 0 && products();
  }, []);

  const openAdd = () => {
    setIsSuccess(false);
    setAdd(true);
  };

  const types = [{ name: "Compra" }, { name: "Venta" }];

  const renderList = async () => {
    const responseMovement = await getDocs(movementConnet);
    const listMovements = responseMovement.docs.map((doc) => ({
      ...doc.data(),
      idDocument: doc.id,
    }));
    setMovements(listMovements);
  };

  const addMovemnt = async (values) => {
    const { type_mov, person, product, quantity } = values;

    const typ = parseInt(type_mov);
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;
    const time = `${now.getHours()}:${now.getMinutes()}`;

    try {
      const temp = {
        type_mov: types[typ].name,
        id_supplier: listSuppliers[person].idDocument,
        user_id: userID.toString(),
        date,
        time,
        product: listProducts[product].idDocument.trim(),
        quantity: parseInt(quantity),
      };
      const productSeleted = listProducts[product];
      console.log("product seleccionado", temp);
      if (typ === 0) {
        await addDoc(movementConnet, temp);
        const productDoc = doc(db, "products", productSeleted.idDocument);
        await updateDoc(productDoc, {
          ...productSeleted,
          acount: parseInt(productSeleted.acount) + parseInt(quantity),
        });
      }

      if (typ === 1) {
        await addDoc(movementConnet, temp);
        const productDoc = doc(db, "products", productSeleted.idDocument);
        await updateDoc(productDoc, {
          ...productSeleted,
          acount: parseInt(productSeleted.acount) - parseInt(quantity),
        });
      }
      renderList();
      setMessage("Movimiento registrado exitosamente");
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setAdd(false);
    }
  };

  const deleteMovement = async (id) => {
    try {
      const movement = doc(db, "movements", id);
      deleteDoc(movement);
      renderList();
      setMessage("Movimiento eliminado exitosamente");
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "10px" }}
      >
        Movimientos
      </Typography>
      <ButtonAdd action={openAdd}>Agregar Movimiento</ButtonAdd>

      <TableMovements deleteFunction={deleteMovement} />
      <RegisterMovement
        saveFunction={addMovemnt}
        isOpen={add}
        handleClose={() => setAdd(false)}
        types_mov={types}
      />

      {isSuccess ? <Alert severity="success">{message}</Alert> : null}
    </Box>
  );
};

export default Movements;
