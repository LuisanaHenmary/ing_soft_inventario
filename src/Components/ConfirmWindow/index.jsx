import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

const ConfirmWindow = (props) => {

  const { isOpen, handleClose, agreeAction, action } = props

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      sx={{ padding: '10px ' }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography>
          {action}
        </Typography>
        <IconButton aria-label="close" onClick={handleClose} sx={{ marginLeft: '8px' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estas seguro?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={agreeAction}
          color="primary"
          sx={{ padding: "10px" }}
        >
          Aceptar
        </Button>
        <Button
            variant="outlined"
            onClick={handleClose}
            color="error"
        >

            Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmWindow