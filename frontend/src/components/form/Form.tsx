import {Button, Grid, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FormCustomer, Information} from "../../customer-form";
import FileUpload from "./FileUpload";
import FormItems from "./FormItems";
import {downloadPDF, saveCustomer, savePDF} from "../../api-service/customer-service";
import FormButtons from "./FormButtons";

const defaultCustomer: FormCustomer = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "street": "",
    "houseNo": 0,
    "city": "",
    "postalCode": 0,
    "linkToDSGVO": "",
    "information": [],
    "createdBy": "",
}

export default function Form(
    {
        existingCustomer
    }: {
        existingCustomer?: FormCustomer
    }) {

    const [customer, setCustomer] = useState<FormCustomer>(defaultCustomer);
    const [file, setFile] = useState<File>();
    const [information, setInformation] = useState<Information>(
        {
            content: "",
            dateTime: new Date()
                .toISOString()
                .substring(0, (new Date()
                    .toISOString()
                    .indexOf("T") | 0) + 6 | 0),
            username: ""
        }
    );

    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();
    const toHome = () => navigate("/", {replace: true});

    useEffect(() => {
        existingCustomer && setCustomer(existingCustomer);

        // if the form is for a new customer and information is updated
        !existingCustomer && setCustomer({
            ...customer,
            information: new Array(information)
        })
    }, [existingCustomer, information])


    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setCustomer({...customer, [name]: value});
        },
        [customer, setCustomer]
    );

    const handleInformationChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {

            const value = e.target.value;
            setInformation({
                ...information,
                content: value
            });
        },
        [information, setInformation]
    );

    const save = (async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors([]);

        // save the customer
        try {
            const response = await saveCustomer(customer);

            if (response.status === 200) {

                // save the file
                const customerId = response.data.id;

                const formData: any = new FormData();
                formData.append("file", file);

                try {
                    await savePDF(formData, customerId);
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (e) {
            setErrors((errors) => [
                ...errors,
                "Invalid user data"
            ]);
            console.log(errors)
        }
    });

    return (
        <Paper variant={"outlined"} sx={{boxShadow: 4, my: 3, p: {xs: 2, md: 3}}}>
            <Grid container component={"form"} spacing={3} sx={{pt: 2}} onSubmit={save}>
                <FormItems customer={customer} handleChange={handleChange}/>
                {!existingCustomer &&
                    <>
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
                    </>
                }
                {existingCustomer &&
                    <Grid item xs={12}>
                        <Button onClick={async () => {
                            await downloadPDF(customer)
                        }}>
                            Download DSGVO
                        </Button>
                    </Grid>
                }
                <FormButtons existingCustomer={existingCustomer} customer={customer} toHome={toHome}/>
            </Grid>
        </Paper>
    )
}