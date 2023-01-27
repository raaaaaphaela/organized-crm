import * as React from 'react';
import {FormEvent, useCallback, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Information} from "../../pages/EditCustomerPage";
import axios from "axios";
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function FormDialog({id}: { id: string | undefined }) {

    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    const [information, setInformation] = useState<Information>({
        dateTime: new Date().toISOString().substring(0, (new Date().toISOString().indexOf("T") | 0) + 6 | 0),
        content: "",
        username: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInformation({
            ...information,
            [name]: value
        });
    }, [information, setInformation]);

    const save = useCallback(async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setErrors([]);

            try {
                await axios.post("/api/customers/info/" + id, information);
                navigate(0);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid user data"
                ]);
                console.log(errors)
            }
        },
        [id, errors, information, navigate]
    );

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Neuer Eintrag
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Neuer Eintrag:</DialogTitle>
                <DialogContent>
                    <Grid container component={"form"} spacing={3} sx={{pt: 2}} onSubmit={save}>
                        <TextField
                            id="datetime-local"
                            label="Datum"
                            type="datetime-local"
                            name="dateTime"
                            value={information.dateTime}
                            sx={{width: 250, mt: 2}}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="content"
                            label="Inhalt"
                            type="text"
                            name="content"
                            value={information.content}
                            fullWidth
                            multiline
                            variant="standard"
                            onChange={handleChange}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Abbrechen</Button>
                            <Button onClick={handleClose} type={"submit"}>Speichern</Button>
                        </DialogActions>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}