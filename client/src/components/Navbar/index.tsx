import React from "react";
import {useAppSelector} from "../../hooks";
import {Link} from "react-router-dom";
import {Path} from "../../constans/Path"
import s from "./navbar.module.scss";

interface Props {
    logo: string;
}

export const Navbar: React.FC<Props> = ({logo}) => {
    const authorized = useAppSelector(state => state.auth.authorized);

    return <nav className={s.navbar}>
        <img src={logo} alt="logo"/>

        <div className={s.authButtons}>
            {!authorized && <Link to={Path.LOGIN} className={s.signIn}>Sign In</Link>}
            {!authorized && <Link to={Path.REGISTER}>Sign Up</Link>}
            {authorized && <Link to={Path.LOGOUT}>Log out</Link>}
        </div>
    </nav>
}