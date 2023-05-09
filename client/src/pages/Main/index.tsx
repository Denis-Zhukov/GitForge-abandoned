import {Navbar} from "../../components/Navbar";
import {usePageTitle} from "../../hooks";
import {Footer} from "../../components/Footer";
import {Route, Routes} from "react-router-dom";
import {Path} from "../../constans/Path";
import {Info} from "../Info";
import {Profile} from "../Profile";
import s from "./style.module.scss";


export const Main = () => {
    usePageTitle("GitForge");


    return (
        <div className={s.wrapper}>
            <Navbar logo="/logo192.png"/>
            <main className={s.main}>
                <Routes>
                    <Route path={Path.MAIN} element={<Info/>}/>
                    <Route path={Path.PROFILE} element={<Profile/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    )
}