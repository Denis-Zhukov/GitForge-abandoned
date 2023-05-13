import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Navigate} from "react-router-dom";
import {useActions, useAppSelector, useCreateOnChangeHandler, usePageTitle} from "../../hooks";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {CircleLoader} from "react-spinners";
import {Modal} from "../../components/Modal";
import {isErrorResponse} from "../../utils/isErrorReponse";
import {Path} from "../../constans/Path";
import s from "./style.module.scss";

export const SignIn = () => {
    usePageTitle("GitForge | Sign In");

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onChangeUsername = useCreateOnChangeHandler(setUsername);
    const onChangePassword = useCreateOnChangeHandler(setPassword);

    const authorized = useAppSelector(state => state.auth.authorized);

    const {loginThunk, authResetError} = useActions();
    const {isLoading, error} = useAppSelector(state => state.auth);

    const [modelOpened, setModelOpened] = useState(false);
    useEffect(() => {
        if (!isLoading && error)
            setModelOpened(true);

    }, [isLoading, error]);

    useEffect(() => () => {
        authResetError({})
    }, [authResetError]);

    const handleSignIn = useCallback(() => {
        loginThunk({login: username, password});
    }, [username, password, loginThunk]);

    const handleCloseModel = useCallback(() => {
        setModelOpened(false)
    }, []);

    const errors = useMemo(() => {
        if (isErrorResponse(error)) {
            return error.details.map((detail) => <p key={detail}>{detail}</p>)
        } else if (error) return <p>An unknown error has occurred. Please wait and try again.</p>
    }, [error]);

    return authorized ? <Navigate to={Path.MAIN}/> :
        <div className={s.wrapper}>
            <h1 className={s.title}>Sign In</h1>
            <div className={s.authBlock}>

                {isLoading && <CircleLoader className={s.spinner} color="white"/>}

                <Input id="username-input" className={s.input} type="text" value={username} onChange={onChangeUsername}
                       disabled={isLoading} placeholder="username"/>

                <Input id="password-input" className={s.input} type="password" value={password}
                       onChange={onChangePassword} disabled={isLoading} placeholder="password"/>

                <Button className={s.button} onClick={handleSignIn} disabled={isLoading}>Sign In</Button>
            </div>

            <Modal open={modelOpened} onClose={handleCloseModel}>
                <div>{errors}</div>
            </Modal>
        </div>
}
