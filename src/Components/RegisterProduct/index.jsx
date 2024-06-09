import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  DialogActions
} from '@mui/material';
import { TextInputRequerid, TextMultiLineInputRequerid } from '../TextInput';
import FormLayout from '../../layout/Form';


const validationSchema = Yup.object({
  name: Yup.string().required('Requiredo'),
  price: Yup.number().typeError('Debe ser un número')
    .required('Requerido')
    .test(
      'is-decimal',
      'El número debe ser un número flotante con hasta dos decimales',
      (value) => (value + "").match(/^\d*\.?\d{0,2}$/)
    ),
  acount: Yup.number().typeError('Debe ser un número').integer("Debe se un Numero entero")
    .required('Requerido'),
  description: Yup.string().required('Requiredo'),
});

const initialValues = {
  name: '',
  price: '',
  acount: '',
  description: '',
};

const RegisterProduct = (props) => {

  const { saveFunction, isOpen, handleClose } = props

  return (
    <FormLayout
      submitFunction={saveFunction}
      isOpen={isOpen}
      handleClose={handleClose}
      validationSchema={validationSchema}
      initialValues={initialValues}
      nameForm="Registrar producto"
    >

      {formik => (
        <form onSubmit={formik.handleSubmit}>

          <div style={{ margin: "10px" }}>
            <TextInputRequerid name="name" label="Nombre del producto" formik={formik} />
            <TextInputRequerid name="price" label="Precio" formik={formik} />
          </div>

          <div style={{ margin: "10px" }}>
            <TextInputRequerid name="acount" label="Cantidad" formik={formik} />
            <TextMultiLineInputRequerid name="description" label="Descripción" formik={formik} />
          </div>

          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ padding: "10px" }}
            >
              Agregar
            </Button>
          </DialogActions>

        </form>
      )}
    </FormLayout>

  );
};

export default RegisterProduct;