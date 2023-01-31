import {Container, Typography} from "@mui/material";
import React from "react";
import NewCustomerForm from "../components/form/NewCustomerForm";

export default function NewCustomerPage() {
    return (
        <Container component={"main"} maxWidth="sm">
            <Typography component={"h5"} variant={"h5"}>Neuer Kunde</Typography>
            <NewCustomerForm/>
        </Container>
    )
}