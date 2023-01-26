import {Button, Grid, Typography} from "@mui/material";
import EnhancedTable from "../components/DataTable";
import {data} from "./data";

export default function HomePage() {

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

            <EnhancedTable rows={data}/>
        </Grid>
    )
}