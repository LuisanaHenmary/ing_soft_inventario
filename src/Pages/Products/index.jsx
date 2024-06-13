import {
    Box,
    Typography,
    TextareaAutosize,
    styled
} from "@mui/material"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; 
import ButtonAdd from "../../Components/ButtonAdd";
import TableProducts from "../../Components/TableProducts";
import RegisterProduct from "../../Components/RegisterProduct";
import InfoCard from "../../layout/InfoCard"
import Info from "../../Components/Info";

const initialValues = {
    name: '',
    price: '',
    acount: '',
    description: '',
};

const Textarea = styled(TextareaAutosize)(() => `
    width: 100%;
  `,
);

const Products = () => {
    const [listProducts, setListProducts] = useState([]);
    const [add, setAdd] = useState(false);
    const [view, setView] = useState(false);
    const [selectInfo, setSelectInfo] = useState(initialValues)

    const testConect = collection(db, 'products')

    const getData = async () =>{
        const response = await getDocs(testConect)
        setListProducts(response.docs.map((doc)=>({...doc.data(), id:doc.id})))
    }

    const openView = (index) => {

        const info = listProducts[index]
        setSelectInfo(info)

        setView(true);
    }

    const closeView = () => {
        setView(false);
    };

    const addProduct = (values) => {

        const { name, price, acount, description } = values
        const new_list = listProducts.map((obj) => obj)
        new_list.push({ name, price: parseFloat(price), acount: parseInt(acount), description })
        setListProducts([])
        setListProducts(new_list)

        console.log(new_list)
        setAdd(false)
    }


    useEffect(() => {
        getData()
    }, [])

    return (
        <Box>

            <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: "10px" }} >
                Productos
            </Typography>

            <ButtonAdd action={() => setAdd(true)} >Agregar producto</ButtonAdd>
            <RegisterProduct saveFunction={addProduct} isOpen={add} handleClose={() => setAdd(false)} />
            <TableProducts products={listProducts} openView={openView} />

            <InfoCard name_section="Datos del producto" isOpen={view} handleClose={closeView}>
                <Info name="Nombre del producto" value={selectInfo.name} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Info name="Precio" value={selectInfo.price} />
                    <Info name="Cantidad" value={selectInfo.acount} />
                </div>

                <Info
                    name="Descripción"
                    value={<Textarea placeholder={selectInfo.description} disabled maxRows={4} />}
                />


            </InfoCard>
        </Box>
    )
}

export default Products;