import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from "./slices/AuthSlice";
import {api} from "./RTKQuery/api";

const reducers = combineReducers({
    auth: authReducer,
    [api.reducerPath]: api.reducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch