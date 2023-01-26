import React, {FormEvent, useCallback, useMemo, useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function LoginPage() {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setCredentials({...credentials, [name]: value});
        },
        [credentials, setCredentials]
    );

    const [searchParams] = useSearchParams();
    const redirect = useMemo(() =>
            searchParams.get("redirect") || "/",
        [searchParams]
    );

    const navigate = useNavigate();
    const login = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            await axios.post("/api/app-users/login", null, {
                headers: {
                    "Authorization": "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
                }
            });
            navigate(redirect);
        },
        [credentials, navigate, redirect]
    );

    return (
        <div className={"login-page"}>
            <div className={"login-page_container"}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1">Login</Typography>
                    <Box component="form"
                         onSubmit={login}
                         sx={{
                             mt: 1,
                             width: 300,
                         }}>
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={credentials.username}
                            autoComplete="username"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={credentials.password}
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 2, mb: 2}}
                        >
                            Einloggen
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Typography sx={{typography: 'body1'}}> Noch keinen Account?&nbsp;
                                    <Link to={"/signup"}>
                                        {"Hier registrieren."}
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        </div>
    )
}