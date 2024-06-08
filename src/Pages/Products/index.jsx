import {
    Box,
    Typography
} from "@mui/material"
import { useEffect, useState } from "react"
import ButtonAdd from "../../Components/ButtonAdd";
import TableProducts from "../../Components/TableProducts";
import RegisterProduct from "../../Components/RegisterProduct";

const Products = () => {
    const [listProducts, setListProducts] = useState([]);
    const [add, setAdd] = useState(false);

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
        const products = [
            { name: "p1", price: 4.4, acount: 1, description: "Lore" },
        ]

        setListProducts(products)

    }, [])

    return (
        <Box>

            <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: "10px" }} >
                Productos
            </Typography>

            <ButtonAdd action={()=>setAdd(true)} >Agregar producto</ButtonAdd>
            <RegisterProduct saveFunction={addProduct} isOpen={add} handleClose={() => setAdd(false)} />
            <TableProducts products={listProducts} />
        </Box>
    )
}

export default Products;