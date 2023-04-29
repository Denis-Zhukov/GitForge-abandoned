import React from "react";
import s from "./style.module.scss";

interface Props {
    children: string
    className?: string
}

export const Button: React.FC<Props & any> = ({children, className, ...props}) => {
    const classes = s.button + (className ? ` ${className}` : '');

    return <button className={classes} {...props}>{children}</button>
}