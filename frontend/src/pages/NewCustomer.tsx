import Form from "../components/form/Form";
import {Container, Typography} from "@mui/material";
import React from "react";

export default function NewCustomer() {
    return (
        <Container component={"main"} maxWidth="sm">
                <Typography component={"h5"} variant={"h5"}>Neuer Kunde</Typography>
                <Form/>
        </Container>
    )
}