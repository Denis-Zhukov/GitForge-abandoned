import React, {useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import s from "./style.module.scss"

const modalElement = document.getElementById("modal")!;

interface Props {
    open: boolean,
    onClose: () => void,
    children: string | JSX.Element | JSX.Element[]
}

export const Modal: React.FC<Props> = ({open, onClose, children}) => {
    const element = useRef<HTMLDivElement>(document.createElement("div"));

    useEffect(() => {
        modalElement.appendChild(element.current);
        const el = element.current;
        return () => {
            modalElement.removeChild(el)
        };
    }, [element])

    return createPortal(open && <div className={s.modalBackdrop} onClick={onClose}>
        <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalClose} onClick={onClose}>X</div>
            <div>{children}</div>
        </div>
    </div>, modalElement);
}