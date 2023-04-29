import React, {useEffect, useMemo} from "react";
import {createPortal} from "react-dom";
import s from "./style.module.scss"

const modalRootElement = document.getElementById("modal")!;

interface Props {
    open: boolean,
    close: () => void,
    children: string | JSX.Element | JSX.Element[]
}

export const Modal: React.FC<Props> = ({open, close, children}) => {
    const element = useMemo(() => {
        return document.createElement("div");
    }, []);

    useEffect(() => {
        modalRootElement.appendChild(element)
        return () => {
            modalRootElement.removeChild(element)
        };
    })

    return createPortal(open ? <div className={s.modal} onClick={close}>{children}</div> : null, modalRootElement);
}