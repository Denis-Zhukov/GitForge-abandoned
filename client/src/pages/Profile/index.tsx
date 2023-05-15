import React, {useCallback} from "react";
import moment from "moment";
import {useNavigate, useParams} from "react-router-dom";
import {NotFound} from "../NotFound";
import {CircleLoader} from "react-spinners";
import {Button} from "../../components/Button";
import {Path} from "../../constans/Path";
import {useGetProfileQuery} from "../../store/RTKQuery/profile.api";
import {useAppSelector} from "../../hooks";
import s from "./style.module.scss";

export const Profile = () => {
    const {username} = useParams();
    const myUsername = useAppSelector(state => state.auth.username);
    const navigate = useNavigate();

    const handleEditClick = useCallback(() => {
        navigate(`${Path.SETTINGS}${Path.SETTINGS_PROFILE}`);
    }, [navigate]);

    const {data, error} = useGetProfileQuery(username!);
    if (error && 'originalStatus' in error && error.originalStatus === 404)
        return <NotFound/>


    if (data) {
        return <div className={s.profile}>

            <div className={s.infoBlock}>
                <div className={s.leftBlock}>
                    <img className={s.avatar} src={data.avatar} alt={`avatar_${username}`}/>
                    {username === myUsername && <Button onClick={handleEditClick}>Edit</Button>}
                </div>

                <div className={s.rightBlock}>
                    <div className={s.username}>{data.username}</div>
                    <div className={s.profession}>{data.profession}</div>
                    <div className={s.summary}>Summary: {data.summary}</div>
                    <div className={s.registrationDate}>Registration
                        date: {moment(new Date(data.createdAt)).format("DD.MM.yyyy")}</div>
                </div>
            </div>
        </div>
    }

    return <CircleLoader className={s.spinner} color="white"/>
}