import React, {ChangeEvent, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../api/services/AuthService";
import {usePageTitle} from "../../hooks/usePageTitle";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import s from "./style.module.scss";

export const SignUp = () => {
    usePageTitle("GitForge | Sign Up");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const onChangeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }, []);

    const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, []);

    const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    const onChangePasswordConfirmation = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(e.target.value);
    }, []);

    const handleSignUp = useCallback(async () => {
        const response = await AuthService.register(username, email, password);
        if (response.status === 200)
            navigate("/login");
    }, [username, password, email, navigate]);


    return <div className={s.wrapper}>
        <h1 className={s.title}>Sign Up</h1>
        <div className={s.authBlock}>
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
    </div>
}