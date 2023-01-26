import React, {FormEvent, useCallback, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Box, Button, TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignUpPage() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCredentials({...credentials, [name]: value});
        },
        [credentials, setCredentials]
    );

    const navigate = useNavigate();
    const location = useLocation();

    const signUp = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setErrors([]);

            try {
                await axios.post("/api/app-users/signup", credentials);
                navigate("/login" + location.search);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid user data"
                ]);
            }
        },
        [credentials, navigate, location]
    );

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
            {errors.length > 0 && (
                <div>
                    {errors.map((error) => <p key={error}>{error}</p>)}
                </div>
            )}
            <Box component="form"
                 onSubmit={signUp}
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
                    Registrieren
                </Button>
            </Box>
        </Box>
    )
}