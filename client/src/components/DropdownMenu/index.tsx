import {useState} from 'react';
import {Link} from "react-router-dom";
import {Path} from "../../constans/Path";
import s from "./style.module.scss";
import {useAppSelector} from "../../hooks";


export const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const username = useAppSelector(state => state.auth.username);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={s.dropdown}>
            <button onClick={toggleMenu} className={s.button}>{username?.toUpperCase() || "Unknown"}</button>
            {isOpen && (
                <div className={s.menu}>
                    <Link to={`/${username}`}>Profile</Link>
                    <Link to={Path.LOGOUT}>Log Out</Link>
                </div>
            )}
        </div>
    )
}