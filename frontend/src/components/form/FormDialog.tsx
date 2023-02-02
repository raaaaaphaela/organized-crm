import * as React from 'react';
import {FormEvent, useCallback, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Information} from "../../customer-form";
import {saveInformation} from "../../api-service/customer-service";

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

            if (id) {
                try {
                    await saveInformation(id, information);
                    navigate(0);
                } catch (e) {
                    setErrors((errors) => [
                        ...errors,
                        "Invalid user data"
                    ]);
                    console.log(errors)
                }
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
                <DialogTitle sx={{pl: 4, pt: 4}}>Neuer Eintrag:</DialogTitle>
                <DialogContent>
                    <Grid container component={"form"} spacing={3} sx={{p: 4}} onSubmit={save}>
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
                        <DialogActions sx={{pt: 4}}>
                            <Button onClick={handleClose} variant={"contained"} type={"submit"}>Speichern</Button>
                            <Button onClick={handleClose}>Abbrechen</Button>
                        </DialogActions>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}