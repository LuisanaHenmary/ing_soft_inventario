import { useState } from "react"
import { Box, Alert, Typography } from "@mui/material";
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
            type_mov,
            person
        } = values

        const typ = parseInt(type_mov)
        const now = new Date();
        const date = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
        const time = `${now.getHours()}:${now.getMinutes()}`

        try {

            if(typ===0){
                await addDoc(movementConnet, {
                    type_mov: types[typ].name,
                    id_supplier: listSuppliers[person].idDocument,
                    user_id: userID.toString(),
                    date,
                    time
                })
            }

            if(typ===1){
                await addDoc(movementConnet, {
                    type_mov: types[typ].name,
                    id_warehouse: listWarehouses[person].idDocument,
                    user_id: userID.toString(),
                    date,
                    time
                })
            }
            
//
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
            <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: "10px" }} >
                Movimientos
            </Typography>
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