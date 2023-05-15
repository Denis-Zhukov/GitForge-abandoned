import React, {useCallback} from "react";
import moment from "moment";
import {Link, useNavigate, useParams} from "react-router-dom";
import {NotFound} from "../NotFound";
import {MButton} from "../../components/Button";
import {Path} from "../../constans/Path";
import {useGetProfileQuery} from "../../store/RTKQuery/profile.api";
import {useAppSelector} from "../../hooks";
import {Loader} from "../../components/Loader";
import {motion} from "framer-motion";
import {appear, leftSlide, rightSlide} from "../../utils/animations";
import s from "./style.module.scss";
import {useGetFavoritesRepositoriesQuery} from "../../store/RTKQuery/repository.api";
import {RepositoryCard} from "../../components/RepositoryCard";

export const Profile = () => {
    const navigate = useNavigate();

    const {username} = useParams();
    const myUsername = useAppSelector(state => state.auth.username);

    const {data, error} = useGetProfileQuery(username!);
    const {data: repos} = useGetFavoritesRepositoriesQuery(username!);

    const handleRepositoriesClick = useCallback(() => {
        navigate(`/${username}${Path.PROFILE_REPOSITORIES}`);
    }, [navigate, username]);

    const handleEditClick = useCallback(() => {
        navigate(`${Path.SETTINGS}${Path.SETTINGS_PROFILE}`);
    }, [navigate]);

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

            <motion.section initial="hidden" whileInView="visible" viewport={{once: true}} className={s.favorites}>
                <MButton
                    onClick={handleRepositoriesClick}
                    variants={rightSlide}
                    custom={5}
                    className={s.allRepoBtn}
                >All repositories</MButton>
                {
                    repos?.map(repo => (
                        <Link to={`/${username}/${repo.name}`} key={repo.id}
                              style={{textDecoration: "none", color: "white"}}>
                            <RepositoryCard
                                name={repo.name}
                                language={repo.language}
                                description={repo.description}
                                mouseFollow={false}
                            />
                        </Link>
                    ))
                }
            </motion.section>
        </div>
    }

    return <Loader/>
}