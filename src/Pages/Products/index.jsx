import {Box,Typography,Chip,Alert,DialogActions,Button} from "@mui/material"
import { useState } from "react"
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ButtonAdd from "../../Components/ButtonAdd";
import TableProducts from "../../Components/TableProducts";
import RegisterProduct from "../../Components/RegisterProduct";
import InfoCard from "../../layout/InfoCard"
import Info from "../../Components/Info";
import ConfirmWindow from "../../Components/ConfirmWindow";
import UpdateProduct from "../../Components/UpdateProduct";
import useStoreGlobal from "../../store/useStoreGlobal";


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

const Products = () => {
  const productsConnect = collection(db, "products");

    const listProducts = useStoreGlobal((state) => state.listProducts);
    const setProducts = useStoreGlobal((state) => state.setProducts);
    const listBrand = useStoreGlobal((state) => state.listBrands);
    const listCategory = useStoreGlobal((state) => state.listCategories);
    const listPresentation = useStoreGlobal((state) => state.listPresentations);

    const [add, setAdd] = useState(false);
    const [view, setView] = useState(false);
    const [selectInfo, setSelectInfo] = useState(initialValues)
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("")
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [idProduct, setIdProduct] = useState("")
    const [edit, setEdit] = useState(false);

    const openView = (index) => {
        setIsSuccess(false)
        const info = listProducts[index]
        const brand = listBrand.find((value) => { return value.idDocument === info.id_brand }).name
        const category = listCategory.find((value) => { return value.idDocument === info.id_category }).name
        const presentation = listPresentation.find((value) => { return value.idDocument === info.id_presentation }).name

        setSelectInfo(initialValues)
        setSelectInfo({
            index,
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

    const renderList = async () =>{
        const responseProduct = await getDocs(productsConnect)
      const listProducts = responseProduct.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      setProducts(listProducts)
    }

    const OpenConfirmDelete = (id) => {
        setConfirmDelete(true)
        setIsSuccess(false)
        setIdProduct(id)
    }

    const openEdit = (index) => {
        const info = listProducts[index]
        const brand = listBrand.findIndex((value) => { return value.idDocument === listProducts[index].id_brand })
        const category = listCategory.findIndex((value) => { return value.idDocument === listProducts[index].id_category })
        const presentation = listPresentation.findIndex((value) => { return value.idDocument === listProducts[index].id_presentation })
        setView(false)
        setIsSuccess(false)
        setSelectInfo(initialValues)
        setSelectInfo({
            idDocument: info.idDocument,
            name: info.name,
            price: info.price,
            acount: info.acount,
            description: info.description,
            brand,
            category,
            presentation
        })
        setEdit(true)
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
                id_category: listCategory[category].idDocument,
                id_brand: listBrand[brand].idDocument,
                id_presentation: listPresentation[presentation].idDocument
            })

            renderList()
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

        renderList()
        setMessage("Producto eliminado exitosamente")
        setIsSuccess(true)
        setConfirmDelete(false)
    }

    const editProduct = async (values) => {

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
            const product = doc(db, 'products', selectInfo.idDocument)
            await updateDoc(product, {
                name,
                price: parseFloat(price),
                acount: parseInt(acount),
                description,
                id_category: listCategory[category].idDocument,
                id_brand: listBrand[brand].idDocument,
                id_presentation: listPresentation[presentation].idDocument
            })

            renderList()
            setMessage("Producto actualizado exitosamente")
            setIsSuccess(true)
        }
        catch (e) {
            console.error(e)
        }
        finally {
            setEdit(false)
        }
    }

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
            />

            <TableProducts
                products={listProducts}
                openView={openView}
                openDelete={OpenConfirmDelete}
                openEdit={openEdit}
            />

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
                    value={<Chip
                        sx={{
                            height: 'auto',
                            '& .MuiChip-label': {
                                display: 'block',
                                whiteSpace: 'normal',
                            },
                        }}
                        label={selectInfo.description}
                    />
                    }
                />

                {//Esto es para cuando se integre el login para admin
                false ?
                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={()=>openEdit(selectInfo.index)}
                        >
                            Editar
                        </Button>
                    </DialogActions> : null}
            </InfoCard>

            <UpdateProduct
                saveFunction={editProduct}
                isOpen={edit}
                handleClose={() => setEdit(false)}
                defaultValues={selectInfo}
            />
        </Box>
    )
}

export default Products;