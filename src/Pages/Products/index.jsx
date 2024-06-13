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
    brand: { id: "", name: "" },
    category: { id: "", name: "" },
    presentation: { id: "", name: "" }
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

    const productsConnect = collection(db, 'products')
    const categoryConnect = collection(db, 'categories')
    const presentationConnect = collection(db, 'presentations')
    const brandConnect = collection(db, 'brands')

    const getData = async () =>{
        const responseProduct = await getDocs(productsConnect)
        setListProducts(responseProduct.docs.map((doc)=>({...doc.data(), id:doc.id})))

        const responseCategory = await getDocs(categoryConnect)
        setListCategory(responseCategory.docs.map((doc)=>({...doc.data(), id:doc.id})))

        const responsePresentation = await getDocs(presentationConnect)
        setListPresentation(responsePresentation.docs.map((doc)=>({...doc.data(), id:doc.id})))

        const responseBrand = await getDocs(brandConnect)
        setListBrand(responseBrand.docs.map((doc)=>({...doc.data(), id:doc.id})))

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

        getData()

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
                    <Info name="Marca" value={selectInfo.brand.name} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                
                <Info name="Categoria" value={selectInfo.category.name} />
                <Info name="Presentación" value={selectInfo.presentation.name} />
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