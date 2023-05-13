import React, {Dispatch, RefObject, useEffect, useRef, useState} from "react";

export const useOutside = (initialValue: boolean): [boolean, Dispatch<React.SetStateAction<boolean>>, RefObject<HTMLDivElement>] => {
    const [isShow, setIsShow] = useState<boolean>(initialValue);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: any) => {
        if (ref.current && !ref.current.contains(e.target))
            setIsShow(false)
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => document.removeEventListener("click", handleClickOutside, true);
    })

    return [isShow, setIsShow, ref];
}