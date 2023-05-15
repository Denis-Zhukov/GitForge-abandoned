import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "../../../api/services/AuthService";

export const checkAuthThunk = createAsyncThunk(
    "auth/check-auth",
    async (_, thunkAPI) => {
        try {
            const response = await AuthService.checkAuth();
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)