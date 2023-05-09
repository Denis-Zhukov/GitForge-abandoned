import React, {useCallback, useEffect, useState} from "react";
import {useAppSelector, useCreateOnChangeHandler, usePageTitle} from "../../hooks";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {useRegisterMutation} from "../../store/RTKQuery/auth.api";
import {CircleLoader} from "react-spinners";
import {Modal} from "../../components/Modal";
import {isErrorResponse} from "../../utils/isErrorReponse";
import {SideNotification} from "../../components/SideNotification";
import s from "./style.module.scss";
import {Navigate} from "react-router-dom";
import {Path} from "../../constans/Path";

export const SignUp = () => {
    usePageTitle("GitForge | Sign Up");

    const [registerAccount, {
        isLoading,
        isSuccess,
        data,
        isError,
        error
    }] = useRegisterMutation();

    const authorized = useAppSelector(state => state.auth.authorized);

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
    if (isError && isErrorResponse(error)) {
        errors = error.data.details.map((detail) => <p key={detail}>{detail}</p>)
    } else if (isError) errors = <p>An unknown error has occurred. Please wait and try again.</p>

    const handleCloseNotification = useCallback(() => {
        setNotificationOpened(false)
    }, [])

    return authorized ? <Navigate to={Path.MAIN}/> : <div className={s.wrapper}>
        <h1 className={s.title}>Sign Up</h1>
        <div className={s.authBlock}>

            {isLoading && <CircleLoader className={s.spinner}/>}


            <label htmlFor="username-input">Username: </label>
            <Input id="username-input" className={s.input} type="text" value={username} onChange={onChangeUsername}/>

            <label htmlFor="email-input">Email: </label>
            <Input id="email-input" className={s.input} type="email" value={email} onChange={onChangeEmail}/>

            <label htmlFor="password-input">Password: </label>
            <Input id="password-input" className={s.input} type="password" value={password}
                   onChange={onChangePassword}/>

            <label htmlFor="password-confirmation-input">Password confirmation: </label>
            <Input id="password-confirmation-input"
                   className={`${s.input} ${password !== passwordConfirmation && s['red-border']}`} type="password"
                   value={passwordConfirmation}
                   onChange={onChangePasswordConfirmation}/>

            <Button className={s.button} onClick={handleSignUp}>Sign Up</Button>
        </div>

        <Modal open={modelOpened} onClose={() => setModelOpened(false)}>
            <div>{errors}</div>
        </Modal>

        <SideNotification open={notificationOpened} onClose={handleCloseNotification} delay={2000}>
            Account registered. A letter has been sent to '{data?.email!}'. Confirm mail.
        </SideNotification>
    </div>
}