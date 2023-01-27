import Form, {FormCustomer} from "../components/form/Form";
import {Container, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function NewCustomerPage() {

    const {id} = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<FormCustomer>();

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/customer/" + id)
            setCustomer(response.data);
        })();
    }, [id]);

    return (
        <Container component={"main"} maxWidth="sm">
            <Typography component={"h5"} variant={"h5"}>{customer?.lastName}</Typography>
            <Form existingCustomer={customer}/>
        </Container>
    )
}