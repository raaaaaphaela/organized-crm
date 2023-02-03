import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, {ChangeEventHandler} from "react";
import {Link} from "react-router-dom";

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
                 onSubmit={onSubmit}
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
                    {buttonText}
                </Button>
            </Box>
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
    )
}