import {
    FormControl,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';

const SelectField = (props) => {

    const { name, label, formik, options } = props;

    return (
        <FormControl sx={{ marginBottom: "20px", width: "100%" }}>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                id={name}
                name={name}
                formik={formik}
                label={label}
                {...formik.getFieldProps(name)}
            >
                {
                    options.map((obj, index) => (
                        <MenuItem value={index} key={index}>{obj.name}</MenuItem>
                    ))}
            </Select>
        </FormControl>
    )
}

export default SelectField