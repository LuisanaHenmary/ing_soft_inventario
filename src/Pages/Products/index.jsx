import {
    Box
} from "@mui/material"
import { useEffect, useState } from "react"
import TableProducts from "../../Components/TableProducts";

const Products = () => {
    const [listProducts, setListProducts] = useState([]);


    useEffect(() => {
        const products = [
            { name: "p1", price: 4.4, acount: 1 },
            { name: "p2", price: 4.1, acount: 6 },
            { name: "p3", price: 1.4, acount: 1 },
            { name: "p4", price: 2.1, acount: 9 },
        ]

        setListProducts(products)

    },[])

    return (
        <Box>
            <TableProducts products={listProducts} />
          
        </Box>
    )
}

export default Products;