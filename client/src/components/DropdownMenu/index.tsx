import {Link} from "react-router-dom";
import {Path} from "../../constans/Path";
import s from "./style.module.scss";
import {useAppSelector} from "../../hooks";
import {useOutside} from "../../hooks/useOutside";


export const DropdownMenu = () => {
    const [isOpen, setIsOpen, ref] = useOutside(false);
    const username = useAppSelector(state => state.auth.username);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={s.dropdown} ref={ref}>
            <button onClick={toggleMenu} className={s.button}>{username?.toUpperCase() || "Unknown"}</button>
            {isOpen && (
                <div className={s.menu}>
                    <Link to={`/${username}`}>Profile</Link>
                    <Link to={`/${username}${Path.PROFILE_REPOSITORIES}`}>Repositories</Link>
                    <Link to={Path.SETTINGS}>Settings</Link>
                    <Link to={Path.LOGOUT}>Log Out</Link>
                </div>
            )}
        </div>
    )
}