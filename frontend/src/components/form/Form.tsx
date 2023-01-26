import {Button, Grid, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, {FormEvent, useCallback, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

type newCustomerType = {
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": string,
    "street": string,
    "houseNo": number,
    "city": string,
    "postalCode": string,
    "linkToDSGVO": string,
    "actions": string[],
}

const defaultCustomer= {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "street": "",
    "houseNo": 0,
    "city": "",
    "postalCode": "",
    "linkToDSGVO": "",
    "actions": [],
}
export default function Form() {

    const [newCustomer, setNewCustomer] = useState<newCustomerType>(defaultCustomer);
    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();
    const toHome = () => navigate("/", {replace: true});

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setNewCustomer({...newCustomer, [name]: value});
            console.log(newCustomer);
        },
        [newCustomer, setNewCustomer]
    );

    const save = useCallback(async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setErrors([]);

            try {
                await axios.post("/api/customer", newCustomer);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid user data"
                ]);
                console.log(errors)
            }
        },
        [newCustomer, errors]
    );

    return (
            <Paper variant={"outlined"} sx={{my: 3, p: {xs: 2, md: 3}}}>
                <Grid container component={"form"} spacing={3} sx={{pt: 2}} onSubmit={save}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id={"firstName"}
                            name="firstName"
                            label="Vorname"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id={"lastName"}
                            name="lastName"
                            label="Nachname"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id={"email"}
                            name="email"
                            type={"email"}
                            label="E-Mail"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id={"phone"}
                            name="phone"
                            label="Telefon"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id={"street"}
                            name="street"
                            label="Straße"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id={"houseNo"}
                            name="houseNo"
                            label="Nr."
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id={"city"}
                            name="city"
                            label="Stadt"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id={"postalCode"}
                            name="postalCode"
                            label="PLZ"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Button
                        type={"submit"}
                        variant="contained"
                        sx={{mt: 3, ml: 3}}
                    >
                        Speichern
                    </Button>
                    <Button
                        onClick={toHome}
                        variant="outlined"
                        sx={{mt: 3, ml: 3}}
                    >
                        Abbrechen
                    </Button>
                </Grid>
            </Paper>
    )
}