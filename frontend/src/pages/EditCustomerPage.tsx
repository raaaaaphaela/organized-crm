import Form, {FormCustomer} from "../components/form/Form";
import {Container, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import BasicTable from "../components/table/BasicTable";
import FormDialog from "../components/form/FormDialog";

export type Information = {
    content: string,
    dateTime: string,
    username: string,
}

export default function NewCustomerPage() {

    const {id} = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<FormCustomer>();

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/customers/" + id)
            setCustomer(response.data);
        })();
    }, [id]);

    return (
        <>
            <Container component={"main"} maxWidth="sm">
                <Typography component={"h5"}
                            variant={"h5"}>Kunde: {customer?.firstName + " " + customer?.lastName}</Typography>
                <Form existingCustomer={customer}/>
            </Container>
            <Typography component={"h5"} variant={"h5"} sx={{mb: 2}}>Historie</Typography>
            <FormDialog id={id}/>
            <BasicTable information={customer?.information}/>
        </>
    )
}