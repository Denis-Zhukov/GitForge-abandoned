import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    roles: string[]
}

const initialState: AuthState = {
    roles: []
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setRoles(state, action: PayloadAction<string[]>) {
            return {
                ...state,
                roles: action.payload
            }
        }
    }
})

export const {setRoles} = slice.actions;
export default slice.reducer;