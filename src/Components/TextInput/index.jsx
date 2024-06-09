import {
  TextField
} from '@mui/material';

export const TextInputRequerid = (props) => {

  const { name, label, formik } = props;

  return (
    <>
      <TextField
        id={name}
        label={label}
        helperText={formik.touched[name] && formik.errors[name] ? (formik.errors[name]) : ""}
        error={formik.touched[name] && formik.errors[name]?true:false}
        required
        sx={{
          margin:"10px"
        }}
        {...formik.getFieldProps(name)}
      />
    </>
  )
}

export const TextMultiLineInputRequerid = (props) => {

  const { name, label, formik } = props;

  return (
    <>
      <TextField
        id={name}
        label={label}
        helperText={formik.touched[name] && formik.errors[name] ? (formik.errors[name]) : ""}
        error={formik.touched[name] && formik.errors[name]?true:false}
        required
        sx={{
          margin:"10px"
        }}
        multiline
        rows={4}
        {...formik.getFieldProps(name)}
      />
    </>
  )
}
