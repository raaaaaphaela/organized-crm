import React from "react";
import useAuth from "../hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";

export default function Auth(
    {
        children,
        shouldRedirect = true,
        roles,
    }: {
        children: React.ReactNode,
        shouldRedirect?: boolean,
        roles: string[],
    }
) {
    const {user, isReady} = useAuth();
    const location = useLocation();

    const navigate = (
        <Navigate
            to={isReady && !user
                ? `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`
                : "/"
            }
        />
    )

    const handleRedirect = shouldRedirect ? navigate : null;

    function render() {
        if (user && roles.includes(user.role)) {
            return <>{children}</>;
        } else {
            return handleRedirect;
        }
    }

    return !isReady ? null : render();
}