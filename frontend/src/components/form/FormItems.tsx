import {Grid, TextField} from "@mui/material";
import React, {ChangeEventHandler} from "react";
import {FormCustomer} from "../../customer-form";

export default function FormItems (
    {
        customer,
        handleChange
    }: {
        customer: FormCustomer,
        handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    }) {
    return (
        <>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12}>
                <TextField
                    id="date"
                    label="Geburtstag"
                    type="date"
                    name="birthday"
                    required
                    value={customer.birthday}
                    sx={{width: 250, mt: 2}}
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={handleChange}
                />

            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    id={"street"}
                    name="street"
                    label="Stra??e"
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
        </>
    )
}