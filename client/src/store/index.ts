import {configureStore} from '@reduxjs/toolkit'
import slice from "./slices/AuthSlice";

export const store = configureStore({
    reducer: {
        auth: slice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch