import {Container, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import InformationTable from "../components/table/InformationTable";
import InformationForm from "../components/form/InformationForm";
import {FormCustomer} from "../customer-form";
import NotFoundPage from "./NotFoundPage";
import EditCustomerForm from "../components/form/EditCustomerForm";
import {getCustomer} from "../api-service/customer-service";
import NavBar from "../components/NavBar";

export default function NewCustomerPage() {

    const {id} = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<FormCustomer>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            (async () => {
                const response = await getCustomer(id);
                setCustomer(response.data);
                setIsLoading(false);
            })();
        }
    }, [id]);

    if (isLoading) {
        return null;
    }

    if (!customer) {
        return <NotFoundPage/>
    }

    return (
        <>
            <NavBar/>
            <Container sx={{pt: 6}}>
                <Container component={"main"} maxWidth="sm">
                    <Typography component={"h4"} variant={"h4"}>
                        Kunde: {customer?.firstName + " " + customer?.lastName}
                    </Typography>
                    <EditCustomerForm existingCustomer={customer}/>
                </Container>
                <Grid display={"flex"} justifyContent={"space-between"} sx={{mt: 6}}>
                    <Typography component={"h5"} variant={"h5"} sx={{mb: 2}}>Kontaktverlauf</Typography>
                    <InformationForm id={id}/>
                </Grid>
                <InformationTable information={customer?.information}/>
            </Container>
        </>
    )
}