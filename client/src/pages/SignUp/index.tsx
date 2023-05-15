import React, {useCallback, useEffect, useState} from "react";
import {useAppSelector, useCreateOnChangeHandler, usePageTitle} from "../../hooks";
import {MInput} from "../../components/Input";
import {MButton} from "../../components/Button";
import {useRegisterMutation} from "../../store/RTKQuery/auth.api";
import {Modal} from "../../components/Modal";
import {isErrorResponseFromData} from "../../utils/isErrorReponse";
import {SideNotification} from "../../components/SideNotification";
import {Path} from "../../constans/Path";
import {Navigate, useNavigate} from "react-router-dom";
import {Loader} from "../../components/Loader";
import s from "./style.module.scss";
import {motion} from "framer-motion";
import {appear} from "../../utils/animations";

export const SignUp = () => {
    usePageTitle("GitForge | Sign Up");

    const navigate = useNavigate();

    const authorized = useAppSelector(state => state.auth.authorized);

    const [registerAccount, {
        isLoading,
        isSuccess,
        data,
        isError,
        error
    }] = useRegisterMutation();

    const [modelOpened, setModelOpened] = useState<boolean>(false);
    const [notificationOpened, setNotificationOpened] = useState<boolean>(false);

    useEffect(() => {
        if (isError) setModelOpened(true);
        else if (isSuccess) setNotificationOpened(true);
    }, [isError, isSuccess]);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const onChangeUsername = useCreateOnChangeHandler(setUsername);
    const onChangeEmail = useCreateOnChangeHandler(setEmail);
    const onChangePassword = useCreateOnChangeHandler(setPassword);
    const onChangePasswordConfirmation = useCreateOnChangeHandler(setPasswordConfirmation);

    const handleSignUp = useCallback(() => {
        registerAccount({
            username,
            password,
            email
        });
    }, [registerAccount, username, password, email]);

    let errors;
    if (isError && isErrorResponseFromData(error)) {
        errors = error.data.details.map((detail) => <p key={detail}>{detail}</p>)
    } else if (isError) errors = <p>An unknown error has occurred. Please wait and try again.</p>

    const handleCloseNotification = useCallback(() => {
        setNotificationOpened(false);
        navigate(Path.LOGIN);
    }, [navigate])

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter')
            handleSignUp();
    };

    return authorized ? <Navigate to={Path.MAIN}/> :
        <motion.div className={s.wrapper} initial="hidden" whileInView="visible" viewport={{once: true}}>
            <motion.h1 className={s.title} variants={appear} custom={{delay: 0}}>Sign Up</motion.h1>
            <div className={s.authBlock}>

                {isLoading && <Loader className={s.spinner}/>}

                <MInput id="username-input" className={s.input} type="text" value={username} onChange={onChangeUsername}
                        placeholder={"username"} variants={appear} custom={{delay: 1}} onKeyPress={handleKeyPress}/>

                <MInput id="email-input" className={s.input} type="email" value={email} onChange={onChangeEmail}
                        placeholder={"email"} variants={appear} custom={{delay: 1.5}} onKeyPress={handleKeyPress}/>

                <MInput id="password-input" className={s.input} type="password" value={password}
                        onChange={onChangePassword} placeholder={"password"} variants={appear} custom={{delay: 2}}
                        onKeyPress={handleKeyPress}/>

                <MInput id="password-confirmation-input"
                        className={`${s.input} ${password !== passwordConfirmation ? s.redBorder : ''}`} type="password"
                        value={passwordConfirmation}
                        onChange={onChangePasswordConfirmation}
                        placeholder="confirm password"
                        variants={appear}
                        custom={{delay: 2.5}}
                        onKeyPress={handleKeyPress}
                />

                <MButton className={s.button} onClick={handleSignUp} variants={appear} custom={{delay: 3}}>Sign
                    Up</MButton>
            </div>

            <Modal open={modelOpened} onClose={() => setModelOpened(false)}>
                <div>{errors}</div>
            </Modal>

            <SideNotification open={notificationOpened} onClose={handleCloseNotification} delay={2000}>
                Account registered. A letter has been sent to '{data?.email!}'. Confirm mail.
            </SideNotification>
        </motion.div>
}