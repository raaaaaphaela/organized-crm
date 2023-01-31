import {Button} from "@mui/material";
import DeleteDialog from "../DeleteDialog";
import React from "react";
import {FormCustomer} from "../../customer-form";

export default function FormButtons (
    {
        existingCustomer,
        customer,
        toHome,
    }: {
        existingCustomer?: FormCustomer,
        customer: FormCustomer,
        toHome: any
    }) {
    return (
        <>
            <Button
                type={"submit"}
                variant="contained"
                sx={{mt: 3, ml: 3}}
            >
                Speichern
            </Button>
            {existingCustomer && customer.id &&
                <DeleteDialog id={customer.id}/>
            }
            <Button
                onClick={toHome}
                variant="outlined"
                sx={{mt: 3, ml: 3}}
            >
                {existingCustomer ? "Kundenübersicht" : "Abbrechen"}
            </Button></>
    )
}