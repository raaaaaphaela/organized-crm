import {Route, Routes, useSearchParams} from "react-router-dom";
import Auth from "./components/Auth";
import LoginPage from "./pages/LoginPage";
import {useMemo} from "react";
import NoAuth from "./components/NoAuth";
import HomePage from "./pages/HomePage";
import NewCustomerPage from "./pages/NewCustomerPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";

export default function Root() {

    const [searchParam] = useSearchParams();
    const redirect = useMemo(() => searchParam.get("redirect") || "/",
        [searchParam]
    );

    return (
        <>
                <Routes>
                    <Route path={"/login"} element={
                        <NoAuth redirect={redirect}>
                            <LoginPage/>
                        </NoAuth>
                    }/>
                    <Route path={"/signUp"} element={
                        <NoAuth redirect={redirect}>
                            <SignUpPage/>
                        </NoAuth>
                    }/>
                    <Route path={"*"} element={<NotFoundPage/>}/>
                    <Route path={"/"} element={
                        <Auth roles={["BASIC", "ADMIN"]}>
                            <HomePage/>
                        </Auth>
                    }/>
                    <Route path={"/new"} element={
                        <Auth roles={["BASIC", "ADMIN"]}>
                            <NewCustomerPage/>
                        </Auth>
                    }/>
                    <Route path={"/edit/:id"} element={
                        <Auth roles={["BASIC", "ADMIN"]}>
                            <EditCustomerPage/>
                        </Auth>
                    }/>
                </Routes>
        </>
    )
}