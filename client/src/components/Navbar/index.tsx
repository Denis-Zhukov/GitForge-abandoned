import React, {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../../hooks";
import {Link} from "react-router-dom";
import {Path} from "../../constans/Path"
import s from "./navbar.module.scss";

interface Props {
    logo: string;
}

export const Navbar: React.FC<Props> = ({logo}) => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 0);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const authorized = useAppSelector(state => state.auth.authorized);

    const navbarClassName = isScrolled ? `${s.navbar} ${s.scrolled}` : s.navbar;

    return <>
        {isScrolled && <div className={s.emptyNavbar}></div>}
        <nav className={navbarClassName}>
            <img src={logo} alt="logo"/>

            <div className={s.authButtons}>
                {!authorized && <Link to={Path.LOGIN} className={s.signIn}>Sign In</Link>}
                {!authorized && <Link to={Path.REGISTER}>Sign Up</Link>}
                {authorized && <Link to={Path.LOGOUT}>Log Out</Link>}
            </div>
        </nav>
    </>
}