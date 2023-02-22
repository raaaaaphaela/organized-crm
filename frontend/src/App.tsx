import React from 'react';
import './_app.scss';
import {BrowserRouter} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import Root from "./Root";
import {createTheme, ThemeProvider} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

    const theme = createTheme({
        typography: {
            fontFamily: 'Roboto'
        },
        palette: {
            mode: 'light',
            primary: {
                main: '#062375'
            },
            secondary: {
                main: '#0e43c9'
            },
            info: {
                main: '#00b2b1'
            }
        }
    });


    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Root/>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
