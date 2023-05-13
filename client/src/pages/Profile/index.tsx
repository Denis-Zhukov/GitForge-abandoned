import React from "react";
import moment from "moment";
import {useParams} from "react-router-dom";
import {NotFound} from "../NotFound";
import {CircleLoader} from "react-spinners";
import {Button} from "../../components/Button";
import {useGetProfileQuery} from "../../store/RTKQuery/profile.api";
import s from "./style.module.scss";

export const Profile = () => {
    const {username} = useParams();

    const {data, error} = useGetProfileQuery(username!);
    if (error && 'originalStatus' in error && error.originalStatus === 404)
        return <NotFound/>


    if (data) {
        return <div className={s.profile}>

            <div>
                <img className={s.avatar} src={data.avatar} alt={`avatar_${username}`}/>
                <Button>Edit</Button>
            </div>

            <div className="infoBlock">
                <div className={s.username}>{data.username}</div>
                <div className={s.profession}>{data.profession}</div>
                <div className={s.summary}>Summary: {data.summary}</div>
                <div className={s.registrationDate}>Registration
                    date: {moment(new Date(data.createdAt)).format("DD.MM.yyyy")}</div>
            </div>


        </div>
    }

    return <CircleLoader className={s.spinner} color="white"/>
}