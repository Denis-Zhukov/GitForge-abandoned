import {api} from "./api";
import {GetProfileResponse} from "../../types/rtks/responses/GetProfileResponse";

const authApi = api.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query<GetProfileResponse, string>({
            query: (username: string) => ({
                url: `/profile/${username}`,
                method: "GET"
            }),
        }),
        uploadProfileAvatar: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('image', file);

                return ({
                    url: '/profile/upload-avatar',
                    method: 'POST',
                    body: formData,
                })
            },
        }),
    })
})
export const {useGetProfileQuery, useUploadProfileAvatarMutation} = authApi;