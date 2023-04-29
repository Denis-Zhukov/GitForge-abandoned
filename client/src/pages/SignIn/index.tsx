import s from "./style.module.scss";
import React, {ChangeEvent, useCallback, useState} from "react";
import {AuthService} from "../../api/services/AuthService";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {setRoles} from "../../store/slices/AuthSlice";
import {usePageTitle} from "../../hooks/usePageTitle";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";

export const SignIn = () => {
    usePageTitle("GitForge | Sign In");

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onChangeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }, []);

    const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    const handleSignIn = useCallback(async () => {
        const response = await AuthService.login(username, password);
        if (response.status === 200) {
            dispatch(setRoles(["user"]));
            navigate("/");
        }
    }, [username, password, dispatch, navigate]);

    return <div className={s.wrapper}>
        <h1 className={s.title}>Sign In</h1>
        <div className={s.authBlock}>
            <label htmlFor="username-input">Username:</label>
            <Input id="username-input" className={s.input} type="text" value={username} onChange={onChangeUsername}/>

            <label htmlFor="password-input">Password:</label>
            <Input id="password-input" className={s.input} type="password" value={password}
                   onChange={onChangePassword}/>

            <Button className={s.button} onClick={handleSignIn}>Sign In</Button>
        </div>
    </div>
}