import {Navbar} from "../../components/Navbar";
import s from "./style.module.scss";
import {usePageTitle} from "../../hooks/usePageTitle";
import {useEffect, useState} from "react";
import {AuthService} from "../../api/services/AuthService";
import {Modal} from "../../components/Modal";

export const Main = () => {
    usePageTitle("GitForge");

    const [roles, setRoles] = useState<string[]>([]);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        (async () => {
            setRoles(await AuthService.getRoles());
        })();
    }, []);

    return (
        <div className={s.wrapper}>
            <Navbar logo="logo192.png"/>
            Roles: <div>{roles?.join(", ")}</div>
            <Modal open={open} close={() => setOpen(false)}><h1>Some</h1></Modal>
        </div>
    )
}