import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type Slice = {
    count: number
}

type SliceState = Slice;

const initialState: SliceState = {count: 0};

const slice = createSlice({
    name: "slice",
    initialState,
    reducers: {
        add(state, action: PayloadAction<undefined>) {
            return {
                ...state,
                count: state.count + 1
            }
        }
    }
})

export const {add} = slice.actions;
export default slice.reducer;