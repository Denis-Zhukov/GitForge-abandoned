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
import {Repositories} from "../Repositories";
import {CreateRepository} from "../CreateRepository";
import {Repository} from "../Repository";


export const Main = () => {
    usePageTitle("GitForge");


    return (
        <div className={s.wrapper}>
            <Navbar logo="/logo192.png"/>
            <main className={s.main}>
                <Routes>
                    <Route path={Path.MAIN} element={<Info/>}/>
                    <Route path={Path.PROFILE} element={<Profile/>}/>
                    <Route path={`/:username${Path.PROFILE_REPOSITORIES}`} element={<Repositories/>}/>
                    <Route path={`${Path.PROFILE}${Path.PROFILE_CREATE_REPOSITORY}`} element={<CreateRepository/>}/>
                    <Route path={`/:username/:repository`} element={<Repository/>}/>

                    <Route path={Path.SETTINGS + "/*"} element={<Settings/>}/>

                    <Route path={Path.ANY} element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    )
}