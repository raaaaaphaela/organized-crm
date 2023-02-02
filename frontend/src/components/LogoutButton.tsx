import {useCallback} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Button} from "@mui/material";

export default function LogoutButton() {

    const location = useLocation();
    const navigate = useNavigate();

    const logout = useCallback(async () => {
        await axios.get("/api/app-users/logout");
        navigate("/login?redirect=" + encodeURIComponent(location.pathname + location.search));
        window.document.cookie = "";
        window.localStorage.clear();
    }, [location, navigate]);

    return (
        <Button variant="outlined" color="secondary" sx={{color: "white", borderColor: "white"}} onClick={logout}>Logout</Button>
    )
}