import {Route, Routes, useSearchParams} from "react-router-dom";
import Auth from "./components/Auth";
import LoginPage from "./pages/loginPage/LoginPage";
import {useMemo} from "react";
import NoAuth from "./components/NoAuth";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/navBar/NavBar";

export default function Root() {

    const [searchParam] = useSearchParams();
    const redirect = useMemo(() => searchParam.get("redirect") || "/",
        [searchParam]
    );

    return (
        <>
            <NavBar/>
            <div className={"app__container"}>
                <Routes>
                    <Route path={"/login"} element={
                        <NoAuth redirect={redirect}>
                            <LoginPage/>
                        </NoAuth>
                    }/>
                    <Route path={"/signup"} element={
                        <NoAuth redirect={redirect}>
                            <SignUpPage/>
                        </NoAuth>
                    }/>
                    <Route path={"/"} element={
                        <Auth roles={["BASIC", "ADMIN"]}>
                            <HomePage/>
                        </Auth>
                    }/>
                </Routes>
            </div>
        </>
    )
}