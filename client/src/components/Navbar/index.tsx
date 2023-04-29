import React from "react";
import {Link} from "react-router-dom";
import s from "./navbar.module.scss";

interface Props {
    logo: string;
}

export const Navbar: React.FC<Props> = ({logo}) => {

    return <nav className={s.navbar}>
        <img src={logo} alt="logo"/>

        <div className={s.authButtons}>
            <Link to="/login" className={s.signIn}>Sign In</Link>
            <Link to="/register" className={s.signUp}>Sign Up</Link>
        </div>
    </nav>
}