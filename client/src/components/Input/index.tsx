import React from "react";
import PropTypes from "prop-types";
import s from "./style.module.scss";

interface Props {
    type: string,
    className?: string
}

export const Input: React.FC<Props & any> = ({type, className, ...props}) => {
    const classes = s.input + (className ? ` ${className}` : '');

    return <input type={type} className={classes} {...props} />
}


Input.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
}