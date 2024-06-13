import {
    Box,
    Typography,
    TextareaAutosize,
    styled,
    Alert
} from "@mui/material"
import { useEffect, useState } from "react"
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ButtonAdd from "../../Components/ButtonAdd";
import TableProducts from "../../Components/TableProducts";
import RegisterProduct from "../../Components/RegisterProduct";
import InfoCard from "../../layout/InfoCard"
import Info from "../../Components/Info";
import ConfirmWindow from "../../Components/ConfirmWindow";

const initialValues = {
    id: '',
    name: '',
    price: '',
    acount: '',
    description: '',
    brand: '',
    category: '',
    presentation: ''
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
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("")
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [idProduct, setIdProduct] = useState("")

    const productsConnect = collection(db, 'products')
    const categoryConnect = collection(db, 'categories')
    const presentationConnect = collection(db, 'presentations')
    const brandConnect = collection(db, 'brands')

    const getData = async () => {
        try {
            const responseProduct = await getDocs(productsConnect)
            setListProducts(responseProduct.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

            const responseCategory = await getDocs(categoryConnect)
            setListCategory(responseCategory.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

            const responsePresentation = await getDocs(presentationConnect)
            setListPresentation(responsePresentation.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

            const responseBrand = await getDocs(brandConnect)
            setListBrand(responseBrand.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        } catch (e) {
            console.error(e)
        }

    }


    const openView = (index) => {
        setIsSuccess(false)
        const info = listProducts[index]
        const brand = listBrand.find((value) => { return value.id === info.id_brand }).name
        const category = listCategory.find((value) => { return value.id === info.id_category }).name
        const presentation = listPresentation.find((value) => { return value.id === info.id_presentation }).name


        setSelectInfo({
            name: info.name,
            price: info.price,
            acount: info.acount,
            description: info.description,
            brand,
            category,
            presentation
        })

        setView(true);
    }

    const openAdd = () => {
        setIsSuccess(false)
        setAdd(true)
    }

    const OpenConfirmDelete = (id) => {
        setConfirmDelete(true)
        setIsSuccess(false)
        setIdProduct(id)
    }

    const addProduct = async (values) => {

        const {
            name,
            price,
            acount,
            description,
            category,
            brand,
            presentation
        } = values

        try {
            await addDoc(productsConnect, {
                name,
                price: parseFloat(price),
                acount: parseInt(acount),
                description,
                id_category: listCategory[category].id,
                id_brand: listBrand[brand].id,
                id_presentation: listPresentation[presentation].id
            })

            const responseProduct = await getDocs(productsConnect)
            setListProducts(responseProduct.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setMessage("Producto registrado exitosamente")
            setIsSuccess(true)
        }
        catch (e) {
            console.error(e)
        }
        finally {
            setAdd(false)
        }

    }

    const deleteProduct = async () => {
        const product = doc(db, 'products', idProduct)
        deleteDoc(product)

        const responseProduct = await getDocs(productsConnect)
        setListProducts(responseProduct.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setMessage("Producto eliminado exitosamente")
        setIsSuccess(true)
        setConfirmDelete(false)
    }


    useEffect(() => {

        getData()


    }, [])

    return (
        <Box>

            <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: "10px" }} >
                Productos
            </Typography>

            <ButtonAdd action={openAdd} >Agregar producto</ButtonAdd>

            <RegisterProduct
                saveFunction={addProduct}
                isOpen={add}
                handleClose={() => setAdd(false)}
                categoryList={listCategory}
                brandList={listBrand}
                presentationList={listPresentation}
            />

            <TableProducts products={listProducts} openView={openView} openDelete={OpenConfirmDelete} />

            {isSuccess ? <Alert severity="success">{message}</Alert> : null}

            <ConfirmWindow
                isOpen={confirmDelete}
                handleClose={() => setConfirmDelete(false)}
                agreeAction={() => deleteProduct()}
                action="Borrar el registro"
            />

            <InfoCard name_section="Datos del producto" isOpen={view} handleClose={() => setView(false)}>
                <Info name="Nombre del producto" value={selectInfo.name} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Info name="Precio" value={selectInfo.price} />
                    <Info name="Cantidad" value={selectInfo.acount} />
                    <Info name="Marca" value={selectInfo.brand} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <Info name="Categoria" value={selectInfo.category} />
                    <Info name="Presentación" value={selectInfo.presentation} />
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