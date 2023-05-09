import {bindActionCreators} from "@reduxjs/toolkit";
import {useAppDispatch} from "./redux-toolkit";
import {useMemo} from "react";
import {authActions} from "../store/slices/AuthSlice";
import {loginThunk} from "../store/slices/AuthSlice/loginThunk";
import {logOutThunk} from "../store/slices/AuthSlice/logOutThunk";
import {checkAuthThunk} from "../store/slices/AuthSlice/checkAuthThunk";

const actions = {
    ...authActions,
    loginThunk,
    logOutThunk,
    checkAuthThunk
};

export const useActions = () => {
    const dispatch = useAppDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}