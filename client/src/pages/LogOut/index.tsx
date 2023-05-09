import {useActions, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {Path} from "../../constans/Path";
import {Navigate} from "react-router-dom";

export const LogOut = () => {
    const {logOutThunk} = useActions();
    const authorized = useAppSelector(state => state.auth.authorized);

    useEffect(() => {
        logOutThunk();
    }, [logOutThunk])


    return authorized ? <p>Log Out</p> : <Navigate to={Path.MAIN}/>
}