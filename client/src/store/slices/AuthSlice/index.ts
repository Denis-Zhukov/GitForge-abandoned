import {createSlice} from "@reduxjs/toolkit";
import {loginThunk} from "./loginThunk";
import {AuthState} from "../../../types/states/AuthState";
import {ErrorResponse} from "../../../types/responses/ErrorResponse";
import {checkAuthThunk} from "./checkAuthThunk";

const initialState: AuthState = {
    authorized: false,
    username: null,
    roles: [],
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        unAuth: (state, _) => {
            state.authorized = false;
            state.roles = [];
            state.username = null;
            localStorage.removeItem("access_token")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })

        builder.addCase(loginThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.roles = payload.roles;
            state.username = payload.username;
            localStorage.setItem("access_token", payload.access_token);
            state.authorized = true;
        })

        builder.addCase(loginThunk.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload as ErrorResponse;
        })


        builder.addCase(checkAuthThunk.fulfilled, (state, {payload}) => {
            state.roles = payload.roles;
            state.username = payload.username;
            state.authorized = true;
        })

        builder.addCase(checkAuthThunk.rejected, (state, {payload}) => {
            localStorage.removeItem("access_token");
            state.authorized = false;
            state.roles = [];
            state.username = null;
            state.error = payload as ErrorResponse;
        })
    }
})

export const {actions: authActions} = slice;
export default slice.reducer;
