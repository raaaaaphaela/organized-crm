import Form from "../components/form/Form";
import {Container, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import BasicTable from "../components/table/BasicTable";
import FormDialog from "../components/form/FormDialog";
import {FormCustomer} from "../customer-form";

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
                <Typography component={"h4"} variant={"h4"}>
                    Kunde: {customer?.firstName + " " + customer?.lastName}
                </Typography>
                <Form existingCustomer={customer}/>
            </Container>
            <Grid display={"flex"} justifyContent={"space-between"} sx={{mt: 6}}>
                <Typography component={"h5"} variant={"h5"} sx={{mb: 2}}>Kontaktverlauf</Typography>
                <FormDialog id={id}/>
            </Grid>
            <BasicTable information={customer?.information}/>
        </>
    )
}