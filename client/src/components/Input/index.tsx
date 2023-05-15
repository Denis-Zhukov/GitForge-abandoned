import React, {forwardRef} from "react";
import PropTypes from "prop-types";
import s from "./style.module.scss";
import {motion} from "framer-motion";

interface Props {
    type: string,
    className?: string
}

export const Input: React.FC<Props & any> = forwardRef(({type, className, ...props}, ref) => {
    const classes = s.input + (className ? ` ${className}` : '');

    return <input ref={ref} type={type} className={classes} {...props} />
})

export const MInput = motion(Input);


Input.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
}