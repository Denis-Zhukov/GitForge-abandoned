import {configureStore} from '@reduxjs/toolkit'
import slice from "./slices/slice";

export const store = configureStore({
    reducer: {
        info: slice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch