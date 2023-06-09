import React, {useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import s from "./style.module.scss"

const sideElement = document.getElementById("side-notification")!;

interface Props {
    open: boolean,
    onClose: () => void,
    delay?: number,
    children: string | string[]
}

export const SideNotification: React.FC<Props> = ({open, onClose, delay = 5000, children}) => {
    const element = useRef<HTMLDivElement>(document.createElement("div"));

    useEffect(() => {
        sideElement.appendChild(element.current)
        const el = element.current;
        return () => {
            sideElement.removeChild(el)
        };
    }, [])

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                onClose();
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [onClose, open, delay])

    return createPortal(open && <div className={s.backdrop} onClick={onClose} style={{animationDuration: `${delay}ms`}}>
        {children}
    </div>, sideElement);
}