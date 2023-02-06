import {Box, Button, Modal, Typography} from "@mui/material";
import React from "react";

export default function DeleteModal(
    {
        open,
        setOpen,
        handleDelete,
    }: {
        open: boolean,
        setOpen: Function,
        handleDelete: any
    }) {

    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Kunden wirklich löschen?
                </Typography>
                <Button onClick={handleDelete}
                        sx={{
                            mt: 3,
                            color: 'info.main',
                            border: 1,
                            borderColor: 'info.main',
                            "&:hover": {
                                backgroundColor: 'info.main',
                                color: 'white',
                                borderColor: 'info.main'
                            },
                        }}>
                    Ja, endgültig löschen
                </Button>
                <Button onClick={handleClose}
                        sx={{
                            mt: 3,
                            border: 0,
                            ml: 3
                        }} variant="outlined">
                    Abbrechen
                </Button>
            </Box>
        </Modal>
    )
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};