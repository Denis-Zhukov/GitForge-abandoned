import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Url} from "../../constans/Url";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: Url.BASE_URL,
        prepareHeaders: headers => {
            const accessToken = localStorage.getItem("access_token")!;
            headers.set("Authorization", "Bearer " + accessToken);
            return headers;
        },
        credentials: "include"
    }),
    endpoints: () => ({})
});