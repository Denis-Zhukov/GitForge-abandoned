import {Navbar} from "../../components/Navbar";
import {usePageTitle} from "../../hooks";
import {Footer} from "../../components/Footer";
import {Route, Routes} from "react-router-dom";
import {Path} from "../../constans/Path";
import {Info} from "../Info";
import {Profile} from "../Profile";
import s from "./style.module.scss";
import {NotFound} from "../NotFound";
import {Settings} from "../Settings";
import React from "react";


export const Main = () => {
    usePageTitle("GitForge");


    return (
        <div className={s.wrapper}>
            <Navbar logo="/logo192.png"/>
            <main className={s.main}>
                <Routes>
                    <Route path={Path.MAIN} element={<Info/>}/>
                    <Route path={Path.PROFILE} element={<Profile/>}/>

                    <Route path={Path.SETTINGS + "/*"} element={<Settings/>}/>

                    <Route path={Path.ANY} element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    )
}