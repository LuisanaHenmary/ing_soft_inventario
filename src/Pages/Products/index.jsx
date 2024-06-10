import {
    Box,
    Typography,
    TextareaAutosize,
    styled
} from "@mui/material"
import { useEffect, useState } from "react"
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
    const [listCategory, setListCategory] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [listPresentation, setListPresentation] = useState([]);

    const openView = (index) => {

        const info = listProducts[index]
        setSelectInfo(info)

        setView(true);
    }

    const closeView = () => {
        setView(false);
    };

    const addProduct = (values) => {

        const {
            name,
            price,
            acount,
            description,
            category,
            brand,
            presentation
        } = values

        const new_list = listProducts.map((obj) => obj)

        new_list.push({
            name,
            price: parseFloat(price),
            acount: parseInt(acount),
            description,
            category: listCategory[category],
            brand: listBrand[brand],
            presentation: listPresentation[presentation]
        })

        setListProducts([])
        setListProducts(new_list)

        console.log(new_list)
        setAdd(false)
    }


    useEffect(() => {
        const products = [
            { name: "p1", price: 4.4, acount: 1, description: "Lore" },
        ]

        const categories = [
            { id: "xxxxx1", name: "Categoria1" },
            { id: "xxxxx2", name: "Categoria2" },
            { id: "xxxxx3", name: "Categoria3" },
            { id: "xxxxx4", name: "Categoria4" },
        ]

        const brands = [
            { id: "xxxxx1", name: "Marca1" },
            { id: "xxxxx2", name: "Marca2" },
            { id: "xxxxx3", name: "Marca3" },
            { id: "xxxxx4", name: "Marca4" },
        ]

        const presentations = [
            { id: "xxxxx1", name: "Presentación1" },
            { id: "xxxxx2", name: "Presentación2" },
            { id: "xxxxx3", name: "Presentación3" },
            { id: "xxxxx4", name: "Presentación4" },
        ]


        setListProducts(products)
        setListCategory(categories)
        setListBrand(brands)
        setListPresentation(presentations)
    }, [])

    return (
        <Box>

            <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: "10px" }} >
                Productos
            </Typography>

            <ButtonAdd action={() => setAdd(true)} >Agregar producto</ButtonAdd>

            <RegisterProduct
                saveFunction={addProduct}
                isOpen={add}
                handleClose={() => setAdd(false)}
                categoryList={listCategory}
                brandList={listBrand}
                presentationList={listPresentation}
            />

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