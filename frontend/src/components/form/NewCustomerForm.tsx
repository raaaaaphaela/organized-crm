import Paper from "@mui/material/Paper";
import {Grid, TextField} from "@mui/material";
import FormItems from "./FormItems";
import FileUpload from "./FileUpload";
import FormButtons from "./FormButtons";
import React from "react";
import {useNavigate} from "react-router-dom";
import useFormForNewCustomer from "../../hooks/useFormForNewCustomer";

export default function NewCustomerForm() {

    const navigate = useNavigate();
    const toHome = () => navigate("/", {replace: true});

    const {
        customer,
        information,
        handleChange,
        handleInformationChange,
        setFile,
        save
    } = useFormForNewCustomer();

    return (
        <Paper variant={"outlined"} sx={{boxShadow: 4, my: 3, p: {xs: 2, md: 3}}}>
            <Grid container component={"form"} spacing={3} sx={{pt: 2}} onSubmit={save}>
                <FormItems customer={customer} handleChange={handleChange}/>

                <Grid item xs={12}>
                    <TextField
                        id={"information"}
                        name="information"
                        label="Zusätzliche Informationen"
                        value={information.content}
                        fullWidth
                        multiline
                        variant="standard"
                        onChange={handleInformationChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FileUpload setFile={setFile}/>
                </Grid>
                <FormButtons customer={customer} toHome={toHome}/>
            </Grid>
        </Paper>
    )
}