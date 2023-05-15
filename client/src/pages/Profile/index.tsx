import React, {useCallback} from "react";
import moment from "moment";
import {useNavigate, useParams} from "react-router-dom";
import {NotFound} from "../NotFound";
import {MButton} from "../../components/Button";
import {Path} from "../../constans/Path";
import {useGetProfileQuery} from "../../store/RTKQuery/profile.api";
import {useAppSelector} from "../../hooks";
import {Loader} from "../../components/Loader";
import {motion} from "framer-motion";
import {appear, leftSlide, rightSlide} from "../../utils/animations";
import s from "./style.module.scss";

export const Profile = () => {
    const {username} = useParams();
    const myUsername = useAppSelector(state => state.auth.username);
    const navigate = useNavigate();

    const handleEditClick = useCallback(() => {
        navigate(`${Path.SETTINGS}${Path.SETTINGS_PROFILE}`);
    }, [navigate]);

    const {data, error} = useGetProfileQuery(username!);

    const handleRepositoriesClick = useCallback(() => {
        navigate(`/${username}${Path.PROFILE_REPOSITORIES}`);
    }, [navigate, username]);

    if (error && 'originalStatus' in error && error.originalStatus === 404)
        return <NotFound/>

    if (data) {
        return <div className={s.profile}>

            <motion.section className={s.infoBlock} initial="hidden" whileInView="visible" viewport={{once: true}}>
                <div className={s.leftBlock}>
                    <motion.img className={s.avatar} src={data.avatar || "/images/defaultAvatar.png"}
                                alt={`avatar_${username}`} variants={appear}
                                custom={{delay: 0, duration: 3}}/>
                    {username === myUsername &&
                        <MButton onClick={handleEditClick} variants={leftSlide} custom={4}>Edit</MButton>}
                </div>

                <div className={s.rightBlock}>
                    <motion.div className={s.username} variants={rightSlide} custom={0}
                    >{data.username}</motion.div>
                    <motion.div className={s.profession} variants={rightSlide} custom={1}
                    >{data.profession}</motion.div>
                    <motion.div className={s.summary} variants={rightSlide} custom={2}
                    >Summary: {data.summary}</motion.div>
                    <motion.div className={s.registrationDate} variants={rightSlide} custom={3}
                    >Registration date: {moment(new Date(data.createdAt)).format("DD.MM.yyyy")}</motion.div>
                </div>
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{once: true}}>
                <MButton onClick={handleRepositoriesClick}
                         variants={leftSlide}
                         custom={5}
                >Repositories</MButton>
            </motion.section>
        </div>
    }

    return <Loader/>
}