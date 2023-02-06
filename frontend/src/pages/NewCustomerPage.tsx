import {Container, Typography} from "@mui/material";
import React from "react";
import NewCustomerForm from "../components/form/NewCustomerForm";
import NavBar from "../components/NavBar";

export default function NewCustomerPage() {
    return (
        <>
            <NavBar/>
            <Container sx={{pt: 6}}>
                <Container component={"main"} maxWidth="sm">
                    <Typography component={"h5"} variant={"h5"}>Neuer Kunde</Typography>
                    <NewCustomerForm/>
                </Container>
            </Container>
        </>
    )
}