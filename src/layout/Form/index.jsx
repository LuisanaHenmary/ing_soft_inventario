import { Formik } from 'formik';
import {
  Button,
  Typography,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const FormLayout = (props) => {

  const {
    submitFunction,
    isOpen,
    handleClose,
    validationSchema,
    initialValues,
    nameForm,
    children
} = props

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      sx={{ padding: '10px ' }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='p' sx={{ fontWeight: 'bold' }} >
          {nameForm}
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
            submitFunction(values)
          }}
        >
          {children}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default FormLayout;