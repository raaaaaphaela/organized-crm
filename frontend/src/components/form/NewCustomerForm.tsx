import Paper from "@mui/material/Paper";
import {Button, Grid, TextField, Typography} from "@mui/material";
import FormItems from "./FormItems";
import FileUpload from "./FileUpload";
import FormButtons from "./FormButtons";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useFormForNewCustomer from "../../hooks/useFormForNewCustomer";
import {ToastContainer} from "react-toastify";
import useCsvUpload from "../../hooks/useCsvUpload";

export default function NewCustomerForm() {

    const navigate = useNavigate();
    const toHome = () => navigate("/", {replace: true});

    const {
        customer,
        setCustomer,
        information,
        handleChange,
        handleInformationChange,
        setFile,
        save,
    } = useFormForNewCustomer();

    const {csvCustomerData, handleOnChange, handleOnSubmit} = useCsvUpload();

    useEffect(() => {
        if (csvCustomerData) {
            setCustomer(csvCustomerData)
        }
    }, [csvCustomerData, setCustomer])

    return (
        <Paper variant={"outlined"}
               sx={{
                   boxShadow: '8px 5px 31px -12px #062375',
                   border: 'none',
                   borderRadius: 3,
                   my: 3,
                   p: {xs: 2, md: 3}
               }}>
            <div style={{textAlign: "center"}}>
                <form>
                    <input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                    />
                    <Button variant={"outlined"}
                            onClick={handleOnSubmit}
                    >
                        CSV hochladen
                    </Button>
                </form>
            </div>
            <Grid container component={"form"} spacing={3} sx={{pt: 2}} onSubmit={save}>
                <FormItems customer={customer} handleChange={handleChange}/>

                <Grid item xs={12}>
                    <TextField
                        id={"information"}
                        name="information"
                        label="Persönliche Informationen"
                        value={information.content}
                        required
                        fullWidth
                        multiline
                        variant="standard"
                        onChange={handleInformationChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">
                        Unterzeichnete DSGVO hochladen <sup>*</sup>
                    </Typography> <br/>
                    <FileUpload setFile={setFile}/>
                </Grid>
                <FormButtons customer={customer} toHome={toHome}/>
            </Grid>
            <ToastContainer position={"top-center"}/>
        </Paper>
    )
}