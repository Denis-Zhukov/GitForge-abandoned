import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginPayload} from "../../../types/requestes/LoginPayload";
import {AuthService} from "../../../api/services/AuthService";

export const loginThunk = createAsyncThunk(
    "auth/login",
    async ({login, password}: LoginPayload, thunkAPI) => {
        try {
            const response = await AuthService.login(login, password);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)