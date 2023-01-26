import {Button, Grid, Typography} from "@mui/material";
import EnhancedTable from "../components/table/EnhancedTable";
import {useEffect, useState} from "react";
import axios from "axios";

export interface Customer {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    street: string,
    houseNo: number,
    city: string,
    postalCode: number,
    linkToDSGVO: string,
    createdBy: string,
}
export default function HomePage() {

    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/customer")
            setCustomers(response.data)

        })();
    }, [customers]);

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Typography variant="h4">
                KUNDENÜBERSICHT
            </Typography>

            <Button sx={{my: 4}} variant="contained">Neuer Kunde</Button>

            <EnhancedTable rows={customers}/>
        </Grid>
    )
}