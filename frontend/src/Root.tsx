import {Route, Routes, useSearchParams} from "react-router-dom";
import Auth from "./components/Auth";
import LoginPage from "./pages/LoginPage";
import {useMemo} from "react";
import NoAuth from "./components/NoAuth";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import {Container, createTheme, ThemeProvider} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NewCustomer from "./pages/NewCustomer";

export default function Root() {

    const [searchParam] = useSearchParams();
    const redirect = useMemo(() => searchParam.get("redirect") || "/",
        [searchParam]
    );

    const theme = createTheme({
        typography: {
            fontFamily: 'Roboto'
        },
        palette: {
            mode: 'light',
            primary: {
                main: '#305252'
            },
            secondary: {
                main: '#B7D5D4'
            }
        }
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar/>
                <Container sx={{pt: 6}}>
                    <Routes>
                        <Route path={"/login"} element={
                            <NoAuth redirect={redirect}>
                                <LoginPage/>
                            </NoAuth>
                        }/>
                        <Route path={"/"} element={
                            <Auth roles={["BASIC", "ADMIN"]}>
                                <HomePage/>
                            </Auth>
                        }/>
                        <Route path={"/new"} element={
                            <Auth roles={["BASIC", "ADMIN"]}>
                                <NewCustomer/>
                            </Auth>
                        }/>
                    </Routes>
                </Container>
            </ThemeProvider>
        </>
    )
}