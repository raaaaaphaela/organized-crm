import {Button, Grid, Typography} from "@mui/material";
import EnhancedTable from "../components/table/EnhancedTable";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAllCustomers} from "../api-service/customer-service";

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
    createdBy: string,
}

export default function HomePage() {

    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        (async () => {
            const response = await getAllCustomers();
            setCustomers(response.data)
        })();
    }, []);

    const navigate = useNavigate();
    const newCustomer = () => navigate("/new", {replace: true});

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
            <Button sx={{my: 4}} variant="contained" onClick={newCustomer}>Neuer Kunde</Button>
            <EnhancedTable rows={customers}/>
        </Grid>
    )
}