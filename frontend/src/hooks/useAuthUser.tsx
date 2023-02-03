import React, {useCallback, useMemo, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

export default function useAuthUser () {

    const [errors, setErrors] = useState<string[]>([]);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    const location = useLocation();

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

    return {
        redirect,
        credentials,
        navigate,
        location,
        handleChange,
        errors,
        setErrors
    }
}