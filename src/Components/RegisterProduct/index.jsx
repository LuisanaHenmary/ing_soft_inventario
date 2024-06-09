import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Typography,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TextInputRequerid, TextMultiLineInputRequerid } from '../TextInput';


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
    <Dialog
      onClose={handleClose}
      open={isOpen}
      sx={{ padding: '10px ' }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='p' sx={{ fontWeight: 'bold' }} >
          Registrar producto
        </Typography>

        <IconButton aria-label="close" onClick={handleClose} sx={{ marginLeft: '8px' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            saveFunction(values)
          }}
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
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterProduct;