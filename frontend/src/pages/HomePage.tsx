import {Button, Container, Grid, Typography} from "@mui/material";
import EnhancedTable from "../components/table/EnhancedTable";
import React from "react";
import {useNavigate} from "react-router-dom";
import NavBar from "../components/NavBar";

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
        <>
            <NavBar/>
            <Container sx={{pt: 6}}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h4">
                        KUNDENÜBERSICHT
                    </Typography>
                    <Button sx={{my: 4, color: 'white'}} variant="contained" onClick={newCustomer}>Neuer Kunde</Button>
                    <EnhancedTable/>
                </Grid>
            </Container>
        </>
    )
}