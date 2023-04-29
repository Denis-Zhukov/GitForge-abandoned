import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Main} from "./pages/Main";
import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";

export const App = () => {

    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<SignIn/>}/>
            <Route path="/register" element={<SignUp/>}/>
        </Routes>
    );
}

