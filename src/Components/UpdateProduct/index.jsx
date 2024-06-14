import * as Yup from 'yup';
import { TextInputRequerid, TextMultiLineInputRequerid } from '../TextInput';
import FormLayout from '../../layout/Form';
import SelectField from '../SelectField';
import { ButtonSubmit } from '../SubmitDialog';


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



const UpdateProduct = (props) => {

  const {
    saveFunction,
    isOpen,
    handleClose,
    categoryList,
    brandList,
    presentationList,
    defaultValues
  } = props

  return (
    <FormLayout
      submitFunction={saveFunction}
      isOpen={isOpen}
      handleClose={handleClose}
      validationSchema={validationSchema}
      initialValues={defaultValues}
      nameForm="Actualizar producto"
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

          <SelectField name="category" label="Categoria" formik={formik} options={categoryList} />

          <SelectField name="brand" label="Marca" formik={formik} options={brandList} />

          <SelectField name="presentation" label="Presentación" formik={formik} options={presentationList} />
         
          <ButtonSubmit name_action="Guardar" />

        </form>
      )}
    </FormLayout>

  );
};

export default UpdateProduct;