import React from 'react';
import {Navbar} from "./components/navbar";
import {Route, Routes, useParams} from "react-router-dom";

export const App = () => {

    return (
        <>
            <Routes>
                <Route path="/:id" element={<Navbar/>}></Route>

            </Routes>
        </>
    );
}

