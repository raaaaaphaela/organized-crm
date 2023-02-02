import {Button, Grid, Typography} from "@mui/material";
import EnhancedTable from "../components/table/EnhancedTable";
import React from "react";
import {useNavigate} from "react-router-dom";

export interface Customer {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    birthday: string,
    phone: string,
    street: string,
    houseNo: number,
    city: string,
    postalCode: number,
    createdBy: string,
}

export default function HomePage() {

    const navigate = useNavigate();
    const newCustomer = () => navigate("/new", {replace: true});

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Typography variant="h4">
                KUNDENÜBERSICHT
            </Typography>
            <Button sx={{my: 4}} variant="contained" onClick={newCustomer}>Neuer Kunde</Button>
            <EnhancedTable/>
        </Grid>
    )
}