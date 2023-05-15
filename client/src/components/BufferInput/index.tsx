import React, {useEffect, useState} from 'react';
import s from "./style.module.scss"

interface Props {
    text: string
    className?: string
}

export const BufferInput: React.FC<Props> = ({text, className, ...props}) => {
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [copied])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
    };

    return (
        <div {...props} className={`${s.wrapper} ${className}`}>
            <input value={text} readOnly/>
            <button onClick={copyToClipboard}>{!copied ? "Copy" : "Copied"}</button>
        </div>
    );
};