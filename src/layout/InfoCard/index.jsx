import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

const InfoCard = (props) =>{

    const {name_section, isOpen, handleClose, children} = props

    return(
        <Dialog
                onClose={handleClose}
                open={isOpen}
                sx={{ padding: '10px ' }}>
                <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='p' sx={{ fontWeight: 'bold' }} >
                        {name_section}
                    </Typography>

                    <IconButton aria-label="close" onClick={handleClose} sx={{ marginLeft: '8px' }}>
                        <CloseIcon />
                    </IconButton>

                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
    )

}

export default InfoCard;