import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "../../../api/services/AuthService";
import {authActions} from "./index";

export const logOutThunk = createAsyncThunk(
    "auth/log-out",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(authActions.unAuth({}));
            const response = await AuthService.logout();
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)