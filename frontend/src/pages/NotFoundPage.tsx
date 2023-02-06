import {useNavigate} from "react-router-dom";
import {Button, Container, Typography} from "@mui/material";
import NavBar from "../components/NavBar";
import React from "react";

export default function NotFoundPage() {

    const navigate = useNavigate();
    return (
        <>
            <NavBar/>
            <Container sx={{pt: 6}}>
                <Container maxWidth="sm">
                    <Typography variant="h2">404</Typography>
                    <Typography variant="h6">Diese Seite existiert nicht...</Typography>
                    <Button variant={"contained"} sx={{mt: 2}} onClick={() => navigate("/")}>&rarr; &nbsp; Zur
                        Startseite</Button>
                </Container>
            </Container>
        </>
    )
}