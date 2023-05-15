import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Navigate} from "react-router-dom";
import {useActions, useAppSelector, useCreateOnChangeHandler, usePageTitle} from "../../hooks";
import {MInput} from "../../components/Input";
import {MButton} from "../../components/Button";
import {Modal} from "../../components/Modal";
import {isErrorResponse} from "../../utils/isErrorReponse";
import {Path} from "../../constans/Path";
import {Loader} from "../../components/Loader";
import s from "./style.module.scss";
import {motion} from "framer-motion";
import {appear} from "../../utils/animations";

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

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter')
            handleSignIn();
    };

    const errors = useMemo(() => {
        if (isErrorResponse(error)) {
            return error.details.map((detail) => <p key={detail}>{detail}</p>)
        } else if (error) return <p>An unknown error has occurred. Please wait and try again.</p>
    }, [error]);

    return authorized ? <Navigate to={Path.MAIN}/> :
        <motion.div className={s.wrapper} initial="hidden" whileInView="visible" viewport={{once: true}}>
            <motion.h1 className={s.title} variants={appear} custom={{delay: 0}}>Sign In</motion.h1>
            <div className={s.authBlock}>

                {isLoading && <Loader className={s.spinner}/>}

                <MInput
                    className={s.input}
                    type="text"
                    value={username}
                    onChange={onChangeUsername}
                    onKeyPress={handleKeyPress}
                    placeholder="username"
                    disabled={isLoading}
                    variants={appear}
                    custom={{delay: 1}}
                />

                <MInput
                    className={s.input}
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    placeholder="password"
                    variants={appear}
                    custom={{delay: 1.5}}/>

                <MButton className={s.button} onClick={handleSignIn} disabled={isLoading} variants={appear}
                         custom={{delay: 2}}>Sign In</MButton>
            </div>

            <Modal open={modelOpened} onClose={handleCloseModel}>
                <div>{errors}</div>
            </Modal>
        </motion.div>
}
