import {Box, Button, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, {ChangeEventHandler} from "react";
import {Link} from "react-router-dom";
import Paper from "@mui/material/Paper";

export default function AuthForm(
    {
        onSubmit,
        handleChange,
        credentials,
        buttonText,
        errors,
    }
        : {
        onSubmit: any,
        handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
        credentials: {
            username: string,
            password: string
        },
        buttonText: string,
        errors?: string[]
    }) {
    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline/>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=639&q=80)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 24,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography
                        component="h1">{buttonText.includes("Einloggen") ? "Login" : "Neuer Benutzer"}</Typography>
                    <Box component="form" noValidate onSubmit={onSubmit} sx={{mt: 1}}>
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
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Passwort"
                            value={credentials.password}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 2, mb: 2}}
                        >
                            {buttonText}
                        </Button>
                        <Grid container
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                              }}>
                            <Grid item>
                                {buttonText.includes("Einloggen")
                                    ? <Typography sx={{typography: 'body1'}}> Noch keinen Account?&nbsp;
                                        <Link to={"/signup"}>
                                            {"Hier registrieren."}
                                        </Link>
                                    </Typography>
                                    : <Typography sx={{typography: 'body1'}}>
                                        <Link to={"/login"}>
                                            {"Zurück zum Login"}
                                        </Link>
                                    </Typography>
                                }
                            </Grid>
                            {errors &&
                                <Typography variant="overline" sx={{color: "error.main"}}>
                                    {errors}
                                </Typography>}
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}