import React, {FormEvent, useCallback} from "react";
import axios from "axios";
import AuthForm from "../components/form/AuthForm";
import useAuthUser from "../hooks/useAuthUser";
import {toast} from "react-toastify";

export default function SignUpPage() {

    const {
        credentials,
        navigate,
        location,
        handleChange,
        errors, setErrors
    } = useAuthUser();

    const signUp = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setErrors([]);

            try {
                await axios.post("/api/app-users/signup", credentials);
                toast.success("Erfolgreich gespeichert!")
                navigate("/login" + location.search);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Ungültige Benutzerdaten!"
                ]);
                console.log(errors);
            }
        },
        [credentials, navigate, location, errors, setErrors]
    );

    return (
        <AuthForm
            onSubmit={signUp}
            handleChange={handleChange}
            credentials={credentials}
            buttonText={"Registrieren"}
            errors={errors}
        />
    )
}