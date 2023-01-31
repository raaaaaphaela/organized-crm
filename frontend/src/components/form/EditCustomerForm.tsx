import Paper from "@mui/material/Paper";
import {Button, Grid} from "@mui/material";
import FormItems from "./FormItems";
import {downloadPDF} from "../../api-service/customer-service";
import FormButtons from "./FormButtons";
import React from "react";
import {FormCustomer} from "../../customer-form";
import useFormExistingCustomer from "../../hooks/useFormForExistingCustomer";
import {useNavigate} from "react-router-dom";

export default function EditCustomerForm(
    {
        existingCustomer
    }: {
        existingCustomer: FormCustomer
    }) {

    const {
        customer,
        handleChange,
        save
    } = useFormExistingCustomer(existingCustomer);

    const navigate = useNavigate();
    const toHome = () => navigate("/", {replace: true});

    return (
        <Paper variant={"outlined"} sx={{boxShadow: 4, my: 3, p: {xs: 2, md: 3}}}>
            <Grid container component={"form"} spacing={3} sx={{pt: 2}} onSubmit={save}>
                <FormItems customer={customer} handleChange={handleChange}/>
                    <Grid item xs={12}>
                        <Button onClick={async () => {
                            await downloadPDF(customer)
                        }}>
                            Download DSGVO
                        </Button>
                    </Grid>
                <FormButtons existingCustomer={existingCustomer} customer={customer} toHome={toHome}/>
            </Grid>
        </Paper>
    )
}