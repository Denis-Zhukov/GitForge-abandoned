import {api} from "./api";
import {GetProfileResponse} from "../../types/rtks/responses/GetProfileResponse";

const authApi = api.injectEndpoints({
    endpoints: build => ({
        getProfile: build.query<GetProfileResponse, string>({
            query: (username: string) => ({
                url: `/profile/${username}`,
                method: "GET"
            }),
        })
    })
})

export const {useGetProfileQuery} = authApi;