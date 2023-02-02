import {AppBar, Box, Button, Typography} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {useNavigate} from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function NavBar() {

    const navigate = useNavigate();
    const home = () => navigate("/", {replace: true});

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar sx={{mx: 2}}>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, color: "white"}}>
                        LOGO
                    </Typography>
                    <Button color="secondary" onClick={home} sx={{mr: 3, color: "white"}}>
                        Startseite
                    </Button>
                    <LogoutButton />
                </Toolbar>
            </AppBar>
        </Box>
    )
}