import FormLayout from '../../layout/Form';
import SelectField from '../SelectField';
import { ButtonSubmit } from '../SubmitDialog';
import useStoreGlobal from "../../store/useStoreGlobal";
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { TextInputRequerid } from '../TextInput';


const initialValues = {
    type_mov: 0,
    person: 0,
    product: 0,
    quantity: 0,
};


const RegisterMovement = (props) => {

    const listSuppliers = useStoreGlobal((state) => state.listSuppliers);
    const listWarehouses = useStoreGlobal((state) => state.listWarehouses);
    const listProducts = useStoreGlobal((state) => state.listProducts);

    const {
        saveFunction,
        isOpen,
        handleClose,
        types_mov,
        
    } = props

    return (
        <>
            {listSuppliers.length > 0 && listWarehouses.length > 0 ? <FormLayout
                submitFunction={saveFunction}
                isOpen={isOpen}
                handleClose={handleClose}
                initialValues={initialValues}
                nameForm="Registrar movimiento"
            >

                {formik => (
                    <form onSubmit={formik.handleSubmit}>

                        <div style={{ margin: "10px" }}>
                            <FormControl>
                                <RadioGroup
                                    name="type_mov"
                                    id="type_mov"
                                    formik={formik}
                                    {...formik.getFieldProps("type_mov")}
                                >
                                    {types_mov.map((obj, index) => (
                                        <FormControlLabel value={index} key={index} control={<Radio size="small" />} label={obj.name} />
                                    ))}

                                </RadioGroup>
                            </FormControl>

                        </div>

                        {parseInt(formik.values.type_mov) === 0 ?  
                          <SelectField name="person" label="Proveedor" formik={formik} options={listSuppliers} />
                          :
                          <SelectField name="person" label="Almacen" formik={formik} options={listWarehouses} />
                        }

                        <SelectField name="product" label="Producto" formik={formik} options={listProducts} />
                        <TextInputRequerid name="quantity" label="Cantidad" formik={formik} />

                        <ButtonSubmit name_action="Agregar" />
                    </form>
                )}
            </FormLayout> : <div>No hay proveedores y/o almacenes registrados</div>}
        </>

    );
};

export default RegisterMovement;