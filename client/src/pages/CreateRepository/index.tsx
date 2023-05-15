import {Input} from "../../components/Input";
import {useCreateRepositoryMutation} from "../../store/RTKQuery/repository.api";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useAppSelector, useCreateOnChangeHandler} from "../../hooks";
import {SideNotification} from "../../components/SideNotification";
import {Modal} from "../../components/Modal";
import {isErrorResponseFromData} from "../../utils/isErrorReponse";
import {useNavigate} from "react-router-dom";
import {MButton} from "../../components/Button";
import {appear} from "../../utils/animations";
import {motion} from "framer-motion";
import s from "./style.module.scss";

export const CreateRepository = () => {
    const navigate = useNavigate();
    const username = useAppSelector(state => state.auth.username);

    const [createRepo, {isLoading, error, isSuccess}] = useCreateRepositoryMutation();

    const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
    const [modalOpen, setModelOpen] = useState<boolean>(false);


    const [repoName, setRepoName] = useState("");
    const handleRepoNameChange = useCreateOnChangeHandler(setRepoName);

    useEffect(() => {
        if (error) setModelOpen(true)
    }, [error])

    useEffect(() => {
        if (isSuccess) {
            setNotificationOpen(true);
            const timer = setTimeout(() => navigate(`/${username}/${repoName}`), 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate, repoName, username]);

    const handleCreateClick = () => createRepo(repoName);
    const handleCloseNotification = useCallback(() => setNotificationOpen(false), []);
    const handleCloseModal = useCallback(() => setModelOpen(false), []);

    const errors = useMemo(() => {
        if (isErrorResponseFromData(error)) {
            return error.data.details.map((detail) => <p key={detail}>{detail}</p>)
        } else if (error) return <p>An unknown error has occurred. Please wait and try again.</p>
    }, [error]);

    return <motion.div className={s.wrapper} initial="hidden" whileInView="visible">
        <motion.label variants={appear}>Repository name: <Input type="text" value={repoName}
                                                                onChange={handleRepoNameChange}/></motion.label>
        <MButton onClick={handleCreateClick} disabled={isLoading} variants={appear}>Create</MButton>
        <SideNotification
            open={notificationOpen}
            onClose={handleCloseNotification}
            delay={3000}
        >Repository has been created</SideNotification>
        <Modal open={modalOpen} onClose={handleCloseModal}>
            <div>{errors}</div>
        </Modal>
    </motion.div>
}