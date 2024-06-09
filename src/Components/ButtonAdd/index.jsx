import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const ButtonAdd = (props) => {
    const { action, children } = props;

    return (
        <Button
            variant="contained"
            onClick={action}
            startIcon={<AddIcon sx={{ color: "white" }} />}
            sx={{marginBottom:"40px"}}
        >

            {children}
        </Button>
    )

}

export default ButtonAdd;