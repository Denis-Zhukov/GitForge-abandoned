import {useParams} from "react-router-dom";
import s from "./style.module.scss";

export const Profile = () => {
    const {username} = useParams();

    return <div>
        <div className={s.username}>{username}</div>
    </div>
}