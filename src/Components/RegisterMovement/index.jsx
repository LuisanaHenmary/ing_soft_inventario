import * as Yup from 'yup';
import { TextInputRequerid } from '../TextInput';
import FormLayout from '../../layout/Form';
import SelectField from '../SelectField';
import { ButtonSubmit } from '../SubmitDialog';
import useStoreGlobal from "../../store/useStoreGlobal";

const validationSchema = Yup.object({
    number_mov: Yup.number().typeError('Debe ser un número')
        .required('Requerido')
    ,
});

const initialValues = {
    number_mov: '',
    type_mov:0,
    supplier:0,
    warehouses: 0,
};


const RegisterMovement = (props) => {

    const listSuppliers = useStoreGlobal((state) => state.listSuppliers);
    const listWarehouses = useStoreGlobal((state) => state.listWarehouses);

    const {
        saveFunction,
        isOpen,
        handleClose,
        types_mov
    } = props

    return (
        <>
        {listSuppliers.length>0 && listWarehouses.length>0?<FormLayout
            submitFunction={saveFunction}
            isOpen={isOpen}
            handleClose={handleClose}
            validationSchema={validationSchema}
            initialValues={initialValues}
            nameForm="Registrar movimiento"
        >

            {formik => (
                <form onSubmit={formik.handleSubmit}>

                    <div style={{ margin: "10px" }}>
                        <TextInputRequerid name="number_mov" label="Numero" formik={formik} />
                    </div>

                    <SelectField name="type_mov" label="Tipo" formik={formik} options={types_mov} />

                    <SelectField name="supplier" label="Proveedor" formik={formik} options={listSuppliers} />

                    <SelectField name="warehouses" label="Almacen" formik={formik} options={listWarehouses} />

                    <ButtonSubmit name_action="Agregar" />

                </form>
            )}
        </FormLayout>:<div>No hay proveedores y/o almacenes registrados</div>}
        </>

    );
};

export default RegisterMovement;