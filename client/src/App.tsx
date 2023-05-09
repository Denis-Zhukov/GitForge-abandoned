import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {Main} from "./pages/Main";
import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";
import {LogOut} from "./pages/LogOut";
import {Path} from "./constans/Path";
import {useActions} from "./hooks";

export const App = () => {
    const {checkAuthThunk} = useActions();

    useEffect(() => {
        if (localStorage.access_token) {
            checkAuthThunk();
        }
    }, [checkAuthThunk])

    return (
        <Routes>
            <Route path={Path.ANY} element={<Main/>}/>

            <Route path={Path.LOGIN} element={<SignIn/>}/>
            <Route path={Path.REGISTER} element={<SignUp/>}/>
            <Route path={Path.LOGOUT} element={<LogOut/>}/>
        </Routes>
    );
}

