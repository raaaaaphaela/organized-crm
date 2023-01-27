import {Button, Grid, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {FormCustomer} from "../../customer-form";

const defaultCustomer: FormCustomer = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "street": "",
    "houseNo": 0,
    "city": "",
    "postalCode": 0,
    "linkToDSGVO": "",
    "information": [],
    "createdBy": "",
}

export default function Form(
    {
        existingCustomer
    }: {
        existingCustomer?: FormCustomer
    }) {

    const [customer, setCustomer] = useState<FormCustomer>(defaultCustomer);
    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();
    const toHome = () => navigate("/", {replace: true});

    useEffect(() => {
        existingCustomer && setCustomer(existingCustomer);
    }, [existingCustomer])


    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setCustomer({...customer, [name]: value});
        },
        [customer, setCustomer]
    );

    const save = useCallback(async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setErrors([]);

            try {
                await axios.post("/api/customers", customer);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid user data"
                ]);
                console.log(errors)
            }
        },
        [customer, errors]
    );

    return (
        <Paper variant={"outlined"} sx={{boxShadow: 4, my: 3, p: {xs: 2, md: 3}}}>
            <Grid container component={"form"} spacing={3} sx={{pt: 2}} onSubmit={save}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id={"firstName"}
                        name="firstName"
                        label="Vorname"
                        value={customer.firstName}
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
                        value={customer.lastName}
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
                        value={customer.email}
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
                        value={customer.phone}
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
                        value={customer.street}
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
                        value={customer.houseNo}
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
                        value={customer.city}
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
                        value={customer.postalCode}
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