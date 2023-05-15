import React, {forwardRef} from "react";
import {motion} from "framer-motion";
import s from "./style.module.scss";

interface Props {
    children: string
    className?: string
}

export const Button: React.FC<Props & any> = forwardRef(({children, className, ...props}, ref) => {
    const classes = s.button + (className ? ` ${className}` : '');

    return <button ref={ref} className={classes} {...props}>{children}</button>
});

export const MButton = motion(Button);