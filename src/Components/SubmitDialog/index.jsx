import {
    Button,
    DialogActions,
} from '@mui/material';

export const ButtonSubmit = ({name_action}) =>{
    return(
        <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ padding: "10px" }}
            >
              {name_action}
            </Button>
          </DialogActions>
    )
}