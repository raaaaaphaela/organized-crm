import React, {FormEvent, useCallback} from "react";
import axios from "axios";
import AuthForm from "../components/form/AuthForm";
import useAuthUser from "../hooks/useAuthUser";

export default function LoginPage() {

    const {
        redirect,
        credentials,
        navigate,
        handleChange,
        errors, setErrors
    } = useAuthUser();

    const login = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
                await axios.post("/api/app-users/login", null, {
                    headers: {
                        "Authorization": "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
                    }
                });
                navigate(redirect);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Ungültige Benutzerdaten!"
                ]);
            }
        },
        [credentials, navigate, redirect, setErrors]
    );

    return (
        <AuthForm
            handleChange={handleChange}
            credentials={credentials}
            onSubmit={login}
            buttonText={"Einloggen"}
            errors={errors}
        />
    )
}