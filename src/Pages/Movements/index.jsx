import { useState, useEffect } from "react"
import { Box, Alert } from "@mui/material";
import RegisterMovement from "../../Components/RegisterMovement"
import ButtonAdd from "../../Components/ButtonAdd";
import useStoreGlobal from "../../store/useStoreGlobal";
import { useAuthentication } from '../../store/useAuthentication'
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import TableMovements from "../../Components/TableMovements";

const Movements = () => {

    const movementConnet = collection(db, "movements");
    const setMovements = useStoreGlobal((state) => state.setMovements);

    const [add, setAdd] = useState(false);
    const { userID } = useAuthentication();
    const listSuppliers = useStoreGlobal((state) => state.listSuppliers);
    const listWarehouses = useStoreGlobal((state) => state.listWarehouses);
    const [message, setMessage] = useState("")
    const [isSuccess, setIsSuccess] = useState(false);


    const openAdd = () => {
        setIsSuccess(false)
        setAdd(true)
    }

    const types = [
        { name: "Compra" },
        { name: "Venta" },
    ]

    const renderList = async () => {
        const responseMovement = await getDocs(movementConnet)
        const listMovements = responseMovement.docs.map((doc) => ({
            ...doc.data(),
            idDocument: doc.id,
        }));
        setMovements(listMovements)

    }

    const addMovemnt = async (values) => {

        const {
            number_mov,
            type_mov,
            supplier,
            warehouses,
        } = values

        const now = new Date();
        const date = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
        const time = `${now.getHours()}:${now.getMinutes()}`

        try {
            await addDoc(movementConnet, {
                number_mov: parseInt(number_mov),
                type_mov: types[type_mov].name,
                id_supplier: listSuppliers[supplier].idDocument,
                id_warehouse: listWarehouses[warehouses].idDocument,
                user_id: userID.toString(),
                date,
                time
            })

            renderList()

            setMessage("Movimiento registrado exitosamente")
            setIsSuccess(true)
        }
        catch (e) {
            console.error(e)
        }
        finally {
            setAdd(false)
        }
    }

    const deleteMovement = async (id) => {

        try {
            const movement = doc(db, 'movements', id)
            deleteDoc(movement)
            renderList()
            setMessage("Movimiento eliminado exitosamente")
            setIsSuccess(true)
        }
        catch (e) {
            console.error(e)
        }

    }

    return (
        <Box>
            fuck you
            <ButtonAdd action={openAdd} >Agregar Movimiento</ButtonAdd>

            <TableMovements deleteFunction={deleteMovement} />
            <RegisterMovement
                saveFunction={addMovemnt}
                isOpen={add}
                handleClose={() => setAdd(false)}
                types_mov={types}
            />

            {isSuccess ? <Alert severity="success">{message}</Alert> : null}
        </Box>
    )
}

export default Movements